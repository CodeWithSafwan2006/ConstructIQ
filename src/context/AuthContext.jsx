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

// Default accounts managed by System Admin
export const DEFAULT_ROLE_USERS = [
  {
    id: 'u_admin',
    name: 'System Administrator',
    email: 'admin@constructiq.io',
    password: 'admin123',
    role: 'admin',
    ownerEmail: 'admin@constructiq.io',
    needsSiteSetup: false,
    sites: []
  },
  {
    id: 'u_pm',
    name: 'Rohan Mehta',
    email: 'pm@constructiq.io',
    password: 'pm123',
    role: 'pm',
    ownerEmail: 'admin@constructiq.io',
    needsSiteSetup: false,
    sites: []
  },
  {
    id: 'u_site_eng',
    name: 'Vikram Patel',
    email: 'eng@constructiq.io',
    password: 'eng123',
    role: 'site_eng',
    ownerEmail: 'admin@constructiq.io',
    needsSiteSetup: false,
    sites: []
  },
  {
    id: 'u_management',
    name: 'Executive Leadership',
    email: 'exec@constructiq.io',
    password: 'exec123',
    role: 'management',
    ownerEmail: 'admin@constructiq.io',
    needsSiteSetup: false,
    sites: []
  }
];

const STORAGE_KEY = 'constructiq_users';
const SESSION_KEY = 'constructiq_session';

function loadUsers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ROLE_USERS));
      return DEFAULT_ROLE_USERS;
    }
    const parsed = JSON.parse(saved);
    // Ensure all 4 role users exist
    DEFAULT_ROLE_USERS.forEach(def => {
      if (!parsed.some(u => u.role === def.role)) {
        parsed.push(def);
      }
    });
    return parsed;
  } catch {
    return DEFAULT_ROLE_USERS;
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function loadSession() {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_ROLE_USERS[0];
  } catch {
    return DEFAULT_ROLE_USERS[0];
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
   * If signing up as System Admin, also updates/creates sub-role accounts (PM, SE, EM).
   */
  const signup = ({ name, email, password, role, subRoles }) => {
    if (!name || !email || !password || !role) {
      return { success: false, error: 'All fields are required.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const ownerEmail = email.toLowerCase();

    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      password,
      role,
      ownerEmail,
      createdAt: new Date().toISOString(),
      needsSiteSetup: true,
      sites: [],
    };

    let updatedUsers = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    updatedUsers.push(newUser);

    // Helper to generate fallback email for team sub-roles
    const getFallbackEmail = (suffix) => {
      const lower = email.toLowerCase();
      if (lower.includes('@')) {
        const [prefix, domain] = lower.split('@');
        return `${prefix}${suffix}@${domain}`;
      }
      return `${lower}_${suffix}@constructiq.io`;
    };

    // If signing up as System Admin (or subRoles specified), create/update configured team accounts (PM, SE, EM)
    if (role === 'admin' || subRoles) {
      const pmEmail = subRoles?.pm?.email?.trim() || getFallbackEmail('pm');
      const pmPassword = subRoles?.pm?.password?.trim() || 'pm123';

      const seEmail = subRoles?.site_eng?.email?.trim() || getFallbackEmail('se');
      const sePassword = subRoles?.site_eng?.password?.trim() || 'eng123';

      const emEmail = subRoles?.management?.email?.trim() || getFallbackEmail('em');
      const emPassword = subRoles?.management?.password?.trim() || 'exec123';

      updatedUsers = updatedUsers.filter(u => !(u.ownerEmail === ownerEmail && ['pm', 'site_eng', 'management'].includes(u.role)));

      updatedUsers.push({
        id: `u_pm_${Date.now()}`,
        name: `${name} (Project Manager)`,
        email: pmEmail,
        password: pmPassword,
        role: 'pm',
        ownerEmail: ownerEmail,
        createdAt: new Date().toISOString(),
        needsSiteSetup: false,
        sites: []
      });

      updatedUsers.push({
        id: `u_se_${Date.now()}`,
        name: `${name} (Site Engineer)`,
        email: seEmail,
        password: sePassword,
        role: 'site_eng',
        ownerEmail: ownerEmail,
        createdAt: new Date().toISOString(),
        needsSiteSetup: false,
        sites: []
      });

      updatedUsers.push({
        id: `u_em_${Date.now()}`,
        name: `${name} (Executive Leadership)`,
        email: emEmail,
        password: emPassword,
        role: 'management',
        ownerEmail: ownerEmail,
        createdAt: new Date().toISOString(),
        needsSiteSetup: false,
        sites: []
      });
    }

    setUsers(updatedUsers);
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
   * System Admin function: configure email (ID) & password for specific role accounts.
   */
  const updateUserCredentials = ({ role, name, email, password }) => {
    setUsers(prev => {
      const exists = prev.some(u => u.role === role);
      if (exists) {
        return prev.map(u => u.role === role ? { ...u, name: name || u.name, email, password } : u);
      } else {
        return [...prev, { id: `u_${Date.now()}`, name: name || role, email, password, role, needsSiteSetup: false, sites: [] }];
      }
    });
    return { success: true };
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
      updateUserCredentials,
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
