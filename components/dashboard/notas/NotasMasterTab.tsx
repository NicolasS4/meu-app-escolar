"use client";

import { useState } from "react";
import { Settings, PenTool, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Sub-componentes importados corretamente
import ConfiguracaoAvaliacoes from "./ConfiguracaoAvaliacoes";
import LancamentoNotas from "./LancamentoNotas";
import AnalyticsBI from "./AnalyticsBI";

const TABS = [
  { id: 'lancamento', label: 'Lançamento', icon: PenTool },
  { id: 'bi', label: 'Power BI', icon: BarChart3 },
  { id: 'configuracao', label: 'Configurações', icon: Settings },
] as const;

type TabType = typeof TABS[number]['id'];

export default function NotasMasterTab({ professorId }: { professorId: string }) {
  const [subTab, setSubTab] = useState<TabType>('configuracao');

  return (
    <div className="flex flex-col h-full w-full">
      
      {/* CABEÇALHO PREMIUM */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30">
              <BarChart3 className="text-white" size={28} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              Gestão & Analytics
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-slate-500 dark:text-slate-400 ml-1">
            Controle de avaliações, diário de classe e inteligência de dados.
          </motion.p>
        </div>

        {/* NAVEGAÇÃO INTERNA (MAGIC SLIDER) */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex p-1.5 bg-slate-200/60 dark:bg-[#111] rounded-2xl w-fit border border-slate-300 dark:border-slate-800 backdrop-blur-md shadow-inner"
        >
          {TABS.map((tab) => {
            const isActive = subTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors z-10 ${
                  isActive ? "text-indigo-700 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-700/50"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-20 flex items-center gap-2">
                  <Icon size={16} className={isActive ? "animate-pulse" : ""} />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* ÁREA DE CONTEÚDO COM TRANSIÇÃO ANIMADA */}
      <div className="flex-1 overflow-hidden bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-slate-800/80 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none relative">
        <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            
            {subTab === 'lancamento' && (
              <motion.div 
                key="lancamento"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
                className="p-6"
              >
                <LancamentoNotas professorId={professorId} />
              </motion.div>
            )}

            {subTab === 'bi' && (
              <motion.div 
                key="bi"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
                className="p-6"
              >
                <AnalyticsBI professorId={professorId} />
              </motion.div>
            )}

            {subTab === 'configuracao' && (
              <motion.div 
                key="configuracao"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
                className="p-6"
              >
                <ConfiguracaoAvaliacoes professorId={professorId} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}