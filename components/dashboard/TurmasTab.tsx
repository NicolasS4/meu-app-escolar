"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Trash2, Edit2, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

export default function TurmasTab({ professorId }: { professorId: string }) {
  const [turmas, setTurmas] = useState<any[]>([]);
  const [novaTurmaNome, setNovaTurmaNome] = useState("");
  const [isCreatingTurma, setIsCreatingTurma] = useState(false);
  
  // Estados para renomear
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNome, setEditNome] = useState("");

  const buscarTurmas = useCallback(async () => {
    const { data } = await supabase.from("turmas").select("*").eq("professor_id", professorId).order("created_at", { ascending: true });
    if (data) setTurmas(data);
  }, [professorId]);

  useEffect(() => { buscarTurmas(); }, [buscarTurmas]);

  const handleCriarTurma = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingTurma(true);
    await supabase.from("turmas").insert([{ nome: novaTurmaNome, professor_id: professorId }]);
    toast.success("Turma criada!"); 
    setNovaTurmaNome(""); 
    buscarTurmas(); 
    setIsCreatingTurma(false);
  };

  const handleDeletarTurma = async (id: string) => {
    if (!window.confirm("Apagar apagará todos os alunos e trabalhos atrelados. Tem certeza?")) return;
    await supabase.from("turmas").delete().eq("id", id);
    toast.success("Turma apagada."); 
    buscarTurmas();
  };

  const salvarEdicao = async (id: string) => {
    if (!editNome.trim()) return;
    await supabase.from("turmas").update({ nome: editNome }).eq("id", id);
    toast.success("Turma renomeada!"); 
    setEditingId(null); 
    buscarTurmas();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-8">Gestão de Turmas</h1>
      
      <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#222] p-6">
        <form onSubmit={handleCriarTurma} className="flex gap-4">
          <input required type="text" value={novaTurmaNome} onChange={e => setNovaTurmaNome(e.target.value)} placeholder="Nova Turma (Ex: Terceiro Ano A)" className="flex-1 px-4 py-2 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-300 dark:border-[#333] rounded-xl outline-none text-slate-900 dark:text-white" />
          <button type="submit" disabled={isCreatingTurma} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold flex justify-center w-32">{isCreatingTurma ? <Loader2 className="animate-spin"/> : "Salvar"}</button>
        </form>
      </div>

      <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-[#222] p-6 space-y-3">
        {turmas.length === 0 ? <p className="text-slate-500 text-sm">Nenhuma turma cadastrada.</p> : turmas.map(t => (
          <div key={t.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#333] rounded-xl">
            {editingId === t.id ? (
              <div className="flex flex-1 gap-2 mr-4">
                <input autoFocus value={editNome} onChange={e => setEditNome(e.target.value)} className="flex-1 px-3 py-1 bg-white dark:bg-black border border-indigo-300 dark:border-[#555] rounded-lg outline-none text-slate-900 dark:text-white" />
                <button onClick={() => salvarEdicao(t.id)} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"><Check size={18}/></button>
                <button onClick={() => setEditingId(null)} className="bg-slate-300 hover:bg-slate-400 dark:bg-[#333] dark:hover:bg-[#444] text-slate-700 dark:text-slate-300 p-2 rounded-lg transition-colors"><X size={18}/></button>
              </div>
            ) : (
              <span className="font-bold text-slate-700 dark:text-slate-200 text-lg">{t.nome}</span>
            )}
            
            {editingId !== t.id && (
              <div className="flex gap-2">
                <button onClick={() => { setEditingId(t.id); setEditNome(t.nome); }} className="text-slate-400 hover:text-indigo-500 p-2 bg-white dark:bg-[#222] rounded-lg border border-slate-200 dark:border-[#444] transition-colors"><Edit2 size={18}/></button>
                <button onClick={() => handleDeletarTurma(t.id)} className="text-red-500 hover:text-red-600 p-2 bg-white dark:bg-[#222] rounded-lg border border-slate-200 dark:border-[#444] transition-colors"><Trash2 size={18}/></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}