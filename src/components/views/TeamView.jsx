import React from 'react';
import { Users, UserCheck, ShieldCheck, Phone, Mail, CheckCircle2, AlertTriangle, Building2, HardHat } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TeamView() {
  const { team, selectedProject } = useApp();

  const currentProjectName = selectedProject?.name || 'Active Project';
  const projectTeam = (team || []).filter(
    (m) => m.projectId === selectedProject?.id || m.project === currentProjectName
  );

  // Fallback list if project has no assigned team members yet
  const displayTeam = projectTeam.length > 0 ? projectTeam : [
    {
      id: `t_default_1`,
      name: selectedProject?.manager || 'Project Manager',
      role: 'Project Operations Lead',
      project: currentProjectName,
      tasksAssigned: 5,
      status: 'On Site',
      performance: '95%',
      phone: '+91 98765 43210',
      email: `${(selectedProject?.manager || 'manager').toLowerCase().replace(/\s+/g, '.')}@constructiq.io`,
      projectId: selectedProject?.id
    },
    {
      id: `t_default_2`,
      name: 'Vikram Patel',
      role: 'Senior Site Engineer',
      project: currentProjectName,
      tasksAssigned: 4,
      status: 'On Site',
      performance: '92%',
      phone: '+91 98765 43211',
      email: 'vikram.patel@constructiq.io',
      projectId: selectedProject?.id
    }
  ];

  const siteEngineer = displayTeam.find(m => m.role.toLowerCase().includes('engineer')) || displayTeam[1] || displayTeam[0];
  const activeVendorsCount = new Set(displayTeam.map(m => m.role)).size;
  const understaffedCount = displayTeam.filter(m => m.status === 'Understaffed').length;
  const efficiencyScore = selectedProject?.riskLevel === 'HIGH' ? '78%' : selectedProject?.riskLevel === 'MEDIUM' ? '88%' : '96%';

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Team & Contractor Coordination</h1>
          <p className="text-xs text-[#6E726E] mt-1">Track site engineers, trade contractors, workforce availability and team performance for <span className="font-semibold text-[#275232]">{currentProjectName}</span>.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#E5EFE2] border border-[#C6DCBF] text-[#275232] text-xs font-bold flex items-center gap-2">
            <HardHat className="w-4 h-4" />
            <span>Site Workforce: {displayTeam.length * 15} Personnel Active</span>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
          <span className="text-xs font-semibold text-[#8C8275] uppercase tracking-wider block">Project Manager</span>
          <div className="text-base font-bold text-[#1E231F] mt-1">{selectedProject?.manager || 'Rohan Mehta'}</div>
          <div className="text-[11px] text-[#275232] font-semibold mt-0.5 truncate">{currentProjectName}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
          <span className="text-xs font-semibold text-[#8C8275] uppercase tracking-wider block">Site Engineer Lead</span>
          <div className="text-base font-bold text-[#1E231F] mt-1">{siteEngineer.name}</div>
          <div className="text-[11px] text-[#275232] font-semibold mt-0.5">On Site ({selectedProject?.location?.split(',')[0] || 'Site'})</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
          <span className="text-xs font-semibold text-[#8C8275] uppercase tracking-wider block">Trade Contractors</span>
          <div className="text-base font-bold text-[#1E231F] mt-1">{activeVendorsCount} Active Trades</div>
          <div className={`text-[11px] font-semibold mt-0.5 ${understaffedCount > 0 ? 'text-[#92400E]' : 'text-[#275232]'}`}>
            {understaffedCount > 0 ? `${understaffedCount} Understaffed Trade` : 'All Trades Fully Staffed'}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
          <span className="text-xs font-semibold text-[#8C8275] uppercase tracking-wider block">Overall Coordination Score</span>
          <div className="text-base font-bold text-[#275232] mt-1">{efficiencyScore} Efficiency</div>
          <div className="text-[11px] text-[#6E726E] mt-0.5">{selectedProject?.riskLevel === 'HIGH' ? '3 Priority Actions' : 'Normal Operations'}</div>
        </div>
      </div>

      {/* Team Table */}
      <div className="rounded-2xl bg-white border border-[#E5E2DA] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E5E2DA] bg-[#F7F5F0] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1E231F]">Project Roster & Subcontractors — {currentProjectName}</h3>
          <span className="text-xs text-[#6E726E] font-medium">{displayTeam.length} Members Listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F0] text-[#6E726E] font-bold uppercase tracking-wider border-b border-[#E5E2DA]">
              <tr>
                <th className="p-4">Name / Subcontractor</th>
                <th className="p-4">Role</th>
                <th className="p-4">Assigned Project</th>
                <th className="p-4">Tasks Assigned</th>
                <th className="p-4">Attendance / Status</th>
                <th className="p-4">Performance Rating</th>
                <th className="p-4 text-right">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DA] text-[#1E231F]">
              {displayTeam.map((member) => (
                <tr key={member.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                  <td className="p-4 font-bold text-[#1E231F] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E5EFE2] border border-[#C6DCBF] text-[#275232] font-bold flex items-center justify-center shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[#1E231F] font-bold">{member.name}</div>
                      <div className="text-[10px] text-[#6E726E]">{member.email}</div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-[#4A524A]">{member.role}</td>
                  <td className="p-4 text-[#6E726E] font-medium">{member.project || currentProjectName}</td>
                  <td className="p-4 font-bold text-[#1E231F]">{member.tasksAssigned} Active Tasks</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                      member.status === 'Understaffed' 
                        ? 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]' 
                        : member.status === 'On Site'
                        ? 'bg-[#E5EFE2] text-[#275232] border-[#C6DCBF]'
                        : 'bg-[#F7F5F0] text-[#1E231F] border-[#E5E2DA]'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-[#275232]">{member.performance}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-[#6E726E]">
                      <a href={`tel:${member.phone}`} className="p-1.5 rounded-lg bg-[#F7F5F0] hover:bg-[#E5E2DA] text-[#1E231F] transition-colors border border-[#E5E2DA]" title="Call">
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a href={`mailto:${member.email}`} className="p-1.5 rounded-lg bg-[#F7F5F0] hover:bg-[#E5E2DA] text-[#1E231F] transition-colors border border-[#E5E2DA]" title="Email">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
