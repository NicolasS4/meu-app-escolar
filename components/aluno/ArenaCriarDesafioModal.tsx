"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, X, Loader2, Users } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

interface ArenaCriarDesafioModalProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: any;
}

export default function ArenaCriarDesafioModal({ isOpen, onClose, aluno }: ArenaCriarDesafioModalProps) {
  const [oponenteId, setOponenteId] = useState("");
  const [jogo, setJogo] = useState("jogo_da_velha");
  const [aposta, setAposta] = useState(10);
  const [isWaiting, setIsWaiting] = useState(false);
  
  const [oponentesValidos, setOponentesValidos] = useState<any[]>([]);
  const [isBuscando, setIsBuscando] = useState(false);

  useEffect(() => {
    const buscarColegas = async () => {
      if (!isOpen || !aluno?.id) return;
      setIsBuscando(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("id, nome, pontos")
        .neq("id", aluno.id); 

      if (error) {
        console.error("Erro ao buscar perfis:", error);
      } else if (data) {
        setOponentesValidos(data);
      }
      setIsBuscando(false);
    };

    buscarColegas();
  }, [isOpen, aluno]);
  
  if (!isOpen) return null;

  const handleEnviarDesafio = async () => {
    if (!oponenteId) return toast.error("Escolha um oponente!");
    if (aposta < 10) return toast.error("A aposta mínima é 10 pontos.");
    if (aluno.pontos < aposta) return toast.error("Você não tem pontos suficientes!");

    setIsWaiting(true);

    const { data, error } = await supabase.from("duelos").insert({
      criador_id: aluno.id,
      oponente_id: oponenteId,
      jogo: jogo, // Envia o ID do jogo escolhido
      aposta: aposta,
      status: 'pendente'
    }).select().single();

    if (error || !data) {
      toast.error("Erro ao enviar o desafio.");
      setIsWaiting(false);
      return;
    }

    toast.success("Desafio enviado! Aguarde o aceite...");

    const canalEspera = supabase.channel(`espera-${data.id}`).on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'duelos', filter: `id=eq.${data.id}` },
      (payload) => {
        if (payload.new.status === 'recusado') {
          toast.error("O oponente recusou a batalha!", { icon: "❌" });
          setIsWaiting(false); 
          supabase.removeChannel(canalEspera);
        } else if (payload.new.status === 'em_andamento') {
          onClose(); 
          supabase.removeChannel(canalEspera);
        }
      }
    ).subscribe();
  };

  const handleCancelar = () => {
    setIsWaiting(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 99999 }}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <div className="bg-red-600/20 p-5 border-b border-red-500/20 flex justify-between items-center">
          <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-wider">
            <Swords className="text-red-500" /> Nova Batalha
          </h2>
          {!isWaiting && (
            <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={24} /></button>
          )}
        </div>

        <div className="p-6">
          {isWaiting ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Loader2 className="w-16 h-16 text-red-500 animate-spin mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Aguardando Resposta...</h3>
              <p className="text-slate-400 text-sm mb-8">Se o oponente aceitar, você será levado direto para a Arena.</p>
              <button onClick={handleCancelar} className="px-6 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 font-bold transition-colors">
                Cancelar e Voltar
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              
              {/* Selecionar Oponente */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <Users size={14} /> Escolha seu Alvo
                </label>
                
                <select 
                  value={oponenteId} 
                  onChange={(e) => setOponenteId(e.target.value)}
                  disabled={isBuscando || oponentesValidos.length === 0}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:border-red-500 outline-none disabled:opacity-50 transition-colors"
                >
                  {isBuscando ? (
                    <option value="">Rastreando oponentes...</option>
                  ) : oponentesValidos.length === 0 ? (
                    <option value="">Nenhum colega encontrado</option>
                  ) : (
                    <>
                      <option value="">Selecione um colega...</option>
                      {oponentesValidos.map(op => (
                        <option key={op.id} value={op.id}>
                          {op.nome || "Colega"} ({op.pontos || 0} pts)
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>

              {/* ⚔️ SELECIONAR JOGO (Agora com 5 opções!) */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Campo de Batalha</label>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => setJogo('jogo_da_velha')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${jogo === 'jogo_da_velha' ? 'border-red-500 bg-red-500/10 text-white scale-105' : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-600'}`}>
                    <span className="text-2xl mb-1">⭕</span>
                    <span className="font-bold text-[10px] sm:text-xs uppercase">Velha</span>
                  </button>
                  <button onClick={() => setJogo('sudoku')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${jogo === 'sudoku' ? 'border-red-500 bg-red-500/10 text-white scale-105' : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-600'}`}>
                    <span className="text-2xl mb-1">🔢</span>
                    <span className="font-bold text-[10px] sm:text-xs uppercase">Sudoku</span>
                  </button>
                  <button onClick={() => setJogo('jokenpo')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${jogo === 'jokenpo' ? 'border-red-500 bg-red-500/10 text-white scale-105' : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-600'}`}>
                    <span className="text-2xl mb-1">🪨</span>
                    <span className="font-bold text-[10px] sm:text-xs uppercase">Jokenpô</span>
                  </button>
                  {/* Os dois últimos centralizados usando col-span */}
                  <div className="col-span-3 grid grid-cols-2 gap-2 mt-1">
                    <button onClick={() => setJogo('impar_par')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${jogo === 'impar_par' ? 'border-red-500 bg-red-500/10 text-white scale-105' : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-600'}`}>
                      <span className="text-2xl mb-1">✌️</span>
                      <span className="font-bold text-[10px] sm:text-xs uppercase">Ímpar/Par</span>
                    </button>
                    <button onClick={() => setJogo('vinte_e_um')} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${jogo === 'vinte_e_um' ? 'border-red-500 bg-red-500/10 text-white scale-105' : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-600'}`}>
                      <span className="text-2xl mb-1">🃏</span>
                      <span className="font-bold text-[10px] sm:text-xs uppercase">Vinte e Um</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Aposta */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                  <span>Sua Aposta</span>
                  <span className="text-yellow-500">Saldo: {aluno.pontos || 0} pts</span>
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <input 
                    type="range" min="10" max={aluno.pontos > 10 ? aluno.pontos : 10} step="5"
                    value={aposta} onChange={(e) => setAposta(Number(e.target.value))}
                    className="flex-1 accent-red-500"
                  />
                  <div className="bg-slate-950 border border-slate-700 px-4 py-2 rounded-xl text-white font-black w-24 text-center">
                    {aposta}
                  </div>
                </div>
              </div>

              {/* Enviar */}
              <button 
                onClick={handleEnviarDesafio}
                disabled={!oponenteId || aposta > aluno.pontos || oponentesValidos.length === 0}
                className="w-full mt-2 py-4 rounded-xl font-black text-lg flex justify-center items-center gap-2 bg-red-600 text-white hover:bg-red-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(239,68,68,0.4)] disabled:shadow-none transition-all transform hover:scale-[1.02] disabled:hover:scale-100"
              >
                <Swords /> Enviar Desafio
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}