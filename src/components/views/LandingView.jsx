import React from 'react';
import {
  Zap,
  Building2,
  ShieldAlert,
  Bot,
  ArrowRight,
  BarChart3,
  Boxes,
  Users,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LandingView() {
  const { setAuthScreen } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1E231F] font-sans selection:bg-[#275232] selection:text-white">
      {/* Top Navbar */}
      <nav className="h-20 border-b border-[#E5E2DA] bg-[#F7F5F0]/90 backdrop-blur-md sticky top-0 z-40 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#275232] rounded-xl shadow-sm text-white">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#1E231F] flex items-center gap-1.5">
              Construct<span className="text-[#275232]">IQ</span>
            </h1>
            <p className="text-[10px] text-[#6E726E] font-semibold tracking-wider uppercase">SITE INTELLIGENCE</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold text-[#6E726E]">
          <a href="#features" className="hover:text-[#275232] transition-colors">Features</a>
          <a href="#workflow" className="hover:text-[#275232] transition-colors">How It Works</a>
          <a href="#comparison" className="hover:text-[#275232] transition-colors">Platform Impact</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAuthScreen('login')}
            className="px-4 py-2 text-xs font-bold text-[#6E726E] hover:text-[#1E231F] transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthScreen('login')}
            className="px-5 py-2.5 bg-[#275232] hover:bg-[#1E3F27] text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-20 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EFE2] border border-[#C6DCBF] text-[#275232] text-xs font-bold mb-6">
          <Sparkles className="w-4 h-4 text-[#275232]" />
          <span>Construction Project & Risk Management System</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-[#1E231F] tracking-tight max-w-4xl mx-auto leading-tight">
          Eliminate Site Delays & Budget Overruns with <span className="text-[#275232]">Live Telemetry</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-[#6E726E] max-w-2xl mx-auto leading-relaxed">
          Unified site management connecting Project Managers, Site Engineers, and Executive Leadership with real-time BOQ tracking and automated risk modeling.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setAuthScreen('login')}
            className="w-full sm:w-auto px-8 py-4 bg-[#275232] hover:bg-[#1E3F27] text-white font-extrabold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Initialize Project Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setAuthScreen('login')}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#F7F5F0] text-[#1E231F] border border-[#E5E2DA] font-extrabold text-sm rounded-xl transition-all"
          >
            Sign In to Existing Portal
          </button>
        </div>

        {/* Hero Interactive Preview */}
        <div className="mt-16 bg-white rounded-2xl border border-[#E5E2DA] shadow-xl p-6 text-left max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#991B1B]" />
              <div className="w-3 h-3 rounded-full bg-[#D97706]" />
              <div className="w-3 h-3 rounded-full bg-[#275232]" />
              <span className="text-xs font-bold text-[#6E726E] ml-2">ConstructIQ — Live Site Telemetry Command Center</span>
            </div>
            <span className="text-xs font-bold text-[#275232] bg-[#E5EFE2] px-3 py-1 rounded-full border border-[#C6DCBF]">
              HIGH RISK (Score: 75/100)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <span className="text-[10px] font-bold text-[#6E726E] uppercase">Physical Progress</span>
              <div className="text-2xl font-black text-[#1E231F] mt-1">68%</div>
              <div className="text-xs text-[#991B1B] font-semibold mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>2% behind target schedule</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <span className="text-[10px] font-bold text-[#6E726E] uppercase">Budget Utilization</span>
              <div className="text-2xl font-black text-[#1E231F] mt-1">₹8.3 Cr / ₹10 Cr</div>
              <div className="text-xs text-[#92400E] font-semibold mt-1">Predicting ₹10.8 Cr final cost</div>
            </div>
            <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA]">
              <span className="text-[10px] font-bold text-[#6E726E] uppercase">Steel TMT Inventory</span>
              <div className="text-2xl font-black text-[#991B1B] mt-1">12 Tons</div>
              <div className="text-xs text-[#991B1B] font-semibold mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Below 15T threshold (Req +6T)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 md:px-12 bg-white border-y border-[#E5E2DA]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#275232] uppercase tracking-wider bg-[#E5EFE2] px-3 py-1 rounded-full border border-[#C6DCBF]">
              Comprehensive Platform Capabilities
            </span>
            <h2 className="text-3xl font-black text-[#1E231F]">Designed for Construction Data Management</h2>
            <p className="text-xs text-[#6E726E] max-w-xl mx-auto">Replacing disconnected communication channels, lost paper logs, and unorganized spreadsheets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Boxes, title: 'Structured Data Storage', desc: 'Single source of truth for projects, tasks, materials, expenses, issues, and documents.', color: 'green' },
              { icon: ShieldAlert, title: 'Smart Risk Engine', desc: '0–100 mathematical risk evaluation with transparent line items explaining exact delay factors.', color: 'amber' },
              { icon: Bot, title: 'ConstructIQ AI Assistant', desc: 'Conversational intelligence querying live site telemetry with source citation and 1-click action triggers.', color: 'green' },
              { icon: BarChart3, title: 'Advanced Analytics', desc: 'Real-time dashboards with budget variance, schedule deviation, and resource utilization charts.', color: 'blue' },
              { icon: Users, title: 'Multi-Role Access', desc: 'Tailored views for Project Managers, Site Engineers, Admins, and Executive Management.', color: 'green' },
              { icon: Zap, title: 'CSV Data Import', desc: 'Bulk import tasks, materials, expenses, and projects from any spreadsheet in seconds.', color: 'amber' },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#F7F5F0] border border-[#E5E2DA] space-y-3">
                <div className={`p-3 rounded-xl w-fit border ${
                  f.color === 'green' ? 'bg-[#E5EFE2] text-[#275232] border-[#C6DCBF]' :
                  f.color === 'amber' ? 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]' :
                  'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1E231F]">{f.title}</h3>
                <p className="text-xs text-[#6E726E] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-black text-[#1E231F]">Ready to take control of your construction sites?</h2>
          <p className="text-sm text-[#6E726E]">Sign up free, add your first site, and go live in under 5 minutes.</p>
          <button
            onClick={() => setAuthScreen('login')}
            className="px-10 py-4 bg-[#275232] hover:bg-[#1E3F27] text-white font-extrabold text-sm rounded-xl shadow-sm transition-all inline-flex items-center gap-2"
          >
            <span>Start For Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-[#E5E2DA] text-center text-xs text-[#6E726E]">
        <div>ConstructIQ — Construction Data Intelligence Platform</div>
      </footer>
    </div>
  );
}
