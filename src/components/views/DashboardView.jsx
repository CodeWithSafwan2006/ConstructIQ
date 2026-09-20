import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  AlertOctagon, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  Boxes, 
  ShieldAlert,
  Calendar,
  DollarSign,
  Layers,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
  HardHat,
  FileText
} from 'lucide-react';
import KpiCard from '../common/KpiCard';
import RiskBadge from '../common/RiskBadge';
import ProgressBar from '../common/ProgressBar';
import { useApp } from '../../context/AppContext';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  Area,
  AreaChart
} from 'recharts';

export default function DashboardView({ 
  onNavigate, 
  onCreateMaterialRequest 
}) {
  const { 
    projects, 
    selectedProject, 
    selectedProjectId, 
    tasks, 
    materials, 
    expenses, 
    issues, 
    riskAnalysis, 
    activeRole, 
    setActiveTab 
  } = useApp();

  const heroProject = selectedProject || projects[0];
  const isDummyProject = ['p001', 'p002', 'p003', 'p004', 'p005'].includes(heroProject.id);

  // Filter items specifically for the active project
  const projectTasks = tasks.filter(t => t.projectId === heroProject.id || t.projectName === heroProject.name);
  const projectMaterials = materials.filter(m => m.projectId === heroProject.id);
  const projectIssues = issues.filter(i => i.projectId === heroProject.id || i.projectName === heroProject.name);

  // Check low stock for project
  const lowStockItem = projectMaterials.find(m => m.available < m.minLevel) || (isDummyProject ? materials.find(m => m.name.includes("Steel")) : null);

  const getGreetingRoleTitle = () => {
    if (activeRole === 'pm') return 'Project Manager';
    if (activeRole === 'admin') return 'System Admin';
    if (activeRole === 'site_eng') return 'Site Engineer';
    return 'Executive Manager';
  };

  const hasDetails = isDummyProject || projectTasks.length > 0 || projectMaterials.length > 0 || heroProject.spent > 0;

  // Formatted financial numbers
  const budgetCr = heroProject.budget ? (heroProject.budget / 10000000).toFixed(1) : "0.0";
  const spentCr = heroProject.spent ? (heroProject.spent / 10000000).toFixed(1) : "0.0";
  const progressPct = heroProject.progress || (projectTasks.length > 0 ? Math.round(projectTasks.reduce((acc, t) => acc + t.progress, 0) / projectTasks.length) : 0);

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Welcome Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pt-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C8275] block">COMMAND CENTER</span>
          <h1 className="text-3xl font-extrabold text-[#1E231F] tracking-tight mt-1">
            Good morning, {getGreetingRoleTitle()}
          </h1>
          <p className="text-sm text-[#6E726E] mt-1">
            Live workspace telemetry for <strong className="text-[#1E231F]">{heroProject.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#8C8275] font-medium shrink-0 pb-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated Live</span>
        </div>
      </div>

      {/* PROMPT BANNER FOR NON-DUMMY PROJECT (WHEN DETAILS NOT ADDED YET) */}
      {!hasDetails && (
        <div className="p-6 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-600 text-white rounded-xl shrink-0 mt-0.5 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-amber-900">Project Workspace Initialized — Details Required</h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">ID: {heroProject.id}</span>
              </div>
              <p className="text-xs text-amber-800 mt-1">
                You are viewing custom project <strong>"{heroProject.name}"</strong>. No tasks or material records have been entered yet for this project ID. Only the benchmark dummy ID (<code>p001</code>) pre-populates sample data.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200">
            <p className="text-xs font-bold text-amber-900 mb-3">Add details now to start tracking live progress, budget, and risk telemetry:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => setActiveTab('tasks')}
                className="p-3 bg-white hover:bg-amber-100/80 border border-amber-300 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center text-xs font-bold text-[#275232]">
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-[#275232]" />
                    <span>Add Tasks</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6E726E] mt-1">Define milestones & assigned contractors</p>
              </button>

              <button
                onClick={() => setActiveTab('materials')}
                className="p-3 bg-white hover:bg-amber-100/80 border border-amber-300 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center text-xs font-bold text-[#275232]">
                  <div className="flex items-center gap-1.5">
                    <Boxes className="w-3.5 h-3.5 text-[#275232]" />
                    <span>Add Materials</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6E726E] mt-1">Set stock levels & minimum thresholds</p>
              </button>

              <button
                onClick={() => setActiveTab('expenses')}
                className="p-3 bg-white hover:bg-amber-100/80 border border-amber-300 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center text-xs font-bold text-[#275232]">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#275232]" />
                    <span>Log Expenses</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6E726E] mt-1">Record site transactions & category budget</p>
              </button>

              <button
                onClick={() => setActiveTab('import')}
                className="p-3 bg-white hover:bg-amber-100/80 border border-amber-300 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center text-xs font-bold text-[#275232]">
                  <div className="flex items-center gap-1.5">
                    <UploadCloud className="w-3.5 h-3.5 text-[#275232]" />
                    <span>CSV Import</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6E726E] mt-1">Upload bulk project schedule / BOQ</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Low Material Stock Alert Warning Banner */}
      {lowStockItem && (
        <div className="p-4 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#D97706] text-white rounded-xl mt-0.5 shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-[#92400E]">LOW STOCK ALERT — Immediate Action Required</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FDE68A] text-[#92400E]">Material Risk</span>
              </div>
              <p className="text-xs text-[#78350F] mt-0.5">
                {lowStockItem.name} inventory is below minimum threshold ({lowStockItem.available} {lowStockItem.unit} vs min {lowStockItem.minLevel} {lowStockItem.unit}).
              </p>
            </div>
          </div>
          <button
            onClick={onCreateMaterialRequest}
            className="px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            Create Material Request
          </button>
        </div>
      )}

      {/* HERO PROJECT CARD */}
      <div className="p-6 rounded-2xl bg-[#E8F0E6] border border-[#C6DCBF] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                riskAnalysis.level === 'HIGH' ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]' : 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
              }`}>
                {riskAnalysis.level === 'HIGH' ? 'ATTENTION NEEDED' : 'OPERATIONAL STATUS: NORMAL'}
              </span>
              <span className="text-[11px] font-medium text-[#6E726E]">
                {heroProject.category || 'Construction Project'} · {heroProject.location}
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#1E231F] mt-2">{heroProject.name}</h3>
            <p className="text-xs text-[#6E726E] font-medium">Client: {heroProject.client} · Completion Target: {heroProject.targetDate || '2027-12-31'}</p>
          </div>

          <div className="flex items-center gap-8 text-right shrink-0">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E726E] block">BUDGET</span>
              <span className="text-base font-black text-[#1E231F]">₹{budgetCr} Cr</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E726E] block">SPENT</span>
              <span className="text-base font-black text-[#92400E]">₹{spentCr} Cr</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E726E] block">PROGRESS</span>
              <span className="text-base font-black text-[#275232]">{progressPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6E726E]">Overall progress</span>
            <div className="p-2 rounded-xl bg-[#F7F5F0] text-[#6E726E]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-[#1E231F]">{progressPct}%</div>
            <span className="text-xs font-semibold text-[#8C8275] mt-1 block">
              {projectTasks.length} tasks scheduled
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6E726E]">Budget used</span>
            <div className={`p-2 rounded-xl ${heroProject.budget > 0 && heroProject.spent/heroProject.budget > 0.8 ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#E5EFE2] text-[#275232]'}`}>
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className={`text-3xl font-black ${heroProject.budget > 0 && heroProject.spent/heroProject.budget > 0.8 ? 'text-[#991B1B]' : 'text-[#1E231F]'}`}>
              {heroProject.budget > 0 ? `${((heroProject.spent / heroProject.budget) * 100).toFixed(0)}%` : '0%'}
            </div>
            <span className="text-xs font-semibold text-[#6E726E] mt-1 block">
              ₹{((heroProject.budget - heroProject.spent) / 10000000).toFixed(1)} Cr remaining
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6E726E]">Open issues</span>
            <div className="p-2 rounded-xl bg-[#F7F5F0] text-[#6E726E]">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-[#1E231F]">{projectIssues.filter(i => i.status !== 'Resolved').length}</div>
            <span className="text-xs font-semibold text-[#6E726E] mt-1 block">Logged bottlenecks</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6E726E]">Material risk</span>
            <div className={`p-2 rounded-xl ${lowStockItem ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#E5EFE2] text-[#275232]'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className={`text-3xl font-black ${lowStockItem ? 'text-[#991B1B]' : 'text-[#275232]'}`}>
              {lowStockItem ? 'HIGH' : 'LOW'}
            </div>
            <span className="text-xs font-semibold text-[#6E726E] mt-1 block">
              {lowStockItem ? `${lowStockItem.name} low stock` : 'Inventory healthy'}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Planned vs Actual Progress */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#1E231F]">Planned vs actual progress</h3>
              <p className="text-xs text-[#6E726E]">Weekly cumulative completion (%)</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={isDummyProject ? [
                { week: "W1", planned: 10, actual: 9 },
                { week: "W2", planned: 20, actual: 18 },
                { week: "W3", planned: 32, actual: 28 },
                { week: "W4", planned: 45, actual: 39 },
                { week: "W5", planned: 58, actual: 52 },
                { week: "W6", planned: 70, actual: progressPct }
              ] : [
                { week: "W1", planned: 10, actual: Math.min(progressPct, 10) },
                { week: "W2", planned: 25, actual: Math.min(progressPct, 20) },
                { week: "W3", planned: 50, actual: Math.min(progressPct, 45) },
                { week: "W4", planned: 75, actual: Math.min(progressPct, 70) },
                { week: "W5", planned: 100, actual: progressPct }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DA" />
                <XAxis dataKey="week" stroke="#6E726E" fontSize={11} />
                <YAxis stroke="#6E726E" fontSize={11} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E2DA', borderRadius: '0.75rem', color: '#1E231F', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="planned" name="Planned Progress %" stroke="#8C8275" strokeDasharray="4 4" fill="none" strokeWidth={2} />
                <Area type="monotone" dataKey="actual" name="Actual Progress %" stroke="#275232" fill="#E8F0E6" strokeWidth={3} dot={{ r: 4, fill: '#275232' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Budget vs Actual Cost by Category */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-[#1E231F]">Budget vs actual</h3>
                <p className="text-xs text-[#6E726E]">Cost by category · ₹ Crore</p>
              </div>
            </div>

            <div className="h-56 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={isDummyProject ? [
                  { category: "Materials", planned: 4.0, actual: 4.2 },
                  { category: "Labour", planned: 2.0, actual: 1.8 },
                  { category: "Equipment", planned: 1.0, actual: 0.8 },
                  { category: "Contractor", planned: 2.0, actual: 1.5 }
                ] : [
                  { category: "Materials", planned: Number((budgetCr * 0.4).toFixed(1)), actual: Number((spentCr * 0.4).toFixed(1)) },
                  { category: "Labour", planned: Number((budgetCr * 0.25).toFixed(1)), actual: Number((spentCr * 0.25).toFixed(1)) },
                  { category: "Equipment", planned: Number((budgetCr * 0.15).toFixed(1)), actual: Number((spentCr * 0.15).toFixed(1)) },
                  { category: "Contractor", planned: Number((budgetCr * 0.2).toFixed(1)), actual: Number((spentCr * 0.2).toFixed(1)) }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DA" />
                  <XAxis dataKey="category" stroke="#6E726E" fontSize={11} />
                  <YAxis stroke="#6E726E" fontSize={11} unit=" Cr" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E2DA', borderRadius: '0.75rem', color: '#1E231F', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '5px' }} />
                  <Bar dataKey="planned" name="Planned (Rs Cr)" fill="#8C8275" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Actual (Rs Cr)" fill="#275232" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT HEALTH CARD & EXPLAINABLE RISK ENGINE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Health Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-3">
            <h3 className="text-base font-bold text-[#1E231F]">Project health</h3>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              riskAnalysis.level === 'HIGH' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              Overall: {riskAnalysis.level} RISK
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <div>
                <span className="font-bold text-[#1E231F]">Schedule</span>
                <p className="text-[11px] text-[#6E726E]">{riskAnalysis.projectHealth.schedule.detail}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                riskAnalysis.projectHealth.schedule.level === 'HIGH' ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]' : 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
              }`}>
                {riskAnalysis.projectHealth.schedule.level}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <div>
                <span className="font-bold text-[#1E231F]">Budget</span>
                <p className="text-[11px] text-[#6E726E]">{riskAnalysis.projectHealth.budget.detail}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                riskAnalysis.projectHealth.budget.level === 'HIGH' ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]' : 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
              }`}>
                {riskAnalysis.projectHealth.budget.level}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <div>
                <span className="font-bold text-[#1E231F]">Materials</span>
                <p className="text-[11px] text-[#6E726E]">{riskAnalysis.projectHealth.materials.detail}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                riskAnalysis.projectHealth.materials.level === 'HIGH' ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]' : 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
              }`}>
                {riskAnalysis.projectHealth.materials.level}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <div>
                <span className="font-bold text-[#1E231F]">Resources</span>
                <p className="text-[11px] text-[#6E726E]">{riskAnalysis.projectHealth.resources.detail}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                LOW
              </span>
            </div>
          </div>
        </div>

        {/* Explainable Risk Engine Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#E5E2DA] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#1E231F]">Explainable risk engine</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D9E8D6] text-[#275232] border border-[#C6DCBF]">
                    Rule-based - fully explainable
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-2xl font-black ${riskAnalysis.score >= 60 ? 'text-red-700' : 'text-emerald-700'}`}>
                  {riskAnalysis.score}/100
                </span>
                <span className={`text-[10px] font-bold uppercase block ${riskAnalysis.score >= 60 ? 'text-red-700' : 'text-emerald-700'}`}>
                  {riskAnalysis.level} Risk Score
                </span>
              </div>
            </div>

            {/* Formula Rows Summing score */}
            <div className="space-y-1.5 my-3 text-xs">
              <div className="text-[10px] font-bold text-[#6E726E] uppercase tracking-wider mb-1">Risk Score Breakdown (Max 100)</div>
              
              {riskAnalysis.lineItems.map((item, idx) => (
                <div key={idx} className="flex justify-between p-2 rounded bg-[#F7F5F0] text-xs">
                  <span className="text-[#1E231F] font-medium">{item.rule} ({item.detail})</span>
                  <span className={`font-bold ${item.score > 0 ? 'text-red-700' : 'text-[#6E726E]'}`}>
                    +{item.score}
                  </span>
                </div>
              ))}

              <div className="flex justify-between p-2 rounded bg-[#E5EFE2] border border-[#C6DCBF] text-xs font-bold text-[#275232] mt-2">
                <span>Total Calculated Risk Score:</span>
                <span>{riskAnalysis.score} / 100</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] text-xs text-[#1E231F] space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#6E726E] block">Risk Summary</span>
              <p className="text-[11px] leading-snug">
                {riskAnalysis.whyHigh}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
