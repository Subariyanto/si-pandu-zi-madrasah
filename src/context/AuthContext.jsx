import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 menit auto-logout

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sipandu_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sipandu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sipandu_user');
    }
  }, [user]);

  // Inactivity auto-logout
  useEffect(() => {
    if (!user) return;

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        logout();
        alert('Sesi Anda telah berakhir karena tidak aktif selama 30 menit. Silakan login kembali.');
      }, INACTIVITY_TIMEOUT);
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error || !data) {
        setLoading(false);
        return { success: false, message: 'Email atau password salah' };
      }

      const userData = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        pengawasId: data.pengawas_id,
        madrasahId: data.madrasah_id,
      };

      setUser(userData);
      setLoading(false);
      return { success: true, user: userData };
    } catch (err) {
      setLoading(false);
      return { success: false, message: 'Terjadi kesalahan koneksi' };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (!user) return { success: false, message: 'Tidak ada user login' };
    try {
      // Verify current password
      const { data: check } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .eq('password', currentPassword)
        .single();

      if (!check) return { success: false, message: 'Password lama salah' };

      const { error } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('id', user.id);

      if (error) return { success: false, message: 'Gagal mengubah password' };
      return { success: true, message: 'Password berhasil diubah' };
    } catch (err) {
      return { success: false, message: 'Terjadi kesalahan' };
    }
  };

  const addUser = async (userData) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          email: userData.email,
          name: userData.name,
          role: userData.role,
          password: userData.password,
          pengawas_id: userData.pengawasId || null,
          madrasah_id: userData.madrasahId || null,
        })
        .select()
        .single();

      if (error) {
        if (error.message.includes('duplicate')) return { success: false, message: 'Email sudah terdaftar' };
        return { success: false, message: error.message };
      }
      return { success: true, data };
    } catch (err) {
      return { success: false, message: 'Terjadi kesalahan' };
    }
  };

  const deleteUser = async (id) => {
    try {
      const { error } = await supabase.from('users').delete().eq('id', id);
      if (error) return { success: false, message: error.message };
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Terjadi kesalahan' };
    }
  };

  const getUsers = async () => {
    const { data } = await supabase.from('users').select('id, email, name, role, pengawas_id, madrasah_id, created_at').order('name');
    return data || [];
  };

  const updateUserRole = async (id, role, pengawasId, madrasahId) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role, pengawas_id: pengawasId || null, madrasah_id: madrasahId || null })
        .eq('id', id);
      if (error) return { success: false, message: error.message };
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Terjadi kesalahan' };
    }
  };

  const resetUserPassword = async (id, newPassword) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('id', id);
      if (error) return { success: false, message: error.message };
      return { success: true, message: 'Password berhasil direset' };
    } catch (err) {
      return { success: false, message: 'Terjadi kesalahan' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sipandu_user');
  };

  const hasRole = (...roles) => {
    return user && roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{
      user, loading, login, logout, hasRole,
      changePassword, addUser, deleteUser, getUsers, updateUserRole, resetUserPassword
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
