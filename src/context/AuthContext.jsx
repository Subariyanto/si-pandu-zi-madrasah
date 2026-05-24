import { createContext, useContext, useState, useEffect } from 'react';
import { defaultUsers } from '../data/sampleData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sipandu_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sipandu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sipandu_user');
    }
  }, [user]);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('sipandu_users')) || defaultUsers;
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userWithoutPassword } = found;
      setUser(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, message: 'Email atau password salah' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sipandu_user');
  };

  const hasRole = (...roles) => {
    return user && roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
