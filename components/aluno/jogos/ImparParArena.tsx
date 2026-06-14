"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Swords, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImparParArenaProps {
  duelo: any;
  meuId: string;
  onJogada: (novosDados: any, vencedorId: string | null, deuVelha: boolean) => void;
}

export default function ImparParArena({ duelo, meuId, onJogada }: ImparParArenaProps) {
  const [fase, setFase] = useState<'escolhendo_lado' | 'escolhendo_numero' | 'animando' | 'revelado'>('escolhendo_lado');
  const [ganhadorRodada, setGanhadorRodada] = useState<'eu' | 'oponente' | null>(null);
  const [somaFinal, setSomaFinal] = useState<number | null>(null);

  const souCriador = meuId === duelo.criador_id;
  const oponenteId = souCriador ? duelo.oponente_id : duelo.criador_id;
  
  const ladoCriador = duelo.dados_jogo?.lado_criador; // 'impar' ou 'par'
  const numeros = duelo.dados_jogo?.numeros || {};
  const meuNumero = numeros[meuId];
  const oponenteNumero = numeros[oponenteId];

  // Define de que lado eu estou
  let meuLado = '';
  let oponenteLado = '';
  if (ladoCriador) {
    if (souCriador) {
      meuLado = ladoCriador;
      oponenteLado = ladoCriador === 'par' ? 'impar' : 'par';
    } else {
      meuLado = ladoCriador === 'par' ? 'impar' : 'par';
      oponenteLado = ladoCriador;
    }
  }

  // Controle de Fases
  useEffect(() => {
    if (!ladoCriador) {
      setFase('escolhendo_lado');
    } else if (meuNumero === undefined || oponenteNumero === undefined) {
      setFase('escolhendo_numero');
    } else if (meuNumero !== undefined && oponenteNumero !== undefined && fase === 'escolhendo_numero') {
      // ⚔️ FASE DE BATALHA: Os dois escolheram os números!
      setFase('animando');
      
      setTimeout(() => {
        const numCriador = numeros[duelo.criador_id];
        const numOponente = numeros[duelo.oponente_id];
        const soma = numCriador + numOponente;
        const isPar = soma % 2 === 0;
        
        let vencedorDB = null;
        let quemGanhou: 'eu' | 'oponente' = 'oponente';

        if ((isPar && ladoCriador === 'par') || (!isPar && ladoCriador === 'impar')) {
          // Criador ganhou
          vencedorDB = duelo.criador_id;
          quemGanhou = souCriador ? 'eu' : 'oponente';
        } else {
          // Oponente ganhou
          vencedorDB = duelo.oponente_id;
          quemGanhou = souCriador ? 'oponente' : 'eu';
        }

        setSomaFinal(soma);
        setGanhadorRodada(quemGanhou);
        setFase('revelado');

        // Aguarda a animação de vitória e avisa o Mestre da Arena
        setTimeout(() => {
          if (souCriador) {
            onJogada(duelo.dados_jogo, vencedorDB, false);
          }
        }, 3000);

      }, 2000); // 2 segundos de suspense tremendo a tela
    }
  }, [ladoCriador, meuNumero, oponenteNumero, fase, duelo.criador_id, duelo.oponente_id, numeros, souCriador, onJogada, duelo.dados_jogo]);

  // Ações do Jogador
  const handleEscolherLado = async (lado: 'impar' | 'par') => {
    if (!souCriador || ladoCriador) return;
    const novosDados = { ...duelo.dados_jogo, lado_criador: lado };
    await supabase.from("duelos").update({ dados_jogo: novosDados }).eq("id", duelo.id);
  };

  const handleEscolherNumero = async (num: number) => {
    if (meuNumero !== undefined || fase !== 'escolhendo_numero') return;
    const novosDados = { 
      ...duelo.dados_jogo, 
      numeros: { ...duelo.dados_jogo?.numeros, [meuId]: num } 
    };
    await supabase.from("duelos").update({ dados_jogo: novosDados }).eq("id", duelo.id);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6 pb-8 relative perspective-1000">
      
      {/* 🚀 CSS para Animações */}
      <style>{`
        @keyframes bounce-fast { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-batalha { animation: bounce-fast 0.4s ease-in-out infinite; }
      `}</style>

      {/* CABEÇALHO DINÂMICO */}
      <motion.div layout className="text-center bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] -translate-x-full" />
        
        {fase === 'escolhendo_lado' ? (
          souCriador ? <h2 className="text-xl font-bold text-blue-400">Você é o Desafiante! Escolha:</h2> : 
          <h2 className="text-xl font-bold text-orange-400 flex justify-center items-center gap-2"><Loader2 className="animate-spin" size={20}/> Aguardando Desafiante...</h2>
        ) : fase === 'escolhendo_numero' ? (
          meuNumero === undefined ? <h2 className="text-xl font-bold text-blue-400">Escolha um número (0 a 5)</h2> :
          <h2 className="text-xl font-bold text-orange-400 flex justify-center items-center gap-2"><Loader2 className="animate-spin" size={20}/> Aguardando Oponente...</h2>
        ) : fase === 'animando' ? (
          <h2 className="text-2xl font-black text-white uppercase tracking-widest flex justify-center items-center gap-2">
            <Zap size={28} className="text-yellow-500 animate-pulse" /> SOMANDO!
          </h2>
        ) : (
          <motion.h2 initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-3xl font-black uppercase tracking-widest drop-shadow-lg ${ganhadorRodada === 'eu' ? 'text-emerald-400' : 'text-red-500'}`}>
            {somaFinal} É {somaFinal !== null && somaFinal % 2 === 0 ? 'PAR' : 'ÍMPAR'}! {ganhadorRodada === 'eu' ? 'VITÓRIA!' : 'DERROTA!'}
          </motion.h2>
        )}
      </motion.div>

      {/* 🥊 ARENA 3D DE COMBATE */}
      <div className="flex justify-between items-center bg-slate-950/80 p-8 rounded-[2rem] border-2 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-sm">
        
        {/* Minha Mão */}
        <div className="flex flex-col items-center gap-4 w-[130px] z-10">
          <span className="text-blue-400 font-black uppercase text-sm tracking-widest bg-blue-900/30 px-4 py-1 rounded-full border border-blue-800/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]">Você</span>
          {meuLado && <span className={`text-xs font-black uppercase px-2 py-1 rounded ${meuLado === 'par' ? 'bg-indigo-600 text-white' : 'bg-fuchsia-600 text-white'}`}>{meuLado}</span>}
          
          <motion.div 
            animate={fase === 'animando' ? { x: [0, 15, -5, 10, 0], y: [0, -5, 5, -5, 0], scale: 1.1 } : fase === 'revelado' ? { rotateY: 360, scale: ganhadorRodada === 'eu' ? 1.2 : 0.8 } : { scale: 1 }}
            transition={fase === 'animando' ? { repeat: Infinity, duration: 0.3 } : { duration: 0.6, type: "spring" }}
            className={`w-32 h-40 rounded-3xl flex items-center justify-center text-7xl font-black shadow-2xl transition-colors duration-500 border-4 relative text-white
              ${fase === 'revelado' ? (ganhadorRodada === 'eu' ? 'bg-gradient-to-br from-emerald-500 to-emerald-800 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.6)] z-50' : 'bg-slate-800 border-slate-900 opacity-50 grayscale blur-[1px]') : 
                meuNumero !== undefined ? 'bg-gradient-to-br from-blue-600 to-blue-900 border-slate-700' : 'bg-slate-900 border-slate-800'}`}
          >
            {fase === 'animando' ? '✊' : fase === 'revelado' ? meuNumero : meuNumero !== undefined ? '🔒' : '?'}
          </motion.div>
        </div>

        {/* VS Central com Efeito de Pulso */}
        <motion.div 
          animate={fase === 'animando' ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } : fase === 'revelado' ? { scale: 1.2 } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center font-black text-white text-2xl shadow-[0_0_30px_rgba(220,38,38,0.8)] border-4 border-slate-950 z-20 ${fase === 'revelado' ? 'bg-yellow-500 text-slate-900 shadow-[0_0_50px_rgba(234,179,8,1)] text-4xl w-20 h-20' : 'bg-gradient-to-br from-red-500 to-red-800'}`}
        >
          {fase === 'revelado' ? somaFinal : 'VS'}
        </motion.div>

        {/* Mão do Oponente */}
        <div className="flex flex-col items-center gap-4 w-[130px] z-10">
          <span className="text-orange-400 font-black uppercase text-sm tracking-widest bg-orange-900/30 px-4 py-1 rounded-full border border-orange-800/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]">Oponente</span>
          {oponenteLado && <span className={`text-xs font-black uppercase px-2 py-1 rounded ${oponenteLado === 'par' ? 'bg-indigo-600 text-white' : 'bg-fuchsia-600 text-white'}`}>{oponenteLado}</span>}

          <motion.div 
            animate={fase === 'animando' ? { x: [0, -15, 5, -10, 0], y: [0, 5, -5, 5, 0], scale: 1.1 } : fase === 'revelado' ? { rotateY: -360, scale: ganhadorRodada === 'oponente' ? 1.2 : 0.8 } : { scale: 1 }}
            transition={fase === 'animando' ? { repeat: Infinity, duration: 0.3, delay: 0.1 } : { duration: 0.6, type: "spring" }}
            className={`w-32 h-40 rounded-3xl flex items-center justify-center text-7xl font-black shadow-2xl transition-colors duration-500 border-4 relative text-white
              ${fase === 'revelado' ? (ganhadorRodada === 'oponente' ? 'bg-gradient-to-br from-emerald-500 to-emerald-800 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.6)] z-50' : 'bg-slate-800 border-slate-900 opacity-50 grayscale blur-[1px]') : 
                oponenteNumero !== undefined && fase !== 'escolhendo_lado' ? 'bg-gradient-to-br from-orange-600 to-orange-900 border-slate-700' : 'bg-slate-900 border-slate-800'}`}
          >
            {fase === 'animando' ? '✊' : fase === 'revelado' ? oponenteNumero : oponenteNumero !== undefined ? '🔒' : '?'}
          </motion.div>
        </div>
      </div>

      {/* 🎛️ CONTROLES FASE 1: ESCOLHER LADO */}
      <AnimatePresence>
        {fase === 'escolhendo_lado' && souCriador && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="grid grid-cols-2 gap-6 mt-4 px-4">
            <button onClick={() => handleEscolherLado('impar')} className="py-6 rounded-3xl bg-gradient-to-br from-fuchsia-600 to-fuchsia-900 border-b-[6px] border-[#020617] active:border-b-0 active:translate-y-[6px] transition-all shadow-xl text-white font-black text-2xl uppercase tracking-widest hover:scale-105">Ímpar</button>
            <button onClick={() => handleEscolherLado('par')} className="py-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-900 border-b-[6px] border-[#020617] active:border-b-0 active:translate-y-[6px] transition-all shadow-xl text-white font-black text-2xl uppercase tracking-widest hover:scale-105">Par</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔢 CONTROLES FASE 2: TECLADO NUMÉRICO (0 a 5) */}
      <AnimatePresence>
        {fase === 'escolhendo_numero' && meuNumero === undefined && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50, scale: 0.8 }} className="flex justify-center flex-wrap gap-3 w-full max-w-[400px] mx-auto mt-4 px-4">
            {[0, 1, 2, 3, 4, 5].map(n => (
              <motion.button key={n} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEscolherNumero(n)} className="w-14 h-16 flex items-center justify-center text-4xl font-black text-white bg-slate-800 rounded-2xl hover:bg-blue-600 border-b-[6px] border-slate-950 active:border-b-0 active:translate-y-[6px] transition-all shadow-lg">
                {n}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}