"use client";

import { BarChart3 } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20 text-white rounded-2xl">
        <BarChart3 size={28} />
      </div>
      <div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Turma Analytics & Correção</h2>
        <p className="text-gray-600 dark:text-gray-300">Analise o desempenho e ajuste as notas dos alunos rapidamente.</p>
      </div>
    </div>
  );
}