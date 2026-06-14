"use client";

import { X, Circle } from "lucide-react";

const COMBINACOES_VITORIA = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

interface JogoDaVelhaProps {
  duelo: any;
  meuId: string;
  onJogada: (novosDados: any, vencedorId: string | null, deuVelha: boolean) => void;
}

export default function JogoDaVelha({ duelo, meuId, onJogada }: JogoDaVelhaProps) {
  const tabuleiro = (duelo?.dados_jogo?.tabuleiro?.length === 9) 
    ? duelo.dados_jogo.tabuleiro 
    : Array(9).fill(null);
    
  const turnoAtual = duelo?.dados_jogo?.turno_atual;
  const vencedor = duelo?.vencedor_id || (duelo?.status === 'empate' ? 'empate' : null);
  const ehMeuTurno = turnoAtual === meuId && !vencedor;

  const handleClick = (index: number) => {
    if (!ehMeuTurno || tabuleiro[index] !== null) return;

    const ehCriador = meuId === duelo.criador_id;
    const meuSimbolo = ehCriador ? "X" : "O";
    
    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[index] = meuSimbolo;
    
    let novoVencedor = null;
    for (let combo of COMBINACOES_VITORIA) {
      const [a, b, c] = combo;
      if (novoTabuleiro[a] && novoTabuleiro[a] === novoTabuleiro[b] && novoTabuleiro[a] === novoTabuleiro[c]) {
        novoVencedor = meuId;
        break;
      }
    }

    const deuVelha = !novoVencedor && novoTabuleiro.every((celula: any) => celula !== null);
    const proximoTurno = ehCriador ? duelo.oponente_id : duelo.criador_id;

    onJogada(
      { tabuleiro: novoTabuleiro, turno_atual: proximoTurno }, 
      novoVencedor, 
      deuVelha
    );
  };

  return (
    <div className="bg-slate-900 p-3 sm:p-4 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-[400px] mx-auto mt-4">
      
      {/* 🔮 O ANTÍDOTO: Forçando o Grid e as 3 colunas no CSS puro! */}
      <div 
        className="bg-slate-800 p-2 sm:p-3 rounded-2xl w-full gap-2 sm:gap-3"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
          const celula = tabuleiro[index] || null;
          const isX = celula === "X";
          const isO = celula === "O";
          
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={celula !== null || !ehMeuTurno || vencedor !== null}
              style={{ minHeight: '100px' }} 
              className={`aspect-square w-full bg-slate-950 rounded-xl flex items-center justify-center transition-all duration-200 
                ${!celula && ehMeuTurno && !vencedor ? 'hover:bg-slate-700 cursor-pointer hover:scale-105' : 'cursor-default'}
              `}
            >
              {isX && <X className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-in zoom-in" size={60} strokeWidth={2.5} />}
              {isO && <Circle className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-in zoom-in" size={50} strokeWidth={3} />}
            </button>
          );
        })}
      </div>

    </div>
  );
}