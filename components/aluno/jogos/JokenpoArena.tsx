"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle2, Swords, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface JokenpoArenaProps {
  duelo: any;
  meuId: string;
  onJogada: (novosDados: any, vencedorId: string | null, deuVelha: boolean) => void;
}

// 🔮 BLINDAGEM ABSOLUTA: Usando CSS puro para as cores e sombras para o Tailwind não sumir com elas
const OPCOES = {
  pedra: { icone: '🪨', bg: 'linear-gradient(135deg, #475569, #1e293b)', shadow: '0px 10px 20px rgba(71, 85, 105, 0.5)', nome: 'Pedra' },
  papel: { icone: '📄', bg: 'linear-gradient(135deg, #2563eb, #1e3a8a)', shadow: '0px 10px 20px rgba(37, 99, 235, 0.5)', nome: 'Papel' },
  tesoura: { icone: '✂️', bg: 'linear-gradient(135deg, #ef4444, #7f1d1d)', shadow: '0px 10px 20px rgba(239, 68, 68, 0.5)', nome: 'Tesoura' }
};

export default function JokenpoArena({ duelo, meuId, onJogada }: JokenpoArenaProps) {
  const [fase, setFase] = useState<'escolhendo' | 'animando' | 'revelado'>('escolhendo');
  const [ganhadorRodada, setGanhadorRodada] = useState<'eu' | 'oponente' | 'empate' | null>(null);

  const souCriador = meuId === duelo.criador_id;
  const oponenteId = souCriador ? duelo.oponente_id : duelo.criador_id;
  
  const escolhas = duelo.dados_jogo?.escolhas || {};
  const minhaEscolha = escolhas[meuId];
  const oponenteEscolha = escolhas[oponenteId];

  useEffect(() => {
    if (minhaEscolha && oponenteEscolha && fase === 'escolhendo') {
      setFase('animando');
      
      setTimeout(() => {
        let quemGanhou: 'eu' | 'oponente' | 'empate' = 'empate';
        let vencedorDB = null;

        if (minhaEscolha === oponenteEscolha) {
          quemGanhou = 'empate';
        } else if (
          (minhaEscolha === 'pedra' && oponenteEscolha === 'tesoura') ||
          (minhaEscolha === 'papel' && oponenteEscolha === 'pedra') ||
          (minhaEscolha === 'tesoura' && oponenteEscolha === 'papel')
        ) {
          quemGanhou = 'eu';
          vencedorDB = meuId;
        } else {
          quemGanhou = 'oponente';
          vencedorDB = oponenteId;
        }

        setGanhadorRodada(quemGanhou);
        setFase('revelado'); 

        setTimeout(async () => {
          if (souCriador) {
            if (quemGanhou === 'empate') {
              const novosDados = { ...duelo.dados_jogo, escolhas: {} };
              await supabase.from("duelos").update({ dados_jogo: novosDados }).eq("id", duelo.id);
              setFase('escolhendo');
              setGanhadorRodada(null);
            } else {
              onJogada(duelo.dados_jogo, vencedorDB, false);
            }
          } else {
            if (quemGanhou === 'empate') {
              setFase('escolhendo');
              setGanhadorRodada(null);
            }
          }
        }, 2500); 

      }, 2000); 
    }
  }, [escolhas, meuId, oponenteId, souCriador, duelo.id, duelo.dados_jogo, minhaEscolha, oponenteEscolha, fase, onJogada]);

  const handleEscolher = async (opcao: string) => {
    if (minhaEscolha || fase !== 'escolhendo') return; 
    const novosDados = { ...duelo.dados_jogo, escolhas: { ...duelo.dados_jogo?.escolhas, [meuId]: opcao } };
    await supabase.from("duelos").update({ dados_jogo: novosDados }).eq("id", duelo.id);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6 pb-8 relative perspective-1000">
      
      {/* CABEÇALHO DINÂMICO */}
      <motion.div 
        layout
        className="text-center bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] -translate-x-full" />
        
        {fase === 'revelado' ? (
          <motion.h2 
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className={`text-3xl font-black uppercase tracking-widest drop-shadow-lg
              ${ganhadorRodada === 'empate' ? 'text-yellow-400' : ganhadorRodada === 'eu' ? 'text-emerald-400' : 'text-red-500'}`}
          >
            {ganhadorRodada === 'empate' ? 'CLASH! EMPATE!' : ganhadorRodada === 'eu' ? 'VITÓRIA!' : 'DERROTA!'}
          </motion.h2>
        ) : fase === 'animando' ? (
          <motion.h2 animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="text-2xl font-black text-white uppercase tracking-widest flex justify-center items-center gap-2">
            <Zap size={28} className="text-yellow-500 animate-pulse" /> BATALHA!
          </motion.h2>
        ) : !minhaEscolha ? (
          <h2 className="text-xl font-bold text-blue-400">Escolha sua arma!</h2>
        ) : (
          <h2 className="text-xl font-bold text-orange-400 flex justify-center items-center gap-2">
            <Loader2 className="animate-spin" size={20} /> Oponente pensando...
          </h2>
        )}
      </motion.div>

      {/* 🥊 ARENA 3D DE COMBATE */}
      <div className="flex justify-between items-center bg-slate-950/80 p-8 rounded-[2rem] border-2 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-sm">
        
        {/* Minha Mão */}
        <div className="flex flex-col items-center gap-4 w-[130px] z-10">
          <span className="text-blue-400 font-black uppercase text-sm tracking-widest bg-blue-900/30 px-4 py-1 rounded-full border border-blue-800/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]">Você</span>
          <motion.div 
            animate={
              fase === 'animando' ? { x: [0, 15, -5, 10, 0], y: [0, -5, 5, -5, 0], scale: 1.1 } : 
              fase === 'revelado' ? { rotateY: 360, scale: ganhadorRodada === 'eu' ? 1.2 : ganhadorRodada === 'oponente' ? 0.8 : 1 } :
              { scale: 1 }
            }
            transition={fase === 'animando' ? { repeat: Infinity, duration: 0.3 } : { duration: 0.6, type: "spring" }}
            style={minhaEscolha && fase === 'revelado' ? { background: OPCOES[minhaEscolha as keyof typeof OPCOES].bg } : {}}
            className={`w-32 h-40 rounded-3xl flex items-center justify-center text-7xl shadow-2xl transition-colors duration-500 border-4 relative
              ${fase === 'revelado' ? (
                  ganhadorRodada === 'eu' ? `border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.6)] z-50` : 
                  ganhadorRodada === 'oponente' ? 'bg-slate-800 border-slate-900 opacity-50 grayscale blur-[1px]' : 
                  `border-yellow-400`
                ) : 
                minhaEscolha ? `border-slate-700` : 'bg-slate-900 border-slate-800'}`}
          >
            {fase === 'animando' ? '🤜' : fase === 'revelado' ? OPCOES[minhaEscolha as keyof typeof OPCOES].icone : minhaEscolha ? '🛡️' : '?'}
          </motion.div>
        </div>

        {/* VS Central com Efeito de Pulso */}
        <motion.div 
          animate={fase === 'animando' ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-red-500 to-red-800 w-16 h-16 rounded-full flex items-center justify-center font-black text-white text-2xl shadow-[0_0_30px_rgba(220,38,38,0.8)] border-4 border-slate-950 z-20"
        >
          VS
        </motion.div>

        {/* Mão do Oponente */}
        <div className="flex flex-col items-center gap-4 w-[130px] z-10">
          <span className="text-orange-400 font-black uppercase text-sm tracking-widest bg-orange-900/30 px-4 py-1 rounded-full border border-orange-800/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]">Oponente</span>
          <motion.div 
            animate={
              fase === 'animando' ? { x: [0, -15, 5, -10, 0], y: [0, 5, -5, 5, 0], scale: 1.1 } : 
              fase === 'revelado' ? { rotateY: -360, scale: ganhadorRodada === 'oponente' ? 1.2 : ganhadorRodada === 'eu' ? 0.8 : 1 } :
              { scale: 1 }
            }
            transition={fase === 'animando' ? { repeat: Infinity, duration: 0.3, delay: 0.1 } : { duration: 0.6, type: "spring" }}
            style={oponenteEscolha && fase === 'revelado' ? { background: OPCOES[oponenteEscolha as keyof typeof OPCOES].bg } : {}}
            className={`w-32 h-40 rounded-3xl flex items-center justify-center text-7xl shadow-2xl transition-colors duration-500 border-4 relative
              ${fase === 'revelado' ? (
                  ganhadorRodada === 'oponente' ? `border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.6)] z-50` : 
                  ganhadorRodada === 'eu' ? 'bg-slate-800 border-slate-900 opacity-50 grayscale blur-[1px]' : 
                  `border-yellow-400`
                ) : 
                oponenteEscolha && fase !== 'escolhendo' ? `border-slate-700` :
                oponenteEscolha ? 'bg-gradient-to-br from-emerald-600 to-emerald-900 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-slate-900 border-slate-800'}`}
          >
            {fase === 'animando' ? '🤛' : fase === 'revelado' ? OPCOES[oponenteEscolha as keyof typeof OPCOES].icone : oponenteEscolha ? <CheckCircle2 className="text-white" size={56} /> : '?'}
          </motion.div>
        </div>
      </div>

      {/* 🎛️ CONTROLES MÁGICOS BLINDADOS (Lado a Lado Obrigatório) */}
      <AnimatePresence>
        {!minhaEscolha && fase === 'escolhendo' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50, scale: 0.8 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px', marginTop: '16px' }}
          >
            {Object.entries(OPCOES).map(([chave, dados], index) => (
              <motion.button
                key={chave}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleEscolher(chave)}
                style={{ background: dados.bg, boxShadow: dados.shadow }}
                className="aspect-square flex flex-col items-center justify-center gap-2 rounded-3xl border-b-[6px] border-[#020617] active:border-b-0 active:translate-y-[6px] transition-all"
              >
                <span className="text-4xl sm:text-6xl drop-shadow-md">{dados.icone}</span>
                <span className="text-white font-black text-[10px] sm:text-sm uppercase tracking-wider">{dados.nome}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}