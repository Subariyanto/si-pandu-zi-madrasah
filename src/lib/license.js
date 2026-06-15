// Trial / License system for SI-PANDU-ZI Madrasah
// Pattern: device-level trial, 5 hari, kode FULL, master code

const KEY_LICENSE = 'sipandu_license';
const KEY_CODES = 'sipandu_activation_codes';
export const TRIAL_DAYS = 5;
export const TRIAL_MAX_PENDAMPINGAN = 10;
export const MASTER_CODE = 'FULL-SIPANDU-POKJAWAS-2026';

function load(k, def) { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : def; } catch (e) { return def; } }
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }

export function getLicense() {
  let l = load(KEY_LICENSE, null);
  if (!l) {
    l = {
      tier: 'trial',
      startedAt: new Date().toISOString(),
      trialExpiresAt: new Date(Date.now() + TRIAL_DAYS * 86400000).toISOString(),
      activatedWith: null,
    };
    save(KEY_LICENSE, l);
  }
  return l;
}
export function setLicense(l) { save(KEY_LICENSE, l); window.dispatchEvent(new Event('sipandu-license-change')); }
export function getCodes() { return load(KEY_CODES, []); }
export function saveCodes(c) { save(KEY_CODES, c); }

export function genCode() {
  const ch = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const p = (n) => { let s = ''; for (let i = 0; i < n; i++) s += ch[Math.floor(Math.random() * ch.length)]; return s; };
  return 'FULL-' + p(4) + '-' + p(4) + '-' + p(4);
}

export function getTrialStatus() {
  const l = getLicense();
  if (l.tier === 'full') return { tier: 'full', isTrial: false, isExpired: false, daysLeft: Infinity, count: 0, limitReached: false };
  const ms = new Date(l.trialExpiresAt).getTime() - Date.now();
  const daysLeft = Math.ceil(ms / 86400000);
  const isExpired = ms <= 0;
  let count = 0;
  try { count = (load('sipandu_pendampingan_count', 0)) || 0; } catch (e) {}
  return { tier: 'trial', isTrial: true, isExpired, daysLeft: Math.max(0, daysLeft), count, limitReached: count >= TRIAL_MAX_PENDAMPINGAN };
}

export function canMutate(kind) {
  const s = getTrialStatus();
  if (!s.isTrial) return { ok: true };
  if (s.isExpired) return { ok: false, reason: `Masa trial ${TRIAL_DAYS} hari sudah habis. Hubungi admin (WA 0823-3064-7698) untuk Kode FULL.` };
  return { ok: true };
}

export function guardMutation(kind = 'mutate') {
  const c = canMutate(kind);
  if (!c.ok) {
    if (typeof window !== 'undefined') alert('🔒 ' + c.reason);
    return false;
  }
  return true;
}

export function redeemCode(code) {
  const c = String(code || '').trim().toUpperCase();
  if (!c) return { ok: false, reason: 'Kode kosong' };
  if (c === MASTER_CODE) {
    setLicense({ tier: 'full', activatedAt: new Date().toISOString(), activatedWith: c });
    return { ok: true };
  }
  const list = getCodes();
  const idx = list.findIndex((x) => x.code === c && !x.usedBy && !x.revoked);
  if (idx < 0) return { ok: false, reason: 'Kode tidak valid atau sudah dipakai' };
  list[idx].usedBy = 'device';
  list[idx].usedAt = new Date().toISOString();
  saveCodes(list);
  setLicense({ tier: 'full', activatedAt: new Date().toISOString(), activatedWith: c });
  return { ok: true };
}

export function resetTrial() {
  setLicense({
    tier: 'trial',
    startedAt: new Date().toISOString(),
    trialExpiresAt: new Date(Date.now() + TRIAL_DAYS * 86400000).toISOString(),
    activatedWith: null,
  });
}
