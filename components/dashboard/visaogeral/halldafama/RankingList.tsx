"use client";

import { Trophy, Medal, Flame, Star } from "lucide-react";
import { motion } from "framer-motion";

interface AlunoRank {
  id: string;
  nome: string;
  pontos: number;
  streak_atual: number;
}

interface RankingListProps {
  title: string;
  icon: any;
  data: AlunoRank[];
  type: "pontos" | "frequencia";
  colorTheme: "yellow" | "orange";
}

export default function RankingList({ title, icon: Icon, data, type, colorTheme }: RankingListProps) {
  
  // Define as cores baseadas no tema escolhido
  const themeStyles = {
    yellow: {
      bg: "bg-yellow-100 dark:bg-yellow-900/40",
      text: "text-yellow-700 dark:text-yellow-300",
      border: "border-yellow-200 dark:border-yellow-700"
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/40",
      text: "text-orange-700 dark:text-orange-300",
      border: "border-orange-200 dark:border-orange-700"
    }
  };

  const currentTheme = themeStyles[colorTheme];

  // Cores do pódio
  const getRankStyle = (index: number) => {
    switch(index) {
      case 0: return "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300 border-yellow-300 dark:border-yellow-500/50 shadow-sm"; // Ouro
      case 1: return "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300 border-gray-300 dark:border-gray-500/50"; // Prata
      case 2: return "bg-amber-100 text-amber-800 dark:bg-amber-700/20 dark:text-amber-400 border-amber-300 dark:border-amber-700/50"; // Bronze
      default: return "bg-gray-50 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400 border-gray-200 dark:border-gray-700"; // 4 e 5
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy size={18} className="text-yellow-600 dark:text-yellow-400" />;
    if (index === 1) return <Medal size={18} className="text-gray-500 dark:text-gray-300" />;
    if (index === 2) return <Medal size={18} className="text-amber-700 dark:text-amber-500" />;
    return <span className="font-black text-sm text-gray-500 dark:text-gray-400">#{index + 1}</span>;
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700">
      
      {/* Cabeçalho do Card */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-2xl ${currentTheme.bg} ${currentTheme.text}`}>
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-black text-gray-900 dark:text-white">{title}</h3>
      </div>

      {/* Lista Vazia */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
          <p className="font-medium">Nenhum aluno classificado ainda.</p>
        </div>
      ) : (
        /* Lista de Alunos */
        <div className="space-y-3">
          {data.map((aluno, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={aluno.id} 
              className={`flex items-center justify-between p-3 rounded-2xl border ${getRankStyle(index)} transition-all`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  {getRankIcon(index)}
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-black text-gray-900 dark:text-white shadow-sm shrink-0">
                  {aluno.nome.charAt(0).toUpperCase()}
                </div>
                <p className="font-bold text-gray-800 dark:text-gray-200 truncate max-w-[120px] sm:max-w-[200px]">
                  {aluno.nome}
                </p>
              </div>

              {/* Status do Aluno (Pontos e Fogo) */}
              <div className="flex items-center gap-4 text-right shrink-0">
                <div className={`flex flex-col items-end ${type === 'frequencia' ? 'opacity-50 scale-90' : 'scale-100'}`}>
                  <span className="flex items-center gap-1 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                    <Star size={12} className={type === 'pontos' ? 'text-yellow-500' : ''} /> Pontos
                  </span>
                  <span className={`font-black ${type === 'pontos' ? 'text-gray-900 dark:text-white text-lg' : 'text-gray-600 dark:text-gray-400'}`}>
                    {aluno.pontos || 0}
                  </span>
                </div>

                <div className={`flex flex-col items-end ${type === 'pontos' ? 'opacity-50 scale-90' : 'scale-100'}`}>
                  <span className="flex items-center gap-1 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                    <Flame size={12} className={type === 'frequencia' ? 'text-orange-500' : ''} /> Fogo
                  </span>
                  <span className={`font-black ${type === 'frequencia' ? 'text-gray-900 dark:text-white text-lg' : 'text-gray-600 dark:text-gray-400'}`}>
                    {aluno.streak_atual || 0}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}