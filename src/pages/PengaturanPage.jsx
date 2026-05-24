import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, User } from 'lucide-react';

export default function PengaturanPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama</label>
            <input type="text" defaultValue={user?.name} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" defaultValue={user?.email} className="input-field" disabled />
            <p className="text-xs text-gray-400 mt-1">Email tidak dapat diubah</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password Baru</label>
            <input type="password" className="input-field" placeholder="Kosongkan jika tidak ingin mengubah" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Konfirmasi Password</label>
            <input type="password" className="input-field" placeholder="Ulangi password baru" />
          </div>

          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save size={16} /> Simpan Perubahan
          </button>

          {saved && (
            <p className="text-sm text-green-600 font-medium">✓ Perubahan berhasil disimpan</p>
          )}
        </div>
      </div>

      <div className="card max-w-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Informasi Akun</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="text-gray-800 dark:text-white capitalize font-medium">{user?.role === 'ketua' ? 'Ketua Pokjawas' : user?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">ID</span>
            <span className="text-gray-800 dark:text-white font-mono text-xs">{user?.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Versi Aplikasi</span>
            <span className="text-gray-800 dark:text-white">1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
