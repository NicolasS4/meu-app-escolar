"use client";

import { useState, useMemo } from "react";
import { Trophy, Flame, Heart } from "lucide-react";

export const getTier = (pontos: number) => {
  if (pontos >= 2000) return { nome: "Lendário", cor: "from-purple-500 to-pink-500", text: "text-purple-500", icone: "👑" };
  if (pontos >= 1000) return { nome: "Mestre", cor: "from-red-500 to-orange-500", text: "text-red-500", icone: "🔥" };
  if (pontos >= 600) return { nome: "Diamante", cor: "from-cyan-400 to-blue-500", text: "text-cyan-500", icone: "💎" };
  if (pontos >= 300) return { nome: "Ouro", cor: "from-yellow-400 to-amber-500", text: "text-yellow-500", icone: "🏆" };
  if (pontos >= 100) return { nome: "Prata", cor: "from-slate-300 to-slate-400", text: "text-slate-400", icone: "🥈" };
  return { nome: "Bronze", cor: "from-amber-700 to-orange-900", text: "text-amber-700", icone: "🥉" };
};

interface EstatisticasCardProps {
  aluno: any;
  ranking: any[]; // A API deve retornar { nome, pontos, streak_atual, likes_count }
}

export default function EstatisticasCard({ aluno, ranking }: EstatisticasCardProps) {
  const [activeTab, setActiveTab] = useState<"pontos" | "fogo" | "coracoes">("pontos");
  const tier = getTier(aluno?.pontos || 0);

  // FUNÇÃO MESTRE DE ORDENAÇÃO E DESEMPATE
  const getRankedList = (data: any[], mainKey: string, secKey: string) => {
    // 1. Ordena baseado na chave principal e chave de desempate
    const sorted = [...data].sort((a, b) => {
      const valA1 = a[mainKey] || 0;
      const valB1 = b[mainKey] || 0;
      if (valB1 !== valA1) return valB1 - valA1; // Quem tem mais no principal ganha
      
      const valA2 = a[secKey] || 0;
      const valB2 = b[secKey] || 0;
      return valB2 - valA2; // Desempate na chave secundária
    });

    // 2. Calcula a posição exata (Empates ficam na mesma posição)
    let currentRank = 1;
    return sorted.map((item, index) => {
      if (index > 0) {
        const prev = sorted[index - 1];
        const isLesser = 
          (item[mainKey] || 0) < (prev[mainKey] || 0) || 
          ((item[mainKey] || 0) === (prev[mainKey] || 0) && (item[secKey] || 0) < (prev[secKey] || 0));
        
        if (isLesser) {
          currentRank = index + 1;
        }
      }
      return { ...item, displayRank: currentRank };
    });
  };

  // Gerando as 3 listas baseadas na sua regra
  const rankingLists = useMemo(() => {
    // Se o backend usar nomes de variáveis diferentes, ajustamos aqui.
    // Presumi 'likes_count' ou 'likes' para corações.
    return {
      pontos: getRankedList(ranking, "pontos", "streak_atual"),
      fogo: getRankedList(ranking, "streak_atual", "pontos"),
      coracoes: getRankedList(ranking, "likes_count", "streak_atual") 
    };
  }, [ranking]);

  const currentList = rankingLists[activeTab];

  return (
    // Adicionado "relative z-30 isolate" para proteger contra backgrounds da tela
    <div className="flex flex-col gap-4 h-full relative z-30 isolate">
      
      {/* Card de Pontos e Nível - COMPACTO */}
      <div className={`bg-gradient-to-br ${tier.cor} rounded-[2rem] p-5 text-white relative overflow-hidden shadow-2xl shrink-0`}>
        <div className="absolute -right-4 -top-4 text-[100px] opacity-20 pointer-events-none">{tier.icone}</div>
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-90 mb-1">Saldo Atual</p>
            <span className="text-4xl font-black tracking-tighter">{aluno?.pontos || 0} <span className="text-lg font-bold opacity-70">pts</span></span>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider opacity-90 mb-1">Seu Rank</p>
            <div className="flex items-center gap-1.5 text-lg font-black bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-md">
              {tier.icone} {tier.nome}
            </div>
          </div>
        </div>
      </div>

      {/* Card Leaderboard - COM ALTURA FIXA E SCROLL */}
      <div className="bg-white dark:bg-[#111111] rounded-[2rem] border border-slate-100 dark:border-[#222] p-5 flex flex-col shadow-xl shadow-slate-200/50 dark:shadow-none flex-1 min-h-0 relative z-10">
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl">
            <Trophy size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">Top da Turma</h2>
        </div>

        {/* ABAS DE NAVEGAÇÃO DO RANKING */}
        <div className="flex bg-slate-100 dark:bg-[#222] p-1.5 rounded-xl mb-4 shrink-0 gap-1 relative z-20">
          <button 
            onClick={() => setActiveTab('pontos')} 
            className={`flex-1 text-xs font-black py-2 rounded-lg flex justify-center items-center gap-1.5 transition-all ${activeTab === 'pontos' ? 'bg-white dark:bg-[#111] shadow-sm text-yellow-600 dark:text-yellow-500' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Trophy size={14} /> Pontos
          </button>
          <button 
            onClick={() => setActiveTab('fogo')} 
            className={`flex-1 text-xs font-black py-2 rounded-lg flex justify-center items-center gap-1.5 transition-all ${activeTab === 'fogo' ? 'bg-white dark:bg-[#111] shadow-sm text-orange-600 dark:text-orange-500' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Flame size={14} /> Fogo
          </button>
          <button 
            onClick={() => setActiveTab('coracoes')} 
            className={`flex-1 text-xs font-black py-2 rounded-lg flex justify-center items-center gap-1.5 transition-all ${activeTab === 'coracoes' ? 'bg-white dark:bg-[#111] shadow-sm text-pink-600 dark:text-pink-500' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Heart size={14} /> Corações
          </button>
        </div>
        
        {/* Container com scroll - altura limitada */}
        <div className="space-y-2 overflow-y-auto flex-1 pr-1 custom-scrollbar relative z-20" style={{ maxHeight: 'calc(100vh - 420px)' }}>
          {currentList.length === 0 ? (
            <div className="text-center py-6 text-slate-400 dark:text-slate-500">
              <Trophy size={32} className="mx-auto mb-2 opacity-20" />
              <p className="text-xs font-medium">Nenhum aluno no ranking ainda.</p>
            </div>
          ) : (
            currentList.map((rankAluno, index) => {
              const isMe = aluno?.nome === rankAluno.nome;
              const rankTier = getTier(rankAluno.pontos || 0);
              const rankPos = rankAluno.displayRank; // Posição que respeita os empates

              // O que renderizar do lado direito depende da aba ativa
              let valorDisplay, iconeDisplay, labelDisplay;
              if (activeTab === 'pontos') {
                valorDisplay = rankAluno.pontos || 0; iconeDisplay = null; labelDisplay = "pts";
              } else if (activeTab === 'fogo') {
                valorDisplay = rankAluno.streak_atual || 0; iconeDisplay = <Flame size={12} className="text-orange-500" />; labelDisplay = "dias";
              } else {
                valorDisplay = rankAluno.likes_count || rankAluno.likes || 0; iconeDisplay = <Heart size={12} className="text-pink-500" />; labelDisplay = "likes";
              }

              return (
                <div key={index} className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                  isMe 
                    ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30" 
                    : "bg-transparent border-slate-100 dark:border-[#222] hover:bg-slate-50 dark:hover:bg-[#1a1a1a]"
                }`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-black text-base w-5 text-center shrink-0">
                      {rankPos === 1 ? "🥇" : rankPos === 2 ? "🥈" : rankPos === 3 ? "🥉" : <span className="text-slate-400 text-xs">{rankPos}</span>}
                    </span>
                    <div className="min-w-0">
                      <span className={`font-bold block text-sm truncate max-w-[100px] ${
                        isMe ? "text-indigo-700 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"
                      }`}>
                        {rankAluno.nome} {isMe && "(Você)"}
                      </span>
                      {activeTab === 'pontos' && (
                        <span className={`text-[10px] uppercase font-black tracking-wider ${rankTier.text}`}>
                          {rankTier.icone} {rankTier.nome}
                        </span>
                      )}
                      {activeTab === 'fogo' && (
                        <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1">
                          Desempate: {rankAluno.pontos || 0} pts
                        </span>
                      )}
                      {activeTab === 'coracoes' && (
                        <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1">
                          Desempate: {rankAluno.streak_atual || 0} 🔥
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end shrink-0">
                    <span className="font-black text-slate-800 dark:text-white leading-none text-sm flex items-center gap-1">
                      {iconeDisplay} {valorDisplay}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{labelDisplay}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}