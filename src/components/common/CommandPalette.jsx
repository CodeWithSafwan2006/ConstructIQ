import React, { useState, useEffect } from 'react';
import { Search, Building2, CheckSquare, Boxes, AlertOctagon, FileText, ArrowRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, projects, tasks, materials, issues, documents, setActiveTab, setSelectedProjectId } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredProjects = q ? projects.filter(p => p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)) : projects.slice(0, 3);
  const filteredTasks = q ? tasks.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.assignedTo.toLowerCase().includes(q)).slice(0, 4) : [];
  const filteredMaterials = q ? materials.filter(m => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)).slice(0, 3) : [];
  const filteredIssues = q ? issues.filter(i => i.title.toLowerCase().includes(q) || i.assignedTo.toLowerCase().includes(q)).slice(0, 3) : [];
  const filteredDocs = q ? documents.filter(d => d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)).slice(0, 3) : [];

  const handleSelect = (tab, projectId = null) => {
    if (projectId) setSelectedProjectId(projectId);
    setActiveTab(tab);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white border border-[#E5E2DA] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E5E2DA] flex items-center gap-3 bg-[#F7F5F0]">
          <Search className="w-5 h-5 text-[#275232] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Global Search (Ctrl+K): Type a project, task, material, issue or document..."
            className="w-full bg-transparent text-sm font-semibold text-[#1E231F] placeholder-[#8C8275] focus:outline-none"
          />
          <button 
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-[#6E726E] hover:text-[#1E231F] hover:bg-[#E5E2DA]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Quick Page Jumps */}
          {!q && (
            <div>
              <div className="text-[10px] font-bold text-[#8C8275] uppercase tracking-wider mb-2">Quick Platform Shortcuts</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Dashboard', tab: 'dashboard' },
                  { label: 'Projects', tab: 'projects' },
                  { label: 'Tasks', tab: 'tasks' },
                  { label: 'Materials', tab: 'materials' },
                  { label: 'Expenses', tab: 'expenses' },
                  { label: 'Issues & Risk', tab: 'issues' },
                  { label: 'Import CSV', tab: 'import' },
                  { label: 'AI Assistant', tab: 'ai-assistant' }
                ].map(item => (
                  <button
                    key={item.tab}
                    onClick={() => handleSelect(item.tab)}
                    className="p-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#E5EFE2] border border-[#E5E2DA] text-left font-bold text-[#1E231F] hover:text-[#275232] flex items-center justify-between transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3 h-3 text-[#8C8275]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects Results */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-[#275232] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Projects ({filteredProjects.length})</span>
              </div>
              <div className="space-y-1">
                {filteredProjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect('projects', p.id)}
                    className="w-full p-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#E5E2DA]/60 border border-[#E5E2DA] flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#1E231F]">{p.name}</div>
                      <div className="text-[10px] text-[#6E726E]">{p.client} • {p.location}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.riskLevel === 'HIGH' ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#E5EFE2] text-[#275232]'
                    }`}>
                      {p.progress}% Complete
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tasks Results */}
          {filteredTasks.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-[#275232] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Tasks ({filteredTasks.length})</span>
              </div>
              <div className="space-y-1">
                {filteredTasks.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect('tasks')}
                    className="w-full p-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#E5E2DA]/60 border border-[#E5E2DA] flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#1E231F]">{t.name}</div>
                      <div className="text-[10px] text-[#6E726E]">{t.projectName} • Assigned: {t.assignedTo}</div>
                    </div>
                    <span className="text-[10px] font-bold text-[#1E231F] bg-white border border-[#E5E2DA] px-2 py-0.5 rounded">
                      {t.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Materials Results */}
          {filteredMaterials.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-[#92400E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5" />
                <span>Materials ({filteredMaterials.length})</span>
              </div>
              <div className="space-y-1">
                {filteredMaterials.map(m => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect('materials')}
                    className="w-full p-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#E5E2DA]/60 border border-[#E5E2DA] flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#1E231F]">{m.name}</div>
                      <div className="text-[10px] text-[#6E726E]">Supplier: {m.supplier}</div>
                    </div>
                    <span className={`font-bold ${m.available < m.minLevel ? 'text-[#991B1B]' : 'text-[#275232]'}`}>
                      {m.available} {m.unit}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Issues Results */}
          {filteredIssues.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-[#991B1B] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>Issues ({filteredIssues.length})</span>
              </div>
              <div className="space-y-1">
                {filteredIssues.map(i => (
                  <button
                    key={i.id}
                    onClick={() => handleSelect('issues')}
                    className="w-full p-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#E5E2DA]/60 border border-[#E5E2DA] flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#1E231F]">{i.title}</div>
                      <div className="text-[10px] text-[#6E726E]">{i.projectName} • {i.assignedTo}</div>
                    </div>
                    <span className="text-[10px] font-bold text-[#991B1B] bg-[#FEE2E2] px-2 py-0.5 rounded border border-[#FCA5A5]">
                      {i.priority} Priority
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documents Results */}
          {filteredDocs.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-[#275232] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Documents ({filteredDocs.length})</span>
              </div>
              <div className="space-y-1">
                {filteredDocs.map(d => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect('documents')}
                    className="w-full p-2.5 rounded-xl bg-[#F7F5F0] hover:bg-[#E5E2DA]/60 border border-[#E5E2DA] flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#1E231F]">{d.title}</div>
                      <div className="text-[10px] text-[#6E726E]">{d.category} • Uploaded by {d.uploadedBy}</div>
                    </div>
                    <span className="text-[10px] font-bold text-[#275232] bg-[#E5EFE2] px-2 py-0.5 rounded border border-[#C6DCBF]">
                      {d.format}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && filteredProjects.length === 0 && filteredTasks.length === 0 && filteredMaterials.length === 0 && filteredIssues.length === 0 && filteredDocs.length === 0 && (
            <div className="p-8 text-center text-[#6E726E] text-xs font-medium">
              No matching records found for "{query}". Try searching for "Steel", "Electrical", "Ahmedabad", or "BOQ".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F5F0] border-t border-[#E5E2DA] flex items-center justify-between text-[11px] text-[#6E726E] font-medium">
          <span>Navigate with <kbd className="px-1.5 py-0.5 bg-white border border-[#E5E2DA] rounded text-[#1E231F]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-[#E5E2DA] rounded text-[#1E231F]">↓</kbd></span>
          <span>Close with <kbd className="px-1.5 py-0.5 bg-white border border-[#E5E2DA] rounded text-[#1E231F]">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}
