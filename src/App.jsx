import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import CommandPalette from './components/common/CommandPalette';

import DashboardView from './components/views/DashboardView';
import ProjectsView from './components/views/ProjectsView';
import TasksView from './components/views/TasksView';
import MaterialsView from './components/views/MaterialsView';
import ExpensesView from './components/views/ExpensesView';
import IssuesView from './components/views/IssuesView';
import TeamView from './components/views/TeamView';
import AnalyticsView from './components/views/AnalyticsView';
import AIAssistantView from './components/views/AIAssistantView';
import ReportsView from './components/views/ReportsView';
import DocumentsView from './components/views/DocumentsView';
import ImportView from './components/views/ImportView';
import SettingsView from './components/views/SettingsView';
import LandingView from './components/views/LandingView';
import LoginView from './components/views/LoginView';
import AddSiteView from './components/views/AddSiteView';

import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

/**
 * Renders the correct screen based on the auth state.
 * authScreen can be: 'landing' | 'login' | 'add-site' | 'app'
 */
function AuthGate() {
  const { authScreen } = useAuth();

  if (authScreen === 'landing') return <LandingView />;
  if (authScreen === 'login')   return <LoginView />;
  if (authScreen === 'add-site') return <AddSiteView />;

  // 'app' — full authenticated workspace
  return <MainAppContent />;
}

function MainAppContent() {
  const {
    activeTab,
    setActiveTab,
    activeRole,
    setActiveRole,
    projects,
    tasks,
    materials,
    materialRequests,
    expenses,
    transactions,
    issues,
    documents,
    team,
    riskAnalysis,
    lowStockCount,
    openIssuesCount,
    createMaterialRequest,
    addTask,
    updateTaskStatus,
    addExpense,
    addIssue,
    resolveIssue
  } = useApp();

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1E231F] flex font-sans antialiased">
      {/* Global Command Palette Ctrl+K */}
      <CommandPalette />

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        lowStockCount={lowStockCount}
        openIssuesCount={openIssuesCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#F7F5F0]">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto ml-64 bg-[#F7F5F0]">
          {activeTab === 'dashboard' && (
            <DashboardView
              onNavigate={setActiveTab}
              onCreateMaterialRequest={() => createMaterialRequest()}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              projects={projects}
              tasks={tasks}
              materials={materials}
              expenses={expenses}
              issues={issues}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksView
              tasks={tasks}
              onAddTask={addTask}
              onUpdateTaskStatus={updateTaskStatus}
            />
          )}

          {activeTab === 'materials' && (
            <MaterialsView
              materials={materials}
              materialRequests={materialRequests}
              onCreateRequest={createMaterialRequest}
            />
          )}

          {activeTab === 'expenses' && (
            <ExpensesView
              expenses={expenses}
              transactions={transactions}
              project={projects[0]}
              onAddExpense={addExpense}
            />
          )}

          {activeTab === 'issues' && (
            <IssuesView
              issues={issues}
              onAddIssue={addIssue}
              onResolveIssue={resolveIssue}
            />
          )}

          {activeTab === 'team' && <TeamView />}

          {activeTab === 'analytics' && (
            <AnalyticsView
              projects={projects}
              tasks={tasks}
              materials={materials}
              expenses={expenses}
              riskAnalysis={riskAnalysis}
            />
          )}

          {activeTab === 'ai-assistant' && <AIAssistantView />}

          {activeTab === 'reports' && <ReportsView />}

          {activeTab === 'documents' && <DocumentsView />}

          {activeTab === 'import' && <ImportView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AuthGate />
      </AppProvider>
    </AuthProvider>
  );
}
