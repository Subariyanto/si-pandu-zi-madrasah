import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, User, Key } from 'lucide-react';

export default function PengaturanPage() {
  const { user, changePassword } = useAuth();
  const [saved, setSaved] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

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

    const result = await changePassword(passwordForm.new);
    if (result.success) {
      setPasswordMsg('✅ Password berhasil diubah');
      setPasswordForm({ current: '', new: '', confirm: '' });
    } else {
      setPasswordMsg(`❌ ${result.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pengaturan Akun</h1>

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
            <span className="text-gray-500">ID</span>
            <span className="text-gray-800 dark:text-white font-mono text-xs">{user?.id?.substring(0, 8)}...</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Versi Aplikasi</span>
            <span className="text-gray-800 dark:text-white">1.0.0</span>
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
            <input
              type="password"
              value={passwordForm.new}
              onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
              className="input-field"
              placeholder="Minimal 6 karakter"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konfirmasi Password Baru</label>
            <input
              type="password"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
              className="input-field"
              placeholder="Ulangi password baru"
              required
            />
          </div>

          {passwordMsg && (
            <p className={`text-sm font-medium ${passwordMsg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {passwordMsg}
            </p>
          )}

          <button type="submit" className="btn-primary flex items-center gap-2">
            <Save size={16} /> Ubah Password
          </button>
        </form>
      </div>
    </div>
  );
}
