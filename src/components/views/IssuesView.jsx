import React, { useState } from 'react';
import { AlertOctagon, Plus, Search, CheckCircle2, User, Calendar, AlertTriangle, Bot, CheckSquare } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

import { useApp } from '../../context/AppContext';

export default function IssuesView({ issues, onAddIssue, onResolveIssue }) {
  const { selectedProject, selectedProjectId, setActiveTab } = useApp();
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [assignedTo, setAssignedTo] = useState('');
  const [desc, setDesc] = useState('');

  const activeProjectIssues = issues.filter(i => 
    i.projectId === selectedProjectId || (selectedProject && i.projectName === selectedProject.name)
  );

  const filteredIssues = activeProjectIssues.filter(i => {
    const matchesPrio = filterPriority === 'ALL' || i.priority === filterPriority;
    const matchesStat = filterStatus === 'ALL' || i.status === filterStatus;
    const matchesSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          i.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPrio && matchesStat && matchesSearch;
  });

  const handleCreateIssue = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddIssue({
      id: `iss_${Date.now()}`,
      title,
      projectId: selectedProjectId,
      projectName: selectedProject?.name || "Construction Site",
      priority,
      assignedTo: assignedTo || "Site Lead",
      status: "Open",
      createdAt: new Date().toISOString().split('T')[0],
      description: desc || "Reported site bottleneck requiring management review."
    });

    setTitle('');
    setAssignedTo('');
    setDesc('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Site Issues & Risk Tracking</h1>
          <p className="text-xs text-[#6E726E]">Log bottlenecks, material delays, subcontractor delays, and safety audits.</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className="flex items-center gap-2 px-3.5 py-2 bg-[#E5EFE2] hover:bg-[#D9E8D6] text-[#275232] border border-[#C6DCBF] font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Risk Intelligence</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#F7F5F0] text-[#1E231F] border border-[#E5E2DA] font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            <CheckSquare className="w-3.5 h-3.5 text-[#8C8275]" />
            <span>Task Schedule</span>
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Report New Issue</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8C8275] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search issues or assignees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1E231F] placeholder-[#8C8275] focus:outline-none focus:border-[#275232]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <div className="flex items-center p-1 bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl text-xs font-semibold">
            <span className="text-[10px] text-[#8C8275] uppercase px-2">Priority:</span>
            {['ALL', 'High', 'Medium', 'Low'].map(p => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${filterPriority === p ? 'bg-[#275232] text-white' : 'text-[#6E726E] hover:text-[#1E231F]'}`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center p-1 bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl text-xs font-semibold">
            <span className="text-[10px] text-[#8C8275] uppercase px-2">Status:</span>
            {['ALL', 'Open', 'In Progress', 'Resolved'].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${filterStatus === s ? 'bg-[#275232] text-white' : 'text-[#6E726E] hover:text-[#1E231F]'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="rounded-2xl bg-white border border-[#E5E2DA] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F0] text-[#6E726E] font-bold uppercase tracking-wider border-b border-[#E5E2DA]">
              <tr>
                <th className="p-4">Issue Title</th>
                <th className="p-4">Project</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4">Reported Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DA] text-[#1E231F]">
              {filteredIssues.map((i) => (
                <tr key={i.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                  <td className="p-4 font-bold text-[#1E231F]">
                    <div>
                      <div className="text-sm text-[#1E231F] font-bold">{i.title}</div>
                      <p className="text-[11px] text-[#6E726E] font-normal mt-0.5">{i.description}</p>
                    </div>
                  </td>
                  <td className="p-4 text-[#4A524A] font-medium whitespace-nowrap">{i.projectName}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      i.priority === 'High' ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]' : 'bg-[#FEF3C7] text-[#92400E]'
                    }`}>
                      {i.priority}
                    </span>
                  </td>
                  <td className="p-4 text-[#4A524A] font-medium">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#275232]" />
                      <span>{i.assignedTo}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#6E726E] whitespace-nowrap">{i.createdAt}</td>
                  <td className="p-4">
                    <RiskBadge level={i.status} size="sm" />
                  </td>
                  <td className="p-4 text-right">
                    {i.status !== 'Resolved' && (
                      <button
                        onClick={() => onResolveIssue(i.id)}
                        className="px-3 py-1 bg-[#DCFCE7] hover:bg-[#BBF7D0] text-[#166534] font-bold rounded-lg text-[11px] border border-[#BBF7D0] transition-colors shadow-xs"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Issue Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#1E231F]">Log Site Operational Issue</h3>
            <form onSubmit={handleCreateIssue} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Issue Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Concrete Vibrator Machine Malfunction"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Priority Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Assigned Person / Role</label>
                <input 
                  type="text"
                  placeholder="e.g. Equipment Engineer"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Detailed Description</label>
                <textarea 
                  rows={3}
                  placeholder="Describe impact on schedule, materials, or workforce..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#F7F5F0] text-[#4A524A] hover:text-[#1E231F] rounded-xl text-xs font-bold border border-[#E5E2DA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Submit Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
