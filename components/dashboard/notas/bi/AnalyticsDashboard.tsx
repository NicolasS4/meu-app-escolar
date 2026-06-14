"use client";

import { TrendingUp, Users, Award } from "lucide-react";

interface AnalyticsDashboardProps {
  dashboardData: any;
}

export default function AnalyticsDashboard({ dashboardData }: AnalyticsDashboardProps) {
  if (!dashboardData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center"><TrendingUp size={28} /></div>
        <div><p className="text-gray-600 dark:text-gray-300 text-sm font-bold uppercase tracking-wider mb-1">Média Geral</p><h3 className="text-3xl font-black text-gray-900 dark:text-white">{dashboardData.mediaTurma}</h3></div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center"><Users size={28} /></div>
        <div><p className="text-gray-600 dark:text-gray-300 text-sm font-bold uppercase tracking-wider mb-1">Aprovação (≥ 6.0)</p><h3 className="text-3xl font-black text-gray-900 dark:text-white">{dashboardData.taxaAprovacao}%</h3></div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-yellow-100 dark:bg-yellow-900/60 text-yellow-700 dark:text-yellow-300 flex items-center justify-center"><Award size={28} /></div>
        <div className="overflow-hidden"><p className="text-gray-600 dark:text-gray-300 text-sm font-bold uppercase tracking-wider mb-1">Destaque</p><h3 className="text-xl font-black text-gray-900 dark:text-white truncate">{dashboardData.melhorAluno.nome}</h3></div>
      </div>
    </div>
  );
}