import React from 'react';
import { BarChart3, TrendingUp, Sparkles, AlertTriangle, ShieldAlert, CheckCircle2, Layers, DollarSign, Boxes } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

import { useApp } from '../../context/AppContext';

export default function AnalyticsView({ projects, tasks, materials, expenses, riskAnalysis }) {
  const { selectedProject, selectedProjectId } = useApp();
  const currentProject = selectedProject || projects[0];

  const radarData = [
    { subject: 'Schedule', score: riskAnalysis?.score > 60 ? 45 : 85 },
    { subject: 'Budget', score: currentProject.spent / (currentProject.budget || 1) > 0.8 ? 40 : 90 },
    { subject: 'Materials', score: riskAnalysis?.projectHealth?.materials?.level === 'HIGH' ? 40 : 85 },
    { subject: 'Quality', score: 90 },
    { subject: 'Safety', score: 95 },
    { subject: 'Workforce', score: 80 }
  ];

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Project Performance Analytics</h1>
          <p className="text-xs text-[#6E726E] mt-1">Deep-dive predictive analytics and telemetry for <strong className="text-[#1E231F]">{currentProject.name}</strong>.</p>
        </div>
      </div>

      {/* AI Automated Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-[#FDE68A] shadow-xs flex items-start gap-3">
          <div className="p-2.5 bg-[#FEF3C7] text-[#D97706] rounded-xl border border-[#FDE68A] shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#92400E] uppercase tracking-wider">Schedule Variance</span>
            <h4 className="text-sm font-bold text-[#1E231F] mt-1">
              {currentProject.progress < (currentProject.plannedProgress || 70) ? `Actual progress is behind plan` : `On Schedule`}
            </h4>
            <p className="text-xs text-[#6E726E] mt-1">
              {currentProject.name} is currently at {currentProject.progress || 0}% progress.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#FCA5A5] shadow-xs flex items-start gap-3">
          <div className="p-2.5 bg-[#FEE2E2] text-[#991B1B] rounded-xl border border-[#FCA5A5] shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#991B1B] uppercase tracking-wider">Cost Utilization</span>
            <h4 className="text-sm font-bold text-[#1E231F] mt-1">
              Spent ₹{((currentProject.spent || 0) / 10000000).toFixed(1)} Cr of ₹{((currentProject.budget || 0) / 10000000).toFixed(1)} Cr
            </h4>
            <p className="text-xs text-[#6E726E] mt-1">
              Budget utilization rate at {currentProject.budget > 0 ? ((currentProject.spent / currentProject.budget) * 100).toFixed(0) : 0}%.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#C6DCBF] shadow-xs flex items-start gap-3">
          <div className="p-2.5 bg-[#E5EFE2] text-[#275232] rounded-xl border border-[#C6DCBF] shrink-0">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#275232] uppercase tracking-wider">Inventory & Risk</span>
            <h4 className="text-sm font-bold text-[#1E231F] mt-1">
              Overall Risk Score: {riskAnalysis.score}/100
            </h4>
            <p className="text-xs text-[#6E726E] mt-1">
              {riskAnalysis.whyHigh}
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Progress Variance Line */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
          <h3 className="text-base font-bold text-[#1E231F] mb-1">Weekly Physical Progress Velocity</h3>
          <p className="text-xs text-[#6E726E] mb-4">Baseline planned vs actual recorded milestone completion</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
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
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E2DA', borderRadius: '0.75rem', color: '#1E231F' }} />
                <Line type="monotone" dataKey="planned" stroke="#275232" strokeWidth={3} />
                <Line type="monotone" dataKey="actual" stroke="#DC2626" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Health Radar */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
          <h3 className="text-base font-bold text-[#1E231F] mb-1">Operational Health Scorecard</h3>
          <p className="text-xs text-[#6E726E] mb-4">Multi-factor operational efficiency matrix</p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#E5E2DA" />
                <PolarAngleAxis dataKey="subject" stroke="#6E726E" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8C8275" fontSize={9} />
                <Radar name="Site Performance" dataKey="score" stroke="#275232" fill="#275232" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
