"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, X, Check, Gamepad2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface ArenaNotificacaoProps {
  aluno: any;
  atualizarDados: () => void;
}

export default function ArenaNotificacao({ aluno, atualizarDados }: ArenaNotificacaoProps) {
  const router = useRouter();
  const [desafio, setDesafio] = useState<any>(null);
  const [nomeDesafiante, setNomeDesafiante] = useState<string>("Um colega");

  useEffect(() => {
    if (!aluno?.id) return;

    // 📡 RADAR 1: Escuta os desafios RECEBIDOS (Quando alguém te desafia)
    const channelRecebidos = supabase
      .channel('notificacoes-recebidas')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'duelos', filter: `oponente_id=eq.${aluno.id}` },
        async (payload) => {
          const novoDuelo = payload.new;
          if (novoDuelo.status === 'pendente') {
            
            // Busca o nome de quem te desafiou
            const { data } = await supabase.from("profiles").select("nome").eq("id", novoDuelo.criador_id).single();
            if (data) setNomeDesafiante(data.nome);
            
            setDesafio(novoDuelo);
            
            // Toca áudio com tratamento de erro (Autoplay Policy)
            const somNotificacao = new Audio('/notification.mp3');
            somNotificacao.play().catch(() => console.warn("Áudio de notificação silenciado pelo navegador devido à falta de interação prévia."));
          }
        }
      )
      .subscribe();

    // 📡 RADAR 2: Escuta os desafios ENVIADOS (Para te puxar pra Arena quando o oponente aceitar)
    const channelEnviados = supabase
      .channel('notificacoes-enviadas')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'duelos', filter: `criador_id=eq.${aluno.id}` },
        (payload) => {
          const dueloNovo = payload.new;

          // Se o oponente clicou em Aceitar (O status mudou para em_andamento)
          if (dueloNovo.status === 'em_andamento') {
            toast.success("Oponente aceitou! Entrando na Arena...", { duration: 3000 });
            router.push(`/dashboard/aluno/arena/${dueloNovo.id}`);
          }
          
          // Se o oponente recusou
          if (dueloNovo.status === 'recusado') {
            toast("O oponente fugiu da batalha!", { icon: "🏃💨", duration: 4000 });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelRecebidos);
      supabase.removeChannel(channelEnviados);
    };
  }, [aluno?.id, router]);

const handleAceitar = async () => {
    if (aluno.pontos < desafio.aposta) {
      toast.error(`Você não tem ${desafio.aposta} pontos para cobrir a aposta!`);
      return;
    }

    // 🔮 MÁGICA AQUI: Já cria o tabuleiro vazio e diz que a primeira vez é do Criador
    const estadoInicial = {
      tabuleiro: Array(9).fill(null),
      turno_atual: desafio.criador_id
    };

    const { error } = await supabase
      .from("duelos")
      .update({ 
        status: 'em_andamento',
        dados_jogo: estadoInicial 
      })
      .eq("id", desafio.id);

    if (error) {
      toast.error("Erro ao aceitar o desafio.");
      return;
    }

    toast.success("Desafio aceito! A arena vai abrir...");
    setDesafio(null);
    router.push(`/dashboard/aluno/arena/${desafio.id}`);
  };

  const handleRecusar = async () => {
    await supabase.from("duelos").update({ status: 'recusado' }).eq("id", desafio.id);
    toast("Você fugiu da batalha.", { icon: "🏃💨" });
    setDesafio(null);
  };

  return (
    <AnimatePresence>
      {desafio && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-[200] w-96 bg-slate-900 border-2 border-red-500/50 rounded-2xl shadow-[0_0_40px_rgba(239,68,68,0.3)] overflow-hidden"
        >
          {/* Efeito visual de fundo da notificação */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,0.05)_10px,rgba(239,68,68,0.05)_20px)] -z-0" />
          
          <div className="relative z-10 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-red-400">
              <div className="bg-red-500/20 p-2 rounded-full animate-pulse">
                <Swords size={24} />
              </div>
              <h3 className="font-black text-xl uppercase tracking-wider text-white drop-shadow-md">Desafio Recebido!</h3>
            </div>
            
            <p className="text-slate-300">
              <strong className="text-white">{nomeDesafiante}</strong> convocou você para um duelo na Arena!
            </p>

            <div className="bg-black/40 rounded-xl p-3 flex justify-between items-center border border-white/10 mt-2">
              <div className="flex items-center gap-2">
                <Gamepad2 size={18} className="text-indigo-400" />
                <span className="font-bold text-slate-200 capitalize">
                  {desafio.jogo.replace('_', ' ')}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Aposta</span>
                <span className="text-yellow-400 font-black flex items-center gap-1">
                  ⭐ {desafio.aposta} pts
                </span>
              </div>
            </div>

            {aluno.pontos < desafio.aposta && (
              <div className="flex items-center gap-2 text-orange-400 text-xs mt-1 bg-orange-400/10 p-2 rounded">
                <AlertCircle size={14} /> Faltam pontos para cobrir a aposta!
              </div>
            )}

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleRecusar}
                className="flex-1 py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <X size={18} /> Recusar
              </button>
              <button
                onClick={handleAceitar}
                disabled={aluno.pontos < desafio.aposta}
                className="flex-1 py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all"
              >
                <Check size={18} /> Aceitar Batalha
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}