"use client";

import { Sun, Moon, LayoutDashboard } from "lucide-react";

interface HeaderProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export default function Header({ theme, setTheme }: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20">
          <LayoutDashboard size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Visão geral da sua escola, alunos e infraestrutura.
          </p>
        </div>
      </div>
      
      <button 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
        className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm flex-shrink-0"
        title="Alternar Tema"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}