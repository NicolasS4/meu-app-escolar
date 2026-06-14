"use client";

import { Library, Users, Flame, Star } from "lucide-react";
import { motion } from "framer-motion";

interface KpiCardsProps {
  totalTurmas: number;
  totalAlunos: number;
  totalPontos: number;
  alunosEmOfensiva: number;
}

export default function KpiCards({ totalTurmas, totalAlunos, totalPontos, alunosEmOfensiva }: KpiCardsProps) {
  const cards = [
    { 
      title: "Total de Turmas", value: totalTurmas, icon: Library, 
      color: "text-blue-700 dark:text-blue-300", bg: "bg-blue-100 dark:bg-blue-900/40" 
    },
    { 
      title: "Alunos Ativos", value: totalAlunos, icon: Users, 
      color: "text-indigo-700 dark:text-indigo-300", bg: "bg-indigo-100 dark:bg-indigo-900/40" 
    },
    { 
      title: "Pontos Distribuídos", value: totalPontos, icon: Star, 
      color: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/40" 
    },
    { 
      title: "Ofensivas Ativas", value: alunosEmOfensiva, icon: Flame, 
      color: "text-orange-700 dark:text-orange-300", bg: "bg-orange-100 dark:bg-orange-900/40",
      pulse: true
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-start"
        >
          <div>
            <p className="text-gray-600 dark:text-gray-300 font-bold text-xs uppercase tracking-wider mb-2">
              {card.title}
            </p>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white">
              {card.value}
            </h3>
          </div>
          <div className={`p-4 rounded-2xl ${card.bg} ${card.color}`}>
            <card.icon size={28} className={card.pulse && card.value > 0 ? "animate-pulse" : ""} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}