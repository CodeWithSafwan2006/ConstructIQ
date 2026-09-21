import React, { useState } from 'react';
import { Boxes, AlertTriangle, CheckCircle2, ShoppingCart, Plus, ArrowRight, Clock, ShieldCheck, Trash2, TrendingUp } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import { useApp } from '../../context/AppContext';

export default function MaterialsView({ materials, materialRequests, onCreateRequest }) {
  const { addMaterial, deleteMaterial, updateMaterial, selectedProjectId, selectedProject, setActiveTab, addExpense } = useApp();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [recordExpense, setRecordExpense] = useState(true);

  // Filter materials for current selected project (fallback to p001 defaults if p001 selected)
  const isDummyProject = ['p001', 'p002', 'p003', 'p004', 'p005'].includes(selectedProjectId);
  const activeProjectMaterials = materials.filter(m => 
    m.projectId === selectedProjectId || (!m.projectId && isDummyProject)
  );

  const [selectedMaterial, setSelectedMaterial] = useState(activeProjectMaterials[0] || materials[0]);
  const [requestQty, setRequestQty] = useState(6);

  // New Material Form State
  const [matName, setMatName] = useState('');
  const [matCategory, setMatCategory] = useState('Civil');
  const [matAvailable, setMatAvailable] = useState('');
  const [matUnit, setMatUnit] = useState('tons');
  const [matMinLevel, setMatMinLevel] = useState('');
  const [matUnitPrice, setMatUnitPrice] = useState('');
  const [matSupplier, setMatSupplier] = useState('');
  const [matConsumption, setMatConsumption] = useState('');

  const lowStockMaterials = activeProjectMaterials.filter(m => m.available < m.minLevel);

  const handleCreateNewMaterial = (e) => {
    e.preventDefault();
    if (!matName.trim()) return;

    addMaterial({
      name: matName,
      category: matCategory,
      available: Number(matAvailable) || 0,
      unit: matUnit,
      minLevel: Number(matMinLevel) || 10,
      unitPrice: Number(matUnitPrice) || 1000,
      supplier: matSupplier || "Local Vendor Ltd",
      consumptionRate: matConsumption || "10 units/day",
      projectId: selectedProjectId
    });

    if (recordExpense && addExpense) {
      addExpense({
        id: `tx_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        description: `Material Stock: ${matName} (${matAvailable} ${matUnit})`,
        category: 'Materials',
        vendor: matSupplier || "Local Vendor",
        amount: (Number(matAvailable) || 1) * (Number(matUnitPrice) || 1000),
        status: "Approved"
      });
    }

    setMatName('');
    setMatAvailable('');
    setMatMinLevel('');
    setMatUnitPrice('');
    setMatSupplier('');
    setMatConsumption('');
    setShowAddModal(false);
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!selectedMaterial) return;

    onCreateRequest({
      id: `mr_${Date.now()}`,
      materialId: selectedMaterial.id,
      materialName: selectedMaterial.name,
      quantity: Number(requestQty),
      unit: selectedMaterial.unit,
      requestedBy: "Project Manager (Rohan Mehta)",
      date: new Date().toISOString().split('T')[0],
      status: "Approved & Sent to Vendor",
      priority: "URGENT",
      reason: `Stock level (${selectedMaterial.available} ${selectedMaterial.unit}) below safety minimum threshold (${selectedMaterial.minLevel} ${selectedMaterial.unit}).`
    });

    setShowRequestModal(false);
  };

  return (
    <div className="space-y-6 pb-12 text-[#1E231F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E231F] tracking-tight">Material & Inventory Management</h1>
          <p className="text-xs text-[#6E726E]">Track site inventory levels, consumption rates, and automated procurement requests.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('expenses')}
            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#F7F5F0] text-[#275232] border border-[#C6DCBF] font-semibold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Expense Ledger</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F7F5F0] text-[#275232] border border-[#C6DCBF] font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Material</span>
          </button>

          <button
            onClick={() => {
              setSelectedMaterial(materials[0]);
              setShowRequestModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Create Material Request</span>
          </button>
        </div>
      </div>

      {/* LOW STOCK ALERT BANNER */}
      {lowStockMaterials.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-[#D97706] text-white rounded-xl shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#92400E]">LOW STOCK ALERT</h3>
                  <p className="text-xs text-[#78350F]">Inventory threshold breach detected by system</p>
                </div>
              </div>

              {lowStockMaterials.map(m => (
                <div key={m.id} className="mt-3 p-3 rounded-xl bg-white border border-[#FDE68A] text-xs">
                  <div className="flex justify-between font-bold text-[#1E231F] mb-1">
                    <span>{m.name}</span>
                    <span className="text-red-700">{m.available} {m.unit} Available</span>
                  </div>
                  <p className="text-[11px] text-[#6E726E]">
                    Required Minimum Threshold: <span className="font-bold text-[#1E231F]">{m.minLevel} {m.unit}</span>. Current stock is below threshold by {m.minLevel - m.available} {m.unit}.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#FDE68A] flex items-center justify-between">
              <span className="text-xs text-[#92400E] font-bold">Recommended Procurement Action</span>
              <button
                onClick={() => {
                  setSelectedMaterial(lowStockMaterials[0]);
                  setRequestQty(lowStockMaterials[0].recommendedProcurement || 6);
                  setShowRequestModal(true);
                }}
                className="px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Procure {lowStockMaterials[0]?.recommendedProcurement || 6} {lowStockMaterials[0]?.unit || 'Units'} Now
              </button>
            </div>
          </div>

          {/* PROCUREMENT DECISION CARD */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#275232] px-2 py-0.5 rounded bg-[#E5EFE2] border border-[#C6DCBF]">
                Procurement Decision Engine
              </span>
              <h3 className="text-base font-bold text-[#1E231F] mt-2">Recommended Material Order</h3>

              <div className="space-y-2 mt-3 text-xs text-[#4A524A]">
                <div className="flex justify-between p-2 rounded-lg bg-[#F7F5F0] border border-[#E5E2DA]">
                  <span>Critical Item:</span>
                  <span className="font-bold text-red-700">{lowStockMaterials[0]?.name || 'TMT Steel Bars'}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#F7F5F0] border border-[#E5E2DA]">
                  <span>Available Stock:</span>
                  <span className="font-bold text-red-700">{lowStockMaterials[0]?.available || 12} {lowStockMaterials[0]?.unit || 'tons'}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#E5EFE2] border border-[#C6DCBF] text-[#275232]">
                  <span>Recommended Order:</span>
                  <span className="font-extrabold text-[#275232]">{lowStockMaterials[0]?.recommendedProcurement || 6} {lowStockMaterials[0]?.unit || 'tons'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedMaterial(lowStockMaterials[0] || materials[0]);
                setRequestQty(lowStockMaterials[0]?.recommendedProcurement || 6);
                setShowRequestModal(true);
              }}
              className="w-full mt-4 py-2.5 bg-[#275232] hover:bg-[#1E3F27] text-white font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              Create Material Request
            </button>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="rounded-2xl bg-white border border-[#E5E2DA] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E5E2DA] bg-[#F7F5F0] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1E231F]">Site Inventory Registry</h3>
          <span className="text-xs text-[#6E726E]">{activeProjectMaterials.length} Materials Tracked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5F0] text-[#6E726E] font-bold uppercase tracking-wider border-b border-[#E5E2DA]">
              <tr>
                <th className="p-4">Material Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Available Stock</th>
                <th className="p-4">Min. Threshold</th>
                <th className="p-4">Est. Consumption</th>
                <th className="p-4">Supplier</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DA] text-[#1E231F]">
              {activeProjectMaterials.map((m) => (
                <tr key={m.id} className="hover:bg-[#F7F5F0]/60 transition-colors">
                  <td className="p-4 font-bold text-[#1E231F]">
                    {m.name}
                  </td>
                  <td className="p-4 text-[#6E726E] font-medium">{m.category}</td>
                  <td className="p-4 font-bold text-[#1E231F]">
                    <span className={m.available < m.minLevel ? 'text-red-700' : 'text-[#275232]'}>
                      {m.available} {m.unit}
                    </span>
                  </td>
                  <td className="p-4 text-[#6E726E] font-medium">{m.minLevel} {m.unit}</td>
                  <td className="p-4 text-[#4A524A] font-medium">{m.consumptionRate}</td>
                  <td className="p-4 text-[#6E726E]">{m.supplier}</td>
                  <td className="p-4">
                    <RiskBadge level={m.status} size="sm" />
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedMaterial(m);
                          setRequestQty(m.recommendedProcurement || 10);
                          setShowRequestModal(true);
                        }}
                        className="px-3 py-1 bg-white hover:bg-[#F7F5F0] text-[#275232] font-bold rounded-lg text-[11px] border border-[#E5E2DA] transition-colors shadow-xs"
                      >
                        Request
                      </button>
                      <button
                        onClick={() => deleteMaterial(m.id)}
                        title="Delete material"
                        className="p-1 text-[#8C8275] hover:text-red-700 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Material Requests Log */}
      <div className="rounded-2xl bg-white border border-[#E5E2DA] p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#1E231F]">Active Material Purchase Requests</h3>
        
        <div className="space-y-3">
          {materialRequests.map((req) => (
            <div key={req.id} className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1E231F] text-sm">{req.materialName}</span>
                  <span className="px-2 py-0.5 rounded bg-[#E5EFE2] text-[#275232] font-bold text-[10px]">
                    Qty: {req.quantity} {req.unit}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] font-bold text-[10px]">
                    {req.status}
                  </span>
                </div>
                <p className="text-[#6E726E] mt-1">{req.reason}</p>
                <div className="text-[10px] text-[#8C8275] mt-1">Requested by: {req.requestedBy} • Date: {req.date}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-bold text-[#275232] flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> PO Generated
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#1E231F]">Add Material to Registry</h3>
            
            <form onSubmit={handleCreateNewMaterial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Material Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Reinforced Steel Mesh"
                  value={matName}
                  onChange={(e) => setMatName(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Category</label>
                  <select
                    value={matCategory}
                    onChange={(e) => setMatCategory(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  >
                    <option value="Civil">Civil</option>
                    <option value="Structural">Structural</option>
                    <option value="MEP">MEP</option>
                    <option value="Finishing">Finishing</option>
                    <option value="Electrical">Electrical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Unit of Measurement</label>
                  <input 
                    type="text" 
                    placeholder="e.g. tons, bags, sq.m"
                    value={matUnit}
                    onChange={(e) => setMatUnit(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Available Stock</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 50"
                    value={matAvailable}
                    onChange={(e) => setMatAvailable(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Min. Safety Threshold</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 20"
                    value={matMinLevel}
                    onChange={(e) => setMatMinLevel(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Unit Price (₹)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 62000"
                    value={matUnitPrice}
                    onChange={(e) => setMatUnitPrice(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A524A] mb-1">Supplier / Vendor</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Tata Tiscon"
                    value={matSupplier}
                    onChange={(e) => setMatSupplier(e.target.value)}
                    className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Est. Consumption Rate</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2 tons/day"
                  value={matConsumption}
                  onChange={(e) => setMatConsumption(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E5E2DA]">
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
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Procurement Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-[#E5E2DA] rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#1E231F]">Create Material Order Request</h3>
            
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Select Material</label>
                <select
                  value={selectedMaterial?.id || ''}
                  onChange={(e) => setSelectedMaterial(materials.find(m => m.id === e.target.value))}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                >
                  {materials.map(m => (
                    <option key={m.id} value={m.id}>{m.name} (Current: {m.available} {m.unit})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A524A] mb-1">Order Quantity ({selectedMaterial?.unit})</label>
                <input 
                  type="number" 
                  min="1"
                  value={requestQty}
                  onChange={(e) => setRequestQty(e.target.value)}
                  className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-xl px-3 py-2 text-xs text-[#1E231F] focus:outline-none focus:border-[#275232]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#F7F5F0] border border-[#E5E2DA] text-xs text-[#6E726E] space-y-1">
                <div className="flex justify-between"><span>Supplier:</span> <span className="text-[#1E231F]">{selectedMaterial?.supplier}</span></div>
                <div className="flex justify-between"><span>Unit Price:</span> <span className="text-[#1E231F]">₹{selectedMaterial?.unitPrice} / {selectedMaterial?.unit}</span></div>
                <div className="flex justify-between font-bold border-t border-[#E5E2DA] pt-1 text-[#275232]">
                  <span>Est. Total Cost:</span>
                  <span>₹{((selectedMaterial?.unitPrice || 0) * requestQty).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E5E2DA]">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 bg-[#F7F5F0] text-[#4A524A] hover:text-[#1E231F] rounded-xl text-xs font-bold border border-[#E5E2DA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#275232] hover:bg-[#1E3F27] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  Submit Material Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
