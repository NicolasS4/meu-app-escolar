// components/dashboard/aluno/TrabalhosCard.tsx
"use client";

import { Briefcase, Calendar, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TrabalhosCardProps {
  projetos: any[];
  minhasEquipes: { equipes: any[]; membros: any[] };
  aluno: any;
}

export default function TrabalhosCard({ projetos, minhasEquipes, aluno }: TrabalhosCardProps) {
  const hasTrabalhos = projetos.length > 0;

  return (
    <motion.div 
      className="bg-white dark:bg-[#111111] rounded-[2rem] shadow-xl border border-slate-100 dark:border-[#222] overflow-hidden relative z-20"
      animate={{
        height: hasTrabalhos ? 'auto' : 'fit-content',
        minHeight: hasTrabalhos ? '300px' : 'auto'
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Cabeçalho fixo - sempre visível */}
      <div className="p-6 pb-0 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Briefcase size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Trabalhos Ativos
            {hasTrabalhos && (
              <span className="ml-2 text-sm font-normal text-indigo-500 dark:text-indigo-400">
                ({projetos.length})
              </span>
            )}
          </h2>
        </div>
      </div>

      {/* Conteúdo com animação de expansão/contração */}
      <AnimatePresence mode="wait">
        {!hasTrabalhos ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden relative z-10"
          >
            <div className="p-6 pt-2">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
                  <Briefcase size={28} className="text-slate-300 dark:text-slate-600" />
                </div>
                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
                  Nenhum trabalho pendente
                </p>
                <p className="text-slate-300 dark:text-slate-600 text-xs mt-1">
                  Relaxe! 🌴 Volte mais tarde
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-y-auto max-h-[600px] p-6 pt-2 relative z-10"
          >
            {projetos.map((p, idx) => {
              const relacao = minhasEquipes.membros.find((m: any) => m.aluno_id === aluno?.id && minhasEquipes.equipes.find((e: any) => e.id === m.equipe_id)?.projeto_id === p.id);
              const equipeDoAluno = minhasEquipes.equipes.find((e: any) => e.id === relacao?.equipe_id);
              const colegas = minhasEquipes.membros
                .filter((m: any) => m.equipe_id === equipeDoAluno?.id)
                .map((m: any) => m.profiles?.nome || "Colega Oculto");

              const prazo = new Date(p.prazo);
              const hoje = new Date();
              const diasRestantes = Math.ceil((prazo.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
              const isUrgente = diasRestantes <= 3 && diasRestantes > 0;
              const isAtrasado = diasRestantes < 0;

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Ícone de fundo */}
                  <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 text-slate-900 dark:text-white">
                    <Briefcase size={80} />
                  </div>
                  
                  {/* Badge de urgência/atraso */}
                  {(isUrgente || isAtrasado) && (
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold z-10 ${isAtrasado ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
                      {isAtrasado ? 'ATRASADO!' : `URGENTE: ${diasRestantes} dias`}
                    </div>
                  )}
                  
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2 relative z-10 leading-tight pr-20">
                    {p.titulo}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 whitespace-pre-wrap relative z-10 leading-relaxed line-clamp-2">
                    {p.descricao}
                  </p>
                  
                  <div className={`flex items-center gap-2 mb-4 text-xs font-bold w-fit px-3 py-1.5 rounded-lg ${isAtrasado ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' : isUrgente ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                    <Calendar size={14} /> 
                    {isAtrasado 
                      ? `Atrasado desde ${prazo.toLocaleDateString('pt-BR')}`
                      : `Entrega: ${prazo.toLocaleDateString('pt-BR')} ${diasRestantes > 0 ? `(${diasRestantes} dias restantes)` : '(Hoje!)'}`
                    }
                  </div>

                  {equipeDoAluno ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="border-t border-slate-200 dark:border-[#222] pt-4 mt-2"
                    >
                      <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 mb-2">
                        <Users size={16}/> {equipeDoAluno.nome}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {colegas.map((col: string, i: number) => (
                          <span key={i} className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all ${col === aluno?.nome ? "bg-indigo-100 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/40" : "bg-white dark:bg-black text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#333]"}`}>
                            {col.length > 15 ? col.substring(0, 12) + '...' : col} {col === aluno?.nome && "(Você)"}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="border-t border-slate-200 dark:border-[#222] pt-4 mt-2"
                    >
                      <div className="text-sm text-orange-500 dark:text-orange-400 font-semibold flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        Aguardando formação de equipes...
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        O professor ainda não sorteou as equipes para este trabalho.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}