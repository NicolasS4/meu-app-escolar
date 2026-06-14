"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check, X } from "lucide-react";
import toast from "react-hot-toast";

interface ClaNotificacaoProps {
  aluno: any;
  atualizarDados: () => void;
}

export default function ClaNotificacao({ aluno, atualizarDados }: ClaNotificacaoProps) {
  const [convite, setConvite] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Se o aluno não estiver carregado ou já tiver clã, não escuta
    if (!aluno?.id || aluno?.cla_id) return;

    const channel = supabase
      .channel('realtime_cla_convites')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'cla_convites',
          filter: `receiver_id=eq.${aluno.id}`
        },
        async (payload) => {
          if (payload.new.status !== 'pendente') return;

          // Busca o nome do Clã e do Líder que enviou
          const { data: claData } = await supabase.from('clas').select('nome').eq('id', payload.new.cla_id).single();
          const { data: senderData } = await supabase.from('profiles').select('nome').eq('id', payload.new.sender_id).single();

          if (claData && senderData) {
            setConvite({
              id: payload.new.id,
              cla_id: payload.new.cla_id,
              cla_nome: claData.nome,
              sender_nome: senderData.nome.split(' ')[0]
            });
            
            toast("🛡️ Nova Convocação de Clã!", { icon: "🛡️" });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [aluno?.id, aluno?.cla_id]);

  const handleResponder = async (aceitar: boolean) => {
    if (!convite) return;
    setIsProcessing(true);

    try {
      await supabase.from("cla_convites").update({ status: aceitar ? "aceito" : "recusado" }).eq("id", convite.id);
      
      if (aceitar) {
        await supabase.from("profiles").update({ cla_id: convite.cla_id }).eq("id", aluno.id);
        toast.success(`Você entrou na guilda ${convite.cla_nome}! (+30% de Pontos Ativado)`);
        atualizarDados(); // Atualiza a tela toda para mostrar o clã
      } else {
        toast("Convite recusado.");
      }
    } catch (err) {
      toast.error("Erro ao responder convite.");
    } finally {
      setIsProcessing(false);
      setConvite(null); // Fecha o pop-up
    }
  };

  return (
    <>
      {/* OVERLAY ESCURO PARA FOCAR A ATENÇÃO */}
      <AnimatePresence>
        {convite && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
          ></motion.div>
        )}
      </AnimatePresence>

      {/* POP-UP DO CONVITE */}
      <AnimatePresence>
        {convite && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-32 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-white dark:bg-slate-900 border-2 border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.4)] rounded-3xl p-8 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Efeitos de Luz no Fundo do Pop-up */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 rounded-full flex items-center justify-center mb-6 relative">
              <Shield size={40} className="animate-pulse" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full animate-ping"></span>
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
              Convocação de Guilda!
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              <strong className="text-indigo-600 dark:text-indigo-400">{convite.sender_nome}</strong> está te convidando para se juntar à lendária guilda <strong className="text-indigo-600 dark:text-indigo-400">"{convite.cla_nome}"</strong>.
            </p>

            <div className="flex gap-4 w-full relative z-10">
              <button 
                onClick={() => handleResponder(false)}
                disabled={isProcessing}
                className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <X size={20} /> Recusar
              </button>
              <button 
                onClick={() => handleResponder(true)}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black py-4 rounded-2xl shadow-xl hover:shadow-indigo-500/50 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? "..." : <><Check size={20} /> Aceitar</>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}