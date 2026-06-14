"use client";

import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

interface IndividualBiProps {
  dashboardData: any;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 dark:bg-gray-700 text-white p-3 rounded-xl border border-gray-600 dark:border-gray-500 shadow-xl">
        <p className="font-bold mb-1">{data.nomeCompleto}</p>
        <p className="flex items-center gap-2">Média: <span className={`font-black ${data.aprovado ? 'text-emerald-400' : 'text-red-400'}`}>{data.media}</span></p>
      </div>
    );
  }
  return null;
};

export default function IndividualBi({ dashboardData }: IndividualBiProps) {
  if (!dashboardData) return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-black text-lg mb-6 text-gray-900 dark:text-white flex items-center gap-2"><BarChart3 size={20} className="text-purple-500" /> Desempenho Individual</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dashboardData.grafico} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#6b7280" opacity={0.2} />
            <XAxis dataKey="nome" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 'bold' }} dy={10}/>
            <YAxis domain={[0, 10]} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontWeight: 'bold' }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#6b7280', opacity: 0.15 }} />
            <Bar dataKey="media" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {dashboardData.grafico.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.aprovado ? '#8b5cf6' : '#ef4444'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}