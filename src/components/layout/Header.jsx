import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Building2, Plus, LogOut, User, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { projects, selectedProjectId, setSelectedProjectId, setIsCommandPaletteOpen, lowStockCount, openIssuesCount, setActiveTab } = useApp();
  const { currentUser, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // User initials avatar
  const initials = currentUser?.name
    ? currentUser.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <header className="h-16 bg-[#F7F5F0] border-b border-[#E5E2DA] sticky top-0 z-20 px-8 flex items-center justify-between ml-64">
      {/* Left: Project Selector Dropdown */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E5E2DA] text-xs shadow-sm">
          <Building2 className="w-4 h-4 text-[#275232]" />
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-transparent text-xs font-medium text-[#1E231F] cursor-pointer focus:outline-none pr-1 max-w-[260px]"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id} className="bg-white text-[#1E231F]">
                {p.name} — {p.client}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Site Online Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EFE2] text-[#275232] text-xs font-medium border border-[#C6DCBF]">
          <span className="w-2 h-2 rounded-full bg-[#275232] animate-pulse" />
          <span>Live</span>
        </div>

        {/* Global Search */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="p-2 text-[#4A524A] hover:text-[#1E231F] hover:bg-[#E5E2DA]/50 rounded-lg transition-colors"
          title="Search (Ctrl+K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setActiveTab('materials')}
          className="p-2 text-[#4A524A] hover:text-[#1E231F] hover:bg-[#E5E2DA]/50 rounded-lg relative transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {(lowStockCount > 0 || openIssuesCount > 0) && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white font-bold text-[9px] rounded-full flex items-center justify-center">
              {lowStockCount + openIssuesCount}
            </span>
          )}
        </button>

        {/* Quick Import */}
        <button
          onClick={() => setActiveTab('import')}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Quick update</span>
        </button>

        {/* User Avatar & Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setUserMenuOpen(o => !o)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-white border border-[#E5E2DA] hover:bg-[#F7F5F0] transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-[#275232] flex items-center justify-center text-white text-[11px] font-extrabold">
              {initials}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-[#1E231F] leading-tight max-w-[100px] truncate">{currentUser?.name || 'User'}</p>
              <p className="text-[9px] text-[#6E726E] leading-tight capitalize">{currentUser?.role?.replace('_', ' ') || 'Member'}</p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[#6E726E] transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {userMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-[#E5E2DA] rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E5E2DA] bg-[#F7F5F0]">
                <p className="text-xs font-bold text-[#1E231F] truncate">{currentUser?.name}</p>
                <p className="text-[10px] text-[#6E726E] truncate">{currentUser?.email}</p>
              </div>
              <button
                onClick={() => setActiveTab('settings')}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-[#1E231F] hover:bg-[#F7F5F0] transition-colors"
              >
                <User className="w-4 h-4 text-[#6E726E]" />
                Account Settings
              </button>
              <div className="border-t border-[#E5E2DA]" />
              <button
                onClick={() => { setUserMenuOpen(false); logout(); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
