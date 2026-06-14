"use client";

import { FileSpreadsheet, Loader2, Save, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface AnalyticsTableProps {
  alunos: any[];
  configAtual: any;
  notas: Record<string, Record<number, string>>;
  extras: Record<string, string>;
  handleNotaChange: (alunoId: string, provaNum: number, valor: string) => void;
  handleExtraChange: (alunoId: string, valor: string) => void;
  handleSave: () => void;
  isSaving: boolean;
  isLoading: boolean;
  calcularMedia: (alunoId: string, quantidadeProvas: number) => number;
}

export default function AnalyticsTable({ 
  alunos, configAtual, notas, extras, handleNotaChange, handleExtraChange, handleSave, isSaving, isLoading, calcularMedia 
}: AnalyticsTableProps) {
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-100 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden relative mt-8">
      
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-200 dark:bg-gray-900">
        <div>
          <h3 className="font-black text-lg text-gray-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet size={20} className="text-purple-500" /> Tabela de Resultados
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Edite as notas aqui e salve para atualizar o gráfico acima.</p>
        </div>
        <button onClick={handleSave} disabled={isSaving || isLoading} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-70 shadow-lg shadow-purple-600/20 active:scale-95">
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Salvar Alterações
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        {alunos.length === 0 ? (
           <div className="p-12 text-center text-gray-500 dark:text-gray-400"><AlertTriangle className="mx-auto mb-3 opacity-50 text-yellow-500" size={32} /><p>Nenhum aluno matriculado nesta turma.</p></div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-600">
                <th className="p-4 font-black text-gray-700 dark:text-gray-300 text-sm uppercase sticky left-0 bg-gray-200 dark:bg-gray-900 z-10">Aluno</th>
                {Array.from({ length: configAtual.quantidade_provas }).map((_, i) => (
                  <th key={i} className="p-4 font-black text-gray-700 dark:text-gray-300 text-sm uppercase text-center border-l border-gray-300 dark:border-gray-600">Prova {i + 1}</th>
                ))}
                <th className="p-4 font-black text-yellow-600 dark:text-yellow-400 text-sm uppercase text-center border-l border-gray-300 dark:border-gray-600">Extras</th>
                <th className="p-4 font-black text-purple-600 dark:text-purple-400 text-sm uppercase text-center border-l border-gray-300 dark:border-gray-600">Média Final</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {alunos.map((aluno) => {
                const media = calcularMedia(aluno.id, configAtual.quantidade_provas);
                const estaAprovado = media >= 6;
                return (
                  <tr key={aluno.id} className="hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors group">
                    <td className="p-4 font-bold text-gray-900 dark:text-white sticky left-0 bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200/50 dark:group-hover:bg-gray-700/50 transition-colors shadow-[1px_0_0_0_rgba(0,0,0,0.05)] dark:shadow-[1px_0_0_0_rgba(255,255,255,0.05)]">{aluno.nome}</td>
                    
                    {Array.from({ length: configAtual.quantidade_provas }).map((_, i) => {
                      const p = i + 1;
                      return (
                        <td key={p} className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                          <input type="text" placeholder="--" value={notas[aluno.id]?.[p] || ""} onChange={(e) => handleNotaChange(aluno.id, p, e.target.value)} className="w-16 p-2 text-center bg-gray-200 dark:bg-gray-700 border border-transparent focus:border-purple-500 rounded-lg outline-none font-bold text-gray-900 dark:text-white transition-all focus:bg-gray-100 dark:focus:bg-gray-600" />
                        </td>
                      );
                    })}

                    <td className="p-3 border-l border-gray-200 dark:border-gray-700 text-center">
                      <input 
                        type="text" 
                        placeholder="+0" 
                        value={extras[aluno.id] || ""} 
                        onChange={(e) => handleExtraChange(aluno.id, e.target.value)} 
                        className="w-16 p-2 text-center bg-gray-200 dark:bg-gray-700 border border-transparent focus:border-yellow-500 rounded-lg outline-none font-bold text-yellow-600 dark:text-yellow-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" 
                      />
                    </td>

                    <td className="p-4 border-l border-gray-200 dark:border-gray-700 text-center">
                      <span className={`inline-block px-3 py-1 rounded-lg font-black text-sm ${media === 0 ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400' : estaAprovado ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/30 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-500/30 dark:text-red-300'}`}>{media.toFixed(1)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}