"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Heart, User, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import PetFoguinho from "@/components/PetFoguinho";

// IMPORTAÇÕES DO MOTOR GRÁFICO PARA O PET DO COLEGA
import { obterEstiloDaMoldura, EfeitosEspeciaisCard } from "@/components/pet-parts/molduras/lote1";
import { moldurasLote2 } from "@/components/pet-parts/molduras/lote2";
import { moldurasLote6 } from "@/components/pet-parts/molduras/lote6";

// Unifica os fundos secretos (tela de busca)
const fundosSecretos = [...moldurasLote2, ...moldurasLote6];

interface ColegasTabProps {
  alunoId: string;
  turmaId: string;
}

export default function ColegasTab({ alunoId, turmaId }: ColegasTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundClassmate, setFoundClassmate] = useState<any | null>(null);
  const [classmateHeartsCount, setClassmateHeartsCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  // Históricos
  const [likesEnviados, setLikesEnviados] = useState<any[]>([]);
  const [likesRecebidos, setLikesRecebidos] = useState<any[]>([]);

  // Estado da Notificação de Curtida
  const [likeNotification, setLikeNotification] = useState<{ sender_id: string; sender_name: string } | null>(null);
  const [isRetribuindo, setIsRetribuindo] = useState(false);

  // 1. CARREGA HISTÓRICO E ATIVA NOTIFICAÇÃO EM TEMPO REAL
  useEffect(() => {
    fetchHistory();

    const channel = supabase
      .channel('notificacoes_likes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'pet_likes', filter: `receiver_id=eq.${alunoId}` },
        async (payload) => {
          const senderId = payload.new.sender_id;
          const { data: senderProfile } = await supabase
            .from("profiles")
            .select("nome")
            .eq("id", senderId)
            .single();

          if (senderProfile) {
            setLikeNotification({
              sender_id: senderId,
              sender_name: senderProfile.nome.split(" ")[0]
            });
          }
          fetchHistory();
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [alunoId]);

  const fetchHistory = async () => {
    const { data: enviados } = await supabase
      .from('pet_likes')
      .select('id, receiver_id, created_at, receiver:profiles!receiver_id(nome)')
      .eq('sender_id', alunoId)
      .order('created_at', { ascending: false });

    const { data: recebidos } = await supabase
      .from('pet_likes')
      .select('id, sender_id, created_at, sender:profiles!sender_id(nome)')
      .eq('receiver_id', alunoId)
      .order('created_at', { ascending: false });

    if (enviados) setLikesEnviados(enviados);
    if (recebidos) setLikesRecebidos(recebidos);
  };

  // 2. BUSCA DO PET DO COLEGA
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim().length < 3) return;

    setIsSearching(true);
    setFoundClassmate(null);
    setAlreadyLiked(false);
    setClassmateHeartsCount(0);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, nome, streak_atual, pontos, skin_equipada, borda_equipada, expressao_pet, pose_bracos, pet_nome")
        .eq("turma_id", turmaId)
        .neq("id", alunoId)
        .ilike("nome", `%${searchTerm.trim()}%`);

      if (data && data.length === 1) {
        const classmate = data[0];
        setFoundClassmate(classmate);

        const { data: likeData } = await supabase
          .from("pet_likes")
          .select("id")
          .eq("sender_id", alunoId)
          .eq("receiver_id", classmate.id)
          .single();

        if (likeData) setAlreadyLiked(true);

        const { count } = await supabase
          .from("pet_likes")
          .select("id", { count: 'exact', head: true })
          .eq("receiver_id", classmate.id);

        setClassmateHeartsCount(count || 0);

      } else if (data && data.length > 1) {
        toast("Muitos resultados. Seja mais específico!", { icon: "🧐" });
      } else {
        toast.error("Nenhum pet encontrado com esse nome.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  // 3. CURTIR / DESCURTIR
  const toggleHeart = async () => {
    if (!foundClassmate) return;

    try {
      if (alreadyLiked) {
        const { error } = await supabase.from("pet_likes").delete().eq("sender_id", alunoId).eq("receiver_id", foundClassmate.id);
        if (error) throw error;
        setAlreadyLiked(false);
        setClassmateHeartsCount(prev => prev - 1);
        toast("Curtida removida.", { icon: "💔" });
      } else {
        const { error } = await supabase.from("pet_likes").insert({ sender_id: alunoId, receiver_id: foundClassmate.id });
        if (error) throw error;
        setAlreadyLiked(true);
        setClassmateHeartsCount(prev => prev + 1);
        toast.success(`❤️ Você curtiu o pet de ${foundClassmate.nome.split(' ')[0]}!`, { icon: "❤️" });
      }
      fetchHistory();
    } catch (error) {
      toast.error("Erro ao processar curtida.");
    }
  };

  // 4. RETRIBUIR CURTIDA
  const handleRetribuir = async () => {
    if (!likeNotification) return;
    setIsRetribuindo(true);

    try {
      const { error } = await supabase.from("pet_likes").insert({ sender_id: alunoId, receiver_id: likeNotification.sender_id });

      if (error && error.code === '23505') {
        toast.success(`Você já havia curtido o pet de ${likeNotification.sender_name}!`);
      } else if (error) {
        throw error;
      } else {
        toast.success(`❤️ Você retribuiu a curtida para ${likeNotification.sender_name}!`);
        if (foundClassmate && foundClassmate.id === likeNotification.sender_id) {
          setAlreadyLiked(true);
          setClassmateHeartsCount(prev => prev + 1);
        }
      }
      setLikeNotification(null);
      fetchHistory();
    } catch (err) {
      toast.error("Erro ao retribuir curtida.");
    } finally {
      setIsRetribuindo(false);
    }
  };

  // =============== PROCESSA AS MOLDURAS (Novo Formato) ===============
  const borderStyle = obterEstiloDaMoldura(foundClassmate?.borda_equipada);
  const fundoEncontrado = fundosSecretos.find(m => m.nome === foundClassmate?.borda_equipada);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10 relative">
      
      {/* NOTIFICAÇÃO DE CURTIDA RECEBIDA */}
      <AnimatePresence>
        {likeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-white dark:bg-slate-900 border-2 border-pink-400 shadow-[0_0_40px_rgba(236,72,153,0.3)] rounded-3xl p-6 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 blur-2xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-500/20 blur-2xl rounded-full pointer-events-none"></div>

            <button onClick={() => setLikeNotification(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-slate-100 dark:bg-slate-800 rounded-full p-1"><X size={20} /></button>

            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-500/20 text-pink-500 rounded-full flex items-center justify-center mb-4 relative">
              <Heart size={32} className="animate-pulse" fill="currentColor" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full animate-ping"></span>
            </div>
            
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">Seu Pet foi notado!</h3>
            <p className="text-slate-600 dark:text-slate-300 font-medium mb-6">Você recebeu um amei de <span className="font-black text-pink-500">{likeNotification.sender_name}</span>.</p>

            <button onClick={handleRetribuir} disabled={isRetribuindo} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black py-4 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70">
              {isRetribuindo ? "Processando..." : <><Heart size={20} /> Retribuir Amei</>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {likeNotification && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLikeNotification(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"></motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-pink-500 text-white rounded-2xl shadow-lg shadow-pink-500/30">
          <Heart size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Pets da Turma</h2>
          <p className="text-slate-500 dark:text-slate-400">Encontre o pet de um colega e deixe uma curtida.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LADO ESQUERDO: BUSCA E CARD DO PET DO COLEGA */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">Encontrar Pet</h3>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input type="text" placeholder="Ex: João da Silva" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
              <button type="submit" disabled={isSearching || searchTerm.length < 3} className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-black transition-all disabled:opacity-50">
                {isSearching ? "..." : "Buscar"}
              </button>
            </form>
          </div>

          {/* CARD DO PET DO COLEGA (AGORA COM MOLDURAS E FUNDOS SECRETOS) */}
          <AnimatePresence>
            {foundClassmate && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className={`bg-white dark:bg-[#111111] rounded-[2rem] p-5 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden h-auto min-h-[420px] sm:min-h-[480px] transition-all duration-500 ${borderStyle}`}
              >
                {/* 1. O FUNDO SECRETO (Se Houver) */}
                {fundoEncontrado?.renderBackground && fundoEncontrado.renderBackground()}

                {/* 2. AS PARTÍCULAS DA MOLDURA */}
                <EfeitosEspeciaisCard nomeEquipado={foundClassmate.borda_equipada} />

                {/* 3. SOMBRA DE CABEÇALHO */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-50 dark:from-indigo-900/10 to-transparent z-0 pointer-events-none rounded-t-[2rem]"></div>
                
                {/* 4. CONTEÚDO PRINCIPAL (Acima dos fundos) */}
                <div className="relative z-20 w-full flex flex-col items-center">
                  <PetFoguinho 
                    streak={foundClassmate.streak_atual || 0} 
                    acessorio={foundClassmate.skin_equipada} 
                    expressao={foundClassmate.expressao_pet || "feliz"} 
                    pose={foundClassmate.pose_bracos || "padrao"} 
                  />
                  
                  <div className="mt-6 flex flex-col items-center gap-4 w-full">
                    <div className="text-center">
                      <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight drop-shadow-md">
                        {foundClassmate.pet_nome || "Foguinho"}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">de {foundClassmate.nome}</p>
                    </div>

                    <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-slate-200/50 dark:border-[#333]/50 px-6 py-2 rounded-xl flex items-center gap-3 shadow-sm w-fit">
                      <div className={`p-1.5 rounded-full ${(foundClassmate.streak_atual || 0) > 0 ? "bg-orange-100 text-orange-500 dark:bg-orange-500/20" : "bg-slate-100 text-slate-400 dark:bg-[#333]"}`}>
                        <Flame size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider leading-none mb-1">Sequência</p>
                        <p className="text-lg font-black text-slate-800 dark:text-white leading-none">{foundClassmate.streak_atual || 0} dias</p>
                      </div>
                    </div>

                    <button 
                      onClick={toggleHeart}
                      className={`relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95 ${
                        alreadyLiked 
                          ? "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 shadow-none border-2 border-slate-300 dark:border-slate-700" 
                          : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-500/30"
                      }`}
                    >
                      {alreadyLiked ? <><Heart size={24} /> Curtida enviada</> : <><Heart size={24} className="animate-pulse" /> Curtir pet</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LADO DIREITO: HISTÓRICO */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-full min-h-[500px]">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
            <h3 className="font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Heart className="text-pink-500" size={20} fill="currentColor" /> Curtidas
            </h3>
            <span className="bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 font-bold px-3 py-1 rounded-full text-sm">
              Total: {likesRecebidos.length}
            </span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 overflow-y-auto custom-scrollbar">
            <div>
              <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Recebidos ({likesRecebidos.length})</h4>
              <div className="space-y-3">
                {likesRecebidos.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">Nenhuma curtida ainda.</p>
                ) : (
                  likesRecebidos.map(like => (
                    <div key={like.id} className="flex items-center gap-3 bg-pink-50 dark:bg-pink-500/5 p-3 rounded-2xl border border-pink-100 dark:border-pink-500/10">
                      <Heart size={16} className="text-pink-500 shrink-0" fill="currentColor" />
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">{like.sender?.nome?.split(' ')[0] || 'Alguém'} ❤️</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Enviados ({likesEnviados.length})</h4>
              <div className="space-y-3">
                {likesEnviados.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">Você ainda não curtiu ninguém.</p>
                ) : (
                  likesEnviados.map(like => (
                    <div key={like.id} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <Heart size={16} className="text-slate-400 shrink-0" />
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400 truncate">{like.receiver?.nome?.split(' ')[0] || 'Colega'} ❤️</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}