"use client";

import { ChevronDown } from "lucide-react";

interface AnalyticsFiltersProps {
  turmas: any[];
  selectedTurma: string;
  setSelectedTurma: (val: string) => void;
  configs: any[];
  selectedSemestre: number | "";
  setSelectedSemestre: (val: number) => void;
}

export default function AnalyticsFilters({ turmas, selectedTurma, setSelectedTurma, configs, selectedSemestre, setSelectedSemestre }: AnalyticsFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex-1">
        <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">Selecione a Turma</label>
        <div className="relative">
          <select value={selectedTurma} onChange={(e) => setSelectedTurma(e.target.value)} className="w-full appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-2xl p-4 pr-12 focus:border-purple-500 outline-none transition-all cursor-pointer font-bold shadow-sm">
            <option value="" disabled>-- Turma --</option>
            {turmas.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" size={20} />
        </div>
      </div>

      <div className="flex-1">
        <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">Período de Análise</label>
        <div className="relative">
          <select value={selectedSemestre} onChange={(e) => setSelectedSemestre(Number(e.target.value))} disabled={!selectedTurma || configs.length === 0} className="w-full appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-2xl p-4 pr-12 focus:border-purple-500 outline-none transition-all cursor-pointer font-bold disabled:opacity-50 shadow-sm">
            <option value="" disabled>-- Selecione o Período --</option>
            {configs.map(c => <option key={c.semestre} value={c.semestre}>Semestre {c.semestre}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" size={20} />
        </div>
      </div>
    </div>
  );
}