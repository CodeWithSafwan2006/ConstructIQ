import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Roles available to choose when signing up
export const ROLES = [
  {
    id: 'pm',
    label: 'Project Manager',
    desc: 'Full site operations, risk management, material procurement & reporting.',
    badge: 'Operations Lead',
  },
  {
    id: 'admin',
    label: 'Platform Administrator',
    desc: 'System settings, user permissions, global audit logs & workspace setup.',
    badge: 'Admin Access',
  },
  {
    id: 'site_eng',
    label: 'Site Engineer',
    desc: 'Field task execution, daily log updates, photo inspection & issue reporting.',
    badge: 'Field Operations',
  },
  {
    id: 'management',
    label: 'Executive Management',
    desc: 'Portfolio financial overview, ROI analytics & multi-site progress tracking.',
    badge: 'Executive View',
  },
];

const STORAGE_KEY = 'constructiq_users';
const SESSION_KEY = 'constructiq_session';

function loadUsers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function loadSession() {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(loadSession);
  // 'login' | 'signup' | 'add-site' | 'app'
  const [authScreen, setAuthScreen] = useState(() => {
    const session = loadSession();
    if (!session) return 'landing';
    if (session.needsSiteSetup) return 'add-site';
    return 'app';
  });

  // Persist users list
  useEffect(() => {
    saveUsers(users);
  }, [users]);

  // Persist session
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [currentUser]);

  /**
   * Sign up: creates account, logs in, and flags that site setup is needed.
   * Returns { success, error }
   */
  const signup = ({ name, email, password, role }) => {
    if (!name || !email || !password || !role) {
      return { success: false, error: 'All fields are required.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      password, // In a real app this would be hashed
      role,
      createdAt: new Date().toISOString(),
      needsSiteSetup: true,
      sites: [],
    };
    const updated = [...users, newUser];
    setUsers(updated);
    setCurrentUser(newUser);
    setAuthScreen('add-site');
    return { success: true };
  };

  /**
   * Login with email + password.
   * Returns { success, error }
   */
  const login = ({ email, password }) => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }
    setCurrentUser(user);
    if (user.needsSiteSetup) {
      setAuthScreen('add-site');
    } else {
      setAuthScreen('app');
    }
    return { success: true };
  };

  /**
   * Called after site setup is complete — marks user as fully onboarded.
   */
  const completeSiteSetup = (siteData) => {
    const updatedUser = {
      ...currentUser,
      needsSiteSetup: false,
      sites: [...(currentUser.sites || []), siteData],
    };
    setCurrentUser(updatedUser);
    // Also update the stored users list
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setAuthScreen('app');
  };

  /**
   * Log out the current session.
   */
  const logout = () => {
    setCurrentUser(null);
    setAuthScreen('login');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      authScreen,
      setAuthScreen,
      signup,
      login,
      logout,
      completeSiteSetup,
      ROLES,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
