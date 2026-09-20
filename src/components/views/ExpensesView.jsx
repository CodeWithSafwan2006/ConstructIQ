import React, { useState } from 'react';
import { TrendingUp, DollarSign, AlertOctagon, Plus, ArrowUpRight, ArrowDownRight, CreditCard, ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import RiskBadge from '../common/RiskBadge';

export default function ExpensesView({ expenses, transactions, project, onAddExpense }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Materials');
  const [vendor, setVendor] = useState('');

  const totalBudget = project ? project.budget : 100000000;
  const totalSpent = project ? project.spent : 83000000;
  const remaining = totalBudget - totalSpent;
  const predictedCost = project ? project.predictedFinalCost : 108000000;
  const potentialOverrun = predictedCost - totalBudget;

  const chartData = expenses.map(e => ({
    category: e.category,
    Planned: e.planned / 10000000,
    Actual: e.actual / 10000000
  }));

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;

    onAddExpense({
      id: `tx_${Date.now()}`,
      date: "2026-09-20",
      description: desc,
      category: category,
      vendor: vendor || "Site Ledger Vendor",
      amount: Number(amount),
      status: "Approved"
    });

    setDesc('');
    setAmount('');
    setVendor('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Budget & Expense Intelligence</h1>
          <p className="text-xs text-[#6E726E]">Financial tracking, category allocation, cost variance, and overrun forecasting.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Record Expense</span>
        </button>
      </div>

      {/* BUDGET RISK ALERT */}
      <div className="p-6 rounded-2xl bg-[#FEE2E2] border border-[#FCA5A5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-600 text-white rounded-xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-[#991B1B]">HIGH BUDGET RISK</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-200 text-[#991B1B]">
                Forecast Overrun
              </span>
            </div>
            <p className="text-xs text-[#7F1D1D] mt-1 max-w-2xl font-medium">
              Original Budget: <span className="font-bold text-[#1E231F]">₹{(totalBudget / 10000000).toFixed(1)} Cr</span> | Current Spend: <span className="font-bold text-[#92400E]">₹{(totalSpent / 10000000).toFixed(1)} Cr</span> | Predicted Final Cost: <span className="font-bold text-[#991B1B]">₹{(predictedCost / 10000000).toFixed(1)} Cr</span>
            </p>
            <div className="text-xs font-bold text-[#991B1B] mt-1">
              Potential Overrun: ₹{(potentialOverrun / 100000).toFixed(0)} Lakh (Material cost inflation & expedited shipping)
            </div>
          </div>
        </div>

        <div className="shrink-0 p-3 rounded-xl bg-white border border-[#FCA5A5] text-right text-xs">
          <span className="text-[#6E726E] font-semibold block">Utilization Rate</span>
          <span className="text-2xl font-black text-[#92400E]">{((totalSpent / totalBudget) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
          <span className="text-xs font-bold text-[#6E726E] uppercase tracking-wider">Total Approved Budget</span>
          <div className="text-3xl font-extrabold text-[#1E231F] mt-2">₹{(totalBudget / 10000000).toFixed(1)} Cr</div>
          <span className="text-xs text-[#6E726E] mt-1 block">Ahmedabad Smart Residency</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#FDE68A] shadow-xs">
          <span className="text-xs font-bold text-[#6E726E] uppercase tracking-wider">Total Spent to Date</span>
          <div className="text-3xl font-extrabold text-[#92400E] mt-2">₹{(totalSpent / 10000000).toFixed(2)} Cr</div>
          <span className="text-xs text-[#92400E] mt-1 block font-semibold">83% of total budget</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#BBF7D0] shadow-xs">
          <span className="text-xs font-bold text-[#6E726E] uppercase tracking-wider">Remaining Uncommitted</span>
          <div className="text-3xl font-extrabold text-[#166534] mt-2">₹{(remaining / 10000000).toFixed(2)} Cr</div>
          <span className="text-xs text-[#166534] mt-1 block font-semibold">17% liquidity remaining</span>
        </div>
      </div>

      {/* Budget vs Actual Chart & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
          <h3 className="text-base font-bold text-[#1E231F] mb-1">Budget vs Actual Spend by Category</h3>
          <p className="text-xs text-[#6E726E] mb-4">Values represented in Crores (₹ Cr)</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DA" />
                <XAxis dataKey="category" stroke="#6E726E" fontSize={11} />
                <YAxis stroke="#6E726E" fontSize={11} unit=" Cr" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E5E2DA', borderRadius: '0.75rem', color: '#1E231F', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Planned" fill="#8C8275" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual" fill="#275232" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Table */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#1E231F]">Cost Category Breakdown</h3>
          
          <div className="space-y-3">
            {expenses.map((exp, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#1E231F] text-sm">{exp.category}</div>
                  <div className="text-[#6E726E] mt-0.5">Planned: ₹{(exp.planned / 10000000).toFixed(1)} Cr</div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-[#92400E]">Actual: ₹{(exp.actual / 10000000).toFixed(1)} Cr</div>
                  <div className={`text-[10px] font-bold ${exp.variance > 0 ? 'text-red-700' : 'text-[#275232]'}`}>
                    {exp.variance > 0 ? `+₹${(exp.variance / 100000).toFixed(0)} Lakh Overrun` : `-₹${(Math.abs(exp.variance) / 100000).toFixed(0)} Lakh Savings`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Log */}
      <div className="rounded-2xl bg-white border border-[#E5E2DA] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E5E2DA] bg-[#F7F5F0] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1E231F]">Recent Project Expenditure Log</h3>
          <span className="text-xs text-[#6E726E]">Site Ledger Transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F0] text-[#6E726E] font-bold uppercase tracking-wider border-b border-[#E5E2DA]">
              <tr>
                <th className="p-4">Transaction Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Category</th>
                <th className="p-4">Vendor / Subcontractor</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DA] text-[#1E231F]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                  <td className="p-4 text-[#6E726E] font-medium whitespace-nowrap">{tx.date}</td>
                  <td className="p-4 font-bold text-[#1E231F]">{tx.description}</td>
                  <td className="p-4 text-[#4A524A] font-medium">{tx.category}</td>
                  <td className="p-4 text-[#6E726E]">{tx.vendor}</td>
                  <td className="p-4 font-bold text-[#92400E]">₹{tx.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <RiskBadge level={tx.status === 'Paid' || tx.status === 'Approved' ? 'Completed' : 'Pending'} size="sm" text={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#1E231F]">Record Project Expense</h3>
            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Description</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Steel Shipment Batch 5"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                >
                  <option value="Materials">Materials</option>
                  <option value="Labour">Labour</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Contractor">Contractor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Vendor / Payee</label>
                <input 
                  type="text"
                  placeholder="e.g. Tata Tiscon"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Amount (₹)</label>
                <input 
                  type="number"
                  required
                  placeholder="e.g. 1500000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#F7F5F0] text-[#4A524A] hover:text-[#1E231F] rounded-xl text-xs font-bold border border-[#E5E2DA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
