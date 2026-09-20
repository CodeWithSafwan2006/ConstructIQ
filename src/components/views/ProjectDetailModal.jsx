import React, { useState } from 'react';
import { X, Building2, Layers, Boxes, TrendingUp, AlertOctagon, CheckCircle2, Clock } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import ProgressBar from '../common/ProgressBar';

export default function ProjectDetailModal({ project, onClose, tasks, materials, expenses, issues }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) return null;

  const projectTasks = tasks.filter(t => t.projectId === project.id || t.projectName === project.name);
  const projectIssues = issues.filter(i => i.projectName === project.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-4xl bg-white border border-[#E5E2DA] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#1E231F]">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E2DA] bg-[#F7F5F0] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#275232] bg-[#E5EFE2] px-2.5 py-0.5 rounded-full border border-[#C6DCBF]">
                {project.category}
              </span>
              <RiskBadge level={project.riskLevel} text={project.status} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#1E231F] mt-1.5">{project.name}</h2>
            <p className="text-xs text-[#6E726E]">{project.client} • {project.location}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#6E726E] hover:text-[#1E231F] rounded-xl bg-white border border-[#E5E2DA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E5E2DA] bg-[#F7F5F0]/60 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: Building2 },
            { id: 'tasks', label: `Tasks (${projectTasks.length})`, icon: Layers },
            { id: 'materials', label: 'Materials', icon: Boxes },
            { id: 'expenses', label: 'Expenses', icon: TrendingUp },
            { id: 'issues', label: `Issues (${projectIssues.length})`, icon: AlertOctagon }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
                  isActive 
                    ? 'border-[#275232] text-[#275232] bg-[#D9E8D6]/40' 
                    : 'border-transparent text-[#6E726E] hover:text-[#1E231F]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
                  <span className="text-xs text-[#6E726E] font-medium">Total Budget</span>
                  <div className="text-lg font-bold text-[#1E231F] mt-1">₹{(project.budget / 10000000).toFixed(1)} Cr</div>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
                  <span className="text-xs text-[#6E726E] font-medium">Spent to Date</span>
                  <div className="text-lg font-bold text-[#92400E] mt-1">₹{(project.spent / 10000000).toFixed(1)} Cr</div>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
                  <span className="text-xs text-[#6E726E] font-medium">Predicted Final</span>
                  <div className="text-lg font-bold text-[#991B1B] mt-1">₹{(project.predictedFinalCost / 10000000).toFixed(1)} Cr</div>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
                  <span className="text-xs text-[#6E726E] font-medium">Progress</span>
                  <div className="text-lg font-bold text-[#275232] mt-1">{project.progress}%</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E726E] mb-2">Project Progress</h4>
                <ProgressBar progress={project.progress} status={project.status} height="h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] space-y-2 text-xs">
                  <h5 className="font-bold text-[#1E231F] border-b border-[#E5E2DA] pb-2">Operational Details</h5>
                  <div className="flex justify-between"><span className="text-[#6E726E]">Project Manager:</span> <span className="text-[#1E231F] font-medium">{project.manager}</span></div>
                  <div className="flex justify-between"><span className="text-[#6E726E]">Site Engineer:</span> <span className="text-[#1E231F] font-medium">{project.siteEngineer}</span></div>
                  <div className="flex justify-between"><span className="text-[#6E726E]">Start Date:</span> <span className="text-[#1E231F] font-medium">{project.startDate}</span></div>
                  <div className="flex justify-between"><span className="text-[#6E726E]">Target Date:</span> <span className="text-[#1E231F] font-medium">{project.targetDate}</span></div>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] space-y-2 text-xs">
                  <h5 className="font-bold text-[#1E231F] border-b border-[#E5E2DA] pb-2">Current Risk Drivers</h5>
                  <ul className="space-y-1.5 text-[#4A524A]">
                    <li className="flex items-center gap-2 text-red-700"><span className="w-1.5 h-1.5 rounded-full bg-red-700" /> Electrical installation activity behind schedule</li>
                    <li className="flex items-center gap-2 text-amber-700"><span className="w-1.5 h-1.5 rounded-full bg-amber-700" /> Steel TMT bar inventory below minimum threshold</li>
                    <li className="flex items-center gap-2 text-amber-700"><span className="w-1.5 h-1.5 rounded-full bg-amber-700" /> Material budget variance (+5% cost inflation)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-3">
              {projectTasks.map(t => (
                <div key={t.id} className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1E231F]">{t.name}</span>
                      <RiskBadge level={t.status} size="sm" />
                    </div>
                    <div className="text-[11px] text-[#6E726E] mt-1">Assigned: {t.assignedTo} • Due: {t.dueDate}</div>
                  </div>
                  <div className="w-32 text-right">
                    <div className="text-xs font-bold text-[#1E231F] mb-1">{t.progress}%</div>
                    <ProgressBar progress={t.progress} status={t.status} showLabel={false} height="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-3">
              {materials.map(m => (
                <div key={m.id} className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1E231F]">{m.name}</span>
                      <RiskBadge level={m.status} size="sm" />
                    </div>
                    <div className="text-[11px] text-[#6E726E] mt-1">Category: {m.category} • Supplier: {m.supplier}</div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="font-bold text-[#1E231F]">{m.available} {m.unit}</div>
                    <div className="text-[10px] text-[#6E726E]">Min: {m.minLevel} {m.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-3">
              {expenses.map((e, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1E231F]">{e.category}</span>
                    <div className="text-[11px] text-[#6E726E] mt-1">Planned: ₹{(e.planned / 10000000).toFixed(1)} Cr</div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="font-bold text-[#92400E]">Actual: ₹{(e.actual / 10000000).toFixed(1)} Cr</div>
                    <div className={`text-[10px] font-bold ${e.variance > 0 ? 'text-red-700' : 'text-[#275232]'}`}>
                      {e.variance > 0 ? `+₹${(e.variance / 100000).toFixed(0)} Lakh Overrun` : `-₹${(Math.abs(e.variance) / 100000).toFixed(0)} Lakh Saved`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'issues' && (
            <div className="space-y-3">
              {projectIssues.map(i => (
                <div key={i.id} className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1E231F]">{i.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${i.priority === 'High' ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#FEF3C7] text-[#92400E]'}`}>
                        {i.priority} Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6E726E] mt-1">{i.description}</p>
                  </div>
                  <RiskBadge level={i.status} size="sm" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
