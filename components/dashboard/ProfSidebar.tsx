"use client";

import { BookOpen, LayoutDashboard, Library, Briefcase, Users, ShoppingBag, LogOut, LineChart } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfSidebar({ activeTab, setActiveTab }: SidebarProps) {
  const router = useRouter();

  const handleSair = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { id: "visao", label: "Visão Geral", icon: LayoutDashboard },
    { id: "turmas", label: "Minhas Turmas", icon: Library },
    { id: "trabalhos", label: "Trabalhos", icon: Briefcase },
    { id: "notas", label: "Diário", icon: LineChart },
    { id: "lista", label: "Alunos", icon: Users },
    { id: "loja", label: "Lojinha ", icon: ShoppingBag },
  ];

  return (
    <aside className="w-64 bg-indigo-700 dark:bg-black border-r border-transparent dark:border-[#222] text-white flex flex-col shadow-xl transition-colors duration-500 z-10">
      <div className="p-6">
        <h2 className="text-2xl font-black flex items-center gap-2 tracking-tight">
          <BookOpen size={28} className="text-indigo-200 dark:text-indigo-500" /> Painel Prof
        </h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === item.id 
                ? "bg-indigo-800 dark:bg-[#222] font-semibold text-white" 
                : "hover:bg-indigo-600 dark:hover:bg-[#1a1a1a] text-indigo-100 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <item.icon size={20} /> {item.label}
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-indigo-600 dark:border-[#222]">
        <button 
          onClick={handleSair} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-indigo-600 dark:hover:bg-[#222] text-indigo-100 hover:text-white dark:text-slate-400 dark:hover:text-white"
        >
          <LogOut size={20} /> Sair
        </button>
        
      </div>
    </aside>
  ); 
}