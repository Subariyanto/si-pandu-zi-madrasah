import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Save, User, Key, Users, Plus, Trash2, Edit, X } from 'lucide-react';

export default function PengaturanPage() {
  const { user, updatePassword, hasRole } = useAuth();
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordForm, setPasswordForm] = useState({ new: '', confirm: '' });
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', name: '', role: 'madrasah', password: '' });
  const [addMsg, setAddMsg] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg('');
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordMsg('❌ Password baru dan konfirmasi tidak cocok');
      return;
    }
    if (passwordForm.new.length < 6) {
      setPasswordMsg('❌ Password minimal 6 karakter');
      return;
    }
    const result = await updatePassword(passwordForm.new);
    if (result.success) {
      setPasswordMsg('✅ Password berhasil diubah');
      setPasswordForm({ new: '', confirm: '' });
    } else {
      setPasswordMsg(`❌ ${result.message}`);
    }
  };

  const loadUsers = async () => {
    const { data } = await supabase.from('users').select('*').order('name');
    if (data) setUsers(data);
    setShowUsers(true);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddMsg('');
    if (newUser.password.length < 6) {
      setAddMsg('❌ Password minimal 6 karakter');
      return;
    }

    // Create auth user via Supabase (admin invite not available with anon key)
    // Instead, insert into users table - they'll need to register via the app
    const { error } = await supabase.from('users').insert({
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      password: newUser.password,
    });

    if (error) {
      setAddMsg(`❌ ${error.message}`);
    } else {
      setAddMsg('✅ User berhasil ditambahkan. User perlu registrasi di halaman login dengan email & password yang sama.');
      setNewUser({ email: '', name: '', role: 'madrasah', password: '' });
      loadUsers();
    }
  };

  const handleDeleteUser = async (id, email) => {
    if (!confirm(`Hapus user ${email}?`)) return;
    await supabase.from('users').delete().eq('id', id);
    loadUsers();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pengaturan Akun</h1>

      {/* Profile Info */}
      <div className="card max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-kemenag-green rounded-full flex items-center justify-center">
            <User className="text-white" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{user?.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{user?.role === 'ketua' ? 'Ketua Pokjawas' : user?.role}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm border-t pt-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="text-gray-800 dark:text-white capitalize font-medium">{user?.role === 'ketua' ? 'Ketua Pokjawas' : user?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Auto-logout</span>
            <span className="text-gray-800 dark:text-white">30 menit tidak aktif</span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="card max-w-lg">
        <div className="flex items-center gap-2 mb-4">
          <Key size={20} className="text-kemenag-green" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Ubah Password</h3>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password Baru</label>
            <input type="password" value={passwordForm.new} onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})} className="input-field" placeholder="Minimal 6 karakter" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konfirmasi Password Baru</label>
            <input type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})} className="input-field" placeholder="Ulangi password baru" required />
          </div>
          {passwordMsg && <p className={`text-sm font-medium ${passwordMsg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{passwordMsg}</p>}
          <button type="submit" className="btn-primary flex items-center gap-2"><Save size={16} /> Ubah Password</button>
        </form>
      </div>

      {/* Admin: Manage Users */}
      {hasRole('admin') && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-kemenag-green" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Kelola Pengguna</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={loadUsers} className="btn-secondary text-sm">Muat Data</button>
              <button onClick={() => setShowAddUser(true)} className="btn-primary text-sm flex items-center gap-1"><Plus size={14} /> Tambah</button>
            </div>
          </div>

          {showUsers && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="table-header">Nama</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Role</th>
                    <th className="table-header">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="table-cell font-medium">{u.name}</td>
                      <td className="table-cell">{u.email}</td>
                      <td className="table-cell capitalize">{u.role}</td>
                      <td className="table-cell">
                        <button onClick={() => handleDeleteUser(u.id, u.email)} className="text-red-600 hover:text-red-800"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Add User Modal */}
          {showAddUser && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tambah Pengguna</h3>
                  <button onClick={() => setShowAddUser(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                </div>
                <form onSubmit={handleAddUser} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama</label>
                    <input type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                    <input type="text" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} className="input-field" placeholder="Minimal 6 karakter" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                    <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="input-field">
                      <option value="admin">Admin</option>
                      <option value="ketua">Ketua Pokjawas</option>
                      <option value="pengawas">Pengawas</option>
                      <option value="madrasah">Kepala Madrasah</option>
                    </select>
                  </div>
                  {addMsg && <p className={`text-sm ${addMsg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{addMsg}</p>}
                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="btn-primary flex-1">Tambah</button>
                    <button type="button" onClick={() => setShowAddUser(false)} className="btn-secondary flex-1">Batal</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
