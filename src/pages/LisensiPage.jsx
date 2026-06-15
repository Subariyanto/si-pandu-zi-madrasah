import { useState, useEffect } from 'react';
import { Key, Shield, Trash2, Plus, RotateCcw } from 'lucide-react';
import {
  getLicense, getTrialStatus, getCodes, saveCodes, genCode,
  redeemCode, resetTrial, MASTER_CODE, TRIAL_DAYS,
} from '../lib/license';

export default function LisensiPage() {
  const [_, force] = useState(0);
  const refresh = () => force((x) => x + 1);

  useEffect(() => {
    const h = () => refresh();
    window.addEventListener('sipandu-license-change', h);
    return () => window.removeEventListener('sipandu-license-change', h);
  }, []);

  const status = getTrialStatus();
  const license = getLicense();
  const codes = getCodes();
  const [kode, setKode] = useState('');

  const handleRedeem = () => {
    const r = redeemCode(kode);
    if (!r.ok) { alert('❌ ' + r.reason); return; }
    alert('✅ Aktivasi sukses. Sekarang FULL.');
    setKode('');
    refresh();
  };
  const handleGen = (n) => {
    const list = getCodes();
    const made = [];
    for (let i = 0; i < n; i++) {
      const k = genCode();
      list.push({ code: k, createdAt: new Date().toISOString() });
      made.push(k);
    }
    saveCodes(list);
    alert(`✅ ${n} kode dibuat:\n\n${made.join('\n')}`);
    refresh();
  };
  const handleRevoke = (c) => {
    if (!confirm(`Hapus kode ${c}?`)) return;
    saveCodes(getCodes().filter((x) => x.code !== c));
    refresh();
  };
  const handleReset = () => {
    if (!confirm(`Reset lisensi ke TRIAL ${TRIAL_DAYS} hari?`)) return;
    resetTrial();
    refresh();
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <Key className="w-5 h-5 text-yellow-500" /> Lisensi / Aktivasi
        </h2>
        <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 mb-4 text-sm">
          <div><b>Status:</b>{' '}
            {status.tier === 'full'
              ? <span className="text-green-600 dark:text-green-400 font-semibold">FULL ✅</span>
              : <span>TRIAL {status.isExpired ? '(habis)' : ''}</span>}
          </div>
          {status.isTrial && (
            <>
              <div><b>Sisa hari:</b> {status.daysLeft}</div>
            </>
          )}
          {license.activatedWith && <div><b>Kode aktivasi:</b> <code>{license.activatedWith}</code></div>}
        </div>
        {status.tier === 'full' ? (
          <p className="text-green-600 dark:text-green-400">Akun aktif penuh. Tidak perlu kode aktivasi.</p>
        ) : (
          <>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Kode Aktivasi FULL</label>
              <input
                type="text"
                value={kode}
                onChange={(e) => setKode(e.target.value.toUpperCase())}
                placeholder="FULL-XXXX-XXXX-XXXX"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded uppercase bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <button
              onClick={handleRedeem}
              className="px-4 py-2 bg-kemenag-green text-white rounded hover:bg-green-700 font-semibold"
            >
              🔓 Aktifkan
            </button>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 rounded text-xs text-gray-700 dark:text-gray-300">
              <b>Belum punya kode FULL?</b> Hubungi admin via WA <b>0823-3064-7698</b>.
            </div>
          </>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <Shield className="w-5 h-5 text-blue-500" /> Generate Kode FULL (Admin)
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
          Master code (selalu valid): <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">{MASTER_CODE}</code>
        </p>
        <div className="flex gap-2 mb-3">
          <button onClick={() => handleGen(1)} className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-1"><Plus className="w-4 h-4" />1 Kode</button>
          <button onClick={() => handleGen(5)} className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 flex items-center gap-1"><Plus className="w-4 h-4" />5 Kode</button>
        </div>
        {codes.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">Belum ada kode di-generate.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-3 py-2 text-left">Kode</th>
                  <th className="px-3 py-2 text-center">Status</th>
                  <th className="px-3 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {codes.slice().reverse().map((c) => (
                  <tr key={c.code} className="border-t border-gray-200 dark:border-gray-600">
                    <td className="px-3 py-2 font-mono">{c.code}</td>
                    <td className="px-3 py-2 text-center">{c.usedBy ? '✅ dipakai' : '🆕 baru'}</td>
                    <td className="px-3 py-2 text-center">
                      {!c.usedBy && (
                        <button onClick={() => handleRevoke(c.code)} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <RotateCcw className="w-5 h-5 text-orange-500" /> Reset Lisensi (Testing)
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Reset ke TRIAL {TRIAL_DAYS} hari. Data tidak dihapus.</p>
        <button onClick={handleReset} className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-sm hover:bg-orange-200">
          Reset
        </button>
      </div>
    </div>
  );
}
