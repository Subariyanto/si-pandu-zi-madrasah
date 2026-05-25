import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sipandu_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sipandu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sipandu_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Check user in Supabase users table with password
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

  const changePassword = async (newPassword) => {
    if (!user) return { success: false, message: 'Tidak ada user login' };
    try {
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sipandu_user');
  };

  const hasRole = (...roles) => {
    return user && roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole, loading, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
