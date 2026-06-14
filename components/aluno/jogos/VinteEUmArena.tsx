"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, AlertTriangle, Play, Hourglass, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface VinteEUmArenaProps {
  duelo: any;
  meuId: string;
  onJogada: (novosDados: any, vencedorId: string | null, deuVelha: boolean) => void;
}

type Carta = { naipe: string; valor: string; peso: number; hex: string };

// 🃏 Lógica de Baralho Blindada
const gerarDecks = () => {
  const naipes = [
    { n: '♠', hex: '#0f172a' }, { n: '♥', hex: '#dc2626' }, 
    { n: '♦', hex: '#dc2626' }, { n: '♣', hex: '#0f172a' }
  ];
  const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  let deckGlobal: Carta[] = [];
  
  naipes.forEach(naipe => {
    valores.forEach(v => {
      let peso = 0;
      if (v === 'A') peso = 11;
      else if (v === 'J') peso = 11;
      else if (v === 'Q') peso = 12;
      else if (v === 'K') peso = 13;
      else peso = parseInt(v);
      deckGlobal.push({ naipe: naipe.n, valor: v, peso, hex: naipe.hex });
    });
  });

  deckGlobal.sort(() => Math.random() - 0.5);

  return {
    maoCriador: [deckGlobal.pop()!],
    maoOponente: [deckGlobal.pop()!],
    deckCriador: deckGlobal.splice(0, 10),
    deckOponente: deckGlobal.splice(0, 10)
  };
};

const calcularPontos = (mao: Carta[]) => {
  if (!mao) return 0;
  let soma = 0;
  let ases = 0;
  mao.forEach(c => {
    soma += c.peso;
    if (c.valor === 'A') ases += 1;
  });
  while (soma > 21 && ases > 0) {
    soma -= 10; 
    ases -= 1;
  }
  return soma;
};

export default function VinteEUmArena({ duelo, meuId, onJogada }: VinteEUmArenaProps) {
  const [revelando, setRevelando] = useState(false);
  const [empateRodada, setEmpateRodada] = useState(false);
  
  const souCriador = meuId === duelo.criador_id;
  const oponenteId = souCriador ? duelo.oponente_id : duelo.criador_id;
  const jogoIniciado = duelo.dados_jogo?.jogo_iniciado;
  const turnoAtual = duelo.dados_jogo?.turno_atual;
  const ehMeuTurno = turnoAtual === meuId;

  const minhaMao = duelo.dados_jogo?.maos?.[meuId] || [];
  const oponenteMao = duelo.dados_jogo?.maos?.[oponenteId] || [];
  const meuStatus = duelo.dados_jogo?.status?.[meuId] || 'jogando'; 
  const oponenteStatus = duelo.dados_jogo?.status?.[oponenteId] || 'jogando';

  const meusPontos = calcularPontos(minhaMao);
  const oponentePontos = calcularPontos(oponenteMao);

  // 🧠 SETUP DO JOGO
  useEffect(() => {
    if (souCriador && !jogoIniciado) {
      const { maoCriador, maoOponente, deckCriador, deckOponente } = gerarDecks();
      const novosDados = {
        ...duelo.dados_jogo,
        jogo_iniciado: true,
        turno_atual: duelo.criador_id,
        maos: { [duelo.criador_id]: maoCriador, [duelo.oponente_id]: maoOponente },
        decks: { [duelo.criador_id]: deckCriador, [duelo.oponente_id]: deckOponente },
        status: { [duelo.criador_id]: 'jogando', [duelo.oponente_id]: 'jogando' }
      };
      supabase.from("duelos").update({ dados_jogo: novosDados }).eq("id", duelo.id).then();
    }
  }, [souCriador, jogoIniciado, duelo.id, duelo.criador_id, duelo.oponente_id, duelo.dados_jogo]);

  // ⚖️ O JUIZ: Só decide quando AMBOS terminarem
  useEffect(() => {
    if (jogoIniciado && !revelando && meuStatus !== 'jogando' && oponenteStatus !== 'jogando') {
      setRevelando(true);
      
      if (souCriador) {
        const ptsCriador = calcularPontos(duelo.dados_jogo.maos[duelo.criador_id]);
        const ptsOponente = calcularPontos(duelo.dados_jogo.maos[duelo.oponente_id]);
        const stCriador = duelo.dados_jogo.status[duelo.criador_id];
        const stOponente = duelo.dados_jogo.status[duelo.oponente_id];

        let vencedorDB = null;
        let empate = false;

        // Ambos estouraram
        if (stCriador === 'estourou' && stOponente === 'estourou') {
          empate = true;
        }
        // Um estourou e o outro não
        else if (stCriador === 'estourou') {
          vencedorDB = duelo.oponente_id;
        }
        else if (stOponente === 'estourou') {
          vencedorDB = duelo.criador_id;
        }
        // Ambos fizeram 21
        else if (ptsCriador === 21 && ptsOponente === 21) {
          empate = true;
        }
        // Ninguém estourou - maior pontuação vence
        else if (ptsCriador > ptsOponente) {
          vencedorDB = duelo.criador_id;
        }
        else if (ptsOponente > ptsCriador) {
          vencedorDB = duelo.oponente_id;
        }
        else {
          empate = true;
        }

        if (empate) {
          setEmpateRodada(true);
          toast("EMPATE! Nova rodada iniciando...", { icon: "🔄", duration: 2500 });
          
          setTimeout(async () => {
            const { maoCriador, maoOponente, deckCriador, deckOponente } = gerarDecks();
            const novosDados = {
              ...duelo.dados_jogo,
              turno_atual: duelo.criador_id,
              maos: { [duelo.criador_id]: maoCriador, [duelo.oponente_id]: maoOponente },
              decks: { [duelo.criador_id]: deckCriador, [duelo.oponente_id]: deckOponente },
              status: { [duelo.criador_id]: 'jogando', [duelo.oponente_id]: 'jogando' }
            };
            await supabase.from("duelos").update({ dados_jogo: novosDados }).eq("id", duelo.id);
            setRevelando(false);
            setEmpateRodada(false);
          }, 3500);
        } else {
          onJogada(duelo.dados_jogo, vencedorDB, false);
        }
      } else {
        // Não sou criador, apenas verifico visualmente
        const ptsCriador = calcularPontos(duelo.dados_jogo.maos[duelo.criador_id]);
        const ptsOponente = calcularPontos(duelo.dados_jogo.maos[duelo.oponente_id]);
        const stCriador = duelo.dados_jogo.status[duelo.criador_id];
        const stOponente = duelo.dados_jogo.status[duelo.oponente_id];
        
        if ((stCriador === 'estourou' && stOponente === 'estourou') || 
            (ptsCriador === 21 && ptsOponente === 21) ||
            (stCriador !== 'estourou' && stOponente !== 'estourou' && ptsCriador === ptsOponente && ptsCriador <= 21)) {
          setEmpateRodada(true);
          setTimeout(() => { 
            setRevelando(false); 
            setEmpateRodada(false); 
          }, 3500);
        }
      }
    }
  }, [meuStatus, oponenteStatus, jogoIniciado, revelando, souCriador, duelo, onJogada]);

  // 🎯 CORRIGIDO: Determina o próximo turno
  const determinarProximoTurno = (meuNovoStatus: string) => {
    // Se eu parei (21 ou estourei)
    if (meuNovoStatus !== 'jogando') {
      // Se o oponente ainda está jogando, passa a vez pra ele
      if (oponenteStatus === 'jogando') return oponenteId;
      // Se o oponente também já parou, jogo acabou
      return null;
    }
    
    // Se eu continuei jogando (comprei mas não fiz 21 nem estourei)
    // Verifica se o oponente ainda pode jogar
    if (oponenteStatus === 'jogando') return oponenteId;
    // Se o oponente já estourou ou fez 21, o turno volta pra mim
    if (oponenteStatus !== 'jogando') return meuId;
    
    // Fallback
    return oponenteId;
  };

  // 🎮 COMPRAR CARTA
  const handleComprar = async () => {
    if (meuStatus !== 'jogando' || !ehMeuTurno) return;
    
    const meuDeckReserva = [...duelo.dados_jogo.decks[meuId]];
    const novaCarta = meuDeckReserva.pop();
    const novaMao = [...minhaMao, novaCarta];
    
    const novaPontuacao = calcularPontos(novaMao);
    let novoStatus = 'jogando';
    
    if (novaPontuacao > 21) {
      novoStatus = 'estourou';
      toast.error("Você estourou! 💥", { duration: 2000 });
    } else if (novaPontuacao === 21) {
      novoStatus = 'parou';
      toast.success("21! Aguardando oponente... 🎯", { duration: 2500 });
    }

    const proximoTurno = determinarProximoTurno(novoStatus);

    const novosDados = {
      ...duelo.dados_jogo,
      turno_atual: proximoTurno,
      maos: { ...duelo.dados_jogo.maos, [meuId]: novaMao },
      decks: { ...duelo.dados_jogo.decks, [meuId]: meuDeckReserva },
      status: { ...duelo.dados_jogo.status, [meuId]: novoStatus }
    };

    await supabase.from("duelos").update({ dados_jogo: novosDados }).eq("id", duelo.id);
  };

  // Verificar se pode comprar
  const podeComprar = meuStatus === 'jogando' && ehMeuTurno && meusPontos < 21;

  if (!jogoIniciado) return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-3xl border border-slate-800">
      <Loader2 className="animate-spin text-emerald-500 mb-4" size={40} />
      <h2 className="text-xl font-bold text-white">Embaralhando as cartas...</h2>
    </div>
  );

  const RenderCard = ({ carta, idx }: { carta: Carta, idx: number }) => (
    <motion.div
      initial={{ y: -30, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay: idx * 0.1 }}
      className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl shadow-md border-2 bg-white flex flex-col justify-between p-2"
      style={{ borderColor: '#cbd5e1' }}
    >
      <span className="text-base sm:text-xl font-black leading-none" style={{ color: carta.hex }}>{carta.valor}</span>
      <span className="text-xl sm:text-3xl text-center self-center" style={{ color: carta.hex }}>{carta.naipe}</span>
      <span className="text-base sm:text-xl font-black leading-none self-end rotate-180" style={{ color: carta.hex }}>{carta.valor}</span>
    </motion.div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 pb-8">
      
      {/* 🟠 MESA DO OPONENTE */}
      <div className={`p-6 rounded-3xl border-2 shadow-xl relative overflow-hidden transition-all duration-500
        ${turnoAtual === oponenteId && oponenteStatus === 'jogando' ? 'border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.3)]' : 'border-slate-800 bg-slate-950'}`}>
        <div className="absolute inset-0 bg-emerald-900/10" /> 
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex justify-between items-center w-full px-4">
            <span className="text-orange-400 font-black uppercase text-xs tracking-widest bg-orange-900/30 px-3 py-1 rounded-full border border-orange-800/50">Oponente</span>
            <div className="flex items-center gap-2">
              {oponenteStatus === 'estourou' ? (
                <span className="text-red-500 text-xs font-bold flex items-center gap-1 bg-red-950/50 px-3 py-1 rounded-full">
                  <AlertTriangle size={14}/> Estourou
                </span>
              ) : oponentePontos === 21 ? (
                <span className="text-yellow-400 text-xs font-bold flex items-center gap-1 bg-yellow-950/50 px-3 py-1 rounded-full">
                  <Crown size={14}/> 21!
                </span>
              ) : turnoAtual === oponenteId && oponenteStatus === 'jogando' ? (
                <span className="text-orange-400 text-xs font-bold animate-pulse flex items-center gap-1 bg-orange-950/50 px-3 py-1 rounded-full">
                  <Hourglass size={14}/> Vez do Oponente
                </span>
              ) : (
                <span className="text-slate-500 text-xs font-bold bg-slate-800/50 px-3 py-1 rounded-full">
                  {oponenteStatus === 'parou' ? 'Parou' : 'Aguardando'}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap w-full">
            <AnimatePresence>
              {oponenteMao.map((carta: Carta, idx: number) => (
                <RenderCard key={`op-${idx}`} carta={carta} idx={idx} />
              ))}
            </AnimatePresence>
          </div>
          
          <div className={`text-sm font-black px-4 py-1 rounded-full ${
            oponentePontos > 21 ? 'bg-red-600/20 text-red-500' : 
            oponentePontos === 21 ? 'bg-yellow-500/20 text-yellow-400 animate-pulse' : 
            'bg-slate-900/50 text-slate-400'
          }`}>
            {oponentePontos} Pontos
          </div>

          {oponenteStatus === 'estourou' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 rounded-2xl">
              <h2 className="text-4xl sm:text-5xl font-black text-red-500 uppercase tracking-widest rotate-[-10deg] drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">Estourou!</h2>
            </motion.div>
          )}
          
          {oponentePontos === 21 && oponenteStatus !== 'estourou' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40 rounded-2xl pointer-events-none">
              <h2 className="text-4xl sm:text-5xl font-black text-yellow-400 uppercase tracking-widest rotate-[-5deg] drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]">21!</h2>
            </motion.div>
          )}
        </div>
      </div>

      {/* VS CENTRAL */}
      <div className="flex justify-center -my-5 relative z-20">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] border-4 border-slate-950 transition-colors ${
          empateRodada ? 'bg-yellow-500 text-slate-900 text-[10px] tracking-widest' : 'bg-red-600 text-lg'
        }`}>
          {empateRodada ? 'EMPATE' : 'VS'}
        </div>
      </div>

      {/* 🔵 MINHA MESA */}
      <div className={`p-6 rounded-3xl border-2 shadow-2xl relative overflow-hidden transition-all duration-500
        ${meuStatus === 'estourou' ? 'bg-red-950/40 border-red-900' : 
          ehMeuTurno ? 'bg-slate-900 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 
          'bg-slate-900 border-slate-700'}`}
      >
        <div className="absolute inset-0 bg-emerald-900/10" />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex justify-between items-center w-full px-4">
            <span className="text-blue-400 font-black uppercase text-xs tracking-widest bg-blue-900/30 px-3 py-1 rounded-full border border-blue-800/50">Você</span>
            <div className="flex items-center gap-2">
              {meuStatus === 'estourou' ? (
                <span className="text-red-500 text-xs font-bold flex items-center gap-1 bg-red-950/50 px-3 py-1 rounded-full">
                  <AlertTriangle size={14}/> Estourou
                </span>
              ) : meusPontos === 21 ? (
                <span className="text-yellow-400 text-xs font-bold flex items-center gap-1 bg-yellow-950/50 px-3 py-1 rounded-full">
                  <Crown size={14}/> 21!
                </span>
              ) : ehMeuTurno ? (
                <span className="text-blue-400 text-xs font-bold animate-pulse flex items-center gap-1 bg-blue-950/50 px-3 py-1 rounded-full">
                  <Hourglass size={14}/> Sua Vez!
                </span>
              ) : (
                <span className="text-slate-500 text-xs font-bold bg-slate-800/50 px-3 py-1 rounded-full">
                  {oponenteStatus !== 'jogando' ? 'Sua vez de jogar' : 'Aguardando'}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap w-full">
            <AnimatePresence>
              {minhaMao.map((carta: Carta, idx: number) => (
                <RenderCard key={`eu-${idx}`} carta={carta} idx={idx} />
              ))}
            </AnimatePresence>
          </div>
          
          <div className={`text-sm font-black px-4 py-1 rounded-full ${
            meusPontos > 21 ? 'bg-red-600/20 text-red-500' : 
            meusPontos === 21 ? 'bg-yellow-500/20 text-yellow-400 animate-pulse' : 
            'bg-slate-800 text-slate-300'
          }`}>
            {meusPontos} Pontos
          </div>

          {meuStatus === 'estourou' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 rounded-2xl">
              <h2 className="text-4xl sm:text-5xl font-black text-red-500 uppercase tracking-widest rotate-[-10deg] drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">Estourou!</h2>
            </motion.div>
          )}
          
          {meusPontos === 21 && meuStatus !== 'estourou' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-40 rounded-2xl pointer-events-none">
              <h2 className="text-4xl sm:text-5xl font-black text-yellow-400 uppercase tracking-widest rotate-[-5deg] drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]">21!</h2>
            </motion.div>
          )}
        </div>
      </div>

      {/* 🎛️ CONTROLES */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="flex justify-center mt-2"
      >
        {!revelando && (
          <>
            {podeComprar ? (
              <button 
                onClick={handleComprar}
                className="flex flex-col items-center justify-center gap-2 px-12 py-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 border-b-[6px] border-[#022c22] active:border-b-0 active:translate-y-[6px] transition-all shadow-xl text-white hover:scale-105"
              >
                <Play size={28} className="fill-white" />
                <span className="font-black uppercase tracking-widest text-sm">Comprar Carta</span>
              </button>
            ) : meusPontos === 21 && meuStatus !== 'estourou' ? (
              <div className="text-center px-8 py-3 rounded-2xl bg-yellow-500/10 border-2 border-yellow-500/50">
                <span className="text-yellow-400 font-black text-lg flex items-center gap-2">
                  <Crown size={24} /> 21! Aguardando oponente...
                </span>
              </div>
            ) : meuStatus === 'estourou' ? (
              <div className="text-center px-8 py-3 rounded-2xl bg-red-500/10 border-2 border-red-500/50">
                <span className="text-red-400 font-black text-lg flex items-center gap-2">
                  <AlertTriangle size={24} /> Você estourou! Aguardando...
                </span>
              </div>
            ) : !ehMeuTurno && oponenteStatus === 'jogando' ? (
              <div className="text-center px-8 py-3 rounded-2xl bg-slate-800 border-2 border-slate-700">
                <span className="text-slate-400 font-black text-lg animate-pulse flex items-center gap-2">
                  <Hourglass size={24} /> Vez do oponente...
                </span>
              </div>
            ) : !ehMeuTurno && oponenteStatus !== 'jogando' && meuStatus === 'jogando' ? (
              <button 
                onClick={handleComprar}
                className="flex flex-col items-center justify-center gap-2 px-12 py-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 border-b-[6px] border-blue-900 active:border-b-0 active:translate-y-[6px] transition-all shadow-xl text-white hover:scale-105 animate-pulse"
              >
                <Play size={28} className="fill-white" />
                <span className="font-black uppercase tracking-widest text-sm">Continuar Jogando</span>
              </button>
            ) : null}
          </>
        )}
      </motion.div>
    </div>
  );
}