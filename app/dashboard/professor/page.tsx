"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { supabase } from "@/lib/supabase";
import { Loader2, Sun, Moon } from "lucide-react";

// Importando os nossos "blocos de LEGO" modulares
import ProfSidebar from "@/components/dashboard/ProfSidebar";
import VisaoGeralTab from "@/components/dashboard/visaogeral/VisaoGeralTab";
import TurmasTab from "@/components/dashboard/TurmasTab";
import TrabalhosTab from "@/components/dashboard/TrabalhosTab";
import AlunosTab from "@/components/dashboard/AlunosTab";
import LojaTab from "@/components/dashboard/LojaTab";
import NotasMasterTab from "@/components/dashboard/notas/NotasMasterTab"; // <-- NOVO IMPORT AQUI

export default function ProfessorMaster() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("visao");
  const [professorId, setProfessorId] = useState<string | null>(null);

  // Evita o erro de hidratação do next-themes
  useEffect(() => setMounted(true), []);

  // Verifica a Autenticação e Regras
  useEffect(() => {
    const authUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
        
      if (profile?.role !== "professor") return router.push("/dashboard/aluno");
      setProfessorId(user.id);
    };
    authUser();
  }, [router]);

  // Tela de Carregamento Preto OLED
  if (!mounted || !professorId) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-black">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-black font-sans overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-500">
      
      {/* 1. BARRA LATERAL (O CONTROLADOR) */}
      <ProfSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* 2. ÁREA DE RENDERIZAÇÃO */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        
        {/* BOTÃO GLOBAL DE TEMA (Flutuando fixo no canto superior direito para todas as abas) */}
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
          className="absolute top-8 right-8 p-2.5 rounded-full bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#222] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#222] transition-all shadow-sm z-50"
          title="Mudar Tema"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* 3. AS ABAS SENDO CARREGADAS COMO MÓDULOS */}
        <div className="w-full h-full relative z-10">
          {activeTab === "visao" && <VisaoGeralTab professorId={professorId} theme={theme} setTheme={setTheme} />}
          {activeTab === "turmas" && <TurmasTab professorId={professorId} />}
          {activeTab === "trabalhos" && <TrabalhosTab professorId={professorId} />}
          
          {/* A NOVA ABA DE NOTAS E BI */}
          {activeTab === "notas" && <NotasMasterTab professorId={professorId} />}
          
          {activeTab === "lista" && <AlunosTab professorId={professorId} />}
          {activeTab === "loja" && <LojaTab professorId={professorId} />} 
        </div>
      </main>
      
    </div>
  );
}