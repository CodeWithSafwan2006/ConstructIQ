import React, { useState } from 'react';
import {
  Building2,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';

export default function LoginView() {
  const { login, signup, setAuthScreen } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupRole, setSignupRole] = useState('admin');
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  // Sub-role accounts state for System Admin signup
  const [pmEmail, setPmEmail] = useState('');
  const [pmPassword, setPmPassword] = useState('pm123');
  const [seEmail, setSeEmail] = useState('');
  const [sePassword, setSePassword] = useState('eng123');
  const [emEmail, setEmEmail] = useState('');
  const [emPassword, setEmPassword] = useState('exec123');

  // Auto-generate sub-role emails when Admin email changes
  const handleAdminEmailChange = (val) => {
    setSignupEmail(val);
    if (val && val.includes('@')) {
      const parts = val.split('@');
      const prefix = parts[0];
      const domain = parts[1];
      setPmEmail(`${prefix}pm@${domain}`);
      setSeEmail(`${prefix}se@${domain}`);
      setEmEmail(`${prefix}em@${domain}`);
    }
  };

  const selectedRoleObj = ROLES.find(r => r.id === signupRole) || ROLES[0];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login({ email: loginEmail, password: loginPassword });
    setLoginLoading(false);
    if (!result.success) {
      setLoginError(result.error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');
    if (signupPassword !== signupConfirm) {
      setSignupError('Passwords do not match.');
      return;
    }
    setSignupLoading(true);
    await new Promise(r => setTimeout(r, 700));

    const parts = signupEmail.includes('@') ? signupEmail.split('@') : [signupEmail, 'constructiq.io'];
    const prefix = parts[0];
    const domain = parts[1] || 'constructiq.io';

    const result = signup({
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      role: signupRole,
      subRoles: {
        pm: { email: pmEmail.trim() || `${prefix}pm@${domain}`, password: pmPassword || 'pm123' },
        site_eng: { email: seEmail.trim() || `${prefix}se@${domain}`, password: sePassword || 'eng123' },
        management: { email: emEmail.trim() || `${prefix}em@${domain}`, password: emPassword || 'exec123' }
      }
    });
    setSignupLoading(false);
    if (!result.success) {
      setSignupError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1E231F] flex flex-col items-center justify-center px-4 py-12">
      {/* Brand */}
      <div className="mb-8 text-center">
        <div className="w-14 h-14 bg-[#275232] rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-[#1E231F]">
          Construct<span className="text-[#275232]">IQ</span>
        </h1>
        <p className="text-xs text-[#6E726E] mt-1">Enterprise Construction Intelligence Platform</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-[#E5E2DA] rounded-2xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-[#E5E2DA]">
          <button
            onClick={() => { setMode('login'); setLoginError(''); }}
            className={`flex-1 py-4 text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              mode === 'login'
                ? 'bg-white text-[#275232] border-b-2 border-[#275232]'
                : 'bg-[#F7F5F0] text-[#6E726E] hover:text-[#1E231F]'
            }`}
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setSignupError(''); }}
            className={`flex-1 py-4 text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#275232] border-b-2 border-[#275232]'
                : 'bg-[#F7F5F0] text-[#6E726E] hover:text-[#1E231F]'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </button>
        </div>

        <div className="p-7">
          {/* ── LOGIN FORM ── */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-[#1E231F] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E726E]" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-sm font-semibold text-[#1E231F] placeholder:text-[#B0ADA5] focus:outline-none focus:border-[#275232] focus:ring-2 focus:ring-[#275232]/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1E231F] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E726E]" />
                  <input
                    type={showLoginPwd ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-sm font-semibold text-[#1E231F] placeholder:text-[#B0ADA5] focus:outline-none focus:border-[#275232] focus:ring-2 focus:ring-[#275232]/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPwd(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E726E] hover:text-[#1E231F] transition-colors"
                  >
                    {showLoginPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 bg-[#275232] hover:bg-[#1E3F27] disabled:opacity-60 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing In…
                  </>
                ) : (
                  <>
                    <span>Sign In to Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-[#6E726E]">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#275232] font-bold hover:underline"
                >
                  Create one free
                </button>
              </p>
            </form>
          )}

          {/* ── SIGNUP FORM ── */}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1E231F] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E726E]" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    placeholder="Rohan Mehta"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-sm font-semibold text-[#1E231F] placeholder:text-[#B0ADA5] focus:outline-none focus:border-[#275232] focus:ring-2 focus:ring-[#275232]/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1E231F] uppercase tracking-wider mb-1.5">
                  Work Email (System Admin ID)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E726E]" />
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={e => handleAdminEmailChange(e.target.value)}
                    placeholder="user@construct.iq"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-sm font-semibold text-[#1E231F] placeholder:text-[#B0ADA5] focus:outline-none focus:border-[#275232] focus:ring-2 focus:ring-[#275232]/10 transition-all"
                  />
                </div>
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="block text-[11px] font-bold text-[#1E231F] uppercase tracking-wider mb-1.5">
                  Account Role
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setRoleOpen(o => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-sm font-semibold text-[#1E231F] focus:outline-none focus:border-[#275232] focus:ring-2 focus:ring-[#275232]/10 transition-all"
                  >
                    <span>{selectedRoleObj.label}</span>
                    <ChevronDown className={`w-4 h-4 text-[#6E726E] transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {roleOpen && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-[#E5E2DA] rounded-xl shadow-xl overflow-hidden">
                      {ROLES.map(r => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => { setSignupRole(r.id); setRoleOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-xs transition-colors hover:bg-[#F7F5F0] ${
                            signupRole === r.id ? 'bg-[#E5EFE2] text-[#275232]' : 'text-[#1E231F]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{r.label}</span>
                            {signupRole === r.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#275232]" />}
                          </div>
                          <p className="text-[10px] text-[#6E726E] mt-0.5">{r.desc}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SYSTEM ADMIN SUB-ROLES CREDENTIAL SETUP CARD */}
              {signupRole === 'admin' && (
                <div className="p-4 rounded-xl bg-[#E5EFE2]/50 border border-[#C6DCBF] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-[#275232] uppercase tracking-wider">
                      Assign Team Role Credentials
                    </h4>
                    <span className="text-[9px] font-bold text-[#275232] bg-[#E5EFE2] px-2 py-0.5 rounded border border-[#C6DCBF]">
                      Auto-generated
                    </span>
                  </div>
                  <p className="text-[10px] text-[#6E726E]">Set the Login IDs and Passwords for your Project Manager, Site Engineer, and Executive Management:</p>

                  <div className="space-y-2.5 text-xs">
                    {/* PM Account */}
                    <div className="bg-white p-2.5 rounded-lg border border-[#E5E2DA] space-y-1.5">
                      <span className="font-bold text-[#1E231F] text-[11px]">1. Project Manager Account (PM)</span>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={pmEmail}
                          onChange={e => setPmEmail(e.target.value)}
                          placeholder="userpm@construct.iq"
                          className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-lg px-2 py-1 text-[11px] font-medium text-[#1E231F]"
                        />
                        <input
                          type="text"
                          value={pmPassword}
                          onChange={e => setPmPassword(e.target.value)}
                          placeholder="PM Password"
                          className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-lg px-2 py-1 text-[11px] font-mono text-[#1E231F]"
                        />
                      </div>
                    </div>

                    {/* SE Account */}
                    <div className="bg-white p-2.5 rounded-lg border border-[#E5E2DA] space-y-1.5">
                      <span className="font-bold text-[#1E231F] text-[11px]">2. Site Engineer Account (SE)</span>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={seEmail}
                          onChange={e => setSeEmail(e.target.value)}
                          placeholder="userse@construct.iq"
                          className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-lg px-2 py-1 text-[11px] font-medium text-[#1E231F]"
                        />
                        <input
                          type="text"
                          value={sePassword}
                          onChange={e => setSePassword(e.target.value)}
                          placeholder="SE Password"
                          className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-lg px-2 py-1 text-[11px] font-mono text-[#1E231F]"
                        />
                      </div>
                    </div>

                    {/* EM Account */}
                    <div className="bg-white p-2.5 rounded-lg border border-[#E5E2DA] space-y-1.5">
                      <span className="font-bold text-[#1E231F] text-[11px]">3. Executive Management (EM)</span>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={emEmail}
                          onChange={e => setEmEmail(e.target.value)}
                          placeholder="userem@construct.iq"
                          className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-lg px-2 py-1 text-[11px] font-medium text-[#1E231F]"
                        />
                        <input
                          type="text"
                          value={emPassword}
                          onChange={e => setEmPassword(e.target.value)}
                          placeholder="EM Password"
                          className="w-full bg-[#F7F5F0] border border-[#E5E2DA] rounded-lg px-2 py-1 text-[11px] font-mono text-[#1E231F]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#1E231F] uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E726E]" />
                    <input
                      type={showSignupPwd ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={signupPassword}
                      onChange={e => setSignupPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full pl-10 pr-8 py-3 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-sm font-semibold text-[#1E231F] placeholder:text-[#B0ADA5] focus:outline-none focus:border-[#275232] focus:ring-2 focus:ring-[#275232]/10 transition-all"
                    />
                    <button type="button" onClick={() => setShowSignupPwd(p => !p)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6E726E]">
                      {showSignupPwd ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#1E231F] uppercase tracking-wider mb-1.5">
                    Confirm
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E726E]" />
                    <input
                      type={showConfirmPwd ? 'text' : 'password'}
                      required
                      value={signupConfirm}
                      onChange={e => setSignupConfirm(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full pl-10 pr-8 py-3 rounded-xl border border-[#E5E2DA] bg-[#F7F5F0] text-sm font-semibold text-[#1E231F] placeholder:text-[#B0ADA5] focus:outline-none focus:border-[#275232] focus:ring-2 focus:ring-[#275232]/10 transition-all"
                    />
                    <button type="button" onClick={() => setShowConfirmPwd(p => !p)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6E726E]">
                      {showConfirmPwd ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {signupError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {signupError}
                </div>
              )}

              <button
                type="submit"
                disabled={signupLoading}
                className="w-full py-3.5 bg-[#275232] hover:bg-[#1E3F27] disabled:opacity-60 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {signupLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account…
                  </>
                ) : (
                  <>
                    <span>Create Account & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-[#6E726E]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#275232] font-bold hover:underline"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="mt-6 text-center text-[11px] text-[#8C8275]">
        <button
          onClick={() => setAuthScreen('landing')}
          className="hover:text-[#275232] transition-colors"
        >
          ← Back to home
        </button>
        <span className="mx-3">·</span>
        ConstructIQ Platform • Secure Enterprise Access
      </div>
    </div>
  );
}
