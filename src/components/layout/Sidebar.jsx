import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  CheckSquare, 
  Boxes, 
  TrendingUp, 
  AlertOctagon, 
  BarChart3, 
  Bot, 
  FileText, 
  FolderCheck,
  UserCheck,
  HardHat,
  Users,
  UploadCloud,
  Settings,
  Globe,
  LogIn
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar({ activeTab, setActiveTab, activeRole, setActiveRole, lowStockCount, openIssuesCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Building2 },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: '4 Delayed', badgeColor: 'bg-[#FEE2E2] text-[#991B1B]' },
    { id: 'materials', label: 'Materials', icon: Boxes, badge: lowStockCount > 0 ? `${lowStockCount} Low` : null, badgeColor: 'bg-[#FEF3C7] text-[#92400E]' },
    { id: 'expenses', label: 'Expenses', icon: TrendingUp },
    { id: 'issues', label: 'Issues & Risks', icon: AlertOctagon, badge: openIssuesCount > 0 ? `${openIssuesCount}` : null, badgeColor: 'bg-[#FEE2E2] text-[#991B1B]' },
    { id: 'team', label: 'Team & Contractors', icon: Users },
    { id: 'documents', label: 'Documents & BOQ', icon: FolderCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'import', label: 'Import CSV Data', icon: UploadCloud, highlight: true },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, highlight: true },
    { id: 'reports', label: 'Weekly Report', icon: FileText }
  ];

  const roles = [
    { id: 'pm', name: 'Project Manager (Rohan Mehta)' },
    { id: 'admin', name: 'Platform Administrator' },
    { id: 'site_eng', name: 'Site Engineer (Vikram Patel)' },
    { id: 'management', name: 'Executive Management' }
  ];

  const getRoleDisplayName = () => {
    if (activeRole === 'pm') return 'Rohan Mehta';
    if (activeRole === 'admin') return 'System Administrator';
    if (activeRole === 'site_eng') return 'Vikram Patel';
    return 'Executive Mgmt';
  };

  const getRoleTitle = () => {
    if (activeRole === 'pm') return 'Project Manager';
    if (activeRole === 'admin') return 'Admin';
    if (activeRole === 'site_eng') return 'Site Engineer';
    return 'Executive';
  };

  return (
    <aside className="w-64 bg-[#EFECE6] border-r border-[#E5E2DA] flex flex-col h-screen fixed left-0 top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E5E2DA]">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="p-2.5 bg-[#275232] text-white rounded-lg shadow-xs">
            <HardHat className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#1E231F] flex items-center gap-1.5">
              ConstructIQ
            </h1>
            <p className="text-[10px] text-[#8C8275] font-semibold tracking-widest uppercase">SITE INTELLIGENCE</p>
          </div>
        </div>
      </div>

      {/* Role Switcher Banner */}
      <div className="px-4 py-2 bg-[#E7E3DC] border-b border-[#E5E2DA] flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[#1E231F] w-full">
          <UserCheck className="w-3.5 h-3.5 text-[#275232] shrink-0" />
          <span className="text-[#8C8275] font-medium text-[11px]">Role:</span>
          <select 
            value={activeRole} 
            onChange={(e) => setActiveRole(e.target.value)}
            className="flex-1 bg-white text-[11px] font-semibold text-[#1E231F] px-2 py-1 rounded border border-[#E5E2DA] cursor-pointer focus:outline-none focus:border-[#275232] truncate"
          >
            {roles.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C8275] uppercase tracking-wider">
          WORKSPACE
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors duration-150 group ${
                isActive 
                  ? 'bg-[#D9E8D6] text-[#275232] shadow-xs' 
                  : item.highlight 
                  ? 'bg-[#E5EFE2] text-[#275232] hover:bg-[#D9E8D6]/70 border border-[#C6DCBF]'
                  : 'text-[#4A524A] hover:text-[#1E231F] hover:bg-[#E5E2DA]/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#275232]' : 'text-[#8C8275] group-hover:text-[#1E231F]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-[#E5E2DA] text-[#4A524A]'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-3 px-3 py-1.5 text-[10px] font-bold text-[#8C8275] uppercase tracking-wider">
          PLATFORM & SYSTEM
        </div>
        
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'settings' ? 'bg-[#D9E8D6] text-[#275232]' : 'text-[#4A524A] hover:text-[#1E231F] hover:bg-[#E5E2DA]/60'
          }`}
        >
          <Settings className="w-4 h-4 text-[#8C8275]" />
          <span>Platform Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('landing')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#4A524A] hover:text-[#1E231F] hover:bg-[#E5E2DA]/60 transition-colors"
        >
          <Globe className="w-4 h-4 text-[#8C8275]" />
          <span>Public Portal</span>
        </button>

        <button
          onClick={() => setActiveTab('login')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#4A524A] hover:text-[#1E231F] hover:bg-[#E5E2DA]/60 transition-colors"
        >
          <LogIn className="w-4 h-4 text-[#8C8275]" />
          <span>Sign In / Switch Role</span>
        </button>
      </nav>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-[#E5E2DA] bg-[#EAE6DF]">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-[#E5E2DA] shadow-xs">
          <div className="w-8 h-8 rounded-full bg-[#E5E2DA] text-[#4A524A] font-bold flex items-center justify-center text-xs shrink-0">
            RM
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#1E231F] truncate">{getRoleDisplayName()}</div>
            <div className="text-[10px] text-[#8C8275] truncate">{getRoleTitle()} • Ahmedabad</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
