"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Star, Flame, Loader2 } from "lucide-react";
import RankingList from "./RankingList";

interface HallDaFamaProps {
  professorId: string;
}

export default function HallDaFama({ professorId }: HallDaFamaProps) {
  const [topPontos, setTopPontos] = useState<any[]>([]);
  const [topFrequencia, setTopFrequencia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      setIsLoading(true);
      
      // Busca todos os alunos deste professor
      const { data: alunos } = await supabase
        .from("profiles")
        .select("id, nome, pontos, streak_atual")
        .eq("role", "aluno")
        .eq("professor_id", professorId);

      if (alunos) {
        // 1. LÓGICA DO TOP PONTUAÇÃO (Desempate: Frequência)
        const sortedByPontos = [...alunos].sort((a, b) => {
          const pontosA = a.pontos || 0;
          const pontosB = b.pontos || 0;
          
          if (pontosB !== pontosA) {
            return pontosB - pontosA; // Maior pontuação primeiro
          }
          // Critério de desempate: Maior Fogo (Streak)
          return (b.streak_atual || 0) - (a.streak_atual || 0);
        });

        // 2. LÓGICA DO TOP FREQUÊNCIA (Desempate: Pontos)
        const sortedByFrequencia = [...alunos].sort((a, b) => {
          const streakA = a.streak_atual || 0;
          const streakB = b.streak_atual || 0;
          
          if (streakB !== streakA) {
            return streakB - streakA; // Maior fogo primeiro
          }
          // Critério de desempate: Maior Pontuação
          return (b.pontos || 0) - (a.pontos || 0);
        });

        // Pega apenas o Top 5 de cada modalidade e ignora quem tem 0 em tudo
        setTopPontos(sortedByPontos.filter(a => (a.pontos || 0) > 0).slice(0, 5));
        setTopFrequencia(sortedByFrequencia.filter(a => (a.streak_atual || 0) > 0).slice(0, 5));
      }

      setIsLoading(false);
    };

    fetchRanking();
  }, [professorId]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-12 border border-gray-200 dark:border-gray-700 rounded-3xl bg-gray-100 dark:bg-gray-800 mt-6">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2 tracking-tight">
        🏆 Hall da Fama (Top 5)
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <RankingList 
          title="Maior Pontuação" 
          icon={Star} 
          data={topPontos} 
          type="pontos" 
          colorTheme="yellow" 
        />

        <RankingList 
          title="Maior Frequência (Fogo)" 
          icon={Flame} 
          data={topFrequencia} 
          type="frequencia" 
          colorTheme="orange" 
        />

      </div>
    </div>
  );
}