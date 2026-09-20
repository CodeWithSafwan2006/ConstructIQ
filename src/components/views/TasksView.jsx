import React, { useState } from 'react';
import { Layers, Search, Plus, AlertTriangle, CheckCircle2, Clock, Calendar, User, Trash2 } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import ProgressBar from '../common/ProgressBar';
import { useApp } from '../../context/AppContext';

export default function TasksView({ tasks, onAddTask, onUpdateTaskStatus }) {
  const { deleteTask, projects, selectedProjectId } = useApp();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [projId, setProjId] = useState(selectedProjectId || (projects[0]?.id || 'p001'));
  const [assignee, setAssignee] = useState('');
  const [category, setCategory] = useState('Civil');
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
  const [priority, setPriority] = useState('Medium');
  const [progress, setProgress] = useState(0);

  const delayedTasks = tasks.filter(t => t.status === 'Delayed');

  const filteredTasks = tasks.filter(t => {
    const matchesStatus = filterStatus === 'ALL' || t.status === filterStatus;
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (t.assignedTo && t.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (t.projectName && t.projectName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const matchedProject = projects.find(p => p.id === projId) || projects[0];

    onAddTask({
      name,
      projectId: projId,
      projectName: matchedProject?.name || "Ahmedabad Smart Residency",
      assignedTo: assignee || "Site Contractor",
      progress: Number(progress) || 0,
      dueDate: dueDate || "2026-11-30",
      priority: priority || "Medium",
      status: Number(progress) === 100 ? "Completed" : Number(progress) > 0 ? "In Progress" : "Pending",
      category: category || "Civil"
    });

    setName('');
    setAssignee('');
    setProgress(0);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Project Tasks & Schedules</h1>
          <p className="text-xs text-[#6E726E]">Track task completion, milestone timelines, and contractor accountability across all site operations.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Task</span>
        </button>
      </div>

      {/* Delay Tracking Alert Banner */}
      {delayedTasks.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#FEE2E2] border border-[#FCA5A5] flex items-start gap-3 shadow-xs">
          <div className="p-2 bg-red-600 text-white rounded-xl shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#991B1B]">DELAYED ACTIVITY ALERT — Critical Path Affected</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-200 text-[#991B1B]">{delayedTasks.length} Delayed Tasks</span>
            </div>
            {delayedTasks.map(t => (
              <p key={t.id} className="text-xs text-[#7F1D1D] mt-1 font-semibold">
                • "{t.name}" on {t.projectName} is behind schedule ({t.progress}% progress, due {t.dueDate}). Assigned: {t.assignedTo}.
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8C8275] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search tasks, contractors, projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1E231F] placeholder-[#8C8275] focus:outline-none focus:border-[#275232]"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {['ALL', 'Delayed', 'In Progress', 'Completed', 'Pending'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === st 
                  ? 'bg-[#275232] text-white' 
                  : 'text-[#6E726E] hover:text-[#1E231F] bg-[#F7F5F0] border border-[#E5E2DA]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks Table */}
      <div className="rounded-2xl bg-white border border-[#E5E2DA] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F0] text-[#6E726E] font-bold uppercase tracking-wider border-b border-[#E5E2DA]">
              <tr>
                <th className="p-4">Task Name</th>
                <th className="p-4">Project</th>
                <th className="p-4">Category</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4 w-36">Progress</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DA] text-[#1E231F]">
              {filteredTasks.map((t) => {
                const isDelayed = t.status === 'Delayed';
                return (
                  <tr key={t.id} className={`transition-colors ${isDelayed ? 'bg-[#FEE2E2]/50 hover:bg-[#FEE2E2]/70' : 'hover:bg-[#F7F5F0]/60'}`}>
                    <td className="p-4 font-bold text-[#1E231F]">
                      <div className="flex items-center gap-2">
                        <span>{t.name}</span>
                        {isDelayed && (
                          <span className="text-[10px] text-[#991B1B] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#FEE2E2] border border-[#FCA5A5]">
                            Behind Schedule
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-[#4A524A] font-medium whitespace-nowrap">{t.projectName}</td>
                    <td className="p-4 text-[#6E726E] font-medium">{t.category || 'Civil'}</td>
                    <td className="p-4 text-[#4A524A] font-medium">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#275232]" />
                        <span>{t.assignedTo}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <ProgressBar progress={t.progress} status={t.status} showLabel={true} height="h-2" />
                    </td>
                    <td className="p-4 text-[#4A524A] font-medium whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#8C8275]" />
                        <span className={isDelayed ? 'text-[#991B1B] font-bold' : ''}>{t.dueDate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.priority === 'High' ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <RiskBadge level={t.status} size="sm" />
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {t.status !== 'Completed' && (
                          <button
                            onClick={() => onUpdateTaskStatus(t.id, t.status === 'Delayed' ? 'In Progress' : 'Completed')}
                            className="px-2.5 py-1 bg-white hover:bg-[#F7F5F0] text-[#275232] font-bold rounded-lg text-[11px] border border-[#E5E2DA] transition-colors shadow-xs"
                          >
                            {t.status === 'Delayed' ? 'Unblock' : 'Complete'}
                          </button>
                        )}
                        <button
                          onClick={() => deleteTask(t.id)}
                          title="Delete task"
                          className="p-1 text-[#8C8275] hover:text-red-700 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#1E231F]">Create New Construction Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Task / Activity Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Substation Transformer Cable Pulling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Target Project</label>
                <select
                  value={projId}
                  onChange={(e) => setProjId(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  >
                    <option value="Civil">Civil</option>
                    <option value="Structural">Structural</option>
                    <option value="MEP">MEP (Mech/Elec/Plumb)</option>
                    <option value="Finishing">Finishing</option>
                    <option value="Quality">Quality & Inspection</option>
                    <option value="Safety">Safety</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Assigned Subcontractor</label>
                  <input 
                    type="text" 
                    placeholder="e.g. PowerGrid Contractors"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Initial Progress ({progress}%)</label>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  className="w-full accent-[#275232] cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E5E2DA]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#F7F5F0] text-[#4A524A] hover:text-[#1E231F] rounded-xl text-xs font-bold border border-[#E5E2DA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
