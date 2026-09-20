import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  initialProjects, 
  initialTasks, 
  initialMaterials, 
  initialMaterialRequests, 
  expenseBreakdown, 
  recentTransactions, 
  initialIssues,
  initialDocuments,
  teamMembers,
  aiPredefinedResponses
} from '../data/mockData';
import { calculateProjectRisk } from '../utils/riskEngine';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Load initial state with localStorage persistence
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('constructiq_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('constructiq_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [materials, setMaterials] = useState(() => {
    const saved = localStorage.getItem('constructiq_materials');
    return saved ? JSON.parse(saved) : initialMaterials;
  });

  const [materialRequests, setMaterialRequests] = useState(() => {
    const saved = localStorage.getItem('constructiq_material_requests');
    return saved ? JSON.parse(saved) : initialMaterialRequests;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('constructiq_expenses');
    return saved ? JSON.parse(saved) : expenseBreakdown;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('constructiq_transactions');
    return saved ? JSON.parse(saved) : recentTransactions;
  });

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('constructiq_issues');
    return saved ? JSON.parse(saved) : initialIssues;
  });

  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('constructiq_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('constructiq_team');
    return saved ? JSON.parse(saved) : teamMembers;
  });

  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('constructiq_role') || 'pm';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState('p001');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('constructiq_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('constructiq_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('constructiq_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('constructiq_material_requests', JSON.stringify(materialRequests));
  }, [materialRequests]);

  useEffect(() => {
    localStorage.setItem('constructiq_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('constructiq_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('constructiq_issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('constructiq_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('constructiq_role', activeRole);
  }, [activeRole]);

  // Toast notification system
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Selected project object
  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || projects[0] || {
      id: "p_default",
      name: "Default Construction Site",
      client: "Enterprise Client",
      budget: 100000000,
      spent: 50000000,
      progress: 50,
      status: "In Progress"
    };
  }, [projects, selectedProjectId]);

  // Compute live explainable risk model for selected project
  const riskAnalysis = useMemo(() => {
    const heroTasks = tasks.filter(t => t.projectId === selectedProjectId || (selectedProject && t.projectName === selectedProject.name));
    const heroMaterials = materials.filter(m => !m.projectId || m.projectId === selectedProjectId);
    return calculateProjectRisk({
      tasks: heroTasks.length > 0 ? heroTasks : tasks,
      materials: heroMaterials.length > 0 ? heroMaterials : materials,
      project: selectedProject,
      issues: issues.filter(i => i.projectId === selectedProjectId || (selectedProject && i.projectName === selectedProject.name))
    });
  }, [tasks, materials, selectedProject, issues, selectedProjectId]);

  // Project CRUD
  const addProject = (newProject) => {
    const projObj = {
      id: `p_${Date.now()}`,
      budget: 100000000,
      spent: 0,
      predictedFinalCost: newProject.budget || 100000000,
      forecastOverrun: 0,
      progress: 0,
      plannedProgress: 0,
      status: "On Track",
      riskLevel: "LOW",
      riskScore: 10,
      startDate: new Date().toISOString().split('T')[0],
      targetDate: "2027-12-31",
      manager: activeRole === 'pm' ? 'Rohan Mehta' : 'Site Lead',
      siteEngineer: "Vikram Patel",
      category: "Commercial Infrastructure",
      workforceAvailable: 95,
      ...newProject
    };
    setProjects(prev => [projObj, ...prev]);
    setSelectedProjectId(projObj.id);
    showToast(`Project "${projObj.name}" created successfully.`, 'success');
  };

  const updateProject = (projectId, updatedData) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updatedData } : p));
    showToast("Project details updated.", 'info');
  };

  const deleteProject = (projectId) => {
    setProjects(prev => {
      const remaining = prev.filter(p => p.id !== projectId);
      if (selectedProjectId === projectId && remaining.length > 0) {
        setSelectedProjectId(remaining[0].id);
      }
      return remaining;
    });
    showToast("Project removed from repository.", 'warning');
  };

  // Material CRUD & Request handler
  const addMaterial = (newMat) => {
    const availableVal = Number(newMat.available) || 0;
    const minVal = Number(newMat.minLevel) || 10;
    const matObj = {
      id: `m_${Date.now()}`,
      category: "Civil",
      unit: "units",
      unitPrice: 500,
      supplier: "Local Supplier",
      consumptionRate: "5 units/day",
      projectId: selectedProjectId,
      status: availableVal < minVal ? "LOW STOCK" : "OK",
      ...newMat,
      available: availableVal,
      minLevel: minVal
    };
    setMaterials(prev => [matObj, ...prev]);
    showToast(`Material "${matObj.name}" added to inventory registry.`, 'success');
  };

  const updateMaterial = (materialId, updatedData) => {
    setMaterials(prev => prev.map(m => {
      if (m.id === materialId) {
        const merged = { ...m, ...updatedData };
        merged.status = Number(merged.available) < Number(merged.minLevel) ? "LOW STOCK" : "OK";
        return merged;
      }
      return m;
    }));
    showToast("Material inventory updated.", 'info');
  };

  const deleteMaterial = (materialId) => {
    setMaterials(prev => prev.filter(m => m.id !== materialId));
    showToast("Material removed from inventory.", 'warning');
  };

  const createMaterialRequest = (newRequest) => {
    const req = newRequest || {
      id: `mr_${Date.now()}`,
      materialId: "m002",
      materialName: "TMT Steel Bars (16mm)",
      quantity: 6,
      unit: "tons",
      requestedBy: activeRole === 'admin' ? 'System Admin' : activeRole === 'site_eng' ? 'Site Engineer (Vikram)' : 'Project Manager (Rohan Mehta)',
      date: new Date().toISOString().split('T')[0],
      status: "Approved & Sent to Vendor",
      priority: "URGENT",
      reason: "Inventory below safety minimum threshold. Required for structural slab casting."
    };

    setMaterialRequests(prev => [req, ...prev]);

    // Update material availability state
    setMaterials(prev => prev.map(m => {
      if (m.id === req.materialId || (m.name && req.materialName && m.name.toLowerCase().includes(req.materialName.toLowerCase().split(' ')[0]))) {
        const updatedAvailable = (Number(m.available) || 0) + (Number(req.quantity) || 6);
        return {
          ...m,
          available: updatedAvailable,
          status: updatedAvailable >= m.minLevel ? "OK" : "LOW STOCK"
        };
      }
      return m;
    }));

    showToast(`Material Request for ${req.quantity} ${req.unit} ${req.materialName} created & approved!`, 'success');
  };

  const approveMaterialRequest = (reqId) => {
    setMaterialRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: "Approved & Sent to Vendor" } : r));
    showToast("Purchase request approved and dispatched to supplier.", 'success');
  };

  // Task actions
  const addTask = (newTask) => {
    const taskObj = {
      id: `t_${Date.now()}`,
      projectId: selectedProjectId,
      projectName: selectedProject.name,
      progress: 0,
      status: 'Pending',
      category: 'General',
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      priority: 'Medium',
      ...newTask
    };
    setTasks(prev => [taskObj, ...prev]);
    showToast(`Task "${taskObj.name}" created successfully.`, 'success');
  };

  const updateTask = (taskId, updatedData) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updatedData } : t));
    showToast("Task updated.", 'info');
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast("Task removed.", 'warning');
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updatedProgress = newStatus === 'Completed' ? 100 : newStatus === 'Pending' ? 0 : t.progress;
        return { ...t, status: newStatus, progress: updatedProgress };
      }
      return t;
    }));
    showToast(`Task status updated to ${newStatus}.`, 'info');
  };

  // Expense actions
  const addExpense = (newTx) => {
    const tx = {
      id: `tx_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: "Paid",
      ...newTx
    };
    setTransactions(prev => [tx, ...prev]);
    
    setExpenses(prev => prev.map(e => {
      if (e.category === tx.category) {
        const newActual = e.actual + Number(tx.amount);
        return {
          ...e,
          actual: newActual,
          variance: newActual - e.planned
        };
      }
      return e;
    }));

    setProjects(prev => prev.map(p => {
      if (p.id === selectedProjectId) {
        return { ...p, spent: p.spent + Number(tx.amount) };
      }
      return p;
    }));

    showToast(`Expense ₹${Number(tx.amount).toLocaleString('en-IN')} recorded under ${tx.category}.`, 'success');
  };

  // Issue actions
  const addIssue = (newIssue) => {
    const issueObj = {
      id: `iss_${Date.now()}`,
      projectId: selectedProjectId,
      projectName: selectedProject.name,
      status: "Open",
      createdAt: new Date().toISOString().split('T')[0],
      assignedTo: "Project Manager",
      priority: "Medium",
      ...newIssue
    };
    setIssues(prev => [issueObj, ...prev]);
    showToast(`Operational Issue "${issueObj.title}" logged.`, 'warning');
  };

  const resolveIssue = (issueId) => {
    setIssues(prev => prev.map(i => i.id === issueId ? { ...i, status: "Resolved" } : i));
    showToast(`Issue resolved.`, 'success');
  };

  // Document actions
  const addDocument = (newDoc) => {
    const docObj = {
      id: `doc_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: "Verified",
      format: "PDF",
      fileSize: "2.5 MB",
      uploadedBy: activeRole === 'pm' ? 'Rohan Mehta (PM)' : 'System User',
      projectId: selectedProjectId,
      ...newDoc
    };
    setDocuments(prev => [docObj, ...prev]);
    showToast(`Document "${docObj.title}" added to repository.`, 'success');
  };

  const deleteDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    showToast("Document deleted.", 'warning');
  };

  // Data Import Center handler for all formats & categories
  const importCSVData = (parsedRecords, defaultCategory = 'auto') => {
    if (!Array.isArray(parsedRecords) || parsedRecords.length === 0) {
      showToast("No valid records found in uploaded data.", 'warning');
      return;
    }

    let importedTasksCount = 0;
    let importedMaterialsCount = 0;
    let importedExpensesCount = 0;
    let importedProjectsCount = 0;

    parsedRecords.forEach((row, idx) => {
      const type = (row.type || '').toLowerCase();
      const isTask = type.includes('task') || row.taskName || row.activity || (!row.materialName && !row.available && (row.progress !== undefined || row.dueDate || row.assignedTo));
      const isMaterial = type.includes('material') || type.includes('inventory') || row.materialName || row.available !== undefined || row.minLevel !== undefined || row.supplier;
      const isExpense = type.includes('expense') || type.includes('transaction') || (row.amount && row.vendor);
      const isProject = type.includes('project') || (row.budget && row.client);

      if (isProject) {
        const newProj = {
          id: `imp_p_${Date.now()}_${idx}`,
          name: row.name || row.projectName || `Imported Project ${idx + 1}`,
          client: row.client || "Client Ingested",
          location: row.location || "Gujarat, India",
          budget: Number(row.budget) || 50000000,
          spent: Number(row.spent) || 0,
          predictedFinalCost: Number(row.budget) || 50000000,
          progress: Number(row.progress) || 0,
          status: row.status || "On Track",
          riskLevel: "LOW",
          targetDate: row.targetDate || "2027-12-31",
          manager: row.manager || "Site Manager",
          category: row.category || "Commercial"
        };
        setProjects(prev => [newProj, ...prev]);
        importedProjectsCount++;
      } else if (isMaterial) {
        const availableVal = Number(row.available || row.qty || row.stock || 100);
        const minVal = Number(row.minLevel || row.minStock || 50);
        const newMat = {
          id: `imp_m_${Date.now()}_${idx}`,
          name: row.name || row.materialName || row.item || `Imported Material ${idx + 1}`,
          category: row.category || "Civil",
          available: availableVal,
          unit: row.unit || "units",
          minLevel: minVal,
          unitPrice: Number(row.unitPrice || row.price || 500),
          supplier: row.supplier || row.vendor || "Supplier Imports",
          status: availableVal < minVal ? "LOW STOCK" : "OK",
          consumptionRate: row.consumption || "10 units/day",
          projectId: selectedProjectId
        };
        setMaterials(prev => [newMat, ...prev]);
        importedMaterialsCount++;
      } else if (isExpense) {
        const txObj = {
          id: `imp_tx_${Date.now()}_${idx}`,
          date: row.date || new Date().toISOString().split('T')[0],
          description: row.description || row.name || `Imported Expense ${idx + 1}`,
          category: row.category || "Materials",
          vendor: row.vendor || "Vendor",
          amount: Number(row.amount) || 100000,
          status: row.status || "Paid"
        };
        setTransactions(prev => [txObj, ...prev]);
        importedExpensesCount++;
      } else {
        // Default to Task
        const newTask = {
          id: `imp_t_${Date.now()}_${idx}`,
          name: row.name || row.taskName || row.activity || `Imported Task ${idx + 1}`,
          projectId: selectedProjectId,
          projectName: selectedProject.name,
          assignedTo: row.contractor || row.assignedTo || "Assigned Contractor",
          progress: Number(row.progress) || 0,
          dueDate: row.dueDate || "2026-12-31",
          priority: row.priority || "Medium",
          status: row.status || (Number(row.progress) === 100 ? "Completed" : "In Progress"),
          category: row.category || "Civil"
        };
        setTasks(prev => [newTask, ...prev]);
        importedTasksCount++;
      }
    });

    const summaryParts = [];
    if (importedTasksCount > 0) summaryParts.push(`${importedTasksCount} Tasks`);
    if (importedMaterialsCount > 0) summaryParts.push(`${importedMaterialsCount} Materials`);
    if (importedExpensesCount > 0) summaryParts.push(`${importedExpensesCount} Expenses`);
    if (importedProjectsCount > 0) summaryParts.push(`${importedProjectsCount} Projects`);

    showToast(`Successfully Ingested ${parsedRecords.length} records (${summaryParts.join(', ')}).`, 'success');
  };

  // Reset to Benchmark Data
  const resetToBenchmarkData = () => {
    localStorage.removeItem('constructiq_projects');
    localStorage.removeItem('constructiq_tasks');
    localStorage.removeItem('constructiq_materials');
    localStorage.removeItem('constructiq_material_requests');
    localStorage.removeItem('constructiq_expenses');
    localStorage.removeItem('constructiq_transactions');
    localStorage.removeItem('constructiq_issues');
    localStorage.removeItem('constructiq_documents');
    localStorage.removeItem('constructiq_role');

    setProjects(initialProjects);
    setTasks(initialTasks);
    setMaterials(initialMaterials);
    setMaterialRequests(initialMaterialRequests);
    setExpenses(expenseBreakdown);
    setTransactions(recentTransactions);
    setIssues(initialIssues);
    setDocuments(initialDocuments);
    setTeam(teamMembers);
    setActiveRole('pm');
    setSelectedProjectId('p001');

    showToast("ConstructIQ platform data reset to initial benchmark state.", 'info');
  };

  // Computed counts
  const lowStockCount = materials.filter(m => m.available < m.minLevel).length;
  const openIssuesCount = issues.filter(i => i.status !== "Resolved").length;

  return (
    <AppContext.Provider value={{
      projects,
      tasks,
      materials,
      materialRequests,
      expenses,
      transactions,
      issues,
      documents,
      team,
      activeRole,
      setActiveRole,
      activeTab,
      setActiveTab,
      selectedProjectId,
      setSelectedProjectId,
      selectedProject,
      riskAnalysis,
      lowStockCount,
      openIssuesCount,
      createMaterialRequest,
      approveMaterialRequest,
      addProject,
      updateProject,
      deleteProject,
      addMaterial,
      updateMaterial,
      deleteMaterial,
      addTask,
      updateTask,
      deleteTask,
      updateTaskStatus,
      addExpense,
      addIssue,
      resolveIssue,
      addDocument,
      deleteDocument,
      importCSVData,
      resetToBenchmarkData,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      toast,
      showToast
    }}>
      {children}

      {/* Toast Render */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl border font-bold text-xs flex items-center gap-3 animate-bounce-subtle ${
          toast.type === 'warning' ? 'bg-amber-900/90 text-amber-200 border-amber-500/50' :
          toast.type === 'info' ? 'bg-blue-900/90 text-blue-200 border-blue-500/50' :
          'bg-emerald-900/90 text-emerald-200 border-emerald-500/50'
        }`}>
          <div className={`w-2.5 h-2.5 rounded-full ${
            toast.type === 'warning' ? 'bg-amber-400' : toast.type === 'info' ? 'bg-blue-400' : 'bg-emerald-400'
          }`} />
          <span>{toast.message}</span>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
