"use client";

import { useState, useEffect } from "react";
import { Edit2, Check, Flame, Smile, UserCircle2, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import PetFoguinho from "@/components/PetFoguinho";

// IMPORTAÇÕES DO NOSSO MOTOR DE COSMÉTICOS
import { obterEstiloDaMoldura, EfeitosEspeciaisCard } from "@/components/pet-parts/molduras/lote1";
import { moldurasLote2 } from "@/components/pet-parts/molduras/lote2";
import { moldurasLote6 } from "@/components/pet-parts/molduras/lote6";
import { CATALOGO_GLOBAL, CATALOGO_SECRETO } from "@/components/aluno/loja/catalogo";

// Unimos as molduras que possuem fundo imersivo
const fundosSecretos = [...moldurasLote2, ...moldurasLote6];

interface PetCardProps {
  aluno: any;
  setAluno: (aluno: any) => void;
  streak: number;
  acessorioEquipado?: string | null;
  molduraEquipada?: string | null;
}

export default function PetCard({ aluno, setAluno, streak, acessorioEquipado, molduraEquipada }: PetCardProps) {
  const [isEditingPet, setIsEditingPet] = useState(false);
  const [novoPetNome, setNovoPetNome] = useState("");
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (aluno) setNovoPetNome(aluno.pet_nome || "Foguinho");
  }, [aluno]);

  useEffect(() => {
    if (!aluno?.id) return;
    const fetchLikes = async () => {
      const { count } = await supabase.from("pet_likes").select("id", { count: "exact", head: true }).eq("receiver_id", aluno.id);
      if (count !== null) setLikesCount(count);
    };
    fetchLikes();

    const channel = supabase.channel('petcard_likes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pet_likes', filter: `receiver_id=eq.${aluno.id}` }, () => setLikesCount(prev => prev + 1))
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'pet_likes', filter: `receiver_id=eq.${aluno.id}` }, () => setLikesCount(prev => Math.max(0, prev - 1)))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [aluno?.id]);

  const handleRenomearPet = async () => {
    if (!novoPetNome.trim() || !aluno) return;
    setIsEditingPet(false);
    setAluno({ ...aluno, pet_nome: novoPetNome });
    const { error } = await supabase.from("profiles").update({ pet_nome: novoPetNome }).eq("id", aluno.id);
    if (error) toast.error("Erro ao salvar nome.");
    else toast.success("Pet renomeado com sucesso! 🐾");
  };

  const handleMudarAtributo = async (coluna: string, valor: string) => {
    setAluno({ ...aluno, [coluna]: valor });
    const { error } = await supabase.from("profiles").update({ [coluna]: valor }).eq("id", aluno.id);
    if (error) toast.error("Erro ao salvar personalização.");
  };

  // =======================================================
  // 🧠 TRADUTOR UNIVERSAL DE SKINS
  // Converte IDs do Banco de Dados para os Nomes Visuais corretos
  // =======================================================
  
  // 1. Pega o que está no banco de dados
  const rawMoldura = aluno?.borda_equipada || molduraEquipada;
  const rawAcessorio = aluno?.skin_equipada || acessorioEquipado;

  // 2. Procura no catálogo para traduzir
  const catMoldura = CATALOGO_GLOBAL.find(i => i.id === rawMoldura || i.titulo === rawMoldura) || CATALOGO_SECRETO.find(i => i.id === rawMoldura || i.titulo === rawMoldura);
  const catAcessorio = CATALOGO_GLOBAL.find(i => i.id === rawAcessorio || i.titulo === rawAcessorio) || CATALOGO_SECRETO.find(i => i.id === rawAcessorio || i.titulo === rawAcessorio);

  // 3. Define as variáveis oficiais que os desenhos vão usar
  const tituloMoldura = catMoldura ? catMoldura.titulo : rawMoldura; // Ex: Garante que seja "Moldura Prata"
  const idAcessorio = catAcessorio ? catAcessorio.id : rawAcessorio; // Ex: Garante que seja "acc_capuz_raptor"

  const borderStyle = obterEstiloDaMoldura(tituloMoldura);
  const fundoEncontrado = fundosSecretos.find(m => m.nome === tituloMoldura);
  
  const expAtual = aluno?.expressao_pet || "feliz";
  const poseAtual = aluno?.pose_bracos || "padrao";

  return (
    <div className={`bg-white dark:bg-[#111111] rounded-[2rem] p-5 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden h-auto min-h-[420px] sm:min-h-[480px] transition-all duration-500 ${borderStyle}`}>
      
      {/* O FUNDO SECRETO */}
      {fundoEncontrado?.renderBackground && fundoEncontrado.renderBackground()}

      {/* EFEITOS ESPECIAIS DA BORDA */}
      <EfeitosEspeciaisCard nomeEquipado={tituloMoldura} />

      {/* Sombra de cabeçalho padrão */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-50 dark:from-indigo-900/10 to-transparent z-0 pointer-events-none rounded-t-[2rem]"></div>
      
      {/* CONTEÚDO DO CARD */}
      <div className="relative z-20 w-full flex flex-col items-center">
        
        {/* Passa o ID traduzido para o Foguinho! */}
        <PetFoguinho 
          streak={streak} 
          acessorioEquipado={idAcessorio} 
          expressao={expAtual} 
          pose={poseAtual} 
        />
        
        <div className="mt-4 sm:mt-6 flex flex-col items-center gap-3 sm:gap-4 w-full">
          {isEditingPet ? (
            <div className="flex items-center gap-2 bg-slate-100/90 dark:bg-[#222]/90 backdrop-blur-md p-1.5 rounded-full shadow-sm">
              <input 
                autoFocus type="text" value={novoPetNome} onChange={e => setNovoPetNome(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleRenomearPet()}
                className="bg-transparent border-none outline-none px-3 text-base sm:text-lg font-bold text-slate-800 dark:text-white w-28 sm:w-32 text-center" maxLength={12}
              />
              <button onClick={handleRenomearPet} className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"><Check size={16} /></button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group cursor-pointer drop-shadow-md" onClick={() => setIsEditingPet(true)}>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight drop-shadow-lg">{aluno?.pet_nome || "Foguinho"}</h2>
              <button className="text-slate-400 dark:text-slate-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"><Edit2 size={16} /></button>
            </div>
          )}

          {streak > 0 && (
            <div className="flex flex-col sm:flex-row gap-2 bg-slate-50/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-200/50 dark:border-[#333]/50 w-full max-w-[240px] sm:max-w-[300px]">
              <div className="flex-1 flex items-center bg-white/90 dark:bg-black/90 rounded-lg px-2 border border-slate-100 dark:border-[#222]">
                <Smile size={14} className="text-slate-400 mr-2 shrink-0" />
                <select value={expAtual} onChange={e => handleMudarAtributo("expressao_pet", e.target.value)} className="w-full bg-transparent text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 outline-none py-2 cursor-pointer appearance-none">
                  <option value="feliz">Rosto Feliz</option>
                  <option value="bravo">Rosto Bravo</option>
                  <option value="cool">Rosto Descolado</option>
                  <option value="assustado">Rosto Chocado</option>
                </select>
              </div>
              <div className="flex-1 flex items-center bg-white/90 dark:bg-black/90 rounded-lg px-2 border border-slate-100 dark:border-[#222]">
                <UserCircle2 size={14} className="text-slate-400 mr-2 shrink-0" />
                <select value={poseAtual} onChange={e => handleMudarAtributo("pose_bracos", e.target.value)} className="w-full bg-transparent text-[11px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 outline-none py-2 cursor-pointer appearance-none">
                  <option value="padrao">Braços Soltos</option>
                  <option value="cruzados">Cruzados</option>
                  <option value="levantados">P/ Cima</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-1 sm:mt-2 w-full">
            <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-slate-200/50 dark:border-[#333]/50 px-4 sm:px-5 py-2 rounded-xl flex items-center gap-2 sm:gap-3 shadow-sm min-w-[120px]">
              <div className={`p-1.5 rounded-full shrink-0 ${streak > 0 ? "bg-orange-100 text-orange-500 dark:bg-orange-500/20" : "bg-slate-100 text-slate-400 dark:bg-[#333]"}`}>
                <Flame size={16} />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider leading-none mb-1">Sequência</p>
                <p className="text-base sm:text-lg font-black text-slate-800 dark:text-white leading-none">{streak} dias</p>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-slate-200/50 dark:border-[#333]/50 px-4 sm:px-5 py-2 rounded-xl flex items-center gap-2 sm:gap-3 shadow-sm min-w-[120px]">
              <div className={`p-1.5 rounded-full shrink-0 ${likesCount > 0 ? "bg-pink-100 text-pink-500 dark:bg-pink-500/20" : "bg-slate-100 text-slate-400 dark:bg-[#333]"}`}>
                <Heart size={16} className={likesCount > 0 ? "fill-current" : ""} />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider leading-none mb-1">Corações</p>
                <p className="text-base sm:text-lg font-black text-slate-800 dark:text-white leading-none">{likesCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}