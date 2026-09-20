import React from 'react';
import { 
  Settings, 
  UserCheck, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  FileText, 
  Search, 
  Users, 
  BarChart3, 
  Boxes, 
  TrendingUp,
  Award,
  Database,
  Sliders,
  BellRing
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SettingsView() {
  const { activeRole, setActiveRole, resetToBenchmarkData, showToast } = useApp();

  const platformCapabilities = [
    {
      domain: "Data Management & CRUD",
      feature: "Full CRUD layer for Projects, Tasks, Materials, Expenses, Issues, and Documents",
      status: "ACTIVE & PERSISTENT",
      icon: Boxes,
      color: "text-[#275232] bg-[#E5EFE2] border-[#C6DCBF]"
    },
    {
      domain: "Data Ingestion & CSV Engine",
      feature: "Auto-mapping parser for CSV/spreadsheet uploads and real-time live state ingestion",
      status: "ACTIVE & PERSISTENT",
      icon: TrendingUp,
      color: "text-[#275232] bg-[#E5EFE2] border-[#C6DCBF]"
    },
    {
      domain: "Global Data Accessibility",
      feature: "Global Search Command Palette (Ctrl+K) indexing projects, tasks, inventory & logs",
      status: "ACTIVE & PERSISTENT",
      icon: Search,
      color: "text-[#92400E] bg-[#FEF3C7] border-[#FDE68A]"
    },
    {
      domain: "Field & Contractor Coordination",
      feature: "Subcontractor allocation, workforce availability (92%), and assignment tracking",
      status: "ACTIVE & PERSISTENT",
      icon: Users,
      color: "text-[#275232] bg-[#E5EFE2] border-[#C6DCBF]"
    },
    {
      domain: "Autonomous Executive Reporting",
      feature: "1-Click automated weekly operational & financial audit reports with print/PDF export",
      status: "ACTIVE & PERSISTENT",
      icon: FileText,
      color: "text-[#275232] bg-[#E5EFE2] border-[#C6DCBF]"
    },
    {
      domain: "Milestone & Delay Tracking",
      feature: "Planned vs Actual S-curves, overdue task detection & automated low-stock warnings",
      status: "ACTIVE & PERSISTENT",
      icon: BarChart3,
      color: "text-[#991B1B] bg-[#FEE2E2] border-[#FCA5A5]"
    },
    {
      domain: "Smart Explainable Decision Engine",
      feature: "0-100 mathematical risk evaluation model + ConstructIQ AI Assistant with source citations",
      status: "ACTIVE & PERSISTENT",
      icon: Zap,
      color: "text-[#275232] bg-[#E5EFE2] border-[#C6DCBF]"
    }
  ];

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Platform Configuration & System Health</h1>
          <p className="text-xs text-[#6E726E] mt-1">Enterprise parameters, user role access management, and system integrity status.</p>
        </div>

        <button
          onClick={resetToBenchmarkData}
          className="flex items-center gap-2 px-4 py-2 bg-[#FEE2E2] hover:bg-[#FCA5A5]/40 text-[#991B1B] border border-[#FCA5A5] font-bold text-xs rounded-xl transition-all shrink-0 shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Benchmark Data</span>
        </button>
      </div>

      {/* SYSTEM CAPABILITIES STATUS */}
      <div className="p-6 rounded-2xl bg-white border border-[#C6DCBF] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#275232]" />
            <h3 className="text-base font-bold text-[#1E231F]">System Core Modules & Integrity Matrix</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#E5EFE2] text-[#275232] font-extrabold text-xs border border-[#C6DCBF]">
            All Systems Operational
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platformCapabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E231F]">{item.domain}</span>
                  <div className={`p-1.5 rounded-lg border ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-[#4A524A]">{item.feature}</p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#275232] pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role Switcher Settings Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#1E231F] flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#275232]" />
          <span>Active User Access Role</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'pm', name: 'Project Manager', desc: 'Rohan Mehta — Full site operations view' },
            { id: 'admin', name: 'System Admin', desc: 'Full workspace system control' },
            { id: 'site_eng', name: 'Site Engineer', desc: 'Vikram Patel — Field tasks & logs' },
            { id: 'management', name: 'Executive Mgmt', desc: 'High level portfolio analytics' }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => {
                setActiveRole(r.id);
                showToast(`Active role switched to ${r.name}`, 'info');
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                activeRole === r.id 
                  ? 'border-[#275232] bg-[#E5EFE2] text-[#275232] font-bold shadow-xs' 
                  : 'border-[#E5E2DA] bg-[#F7F5F0] text-[#6E726E] hover:text-[#1E231F]'
              }`}
            >
              <div className="text-xs font-bold">{r.name}</div>
              <div className="text-[10px] opacity-80 mt-1">{r.desc}</div>
              {activeRole === r.id && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#275232] text-white font-bold text-[10px]">
                  Active Selected
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Platform Metadata */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs space-y-2 text-xs text-[#6E726E]">
        <h3 className="text-sm font-bold text-[#1E231F]">About ConstructIQ Platform</h3>
        <p>ConstructIQ — Construction Data Intelligence & Real-Time Site Telemetry Platform.</p>
        <p>Version 2.4.0 • Enterprise Edition</p>
        <div className="text-[10px] text-[#8C8275] pt-2">Technology Stack: React 19 + Tailwind CSS + Recharts + Lucide Icons</div>
      </div>
    </div>
  );
}
