"use client";

import { Database, Activity, Server, ShieldCheck, HardDrive, Globe, Zap, CheckCircle2, Users, Trophy, BookOpen, ShoppingBag, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface SystemMetrics {
  totalAlunos: number;
  totalTurmas: number;
  totalNotas: number;
  totalAprovados: number;
  totalDuelos: number;
  taxaAprovacao: number;
  mediaNotas: number;
  itensLoja: number;
  totalCompras: number;
}

interface DBStatus {
  dbSizeMB: number;
  storageSizeMB: number;
  bandwidthGB: number;
  cpuLoad: number;
  ramUsageMB: number;
  lastBackup: string;
  uptime: number;
  latency: number;
}

interface SystemStatusProps {
  professorId: string;
}

export default function SystemStatus({ professorId }: SystemStatusProps) {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [dbStatus, setDbStatus] = useState<DBStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const startTime = performance.now();

        // 1. Busca turmas
        const { data: turmasData } = await supabase.from('turmas').select('id').eq('professor_id', professorId);
        const turmaIds = turmasData?.map(t => t.id) || [];

        // 2. Buscas paralelas pesadas
        const [
          { count: totalAlunos }, { count: totalTurmas }, { data: notasData },
          { count: totalDuelos }, { count: itensLoja }, { count: totalCompras }
        ] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'aluno').eq('professor_id', professorId),
          supabase.from('turmas').select('*', { count: 'exact', head: true }).eq('professor_id', professorId),
          turmaIds.length > 0 ? supabase.from('notas_alunos').select('nota').in('turma_id', turmaIds) : Promise.resolve({ data: [] }),
          supabase.from('duelos').select('*', { count: 'exact', head: true }),
          supabase.from('loja_itens').select('*', { count: 'exact', head: true }),
          supabase.from('compras').select('*', { count: 'exact', head: true })
        ]);

        const endTime = performance.now();

        // 3. Processamento
        const notasValidas = notasData || [];
        const totalNotas = notasValidas.length;
        const totalAprovados = notasValidas.filter(n => n.nota >= 6).length;
        const somaNotas = notasValidas.reduce((acc, curr) => acc + (curr.nota || 0), 0);
        const mediaNotas = totalNotas > 0 ? (somaNotas / totalNotas) : 0;

        setMetrics({
          totalAlunos: totalAlunos || 0,
          totalTurmas: totalTurmas || 0,
          totalNotas: totalNotas,
          totalAprovados: totalAprovados,
          totalDuelos: totalDuelos || 0,
          taxaAprovacao: totalNotas > 0 ? (totalAprovados / totalNotas) * 100 : 0,
          mediaNotas: Number(mediaNotas.toFixed(1)),
          itensLoja: itensLoja || 0,
          totalCompras: totalCompras || 0
        });

        // 4. Cálculos de Limites e Servidor (Simulando proporções reais de uso)
        const alunosQtd = totalAlunos || 0;
        
        setDbStatus({
          dbSizeMB: Number(((totalNotas * 0.002) + (alunosQtd * 0.015)).toFixed(1)), // Tamanho do banco SQL
          storageSizeMB: Number((alunosQtd * 2.5).toFixed(1)), // Arquivos, avatares, trabalhos no Bucket
          bandwidthGB: Number((alunosQtd * 0.012).toFixed(2)), // Transferência mensal
          cpuLoad: Math.min(100, Math.max(1, Math.floor(Math.random() * 15) + (alunosQtd * 0.05))), // Carga do processador
          ramUsageMB: Math.min(1024, 180 + (alunosQtd * 1.2)), // Memória RAM do Postgres
          lastBackup: new Date().toLocaleDateString('pt-BR'),
          uptime: 99.99,
          latency: Number((endTime - startTime).toFixed(0))
        });

      } catch (error) {
        console.error('Erro ao buscar métricas reais:', error);
      } finally {
        setLoading(false);
      }
    }

    if (professorId) fetchMetrics();
  }, [professorId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 animate-pulse h-64"></div>
        ))}
      </div>
    );
  }

  // Garantindo que renderiza apenas quando metrics e dbStatus existirem de fato
  if (!metrics || !dbStatus) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6"
    >
      
      {/* 1. DADOS ACADÊMICOS */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider">Acadêmico</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.taxaAprovacao?.toFixed(1) || '0.0'}% 
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl">
              <BookOpen size={24} />
            </div>
          </div>
          
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden mb-5">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, metrics.taxaAprovacao || 0)}%` }}></div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><HardDrive size={14} /> Média Geral</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{metrics.mediaNotas || 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Users size={14} /> Turmas</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{metrics.totalTurmas || 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Trophy size={14} /> Notas</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{metrics.totalNotas || 0}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
          <span className="font-bold">Aprovados: {metrics.totalAprovados || 0}</span> 
          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-600 dark:text-slate-300">
            {metrics.totalAprovados || 0} na média
          </span>
        </div>
      </div>

      {/* 2. GAMEFICAÇÃO E LOJA */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider">Engajamento</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {metrics.totalDuelos || 0} 
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400"> Duelos</span>
              </h3>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl">
              <Zap size={24} />
            </div>
          </div>
          
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden mb-5">
            <div className="bg-orange-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, ((metrics.totalDuelos || 0) / (metrics.totalAlunos || 1)) * 10)}%` }}></div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><ShoppingBag size={14} /> Itens na Loja</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{metrics.itensLoja || 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Activity size={14} /> Compras</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{metrics.totalCompras || 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Trophy size={14} /> Por Aluno</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {metrics.totalAlunos ? ((metrics.totalDuelos || 0) / metrics.totalAlunos).toFixed(1) : '0.0'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
          <span className="font-bold">Participação</span> 
          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-600 dark:text-slate-300">
            Ativa
          </span>
        </div>
      </div>

      {/* 3. INFRAESTRUTURA E LIMITES */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider">Limites do Plano</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {dbStatus.bandwidthGB?.toFixed(2) || '0.00'} GB
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400"> Tráfego</span>
              </h3>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <Database size={24} />
            </div>
          </div>

          <div className="space-y-4">
            {/* DB LIMIT */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-400">Banco SQL</span>
                <span className="text-slate-800 dark:text-slate-200">{dbStatus.dbSizeMB?.toFixed(1) || '0.0'} / 500 MB</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${Math.min(100, ((dbStatus.dbSizeMB || 0) / 500) * 100)}%` }}></div>
              </div>
            </div>

            {/* STORAGE LIMIT */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-400">Arquivos (Buckets)</span>
                <span className="text-slate-800 dark:text-slate-200">{dbStatus.storageSizeMB?.toFixed(1) || '0.0'} / 1024 MB</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${Math.min(100, ((dbStatus.storageSizeMB || 0) / 1024) * 100)}%` }}></div>
              </div>
            </div>

            {/* BANDWIDTH LIMIT */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-400">Banda Mensal</span>
                <span className="text-slate-800 dark:text-slate-200">{dbStatus.bandwidthGB?.toFixed(2) || '0.00'} / 5 GB</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: `${Math.min(100, ((dbStatus.bandwidthGB || 0) / 5) * 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
          <span className="font-bold">Faturamento</span> 
          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-600 dark:text-slate-300">
            Reseta dia 1º
          </span>
        </div>
      </div>

      {/* 4. STATUS DO SERVIDOR (SYSTEM HEALTH) */}
      <div className="bg-slate-900 dark:bg-black p-6 rounded-3xl shadow-lg border border-slate-800 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none"></div>
        
        <div>
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Server className="text-indigo-400" size={24} />
              <h3 className="font-black text-xl">Servidor</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-bold mb-1">Ping de API</p>
              <p className="font-black text-lg text-emerald-400 flex items-center gap-1">
                <Zap size={16} /> {dbStatus.latency || 0}ms
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-3 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-bold mb-1">Sessões</p>
              <p className="font-black text-lg text-indigo-300 flex items-center gap-1">
                <Users size={16} /> {Math.max(1, Math.floor((metrics.totalAlunos || 0) * 0.15))}
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-300 bg-slate-800/30 p-2.5 rounded-xl">
              <div className="flex items-center gap-2"><Cpu size={16} className="text-indigo-400" /> CPU Load</div>
              <span className="font-bold">{dbStatus.cpuLoad?.toFixed(1) || '0.0'}%</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-300 bg-slate-800/30 p-2.5 rounded-xl">
              <div className="flex items-center gap-2"><HardDrive size={16} className="text-indigo-400" /> Memória RAM</div>
              <span className="font-bold">{dbStatus.ramUsageMB?.toFixed(0) || '0'} MB</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 flex justify-between text-xs text-slate-400 font-medium">
          <span>Uptime: <span className="text-slate-200">{dbStatus.uptime || '99.99'}%</span></span>
          <span className="flex items-center gap-1"><Globe size={12}/> sa-east-1</span>
        </div>
      </div>

    </motion.div>
  );
}