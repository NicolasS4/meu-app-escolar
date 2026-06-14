"use client";

import { useState } from "react";
import { ShoppingBag, X, Star } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

// IMPORTAÇÕES DOS SUBCOMPONENTES E DADOS
import { CATALOGO_GLOBAL, CATALOGO_SECRETO, getRarityStyle } from "./loja/catalogo";
import VitrineItems from "./loja/VitrineItems";
import InventarioMochila from "./loja/InventarioMochila";

interface LojaModalProps {
  isLojaOpen: boolean; 
  setIsLojaOpen: (isOpen: boolean) => void;
  itensProfessor: any[]; 
  compras: any[]; 
  aluno: any; 
  setAluno: (aluno: any) => void; 
  atualizarDados: () => void;
}

export default function LojaModal({ isLojaOpen, setIsLojaOpen, itensProfessor, compras, aluno, setAluno, atualizarDados }: LojaModalProps) {
  const [abaAtiva, setAbaAtiva] = useState<"acessorios" | "molduras" | "caixas" | "vantagens" | "inventario">("acessorios");
  
  // Controle da Caixa Misteriosa
  const [caixaStep, setCaixaStep] = useState<"idle" | "shaking" | "revealed">("idle");
  const [itemSorteado, setItemSorteado] = useState<any>(null);

  if (!isLojaOpen) return null;

  const inventario = aluno?.inventario_cosmeticos || [];

  const handleComprarGlobal = async (item: typeof CATALOGO_GLOBAL[0]) => {
    if (inventario.includes(item.titulo)) return toast.error("Você já possui este item!");
    if (aluno.pontos < item.preco) return toast.error("Pontos insuficientes!");
    if (!window.confirm(`Gastar ${item.preco} pts em "${item.titulo}"?`)) return;
    
    const novosPontos = aluno.pontos - item.preco;
    const novoInventario = [...inventario, item.titulo];
    const { error } = await supabase.from("profiles").update({ pontos: novosPontos, inventario_cosmeticos: novoInventario }).eq("id", aluno.id);
    if (error) return toast.error("Erro no Banco de Dados: " + error.message);

    setAluno({ ...aluno, pontos: novosPontos, inventario_cosmeticos: novoInventario });
    toast.success(`${item.titulo} guardado na sua mochila!`);
    atualizarDados();
  };

  const handleAbrirCaixa = async () => {
    const precoCaixa = 150; 
    if (aluno.pontos < precoCaixa) return toast.error(`Você precisa de ${precoCaixa} pts para abrir a caixa!`);
    
    const itensDisponiveis = CATALOGO_SECRETO.filter(item => !inventario.includes(item.titulo));
    if (itensDisponiveis.length === 0) return toast.error("Você já possui todos os itens secretos!");

    const sorteado = itensDisponiveis[Math.floor(Math.random() * itensDisponiveis.length)];
    
    const novosPontos = aluno.pontos - precoCaixa;
    const novoInventario = [...inventario, sorteado.titulo];
    const { error } = await supabase.from("profiles").update({ pontos: novosPontos, inventario_cosmeticos: novoInventario }).eq("id", aluno.id);
    if (error) return toast.error("Erro ao processar: " + error.message);

    setAluno({ ...aluno, pontos: novosPontos, inventario_cosmeticos: novoInventario });
    setItemSorteado(sorteado);
    setCaixaStep("shaking");
    
    setTimeout(() => {
      setCaixaStep("revealed");
      atualizarDados();
    }, 2500);
  };

  const handleComprarProfessor = async (item: any) => {
    if (aluno.pontos < item.preco) return toast.error("Pontos insuficientes!");
    if (!window.confirm(`Gastar ${item.preco} pts na Vantagem "${item.titulo}"?`)) return;
    const novosPontos = aluno.pontos - item.preco;
    const { error: err1 } = await supabase.from("profiles").update({ pontos: novosPontos }).eq("id", aluno.id);
    const { error: err2 } = await supabase.from("compras").insert({ aluno_id: aluno.id, item_id: item.id, status: 'pendente' });
    if (err1 || err2) return toast.error("Erro ao enviar pedido.");
    setAluno({ ...aluno, pontos: novosPontos });
    toast.success("Pedido enviado! O professor precisa aprovar.");
    atualizarDados();
  };

  const handleEquipar = async (nomeItem: string, tipoItem: string) => {
    const coluna = tipoItem === 'acessorios' ? 'skin_equipada' : 'borda_equipada';
    const { error } = await supabase.from("profiles").update({ [coluna]: nomeItem }).eq("id", aluno.id);
    if (error) return toast.error("Erro ao equipar.");
    setAluno({ ...aluno, [coluna]: nomeItem });
    toast.success(`${nomeItem} equipado!`);
  };

  const handleDesequipar = async (nomeItem: string, tipoItem: string) => {
    const coluna = tipoItem === 'acessorios' ? 'skin_equipada' : 'borda_equipada';
    const { error } = await supabase.from("profiles").update({ [coluna]: null }).eq("id", aluno.id);
    if (error) return toast.error("Erro ao desequipar: " + error.message);
    setAluno({ ...aluno, [coluna]: null });
    toast.success(`${nomeItem} removido!`);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#111111] rounded-3xl w-full max-w-4xl overflow-hidden border border-slate-200 dark:border-[#333] shadow-2xl flex flex-col max-h-[90vh] relative">
        
        {/* TELA DE ANIMAÇÃO DA CAIXA MISTERIOSA */}
        <AnimatePresence>
          {caixaStep !== "idle" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-slate-900/95 flex flex-col items-center justify-center rounded-3xl overflow-hidden">
              {caixaStep === "shaking" && (
                 <motion.div animate={{ rotate: [0, -10, 10, -10, 10, -5, 5, 0], scale: [1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.2], y: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 2.5, ease: "easeInOut" }} className="text-[150px] drop-shadow-[0_0_80px_rgba(147,51,234,0.8)] cursor-wait">🎁</motion.div>
              )}
              {caixaStep === "revealed" && itemSorteado && (
                 <motion.div initial={{ scale: 0.2, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: "spring", bounce: 0.5 }} className="flex flex-col items-center text-center">
                   <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_60%)] -z-10" />
                   <h3 className="text-xl font-bold text-slate-300 mb-6 tracking-widest uppercase relative z-10">Você encontrou...</h3>
                   <div className="relative z-10 text-[120px] drop-shadow-2xl bg-white/10 p-10 rounded-full border-4 border-white/20 backdrop-blur-md mb-8 flex items-center justify-center w-64 h-64 shadow-[0_0_100px_rgba(255,255,255,0.2)]">{itemSorteado.icone}</div>
                   <h2 className="text-5xl font-black text-white mb-4 relative z-10 tracking-tight drop-shadow-lg">{itemSorteado.titulo}</h2>
                   <span className={`px-6 py-2 rounded-full text-base font-black uppercase tracking-widest relative z-10 mb-10 ${getRarityStyle(itemSorteado.raridade)}`}>{itemSorteado.raridade}</span>
                   <button onClick={() => { setCaixaStep("idle"); setItemSorteado(null); }} className="relative z-10 bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-xl hover:bg-slate-200 transition-transform hover:scale-105 shadow-xl">Coletar Recompensa</button>
                 </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER DA LOJA */}
        <div className="p-6 bg-yellow-400 dark:bg-yellow-500/20 flex flex-col gap-4 border-b border-yellow-500/20">
          <div className="flex justify-between items-center text-yellow-900 dark:text-yellow-500">
            <h2 className="text-2xl font-black flex items-center gap-2"><ShoppingBag /> Mercado & Cosméticos</h2>
            <button onClick={() => setIsLojaOpen(false)} className="hover:bg-yellow-500/20 p-2 rounded-full transition-colors"><X size={28} /></button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {["acessorios", "molduras", "caixas", "vantagens", "inventario"].map(tab => (
              <button key={tab} onClick={() => setAbaAtiva(tab as any)} className={`flex items-center gap-2 font-bold pb-2 border-b-2 whitespace-nowrap transition-colors ${abaAtiva === tab ? "border-yellow-900 dark:border-yellow-500 text-yellow-900 dark:text-yellow-500" : "border-transparent text-yellow-700/60 dark:text-yellow-500/50 hover:text-yellow-900"}`}>
                {tab === "acessorios" && "🕶️ Acessórios"} 
                {tab === "molduras" && "🖼️ Molduras"} 
                {tab === "caixas" && "🎁 Caixas Secretas"} 
                {tab === "vantagens" && "🎫 Itens do Prof"} 
                {tab === "inventario" && "🎒 Mochila"}
              </button>
            ))}
          </div>
        </div>
        
        {/* CORPO DA LOJA (ÁREA DE CONTEÚDO) */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-100/50 dark:bg-[#0a0a0a]">
          
          {/* VITRINE DE ACESSÓRIOS */}
          {abaAtiva === "acessorios" && (
            <VitrineItems itens={CATALOGO_GLOBAL.filter(i => i.tipo === "acessorios")} inventario={inventario} pontosAluno={aluno.pontos} onComprar={handleComprarGlobal} />
          )}

          {/* VITRINE DE MOLDURAS */}
          {abaAtiva === "molduras" && (
            <VitrineItems itens={CATALOGO_GLOBAL.filter(i => i.tipo === "molduras")} inventario={inventario} pontosAluno={aluno.pontos} onComprar={handleComprarGlobal} />
          )}

          {/* GACHA / CAIXA MISTERIOSA */}
          {abaAtiva === "caixas" && (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-48 h-48 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-3xl mb-6 shadow-2xl flex items-center justify-center animate-bounce border-4 border-purple-400 cursor-pointer" onClick={handleAbrirCaixa}>
                <span className="text-7xl">🎁</span>
              </div>
              <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Caixa Misteriosa</h3>
              <p className="text-slate-500 text-center max-w-md mb-8">Pode conter itens Épicos, Míticos ou Lendários! Você tem a chance de conseguir as Vendas, Espadas ou as famosas Molduras de Domínio.</p>
              <button onClick={handleAbrirCaixa} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-black text-xl flex items-center gap-2 shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all transform hover:scale-105">
                <Star /> Abrir por 150 pts
              </button>
            </div>
          )}
          
          {/* VANTAGENS DO PROFESSOR (COMPRADAS DO BANCO DE DADOS) */}
          {abaAtiva === "vantagens" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {itensProfessor.length === 0 ? <p className="col-span-full text-center text-slate-500 py-10">O professor ainda não disponibilizou vantagens para sua turma.</p> : itensProfessor.map(item => (
                <div key={item.id} className="border border-slate-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="text-4xl mb-4 text-center">{item.icone}</div>
                    <h3 className="font-bold text-lg text-center text-slate-800 dark:text-white">{item.titulo}</h3>
                    <p className="text-xs text-slate-500 text-center mb-6">{item.descricao}</p>
                  </div>
                  <button onClick={() => handleComprarProfessor(item)} className={`w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 ${aluno.pontos >= item.preco ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-slate-200 dark:bg-[#222] text-slate-400 cursor-not-allowed"}`}>
                    <Star size={18} fill={aluno.pontos >= item.preco ? "currentColor" : "none"} /> {item.preco} pts
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* MOCHILA DO ALUNO */}
          {abaAtiva === "inventario" && (
            <InventarioMochila inventario={inventario} aluno={aluno} compras={compras} onEquipar={handleEquipar} onDesequipar={handleDesequipar} />
          )}

        </div>
      </div>
    </div>
  );
}