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
  const { projects, tasks, materials, expenses, issues, riskAnalysis, activeRole, openIssuesCount } = useApp();

  const heroProject = projects[0]; // Ahmedabad Smart Residency
  const lowStockSteel = materials.find(m => m.name.includes("Steel"));

  const getGreetingRoleTitle = () => {
    if (activeRole === 'pm') return 'Project Manager';
    if (activeRole === 'admin') return 'System Admin';
    if (activeRole === 'site_eng') return 'Site Engineer';
    return 'Executive Manager';
  };

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Welcome Greeting Header (Exact Lovable Design) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pt-1">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C8275] block">COMMAND CENTER</span>
          <h1 className="text-3xl font-extrabold text-[#1E231F] tracking-tight mt-1">
            Good morning, {getGreetingRoleTitle()}
          </h1>
          <p className="text-sm text-[#6E726E] mt-1">
            A live view of project delivery, cost control, and today's operational risks.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#8C8275] font-medium shrink-0 pb-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated 7:12 AM</span>
        </div>
      </div>

      {/* Low Material Stock Alert Warning Banner */}
      {lowStockSteel && lowStockSteel.available < lowStockSteel.minLevel && (
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
                Steel inventory is below the required threshold ({lowStockSteel.available} tons vs min {lowStockSteel.minLevel} tons). Recommended procurement: 6 tons.
              </p>
            </div>
          </div>
          <button
            onClick={onCreateMaterialRequest}
            className="px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            Create Material Request (6 Tons)
          </button>
        </div>
      )}

      {/* HERO PROJECT CARD (Soft Sage Green Background #E8F0E6) */}
      <div className="p-6 rounded-2xl bg-[#E8F0E6] border border-[#C6DCBF] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#92400E] px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A]">
                ATTENTION NEEDED
              </span>
              <span className="text-[11px] font-medium text-[#6E726E]">
                Residential · Ahmedabad
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#1E231F] mt-2">{heroProject.name}</h3>
            <p className="text-xs text-[#6E726E] font-medium">{heroProject.client} · Completion 31 Mar 2027</p>
          </div>

          <div className="flex items-center gap-8 text-right shrink-0">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E726E] block">BUDGET</span>
              <span className="text-base font-black text-[#1E231F]">₹10.0 Cr</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E726E] block">SPENT</span>
              <span className="text-base font-black text-[#92400E]">₹8.3 Cr</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E726E] block">PROGRESS</span>
              <span className="text-base font-black text-[#275232]">68%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards Grid (Matching Lovable Grid) */}
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
            <div className="text-3xl font-black text-[#1E231F]">68%</div>
            <span className="text-xs font-semibold text-[#8C8275] mt-1 block">2% behind this week's plan</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6E726E]">Budget used</span>
            <div className="p-2 rounded-xl bg-[#FEE2E2] text-[#991B1B]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-[#991B1B]">83%</div>
            <span className="text-xs font-semibold text-[#6E726E] mt-1 block">₹1.7 Cr remaining</span>
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
            <div className="text-3xl font-black text-[#1E231F]">7</div>
            <span className="text-xs font-semibold text-[#6E726E] mt-1 block">2 need action today</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6E726E]">Material risk</span>
            <div className="p-2 rounded-xl bg-[#FEE2E2] text-[#991B1B]">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-[#991B1B]">HIGH</div>
            <span className="text-xs font-semibold text-[#6E726E] mt-1 block">Steel below minimum stock</span>
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
              <p className="text-xs text-[#6E726E]">Weekly cumulative completion</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { week: "W1", planned: 10, actual: 9 },
                { week: "W2", planned: 20, actual: 18 },
                { week: "W3", planned: 32, actual: 28 },
                { week: "W4", planned: 45, actual: 39 },
                { week: "W5", planned: 58, actual: 52 },
                { week: "W6", planned: 70, actual: 68 }
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
                <BarChart data={[
                  { category: "Materials", planned: 4.0, actual: 4.2 },
                  { category: "Labour", planned: 2.0, actual: 1.8 },
                  { category: "Equipment", planned: 1.0, actual: 0.8 },
                  { category: "Contractor", planned: 2.0, actual: 1.5 }
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

      {/* PROJECT HEALTH CARD & EXPLAINABLE RISK ENGINE CARD (Sum = 75) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Health Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-3">
            <h3 className="text-base font-bold text-[#1E231F]">Project health</h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
              Overall: HIGH RISK
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <div>
                <span className="font-bold text-[#1E231F]">Schedule</span>
                <p className="text-[11px] text-[#6E726E]">Electrical delay behind plan</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                MEDIUM
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <div>
                <span className="font-bold text-[#1E231F]">Budget</span>
                <p className="text-[11px] text-[#6E726E]">83% utilized, forecast overrun</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]">
                HIGH
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <div>
                <span className="font-bold text-[#1E231F]">Materials</span>
                <p className="text-[11px] text-[#6E726E]">Steel below minimum threshold</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]">
                HIGH
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <div>
                <span className="font-bold text-[#1E231F]">Resources</span>
                <p className="text-[11px] text-[#6E726E]">92% workforce available</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                LOW
              </span>
            </div>
          </div>
        </div>

        {/* Explainable Risk Engine Card (Score 75/100) */}
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
                <span className="text-2xl font-black text-red-700">75/100</span>
                <span className="text-[10px] font-bold text-red-700 uppercase block">High Risk Score</span>
              </div>
            </div>

            {/* Formula Rows Summing Exactly to 75 */}
            <div className="space-y-1.5 my-3 text-xs">
              <div className="text-[10px] font-bold text-[#6E726E] uppercase tracking-wider mb-1">Risk Score Breakdown (Max 100)</div>
              
              <div className="flex justify-between p-2 rounded bg-[#F7F5F0] text-xs">
                <span className="text-[#1E231F] font-medium">Progress below plan / delayed task</span>
                <span className="font-bold text-red-700">+30</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-[#F7F5F0] text-xs">
                <span className="text-[#1E231F] font-medium">Overdue task</span>
                <span className="font-bold text-red-700">+10</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-[#F7F5F0] text-xs">
                <span className="text-[#1E231F] font-medium">Material below minimum stock</span>
                <span className="font-bold text-red-700">+20</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-[#F7F5F0] text-xs">
                <span className="text-[#1E231F] font-medium">Forecast budget overrun</span>
                <span className="font-bold text-red-700">+15</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-[#F7F5F0] text-xs">
                <span className="text-[#1E231F] font-medium">Low workforce availability (&lt;80%)</span>
                <span className="font-bold text-[#6E726E]">+0</span>
              </div>

              <div className="flex justify-between p-2 rounded bg-[#FEE2E2] border border-[#FCA5A5] text-xs font-bold text-[#991B1B] mt-2">
                <span>Total Risk Score (Visible Sum):</span>
                <span>75 / 100</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FEE2E2]/60 border border-[#FCA5A5] text-xs text-[#991B1B] space-y-1">
              <span className="text-[10px] font-bold uppercase block">Why high?</span>
              <p className="text-[11px] leading-snug">
                Electrical delay and steel shortage combine into a score above the 60-point high-risk threshold.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
