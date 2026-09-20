import React, { useState } from 'react';
import { Building2, Search, Plus, MapPin, DollarSign, Layers, ArrowRight, Calendar, User, CheckCircle2, Trash2 } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import ProgressBar from '../common/ProgressBar';
import ProjectDetailModal from './ProjectDetailModal';
import { useApp } from '../../context/AppContext';

export default function ProjectsView({ projects, tasks, materials, expenses, issues }) {
  const { addProject, deleteProject, setSelectedProjectId } = useApp();
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for New Project
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [targetDate, setTargetDate] = useState('2027-12-31');
  const [category, setCategory] = useState('Residential High-Rise');
  const [manager, setManager] = useState('Rohan Mehta');

  const filteredProjects = projects.filter(p => {
    const matchesRisk = filterRisk === 'ALL' || p.riskLevel === filterRisk;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const budgetNum = Number(budget) ? Number(budget) * 10000000 : 100000000;

    addProject({
      name,
      client: client || "Private Developer",
      location: location || "Gujarat, India",
      budget: budgetNum,
      spent: 0,
      predictedFinalCost: budgetNum,
      forecastOverrun: 0,
      progress: 0,
      plannedProgress: 5,
      status: "On Track",
      riskLevel: "LOW",
      riskScore: 10,
      targetDate: targetDate || "2027-12-31",
      category,
      manager
    });

    setName('');
    setClient('');
    setLocation('');
    setBudget('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Active Construction Projects</h1>
          <p className="text-xs text-[#6E726E]">Centralized operational and financial control across all active site developments.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8C8275] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search projects by name, client, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1E231F] placeholder-[#8C8275] focus:outline-none focus:border-[#275232]"
          />
        </div>

        <div className="flex items-center p-1 bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl text-xs font-semibold">
          <span className="text-[10px] text-[#8C8275] uppercase px-2">Risk:</span>
          {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map(risk => (
            <button
              key={risk}
              onClick={() => setFilterRisk(risk)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterRisk === risk 
                  ? 'bg-[#275232] text-white' 
                  : 'text-[#6E726E] hover:text-[#1E231F]'
              }`}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((p) => (
          <div 
            key={p.id}
            className="p-6 rounded-2xl bg-white border border-[#E5E2DA] hover:border-[#C6DCBF] transition-all duration-200 shadow-xs flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#275232] px-2.5 py-0.5 rounded-full bg-[#E5EFE2] border border-[#C6DCBF]">
                    {p.category}
                  </span>
                  <h3 
                    onClick={() => { setSelectedProjectId(p.id); setSelectedProject(p); }}
                    className="text-lg font-bold text-[#1E231F] group-hover:text-[#275232] transition-colors mt-1.5 cursor-pointer"
                  >
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#6E726E] mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8C8275]" />
                    <span>{p.location} • Client: {p.client}</span>
                  </div>
                </div>
                <RiskBadge level={p.riskLevel} text={p.status} />
              </div>

              <div className="grid grid-cols-3 gap-3 my-4 p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] text-xs">
                <div>
                  <span className="text-[10px] text-[#6E726E] font-medium">Budget</span>
                  <div className="font-bold text-[#1E231F] mt-0.5">₹{(p.budget / 10000000).toFixed(1)} Cr</div>
                </div>
                <div>
                  <span className="text-[10px] text-[#6E726E] font-medium">Spent</span>
                  <div className="font-bold text-[#92400E] mt-0.5">₹{(p.spent / 10000000).toFixed(1)} Cr</div>
                </div>
                <div>
                  <span className="text-[10px] text-[#6E726E] font-medium">Target Date</span>
                  <div className="font-bold text-[#1E231F] mt-0.5">{p.targetDate || '2027-12-31'}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <ProgressBar progress={p.progress} status={p.status} height="h-2.5" />
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E5E2DA] flex items-center justify-between text-xs text-[#6E726E]">
              <span>Manager: <strong className="text-[#1E231F]">{p.manager}</strong></span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setSelectedProjectId(p.id); setSelectedProject(p); }}
                  className="text-[#275232] font-bold hover:underline flex items-center gap-1"
                >
                  View Details &rarr;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          tasks={tasks}
          materials={materials}
          expenses={expenses}
          issues={issues}
        />
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#1E231F]">Create New Construction Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Project Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Surat Smart Logistics Park"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Client Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. LogiCorp India"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Location / City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Surat, Gujarat"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Budget (in ₹ Crores)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    placeholder="e.g. 15.5"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Target Completion Date</label>
                  <input 
                    type="date" 
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  >
                    <option value="Residential High-Rise">Residential High-Rise</option>
                    <option value="Commercial Complex">Commercial Complex</option>
                    <option value="Industrial Warehousing">Industrial Warehousing</option>
                    <option value="Infrastructure Highway">Infrastructure Highway</option>
                    <option value="Retail Shopping Mall">Retail Shopping Mall</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Assigned Manager</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rohan Mehta"
                    value={manager}
                    onChange={(e) => setManager(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
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
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
