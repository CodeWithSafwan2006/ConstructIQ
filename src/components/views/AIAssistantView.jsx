import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, ArrowRight, Zap, CheckCircle2, ShoppingCart, FileText, AlertTriangle, Database } from 'lucide-react';
import { aiPredefinedResponses } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export default function AIAssistantView() {
  const { setActiveTab, createMaterialRequest, projects, tasks, materials, expenses, issues, showToast } = useApp();

  const [messages, setMessages] = useState([
    {
      id: "m0",
      sender: "ai",
      text: `Hello Rohan! I am **ConstructIQ AI**, your real-time construction intelligence assistant.

I have synthesized live site data across all active projects, material stock levels, contractor schedules, and expense ledgers.

**How can I assist your operations today?**`,
      timestamp: "12:45 PM",
      sources: ["Projects Data", "Tasks Engine", "Materials Ledger"]
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "Which projects are currently at risk?",
    "Why is Ahmedabad Smart Residency delayed?",
    "What should I focus on today?",
    "Which material needs immediate procurement?",
    "Will this project exceed its budget?"
  ];

  const handleAskQuestion = (questionText) => {
    const q = questionText || inputQuestion;
    if (!q.trim()) return;

    const userMsg = {
      id: `m_${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion("");
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "";
      let sources = ["Tasks", "Materials", "Expenses"];
      let hasProcureAction = false;
      let hasReportAction = false;

      const qLower = q.toLowerCase();

      let matched = aiPredefinedResponses.find(r => r.question.toLowerCase() === qLower);

      if (matched) {
        aiText = matched.answer;
        if (qLower.includes("material") || qLower.includes("steel") || qLower.includes("procurement")) {
          hasProcureAction = true;
          sources = ["Materials Inventory", "Procurement Engine", "Task Schedules"];
        } else if (qLower.includes("risk") || qLower.includes("delayed")) {
          hasReportAction = true;
          hasProcureAction = true;
          sources = ["Smart Risk Engine", "Tasks Log", "Material Inventory"];
        } else if (qLower.includes("budget")) {
          hasReportAction = true;
          sources = ["Expenses Ledger", "Predicted Overrun Engine", "BOQ"];
        } else if (qLower.includes("focus")) {
          hasProcureAction = true;
          hasReportAction = true;
          sources = ["Tasks Log", "Materials Ledger", "Issues Tracker"];
        }
      } else if (qLower.includes("risk") || qLower.includes("delayed") || qLower.includes("why")) {
        aiText = `**Ahmedabad Smart Residency is currently at HIGH RISK (Score: 75/100).**

**Primary factors:**
1. **Electrical installation delay** (45% vs expected 65%, due 20 Sep 2026).
2. **Steel inventory shortage** (12 tons available vs 15 tons minimum threshold).
3. **Material spending overrun** (+₹20 Lakh material cost variance, ₹10.8 Cr forecast).

**Recommended action:**
Prioritize electrical work, assign additional workers, and initiate steel procurement immediately.`;
        hasProcureAction = true;
        hasReportAction = true;
        sources = ["Smart Risk Engine", "Tasks Log", "Materials Inventory"];
      } else if (qLower.includes("steel") || qLower.includes("material") || qLower.includes("procurement")) {
        aiText = `**Steel requires immediate attention.**

• **Current Available:** 12 tons
• **Minimum Threshold:** 15 tons
• **Recommended Procurement:** 6 tons

**Reason:**
Upcoming structural slab casting on Floor 12 requires 6 tons of TMT Steel within 48 hours to avoid total project delay.`;
        hasProcureAction = true;
        sources = ["Materials Inventory", "Procurement Engine"];
      } else if (qLower.includes("budget") || qLower.includes("cost") || qLower.includes("overrun")) {
        aiText = `**The project currently has HIGH budget risk.**

• **Original Budget:** ₹10 Cr
• **Current Spending:** ₹8.3 Cr
• **Predicted Final Cost:** ₹10.8 Cr
• **Potential Overrun:** ₹80 Lakh

**Primary Driver:** Material price inflation (+5% variance on Steel & Concrete).
**Recommended Action:** Review material procurement and contractor costs.`;
        hasReportAction = true;
        sources = ["Expenses Ledger", "Predicted Overrun Engine", "BOQ"];
      } else {
        aiText = `ConstructIQ AI synthesized your query against live project telemetry.

Current Summary for **Ahmedabad Smart Residency**:
• Progress: 68% (Lagging plan by 2%)
• Health: AT RISK (75/100)
• Critical Attention: Electrical Installation & Steel procurement.

What specific operational details would you like to review next?`;
        sources = ["Tasks", "Materials", "Expenses"];
      }

      const aiMsg = {
        id: `m_${Date.now() + 1}`,
        sender: "ai",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources,
        hasProcureAction,
        hasReportAction
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#275232] bg-[#E5EFE2] px-2.5 py-0.5 rounded border border-[#C6DCBF]">
              AI Decision Engine
            </span>
            <span className="text-xs text-[#275232] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#275232] animate-pulse" /> Live Telemetry Context
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight mt-1 flex items-center gap-2">
            ConstructIQ AI Assistant <Sparkles className="w-5 h-5 text-[#275232]" />
          </h1>
          <p className="text-xs text-[#6E726E]">Conversational site intelligence, explainable risk rationale, and 1-click management action triggers.</p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chat Window */}
        <div className="lg:col-span-8 flex flex-col h-[650px] bg-white border border-[#E5E2DA] rounded-2xl shadow-xs overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto justify-end' : ''}`}
              >
                {msg.sender === 'ai' && (
                  <div className="p-2.5 bg-[#275232] text-white rounded-xl h-10 w-10 shrink-0 flex items-center justify-center shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div className={`space-y-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-[#275232] text-white font-medium rounded-tr-none shadow-xs' 
                      : 'bg-[#F7F5F0] text-[#1E231F] border border-[#E5E2DA] rounded-tl-none shadow-xs'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    {/* Sources Tag */}
                    {msg.sender === 'ai' && msg.sources && (
                      <div className="mt-3 pt-2 border-t border-[#E5E2DA] flex items-center gap-2 text-[10px] text-[#6E726E] font-semibold">
                        <Database className="w-3 h-3 text-[#275232]" />
                        <span>Sources used:</span>
                        <div className="flex flex-wrap gap-1">
                          {msg.sources.map((s, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-[#E5EFE2] text-[#275232] border border-[#C6DCBF] font-mono">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Triggers INSIDE Answers */}
                    {msg.sender === 'ai' && (msg.hasProcureAction || msg.hasReportAction) && (
                      <div className="mt-4 pt-3 border-t border-[#E5E2DA] flex flex-wrap gap-2">
                        {msg.hasProcureAction && (
                          <button
                            onClick={() => {
                              createMaterialRequest();
                            }}
                            className="px-3.5 py-2 bg-[#D97706] hover:bg-[#B45309] text-white font-extrabold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Create Material Request (6 Tons Steel)</span>
                          </button>
                        )}

                        {msg.hasReportAction && (
                          <button
                            onClick={() => setActiveTab('reports')}
                            className="px-3.5 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Generate Weekly Report</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#8C8275] px-1">{msg.timestamp}</span>
                </div>

                {msg.sender === 'user' && (
                  <div className="p-2.5 bg-[#E5EFE2] text-[#275232] rounded-xl h-10 w-10 shrink-0 flex items-center justify-center border border-[#C6DCBF]">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#275232] text-white rounded-xl h-10 w-10 shrink-0 flex items-center justify-center">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div className="p-3 bg-[#F7F5F0] rounded-2xl border border-[#E5E2DA] text-xs text-[#6E726E] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#275232] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#275232] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#275232] animate-bounce [animation-delay:0.4s]" />
                  <span>Querying ConstructIQ telemetry engine...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E2DA]">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleAskQuestion(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask ConstructIQ AI about project risks, materials, tasks, or budgets..."
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                className="flex-1 bg-white border border-[#E5E2DA] rounded-xl px-4 py-3 text-xs text-[#1E231F] placeholder-[#8C8275] focus:outline-none focus:border-[#275232] transition-colors"
              />
              <button
                type="submit"
                className="p-3 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-xl shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Suggested Questions Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
            <h3 className="text-sm font-bold text-[#1E231F] mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#275232]" />
              <span>Suggested Operational Prompts</span>
            </h3>
            <p className="text-xs text-[#6E726E] mb-4">Click any question below to trigger AI analysis:</p>

            <div className="space-y-2.5">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskQuestion(q)}
                  className="w-full text-left p-3 rounded-xl bg-[#F7F5F0] hover:bg-[#E5EFE2] border border-[#E5E2DA] hover:border-[#C6DCBF] text-xs text-[#1E231F] hover:text-[#275232] font-medium transition-all group flex items-center justify-between"
                >
                  <span>"{q}"</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C8275] group-hover:text-[#275232] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-[#1E231F] border-b border-[#E5E2DA] pb-2">Active AI Data Context</h4>
            <div className="flex justify-between"><span className="text-[#6E726E]">Primary Site:</span> <span className="text-[#1E231F] font-medium">Ahmedabad Smart Residency</span></div>
            <div className="flex justify-between"><span className="text-[#6E726E]">Engine Status:</span> <span className="text-[#275232] font-medium">Telemetry Connected</span></div>
            <div className="flex justify-between"><span className="text-[#6E726E]">Risk Score:</span> <span className="text-[#991B1B] font-bold">75/100 (HIGH RISK)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
