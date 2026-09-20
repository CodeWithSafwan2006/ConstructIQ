import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Tag,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  HardHat,
  Layers,
  ClipboardList,
  Zap,
  AlertTriangle,
  BarChart3,
  Globe,
  Phone,
  FileText,
  Plus,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

// ── Step definitions ──
const STEPS = [
  { id: 1, title: 'Site Details',       icon: Building2,    desc: 'Basic information about your site' },
  { id: 2, title: 'Location & Client',  icon: MapPin,       desc: 'Where & who' },
  { id: 3, title: 'Budget & Timeline',  icon: Calendar,     desc: 'Financial & schedule' },
  { id: 4, title: 'Team & Contacts',    icon: Users,        desc: 'Key personnel' },
  { id: 5, title: 'Initial Tasks',      icon: ClipboardList,desc: 'Kick-off work items' },
  { id: 6, title: 'Review & Launch',    icon: Zap,          desc: 'Confirm and go live' },
];

const PROJECT_TYPES = [
  'Residential Complex',
  'Commercial Infrastructure',
  'Industrial Facility',
  'Road & Highway',
  'Bridge & Flyover',
  'Hospital / Healthcare',
  'Educational Institution',
  'Retail / Shopping Centre',
  'Smart City Infrastructure',
  'Water Treatment Plant',
  'Other',
];

const RISK_LEVELS = ['LOW', 'MEDIUM', 'HIGH'];
const STATUS_OPTIONS = ['Planning', 'On Track', 'Delayed', 'On Hold'];

function FieldLabel({ children, required }) {
  return (
    <label className="block text-[11px] font-bold text-[#1E231F] uppercase tracking-wider mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E726E]" />}
      <input
        {...props}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-sm font-semibold text-[#1E231F] placeholder:text-[#B0ADA5] focus:outline-none focus:border-[#275232] focus:ring-2 focus:ring-[#275232]/10 transition-all`}
      />
    </div>
  );
}

function Select({ icon: Icon, children, ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E726E]" />}
      <select
        {...props}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-sm font-semibold text-[#1E231F] focus:outline-none focus:border-[#275232] focus:ring-2 focus:ring-[#275232]/10 transition-all appearance-none`}
      >
        {children}
      </select>
    </div>
  );
}

function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      rows={3}
      className="w-full px-4 py-3 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-sm font-semibold text-[#1E231F] placeholder:text-[#B0ADA5] focus:outline-none focus:border-[#275232] focus:ring-2 focus:ring-[#275232]/10 transition-all resize-none"
    />
  );
}

export default function AddSiteView() {
  const { currentUser, completeSiteSetup, logout } = useAuth();
  const { addProject, addTask, showToast } = useApp();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Step 1 — Site Details
  const [siteName, setSiteName]     = useState('');
  const [projectType, setProjectType] = useState('Commercial Infrastructure');
  const [description, setDescription] = useState('');
  const [status, setStatus]         = useState('Planning');
  const [riskLevel, setRiskLevel]   = useState('LOW');

  // Step 2 — Location & Client
  const [location, setLocation]     = useState('');
  const [city, setCity]             = useState('');
  const [state, setState]           = useState('Gujarat');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  // Step 3 — Budget & Timeline
  const [budget, setBudget]         = useState('');
  const [startDate, setStartDate]   = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [contractType, setContractType] = useState('Fixed Price');

  // Step 4 — Team
  const [manager, setManager]       = useState(currentUser?.name || '');
  const [pmEmail, setPmEmail]       = useState('');
  const [siteEngineer, setSiteEngineer] = useState('');
  const [seEmail, setSeEmail]       = useState('');
  const [emEmail, setEmEmail]       = useState('');
  const [contractor, setContractor] = useState('');
  const [teamSize, setTeamSize]     = useState('');

  // Step 5 — Initial Tasks
  const [tasks, setTasks] = useState([
    { name: '', assignedTo: '', dueDate: '', priority: 'Medium' },
  ]);

  const addTaskRow = () => setTasks(prev => [...prev, { name: '', assignedTo: '', dueDate: '', priority: 'Medium' }]);
  const removeTaskRow = (idx) => setTasks(prev => prev.filter((_, i) => i !== idx));
  const updateTaskRow = (idx, field, val) => setTasks(prev => prev.map((t, i) => i === idx ? { ...t, [field]: val } : t));

  const canAdvance = () => {
    if (step === 1) return siteName.trim().length > 0;
    if (step === 2) return location.trim().length > 0 && clientName.trim().length > 0;
    if (step === 3) return budget.trim().length > 0 && startDate && targetDate;
    return true;
  };

  const handleFinish = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));

    // Compose site data
    const siteData = {
      id: `site_${Date.now()}`,
      name: siteName,
      type: projectType,
      location: `${location}, ${city ? city + ', ' : ''}${state}`,
      client: clientName,
      budget: Number(budget) || 0,
      startDate,
      targetDate,
      status,
      manager,
      createdAt: new Date().toISOString(),
    };

    // Create a project in the app state
    addProject({
      name: siteName,
      client: clientName,
      location: `${location}${city ? ', ' + city : ''}, ${state}`,
      budget: Number(budget) || 0,
      spent: 0,
      progress: 0,
      status,
      riskLevel,
      startDate,
      targetDate,
      manager,
      siteEngineer,
      pmEmail,
      seEmail,
      emEmail,
      contractor,
      category: projectType,
      description,
      clientPhone,
      clientEmail,
      teamSize: Number(teamSize) || 0,
      contractType,
    });

    // Create initial tasks
    tasks.filter(t => t.name.trim()).forEach(t => {
      addTask({
        name: t.name,
        assignedTo: t.assignedTo || manager,
        dueDate: t.dueDate || targetDate,
        priority: t.priority,
        status: 'Pending',
        progress: 0,
        category: projectType,
      });
    });

    showToast(`Site "${siteName}" has been added successfully! Welcome, ${currentUser?.name || 'User'}!`, 'success');
    completeSiteSetup(siteData);
    setSaving(false);
  };

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;
  const StepIcon = STEPS[step - 1].icon;

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-start px-4 py-10">
      {/* Brand & Return Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#275232] rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black text-[#1E231F]">Construct<span className="text-[#275232]">IQ</span></span>
            <p className="text-[10px] text-[#6E726E] font-semibold">New Site Setup</p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-1.5 text-xs font-bold text-[#6E726E] hover:text-[#275232] px-3.5 py-2 rounded-xl border border-[#E5E2DA] bg-white hover:bg-[#F7F5F0] transition-colors shadow-xs"
        >
          <span>← Back to Login</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex justify-between mb-2">
          {STEPS.map(s => (
            <div
              key={s.id}
              className={`flex flex-col items-center gap-1 cursor-pointer ${
                s.id <= step ? 'opacity-100' : 'opacity-40'
              }`}
              onClick={() => s.id < step && setStep(s.id)}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                s.id < step  ? 'bg-[#275232] text-white' :
                s.id === step ? 'bg-[#275232] text-white ring-2 ring-[#275232]/30 ring-offset-2' :
                'bg-[#E5E2DA] text-[#6E726E]'
              }`}>
                {s.id < step ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </div>
              <span className={`text-[9px] font-bold hidden sm:block ${s.id === step ? 'text-[#275232]' : 'text-[#6E726E]'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full h-1.5 bg-[#E5E2DA] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#275232] rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white border border-[#E5E2DA] rounded-2xl shadow-lg">
        {/* Card Header */}
        <div className="px-8 pt-7 pb-5 border-b border-[#E5E2DA] flex items-center gap-4">
          <div className="w-10 h-10 bg-[#E5EFE2] border border-[#C6DCBF] rounded-xl flex items-center justify-center">
            <StepIcon className="w-5 h-5 text-[#275232]" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#1E231F]">{STEPS[step - 1].title}</h2>
            <p className="text-xs text-[#6E726E]">{STEPS[step - 1].desc}</p>
          </div>
          <div className="ml-auto text-xs font-bold text-[#6E726E]">
            Step {step} of {STEPS.length}
          </div>
        </div>

        <div className="px-8 py-6 space-y-5">
          {/* ── STEP 1: Site Details ── */}
          {step === 1 && (
            <>
              <div>
                <FieldLabel required>Site / Project Name</FieldLabel>
                <Input icon={Building2} value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="e.g. Ahmedabad Smart Residency Phase 2" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Project Type</FieldLabel>
                  <Select icon={Tag} value={projectType} onChange={e => setProjectType(e.target.value)}>
                    {PROJECT_TYPES.map(t => <option key={t}>{t}</option>)}
                  </Select>
                </div>
                <div>
                  <FieldLabel>Status</FieldLabel>
                  <Select value={status} onChange={e => setStatus(e.target.value)}>
                    {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </Select>
                </div>
              </div>
              <div>
                <FieldLabel>Initial Risk Assessment</FieldLabel>
                <div className="flex gap-3">
                  {RISK_LEVELS.map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRiskLevel(r)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                        riskLevel === r
                          ? r === 'LOW'    ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                          : r === 'MEDIUM' ? 'bg-amber-100 border-amber-400 text-amber-800'
                          : 'bg-red-100 border-red-400 text-red-800'
                          : 'bg-[#F7F5F0] border-[#E5E2DA] text-[#6E726E] hover:bg-[#E5E2DA]/60'
                      }`}
                    >
                      {r === 'LOW' ? 'LOW RISK' : r === 'MEDIUM' ? 'MEDIUM RISK' : 'HIGH RISK'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel>Project Description</FieldLabel>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Briefly describe the scope, objectives, and key deliverables of this project…" />
              </div>
            </>
          )}

          {/* ── STEP 2: Location & Client ── */}
          {step === 2 && (
            <>
              <div>
                <FieldLabel required>Site Address / Area</FieldLabel>
                <Input icon={MapPin} value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Sarkhej-Gandhinagar Highway, Plot 42A" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>City</FieldLabel>
                  <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Ahmedabad" />
                </div>
                <div>
                  <FieldLabel>State</FieldLabel>
                  <Input value={state} onChange={e => setState(e.target.value)} placeholder="Gujarat" />
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E2DA]">
                <h3 className="text-xs font-extrabold text-[#1E231F] uppercase tracking-wider mb-4">Client Information</h3>
                <div className="space-y-4">
                  <div>
                    <FieldLabel required>Client / Developer Name</FieldLabel>
                    <Input icon={Building2} value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Prestige Group Ltd." required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>Client Phone</FieldLabel>
                      <Input icon={Phone} value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="+91 98765 43210" type="tel" />
                    </div>
                    <div>
                      <FieldLabel>Client Email</FieldLabel>
                      <Input icon={Globe} value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="client@company.com" type="email" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 3: Budget & Timeline ── */}
          {step === 3 && (
            <>
              <div>
                <FieldLabel required>Total Project Budget (₹)</FieldLabel>
                <Input icon={DollarSign} type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 75000000  (for ₹7.5 Cr)" required />
                {budget && (
                  <p className="text-xs text-[#275232] font-bold mt-1.5">
                    = ₹{Number(budget).toLocaleString('en-IN')}
                    {Number(budget) >= 10000000 && ` (₹${(Number(budget) / 10000000).toFixed(2)} Cr)`}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>Start Date</FieldLabel>
                  <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                </div>
                <div>
                  <FieldLabel required>Target Completion</FieldLabel>
                  <Input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} required />
                </div>
              </div>
              <div>
                <FieldLabel>Contract Type</FieldLabel>
                <Select value={contractType} onChange={e => setContractType(e.target.value)}>
                  {['Fixed Price', 'Cost Plus', 'Time & Material', 'Lump Sum', 'Unit Price'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </div>
              {startDate && targetDate && (
                <div className="p-4 rounded-xl bg-[#E5EFE2] border border-[#C6DCBF]">
                  <p className="text-xs font-extrabold text-[#275232] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Project Duration: {Math.ceil((new Date(targetDate) - new Date(startDate)) / (1000 * 60 * 60 * 24 * 30))} months</span>
                  </p>
                </div>
              )}
            </>
          )}

          {/* ── STEP 4: Team & Contacts ── */}
          {step === 4 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Project Manager Name</FieldLabel>
                  <Input icon={HardHat} value={manager} onChange={e => setManager(e.target.value)} placeholder="Full name of Project Manager" />
                </div>
                <div>
                  <FieldLabel>Project Manager Email / ID</FieldLabel>
                  <Input icon={Globe} type="email" value={pmEmail} onChange={e => setPmEmail(e.target.value)} placeholder="pm@constructiq.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Lead Site Engineer Name</FieldLabel>
                  <Input icon={Layers} value={siteEngineer} onChange={e => setSiteEngineer(e.target.value)} placeholder="Full name of Site Engineer" />
                </div>
                <div>
                  <FieldLabel>Site Engineer Email / ID</FieldLabel>
                  <Input icon={Globe} type="email" value={seEmail} onChange={e => setSeEmail(e.target.value)} placeholder="se@constructiq.com" />
                </div>
              </div>
              <div>
                <FieldLabel>Executive Mgmt Email / ID</FieldLabel>
                <Input icon={Globe} type="email" value={emEmail} onChange={e => setEmEmail(e.target.value)} placeholder="em@constructiq.com" />
              </div>
              <div>
                <FieldLabel>Main Contractor</FieldLabel>
                <Input icon={Users} value={contractor} onChange={e => setContractor(e.target.value)} placeholder="e.g. Larsen & Toubro (L&T)" />
              </div>
              <div>
                <FieldLabel>Approx. Workforce Size</FieldLabel>
                <Input icon={Users} type="number" value={teamSize} onChange={e => setTeamSize(e.target.value)} placeholder="e.g. 150 workers on site" />
              </div>
            </>
          )}

          {/* ── STEP 5: Initial Tasks ── */}
          {step === 5 && (
            <div className="space-y-4">
              <p className="text-xs text-[#6E726E]">
                Add the first tasks to kick off the project. You can always add more later from the Tasks module.
              </p>
              {tasks.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1E231F]">Task #{idx + 1}</span>
                    {idx > 0 && (
                      <button type="button" onClick={() => removeTaskRow(idx)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <Input
                    placeholder="Task name, e.g. Foundation excavation"
                    value={t.name}
                    onChange={e => updateTaskRow(idx, 'name', e.target.value)}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      placeholder="Assigned to"
                      value={t.assignedTo}
                      onChange={e => updateTaskRow(idx, 'assignedTo', e.target.value)}
                    />
                    <Input
                      type="date"
                      value={t.dueDate}
                      onChange={e => updateTaskRow(idx, 'dueDate', e.target.value)}
                    />
                    <Select value={t.priority} onChange={e => updateTaskRow(idx, 'priority', e.target.value)}>
                      {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p}>{p}</option>)}
                    </Select>
                  </div>
                </div>
              ))}
              {tasks.length < 8 && (
                <button
                  type="button"
                  onClick={addTaskRow}
                  className="w-full py-3 rounded-xl border-2 border-dashed border-[#C6DCBF] text-[#275232] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#E5EFE2] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Task
                </button>
              )}
              <p className="text-[10px] text-[#8C8275] text-center">
                Leave task name empty to skip. You can always add tasks later.
              </p>
            </div>
          )}

          {/* ── STEP 6: Review & Launch ── */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-[#E5EFE2] border border-[#C6DCBF] space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-[#275232]" />
                  <span className="text-sm font-extrabold text-[#275232]">Ready to launch your site!</span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                  <div><span className="text-[#6E726E]">Site Name:</span> <span className="font-bold text-[#1E231F]">{siteName || '—'}</span></div>
                  <div><span className="text-[#6E726E]">Type:</span> <span className="font-bold text-[#1E231F]">{projectType}</span></div>
                  <div><span className="text-[#6E726E]">Location:</span> <span className="font-bold text-[#1E231F]">{location ? `${location}, ${city ? city + ', ' : ''}${state}` : '—'}</span></div>
                  <div><span className="text-[#6E726E]">Client:</span> <span className="font-bold text-[#1E231F]">{clientName || '—'}</span></div>
                  <div><span className="text-[#6E726E]">Budget:</span> <span className="font-bold text-[#1E231F]">{budget ? `₹${Number(budget).toLocaleString('en-IN')}` : '—'}</span></div>
                  <div><span className="text-[#6E726E]">Timeline:</span> <span className="font-bold text-[#1E231F]">{startDate} → {targetDate}</span></div>
                  <div><span className="text-[#6E726E]">Manager:</span> <span className="font-bold text-[#1E231F]">{manager || '—'}</span></div>
                  <div><span className="text-[#6E726E]">Site Engineer:</span> <span className="font-bold text-[#1E231F]">{siteEngineer || '—'}</span></div>
                  <div><span className="text-[#6E726E]">Risk Level:</span> <span className="font-bold text-[#1E231F]">{riskLevel}</span></div>
                  <div><span className="text-[#6E726E]">Tasks added:</span> <span className="font-bold text-[#1E231F]">{tasks.filter(t => t.name.trim()).length}</span></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  You can update all details later from <strong>Settings</strong> and individual module views. This creates the initial workspace for your site.
                </p>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                disabled={saving}
                className="w-full py-4 bg-[#275232] hover:bg-[#1E3F27] disabled:opacity-60 text-white font-extrabold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Setting up your workspace…
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Launch Site Workspace
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-8 pb-7 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (step === 1) {
                logout();
              } else {
                setStep(s => Math.max(1, s - 1));
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-xs font-bold text-[#6E726E] hover:text-[#1E231F] hover:bg-[#E5E2DA] transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 1 ? 'Back to Login' : 'Back'}
          </button>

          {step < STEPS.length && (
            <button
              type="button"
              onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
              disabled={!canAdvance()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#275232] hover:bg-[#1E3F27] text-white text-xs font-extrabold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-[11px] text-[#8C8275]">
        Signed in as <strong>{currentUser?.name}</strong> · {currentUser?.email}
      </p>
    </div>
  );
}
