import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 menit auto-logout

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState(null);

  // Check session on mount
  useEffect(() => {
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Inactivity auto-logout
  useEffect(() => {
    if (!user) return;

    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      const timer = setTimeout(() => {
        logout();
      }, INACTIVITY_TIMEOUT);
      setInactivityTimer(timer);
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [user]);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await loadProfile(session.user);
      }
    } catch (err) {
      console.error('Session check error:', err);
    }
    setLoading(false);
  };

  const loadProfile = async (authUser) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', authUser.email)
      .single();

    if (data) {
      const userData = {
        id: data.id,
        authId: authUser.id,
        email: data.email,
        name: data.name,
        role: data.role,
        pengawasId: data.pengawas_id,
        madrasahId: data.madrasah_id,
      };
      setUser(userData);
      setProfile(data);
    } else {
      // User exists in auth but not in users table yet
      setUser({
        id: authUser.id,
        authId: authUser.id,
        email: authUser.email,
        name: authUser.email.split('@')[0],
        role: 'madrasah', // default role
        pengawasId: null,
        madrasahId: null,
      });
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoading(false);
        if (error.message.includes('Invalid login')) {
          return { success: false, message: 'Email atau password salah' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { success: false, message: 'Email belum diverifikasi. Cek inbox email Anda.' };
        }
        return { success: false, message: error.message };
      }

      await loadProfile(data.user);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, message: 'Terjadi kesalahan koneksi' };
    }
  };

  const register = async (email, password, name, role = 'madrasah') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          return { success: false, message: 'Email sudah terdaftar' };
        }
        return { success: false, message: error.message };
      }

      // Insert into users table
      await supabase.from('users').insert({
        email,
        name,
        role,
        password: '(managed by Supabase Auth)',
      });

      return { success: true, message: 'Registrasi berhasil! Cek email untuk verifikasi.' };
    } catch (err) {
      return { success: false, message: 'Terjadi kesalahan' };
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) return { success: false, message: error.message };
      return { success: true, message: 'Link reset password telah dikirim ke email Anda.' };
    } catch (err) {
      return { success: false, message: 'Terjadi kesalahan' };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) return { success: false, message: error.message };
      return { success: true, message: 'Password berhasil diubah' };
    } catch (err) {
      return { success: false, message: 'Terjadi kesalahan' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const hasRole = (...roles) => {
    return user && roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{
      user, profile, loading, login, logout, register,
      resetPassword, updatePassword, hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
