import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, Calendar, Layers, DollarSign } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import { useApp } from '../../context/AppContext';

export default function ReportsView() {
  const { selectedProject, tasks, materials, expenses, riskAnalysis, materialRequests, activeRole } = useApp();
  const [reportType, setReportType] = useState('weekly');

  const handlePrint = () => {
    window.print();
  };

  const lowStockSteel = materials.find(m => m.name.includes("Steel"));

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Automated Construction Reports</h1>
          <p className="text-xs text-[#6E726E] mt-1">Generate executive weekly summaries, milestone progress audits, and printable risk reports.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#275232] hover:bg-[#1E3F27] text-white font-extrabold text-xs rounded-xl shadow-xs transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* Report Document Box */}
      <div className="rounded-2xl bg-white border border-[#E5E2DA] shadow-xs p-8 max-w-4xl mx-auto space-y-8 print:bg-white print:text-black print:p-0 print:border-0 print:shadow-none">
        {/* Report Document Header */}
        <div className="border-b border-[#E5E2DA] print:border-gray-300 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#275232] print:text-blue-700">CONSTRUCTIQ EXECUTIVE AUDIT</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E5EFE2] text-[#275232] print:border print:border-blue-300">WEEKLY REPORT</span>
            </div>
            <h2 className="text-2xl font-black text-[#1E231F] print:text-black mt-1">Weekly Construction Operations Report</h2>
            <p className="text-xs text-[#6E726E] print:text-gray-600 mt-1">
              Project: <strong className="text-[#1E231F] print:text-black">{selectedProject.name}</strong> • Client: <span className="text-[#6E726E] print:text-gray-700">{selectedProject.client}</span>
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-[#6E726E] print:text-gray-600 space-y-1">
            <div><span className="font-bold text-[#1E231F]">Reporting Period:</span> 14–20 September 2026</div>
            <div><span className="font-bold text-[#1E231F]">Generated Date:</span> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            <div><span className="font-bold text-[#1E231F]">Prepared By:</span> Rohan Mehta (Project Manager)</div>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#F7F5F0] print:bg-gray-100 border border-[#E5E2DA] print:border-gray-300">
          <div>
            <span className="text-[10px] text-[#6E726E] print:text-gray-600 uppercase font-bold">Overall Progress</span>
            <div className="text-xl font-black text-[#275232] print:text-emerald-700 mt-0.5">{selectedProject.progress}%</div>
          </div>
          <div>
            <span className="text-[10px] text-[#6E726E] print:text-gray-600 uppercase font-bold">Budget Utilization</span>
            <div className="text-xl font-black text-[#92400E] print:text-amber-700 mt-0.5">₹{(selectedProject.spent / 10000000).toFixed(1)} Cr / ₹{(selectedProject.budget / 10000000).toFixed(1)} Cr</div>
          </div>
          <div>
            <span className="text-[10px] text-[#6E726E] print:text-gray-600 uppercase font-bold">Predicted Cost</span>
            <div className="text-xl font-black text-[#991B1B] print:text-red-700 mt-0.5">₹{(selectedProject.predictedFinalCost / 10000000).toFixed(1)} Cr</div>
          </div>
          <div>
            <span className="text-[10px] text-[#6E726E] print:text-gray-600 uppercase font-bold">Risk Assessment</span>
            <div className="mt-1">
              <RiskBadge level={riskAnalysis.level} text={`${riskAnalysis.level} RISK (${riskAnalysis.score}/100)`} size="sm" />
            </div>
          </div>
        </div>

        {/* Activity Status Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Completed */}
          <div className="space-y-3 p-4 rounded-xl bg-[#E5EFE2] border border-[#C6DCBF] print:border-emerald-300">
            <h4 className="text-xs font-bold text-[#275232] print:text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Completed Milestones
            </h4>
            <ul className="space-y-2 text-xs text-[#1E231F] print:text-gray-800 font-medium">
              <li className="flex items-center gap-2">✓ Foundation Work (100% complete - Block A & B)</li>
              <li className="flex items-center gap-2">✓ Structural Work milestone (RRC Frame 82% complete)</li>
            </ul>
          </div>

          {/* Delayed */}
          <div className="space-y-3 p-4 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] print:border-red-300">
            <h4 className="text-xs font-bold text-[#991B1B] print:text-red-700 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Delayed & Blocked Activities
            </h4>
            <ul className="space-y-2 text-xs text-[#991B1B] print:text-red-700 font-medium">
              <li className="flex items-center gap-2 font-bold">
                ! Electrical Installation (45% vs expected 65%, due 20 Sep 2026)
              </li>
              <li className="text-[11px] text-[#7F1D1D] print:text-gray-600 pl-4 font-normal">
                Subcontractor PowerGrid understaffed by 8 technicians.
              </li>
            </ul>
          </div>
        </div>

        {/* Material Alert Section */}
        <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] print:border-amber-400 space-y-2">
          <h4 className="text-xs font-bold text-[#92400E] print:text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#D97706]" />
            Material & Inventory Alert
          </h4>
          <p className="text-xs text-[#78350F] print:text-amber-900 font-medium">
            ! Steel TMT Bar inventory is below minimum threshold (12 tons available vs 15 tons required minimum level). Recommended procurement: 6 tons.
          </p>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-3 p-5 rounded-xl bg-[#F7F5F0] print:bg-gray-100 border border-[#E5E2DA] print:border-gray-300">
          <h4 className="text-xs font-bold text-[#275232] print:text-blue-800 uppercase tracking-wider">
            Recommended Management Actions
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-[#1E231F] print:text-gray-800 font-medium">
            <li>Procure additional 6 tons of TMT Steel immediately.</li>
            <li>Assign additional workers to electrical conduit installation.</li>
            <li>Review electrical contractor schedule with PowerGrid Lead.</li>
            <li>Monitor material procurement budget utilization rate.</li>
          </ol>
        </div>

        {/* Footer Signature Block */}
        <div className="pt-6 border-t border-[#E5E2DA] print:border-gray-300 flex justify-between text-xs text-[#6E726E] print:text-gray-600">
          <div>
            <span className="font-bold text-[#1E231F] print:text-black block">ConstructIQ Autonomous Engine</span>
            <span>Site Telemetry & Risk Verification System</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-[#1E231F] print:text-black block">Project Manager Approval</span>
            <span>Rohan Mehta • Verified Signature</span>
          </div>
        </div>
      </div>
    </div>
  );
}
