import React, { useState } from 'react';
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
  LogIn,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ activeTab, setActiveTab, activeRole, setActiveRole, lowStockCount, openIssuesCount }) {
  const { currentUser } = useAuth();
  const { delayedTasksCount: appDelayedCount, lowStockCount: appLowStockCount, openIssuesCount: appOpenIssuesCount } = useApp();
  const effectiveRole = currentUser?.role || activeRole;

  const finalDelayedCount = appDelayedCount ?? 0;
  const finalLowStockCount = lowStockCount ?? appLowStockCount ?? 0;
  const finalOpenIssuesCount = openIssuesCount ?? appOpenIssuesCount ?? 0;

  const [collapsedGroups, setCollapsedGroups] = useState({
    mainWorkspace: true,
    siteOperations: true,
    teamAssets: true,
    intelligenceData: true
  });
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Building2 },
  ];

  const operationsNav = [
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: finalDelayedCount > 0 ? `${finalDelayedCount} Delayed` : null, badgeColor: 'bg-[#FEE2E2] text-[#991B1B]' },
    { id: 'materials', label: 'Materials', icon: Boxes, badge: finalLowStockCount > 0 ? `${finalLowStockCount} Low` : null, badgeColor: 'bg-[#FEF3C7] text-[#92400E]' },
    { id: 'expenses', label: 'Expenses', icon: TrendingUp },
    { id: 'issues', label: 'Issues & Risks', icon: AlertOctagon, badge: finalOpenIssuesCount > 0 ? `${finalOpenIssuesCount}` : null, badgeColor: 'bg-[#FEE2E2] text-[#991B1B]' },
  ];

  const teamNav = [
    { id: 'team', label: 'Team & Contractors', icon: Users },
    { id: 'documents', label: 'Documents & BOQ', icon: FolderCheck },
  ];

  const intelligenceNav = [
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, highlight: true, badge: 'LIVE', badgeColor: 'bg-[#275232] text-white' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Weekly Report', icon: FileText },
    { id: 'import', label: 'Import CSV Data', icon: UploadCloud },
  ];

  const roles = [
    { id: 'pm', name: 'Project Manager (Rohan Mehta)' },
    { id: 'admin', name: 'Platform Administrator' },
    { id: 'site_eng', name: 'Site Engineer (Vikram Patel)' },
    { id: 'management', name: 'Executive Management' }
  ];

  const getRoleDisplayName = () => {
    if (currentUser?.name) return currentUser.name;
    if (effectiveRole === 'pm') return 'Rohan Mehta';
    if (effectiveRole === 'admin') return 'System Administrator';
    if (effectiveRole === 'site_eng') return 'Vikram Patel';
    return 'Executive Mgmt';
  };

  const getRoleTitle = () => {
    if (effectiveRole === 'pm') return 'Project Manager';
    if (effectiveRole === 'admin') return 'System Administrator';
    if (effectiveRole === 'site_eng') return 'Site Engineer';
    return 'Executive Leadership';
  };

  const toggleGroup = (groupId) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const renderNavGroup = (groupId, title, items) => {
    const isCollapsed = Boolean(collapsedGroups[groupId]);
    const isHovered = hoveredGroup === groupId;
    const isOpen = !isCollapsed || isHovered;

    return (
      <div 
        key={groupId} 
        className="space-y-0.5 rounded-lg transition-all duration-150"
        onMouseEnter={() => setHoveredGroup(groupId)}
        onMouseLeave={() => setHoveredGroup(null)}
      >
        <button
          type="button"
          onClick={() => toggleGroup(groupId)}
          className="w-full flex items-center justify-between px-3 pt-2.5 pb-1 text-[10px] font-extrabold text-[#8C8275] uppercase tracking-wider hover:text-[#1E231F] group select-none transition-colors rounded-md hover:bg-[#E5E2DA]/40 cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <span>{title}</span>
          </div>
          <div className="flex items-center gap-1 text-[#8C8275] group-hover:text-[#1E231F]">
            {isCollapsed && !isHovered && (
              <span className="text-[9px] lowercase font-semibold text-[#8C8275] opacity-0 group-hover:opacity-100 transition-opacity">
                hover
              </span>
            )}
            {isOpen ? (
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200" />
            )}
          </div>
        </button>

        <div 
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150 group ${
                  isActive 
                    ? 'bg-[#D9E8D6] text-[#275232] shadow-xs' 
                    : item.highlight 
                    ? 'bg-[#E5EFE2] text-[#275232] hover:bg-[#D9E8D6]/70 border border-[#C6DCBF]'
                    : 'text-[#4A524A] hover:text-[#1E231F] hover:bg-[#E5E2DA]/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
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
        </div>
      </div>
    );
  };

  return (
    <aside className="w-64 bg-[#EFECE6] border-r border-[#E5E2DA] flex flex-col h-screen fixed left-0 top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#E5E2DA]">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="p-2 bg-[#275232] text-white rounded-lg shadow-xs">
            <HardHat className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#1E231F] flex items-center gap-1.5">
              ConstructIQ
            </h1>
            <p className="text-[9px] text-[#8C8275] font-semibold tracking-widest uppercase">SITE INTELLIGENCE</p>
          </div>
        </div>
      </div>

      {/* Role Status */}
      <div className="px-3.5 py-2 bg-[#E7E3DC] border-b border-[#E5E2DA]">
        <div className="flex items-center gap-1.5 text-xs text-[#1E231F]">
          <UserCheck className="w-3.5 h-3.5 text-[#275232] shrink-0" />
          <span className="text-[#8C8275] font-semibold text-[10px]">Role:</span>
          <span className="text-[10px] font-extrabold text-[#275232] bg-[#E5EFE2] px-2 py-0.5 rounded border border-[#C6DCBF] truncate">
            {getRoleTitle()}
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-2.5 space-y-1">
        {renderNavGroup("mainWorkspace", "Main Workspace", mainNav)}
        {renderNavGroup("siteOperations", "Site Operations", operationsNav)}
        {renderNavGroup("teamAssets", "Team & Assets", teamNav)}
        {renderNavGroup("intelligenceData", "Intelligence & Data", intelligenceNav)}
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
