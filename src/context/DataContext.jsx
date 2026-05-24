import { createContext, useContext, useState, useEffect } from 'react';
import {
  defaultPengawas, defaultMadrasah, defaultChecklist,
  defaultPendampingan, defaultSurvei, defaultPengaduan,
  defaultKartuKendali, defaultKlinik
} from '../data/sampleData';

const DataContext = createContext(null);

function loadData(key, defaultValue) {
  const saved = localStorage.getItem(`sipandu_${key}`);
  return saved ? JSON.parse(saved) : defaultValue;
}

function saveData(key, data) {
  localStorage.setItem(`sipandu_${key}`, JSON.stringify(data));
}

export function DataProvider({ children }) {
  const [pengawas, setPengawas] = useState(() => loadData('pengawas', defaultPengawas));
  const [madrasah, setMadrasah] = useState(() => loadData('madrasah', defaultMadrasah));
  const [checklist, setChecklist] = useState(() => loadData('checklist', defaultChecklist));
  const [pendampingan, setPendampingan] = useState(() => loadData('pendampingan', defaultPendampingan));
  const [survei, setSurvei] = useState(() => loadData('survei', defaultSurvei));
  const [pengaduan, setPengaduan] = useState(() => loadData('pengaduan', defaultPengaduan));
  const [kartuKendali, setKartuKendali] = useState(() => loadData('kartuKendali', defaultKartuKendali));
  const [klinik, setKlinik] = useState(() => loadData('klinik', defaultKlinik));
  const [eviden, setEviden] = useState(() => loadData('eviden', []));

  useEffect(() => { saveData('pengawas', pengawas); }, [pengawas]);
  useEffect(() => { saveData('madrasah', madrasah); }, [madrasah]);
  useEffect(() => { saveData('checklist', checklist); }, [checklist]);
  useEffect(() => { saveData('pendampingan', pendampingan); }, [pendampingan]);
  useEffect(() => { saveData('survei', survei); }, [survei]);
  useEffect(() => { saveData('pengaduan', pengaduan); }, [pengaduan]);
  useEffect(() => { saveData('kartuKendali', kartuKendali); }, [kartuKendali]);
  useEffect(() => { saveData('klinik', klinik); }, [klinik]);
  useEffect(() => { saveData('eviden', eviden); }, [eviden]);

  const value = {
    pengawas, setPengawas,
    madrasah, setMadrasah,
    checklist, setChecklist,
    pendampingan, setPendampingan,
    survei, setSurvei,
    pengaduan, setPengaduan,
    kartuKendali, setKartuKendali,
    klinik, setKlinik,
    eviden, setEviden,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
