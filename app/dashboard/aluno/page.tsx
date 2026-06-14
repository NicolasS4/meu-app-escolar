"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2, Swords, Users, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion"; // <-- Importação do Framer Motion para animação das abas
import { Shield } from "lucide-react";


import AlunoHeader from "@/components/aluno/AlunoHeader";
import PetCard from "@/components/aluno/PetCard";
import TrabalhosCard from "@/components/aluno/TrabalhosCard";
import EstatisticasCard from "@/components/aluno/EstatisticasCard";
import LojaModal from "@/components/aluno/LojaModal";
import ExpansaoDominioBackground from "@/components/aluno/ExpansaoDominioBackground";
import ArenaNotificacao from "@/components/aluno/ArenaNotificacao";
import ArenaCriarDesafioModal from "@/components/aluno/ArenaCriarDesafioModal";
import ColegasTab from "@/components/aluno/ColegasTab";
import ClaMasterTab from "@/components/aluno/cla/ClaMasterTab";
import ClaNotificacao from "@/components/aluno/cla/ClaNotificacao";
import PetNotificacao from "@/components/aluno/PetNotificacao";


// Definição das Abas
const TABS = [
  { id: 'geral', label: 'Visão Geral', icon: LayoutDashboard },
  { id: 'colegas', label: 'Conexão Pet', icon: Users },
  { id: 'cla', label: 'Guilda / Clãs', icon: Shield },
] as const;

type TabType = typeof TABS[number]['id'];

export default function AlunoDashboardMaster() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Controle de Abas
  const [activeTab, setActiveTab] = useState<TabType>('geral');
  
  const [aluno, setAluno] = useState<any>(null);
  const [ranking, setRanking] = useState<any[]>([]);
  const [projetos, setProjetos] = useState<any[]>([]);
  const [minhasEquipes, setMinhasEquipes] = useState<any>({ equipes: [], membros: [] });
  
  const [itensProfessor, setItensProfessor] = useState<any[]>([]);
  const [compras, setCompras] = useState<any[]>([]);
  
  const [isLojaOpen, setIsLojaOpen] = useState(false);
  const [isArenaOpen, setIsArenaOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setMounted(true), []);

  const fetchDadosIniciais = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push("/login");

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (profile?.role !== "aluno") return router.push("/dashboard/professor");
    setAluno(profile);

    try { 
      const res = await fetch(`/api/ranking?professor_id=${profile.professor_id}`); 
      if (res.ok) setRanking(await res.json()); 
    } catch (e) {}

    const { data: projs } = await supabase.from("projetos").select("*").eq("turma_id", profile.turma_id);
    setProjetos(projs || []);

    if (projs && projs.length > 0) {
      const { data: eqs } = await supabase.from("equipes").select("*").in("projeto_id", projs.map(p => p.id));
      if (eqs && eqs.length > 0) {
        const { data: membs } = await supabase.from("equipe_alunos").select("equipe_id, aluno_id, profiles(nome)").in("equipe_id", eqs.map(e => e.id));
        setMinhasEquipes({ equipes: eqs || [], membros: membs || [] });
      }
    }

    const { data: loja } = await supabase.from("loja_itens").select("*").eq("professor_id", profile.professor_id);
    if (loja) setItensProfessor(loja);

    await buscarHistoricoProfessor(profile.id);
    setIsLoading(false);
  }, [router]);

  const buscarHistoricoProfessor = async (alunoId: string) => {
    const { data } = await supabase.from("compras").select("id, status, created_at, loja_itens(titulo, icone, tipo)").eq("aluno_id", alunoId).order("created_at", { ascending: false });
    if (data) setCompras(data);
  };

  useEffect(() => { fetchDadosIniciais(); }, [fetchDadosIniciais]);

  const handleSair = async () => { 
    await supabase.auth.signOut(); 
    router.push("/login"); 
  };

  if (isLoading || !mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-black">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black transition-colors duration-500 flex flex-col font-sans text-slate-900 dark:text-slate-100 overflow-x-hidden">
      
      {/* Background Dinâmico de Expansão de Domínio */}
      <ExpansaoDominioBackground bordaEquipada={aluno?.borda_equipada} />

      {/* Camada principal z-10 para ficar acima do background */}
      <div className="relative z-10 flex flex-col min-h-screen pb-24">
        <AlunoHeader 
          nomeAluno={aluno?.nome} 
          onSair={handleSair} 
          onAbrirLoja={() => setIsLojaOpen(true)} 
        />

        {/* NAVEGAÇÃO INTERNA DE ABAS */}
        <div className="max-w-6xl w-full mx-auto px-4 md:px-8 mt-6">
          <div className="flex p-1.5 bg-slate-200/60 dark:bg-slate-900/60 rounded-2xl w-fit border border-slate-300 dark:border-slate-800 backdrop-blur-md shadow-inner">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors z-10 ${
                    isActive ? "text-indigo-700 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-aluno"
                      className="absolute inset-0 bg-white dark:bg-slate-950 rounded-xl shadow-md border border-slate-200 dark:border-slate-700/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-20 flex items-center gap-2">
                    <Icon size={16} className={isActive && tab.id === 'colegas' ? "text-pink-500" : ""} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL (Muda com base na aba selecionada) */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8">
          
          {/* Aba: VISÃO GERAL */}
          {activeTab === 'geral' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              <div className="lg:col-span-4">
                <PetCard 
                  aluno={aluno} 
                  setAluno={setAluno} 
                  streak={aluno?.streak_atual || 0} 
                  acessorioEquipado={aluno?.skin_equipada} 
                  molduraEquipada={aluno?.borda_equipada} 
                />
              </div>
              <div className="lg:col-span-5 flex flex-col">
                <TrabalhosCard projetos={projetos} minhasEquipes={minhasEquipes} aluno={aluno} />
              </div>
              <div className="lg:col-span-3">
                <EstatisticasCard aluno={aluno} ranking={ranking} />
              </div>
            </motion.div>
          )}

          {/* Aba: CONEXÃO PET (A nova aba de colegas) */}
          {activeTab === 'colegas' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
              {aluno?.id && aluno?.turma_id && (
                <ColegasTab alunoId={aluno.id} turmaId={aluno.turma_id} />
              )}
            </motion.div>
          )}

          {activeTab === 'cla' && (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
    {aluno?.id && aluno?.turma_id && (
      <ClaMasterTab 
        alunoId={aluno.id} 
        turmaId={aluno.turma_id} 
        claIdAtual={aluno.cla_id} 
        atualizarDadosGlobais={fetchDadosIniciais} 
      />
    )}
  </motion.div>
          )}
          
        </main>
      </div>

      {/* Modais e Componentes Flutuantes */}
      <LojaModal 
        isLojaOpen={isLojaOpen} 
        setIsLojaOpen={setIsLojaOpen} 
        itensProfessor={itensProfessor} 
        compras={compras} 
        aluno={aluno} 
        setAluno={setAluno} 
        atualizarDados={fetchDadosIniciais} 
      />

      <ArenaCriarDesafioModal 
        isOpen={isArenaOpen} 
        onClose={() => setIsArenaOpen(false)} 
        aluno={aluno} 
        
      />
      <PetNotificacao alunoId={aluno?.id} />
    
      <ClaNotificacao 
        aluno={aluno} 
        atualizarDados={fetchDadosIniciais} 
      />

      <ArenaNotificacao 
        aluno={aluno} 
        atualizarDados={fetchDadosIniciais} 

      />

      <button 
        onClick={() => setIsArenaOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-red-600 hover:bg-red-500 text-white px-6 py-4 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-transform hover:scale-105 flex items-center gap-2 font-black uppercase tracking-wider border-2 border-red-400/50"
      >
        <Swords size={24} /> Desafiar
      </button>
      
    </div>
  );
}