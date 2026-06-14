"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Pencil, Eraser, Heart, Skull, Undo2 } from "lucide-react";

interface SudokuArenaProps {
  duelo: any;
  meuId: string;
  onJogada: (novosDados: any, vencedorId: string | null, deuVelha: boolean) => void;
}

const gerarSudoku = (dificuldade: 'facil' | 'medio' | 'dificil') => {
  const base = [
    [1,2,3,4,5,6,7,8,9], [4,5,6,7,8,9,1,2,3], [7,8,9,1,2,3,4,5,6],
    [2,3,1,5,6,4,8,9,7], [5,6,4,8,9,7,2,3,1], [8,9,7,2,3,1,5,6,4],
    [3,1,2,6,4,5,9,7,8], [6,4,5,9,7,8,3,1,2], [9,7,8,3,1,2,6,4,5]
  ];
  
  const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
  let solucao = base.map(row => row.map(v => nums[v-1]));

  [0, 3, 6].forEach(bloco => {
    const r1 = bloco + Math.floor(Math.random() * 3);
    const r2 = bloco + Math.floor(Math.random() * 3);
    [solucao[r1], solucao[r2]] = [solucao[r2], solucao[r1]];
  });

  const remocoes = dificuldade === 'facil' ? 30 : dificuldade === 'medio' ? 45 : 55;
  let puzzle: (number | null)[][] = solucao.map(row => [...row]);
  let removidos = 0;
  
  while (removidos < remocoes) {
    let r = Math.floor(Math.random() * 9);
    let c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== null) {
      puzzle[r][c] = null;
      removidos++;
    }
  }

  return { solucao, puzzle, totalVazias: remocoes };
};

type HistoricoAcao = {
  r: number;
  c: number;
  anotacoesAnteriores: number[];
};

export default function SudokuArena({ duelo, meuId, onJogada }: SudokuArenaProps) {
  const [isConfigurando, setIsConfigurando] = useState(false);
  const [meuGrid, setMeuGrid] = useState<any[]>([]);
  const [selecionado, setSelecionado] = useState<{r: number, c: number} | null>(null);
  const [modoLapis, setModoLapis] = useState(false);
  
  const [historico, setHistorico] = useState<HistoricoAcao[]>([]);
  const [erroTemp, setErroTemp] = useState<{r: number, c: number, valor: number} | null>(null);
  const [celulaSucesso, setCelulaSucesso] = useState<{r: number, c: number} | null>(null);

  const souCriador = meuId === duelo.criador_id;
  const oponenteId = souCriador ? duelo.oponente_id : duelo.criador_id;
  const jogoIniciado = duelo.dados_jogo?.sudoku_gerado;

  useEffect(() => {
    if (jogoIniciado && meuGrid.length === 0) {
      const gridInicial = duelo.dados_jogo.puzzle.map((row: any[]) => 
        row.map((val: any) => ({
          valor: val,
          fixo: val !== null,
          anotacoes: []
        }))
      );
      setMeuGrid(gridInicial);
    }
  }, [jogoIniciado, duelo.dados_jogo, meuGrid.length]);

  const handleGerarJogo = async (dificuldade: 'facil' | 'medio' | 'dificil') => {
    setIsConfigurando(true);
    const { solucao, puzzle, totalVazias } = gerarSudoku(dificuldade);
    
    const novosDados = {
      ...duelo.dados_jogo,
      sudoku_gerado: true,
      solucao,
      puzzle,
      total_vazias: totalVazias,
      jogadores: {
        [duelo.criador_id]: { acertos: 0, erros: 0 },
        [duelo.oponente_id]: { acertos: 0, erros: 0 }
      }
    };

    await supabase.from("duelos").update({ dados_jogo: novosDados }).eq("id", duelo.id);
  };

  const handleUndo = () => {
    if (historico.length === 0) return;
    const novoHistorico = [...historico];
    const ultimaAcao = novoHistorico.pop()!;
    setHistorico(novoHistorico);

    const novoGrid = [...meuGrid];
    novoGrid[ultimaAcao.r][ultimaAcao.c].anotacoes = ultimaAcao.anotacoesAnteriores;
    setMeuGrid(novoGrid);
  };

  const handleAcao = async (numero: number | 'apagar') => {
    if (!selecionado || !meuGrid.length || erroTemp) return;
    
    const { r, c } = selecionado;
    const celula = meuGrid[r][c];
    
    if (celula.fixo) return;

    const novoGrid = [...meuGrid];

    if (numero === 'apagar') {
      if (celula.anotacoes.length > 0 && celula.valor === null) {
        setHistorico(prev => [...prev, { r, c, anotacoesAnteriores: [...celula.anotacoes] }]);
        novoGrid[r][c].anotacoes = [];
        setMeuGrid(novoGrid);
      }
      return;
    }

    if (modoLapis) {
      if (celula.valor !== null) return; 
      
      setHistorico(prev => [...prev, { r, c, anotacoesAnteriores: [...celula.anotacoes] }]);
      
      const temAnotacao = celula.anotacoes.includes(numero);
      if (temAnotacao) {
        novoGrid[r][c].anotacoes = celula.anotacoes.filter((n: number) => n !== numero);
      } else {
        novoGrid[r][c].anotacoes.push(numero);
      }
      setMeuGrid(novoGrid);
      return;
    }

    const valorCorreto = duelo.dados_jogo.solucao[r][c];
    const meusDadosAtuais = duelo.dados_jogo.jogadores[meuId];
    let novosAcertos = meusDadosAtuais.acertos;
    let novosErros = meusDadosAtuais.erros;

    if (numero === valorCorreto) {
      novoGrid[r][c].valor = numero;
      novoGrid[r][c].fixo = true;
      novoGrid[r][c].anotacoes = []; 
      novosAcertos += 1;
      
      setCelulaSucesso({r, c});
      setTimeout(() => setCelulaSucesso(null), 500);
      setMeuGrid(novoGrid);
    } else {
      novosErros += 1; 
      
      setErroTemp({ r, c, valor: numero });
      setTimeout(() => setErroTemp(null), 500);
    }

    const novosDadosDB = {
      ...duelo.dados_jogo,
      jogadores: {
        ...duelo.dados_jogo.jogadores,
        [meuId]: { acertos: novosAcertos, erros: novosErros }
      }
    };

    if (novosErros >= 3) {
      onJogada(novosDadosDB, oponenteId, false); 
    } else if (novosAcertos >= duelo.dados_jogo.total_vazias) {
      onJogada(novosDadosDB, meuId, false);
    } else {
      await supabase.from("duelos").update({ dados_jogo: novosDadosDB }).eq("id", duelo.id);
    }
  };

  if (!jogoIniciado) {
    if (souCriador) {
      return (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md mx-auto text-center animate-in zoom-in">
          <h2 className="text-2xl font-black text-white mb-2 uppercase">Configurar Corrida</h2>
          <p className="text-slate-400 mb-6">Escolha a dificuldade do Sudoku para ambos resolverem.</p>
          
          {isConfigurando ? <Loader2 className="animate-spin text-red-500 mx-auto" size={32} /> : (
            <div className="flex flex-col gap-3">
              <button onClick={() => handleGerarJogo('facil')} className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold hover:bg-emerald-500/20 transition-all">Fácil (Rápido)</button>
              <button onClick={() => handleGerarJogo('medio')} className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-bold hover:bg-yellow-500/20 transition-all">Médio (Padrão)</button>
              <button onClick={() => handleGerarJogo('dificil')} className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-bold hover:bg-red-500/20 transition-all">Difícil (Mortal)</button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-center mx-auto max-w-md flex flex-col items-center">
          <Loader2 className="animate-spin text-red-500 mb-4" size={40} />
          <h2 className="text-xl font-bold text-white">Aguardando o Criador...</h2>
          <p className="text-slate-400 text-sm mt-2">Ele está escolhendo a dificuldade do Sudoku.</p>
        </div>
      );
    }
  }

  if (meuGrid.length === 0) return null;

  const meusStatus = duelo.dados_jogo.jogadores[meuId] || { acertos: 0, erros: 0 };
  const oponenteStatus = duelo.dados_jogo.jogadores[oponenteId] || { acertos: 0, erros: 0 };
  
  const progressoMeu = Math.min(100, Math.round((meusStatus.acertos / duelo.dados_jogo.total_vazias) * 100));
  const progressoOponente = Math.min(100, Math.round((oponenteStatus.acertos / duelo.dados_jogo.total_vazias) * 100));

  const numSelecionado = selecionado && meuGrid[selecionado.r][selecionado.c].valor !== null 
    ? meuGrid[selecionado.r][selecionado.c].valor 
    : null;

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6 pb-10">
      
      {/* 🚀 CSS Global Temporário para a Animação */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>

      {/* HUD de Progresso e Vidas */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl flex flex-col gap-4">
        <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Suas Vidas</span>
          <div className="flex gap-2">
            {[1, 2, 3].map(vida => (
              vida > meusStatus.erros 
                ? <Heart key={vida} className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] fill-red-500" size={20} /> 
                : <Skull key={vida} className="text-slate-700" size={20} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-blue-400">Você</span>
              <span className="text-blue-400">{progressoMeu}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progressoMeu}%` }}></div></div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-orange-400">Oponente</span>
              <span className="text-orange-400">{progressoOponente}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-orange-500 transition-all duration-500" style={{ width: `${progressoOponente}%` }}></div></div>
          </div>
        </div>
      </div>

      {/* 🧩 Tabuleiro de Sudoku Clássico */}
      <div className="bg-white p-1 sm:p-2 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] mx-auto select-none touch-manipulation w-full max-w-[400px]">
        <div 
          className="border-2 border-slate-900 bg-white"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)' }}
        >
          {meuGrid.map((row, r) => 
            row.map((celula: any, c: number) => {
              const isSelecionado = selecionado?.r === r && selecionado?.c === c;
              
              const isRelacionado = selecionado && numSelecionado === null && !isSelecionado && (
                selecionado.r === r || 
                selecionado.c === c || 
                (Math.floor(selecionado.r / 3) === Math.floor(r / 3) && Math.floor(selecionado.c / 3) === Math.floor(c / 3))
              );
              
              const isMesmoNumero = numSelecionado !== null && !isSelecionado && celula.valor === numSelecionado;

              const bordaDireita = (c === 2 || c === 5) ? '2px solid #0f172a' : (c === 8) ? 'none' : '1px solid #cbd5e1';
              const bordaBaixo = (r === 2 || r === 5) ? '2px solid #0f172a' : (r === 8) ? 'none' : '1px solid #cbd5e1';

              const isErro = erroTemp?.r === r && erroTemp?.c === c;
              const isSucesso = celulaSucesso?.r === r && celulaSucesso?.c === c;
              
              let bgColor = 'bg-white';
              
              // 🔮 BLINDAGEM ABSOLUTA: Códigos HEX em CSS Puro para não falhar nunca!
              let corTextoHex = '#0f172a'; // Slate 900 (Preto padrão)
              let valorStyle = "text-2xl sm:text-3xl font-bold";
              let valorExibido = celula.valor;

              // Lógica de Cores do Fundo
              if (isErro) {
                bgColor = 'bg-red-200 animate-pulse'; 
              } else if (isSucesso) {
                bgColor = 'bg-green-200 animate-pulse'; 
              } else if (isSelecionado) {
                bgColor = numSelecionado !== null ? 'bg-blue-300' : 'bg-blue-100';
              } else if (isMesmoNumero) {
                bgColor = 'bg-blue-200';
              } else if (isRelacionado) {
                bgColor = 'bg-slate-200';
              }

              // Lógica de Cores do Texto em HEX PURO
              if (isErro) {
                corTextoHex = '#dc2626'; // Vermelho vivo
                valorExibido = erroTemp.valor;
              } else if (isSucesso) {
                corTextoHex = '#059669'; // Verde Esmeralda
              } else if (celula.valor !== null) {
                if (duelo.dados_jogo.puzzle[r][c] !== null) {
                  corTextoHex = '#0f172a'; // Preto Original
                  valorStyle = "text-2xl sm:text-3xl font-black";
                } else {
                  corTextoHex = '#059669'; // Verde Acerto Permanente
                }
              }

              const animationClass = isErro ? 'animate-shake' : '';

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => {
                    if (isSelecionado) setSelecionado(null);
                    else setSelecionado({r, c});
                  }}
                  style={{ borderRight: bordaDireita, borderBottom: bordaBaixo }}
                  className={`
                    aspect-square flex items-center justify-center transition-all duration-150 outline-none p-0
                    ${bgColor} ${animationClass}
                    hover:bg-blue-50
                  `}
                >
                  {valorExibido !== null ? (
                    <span className={valorStyle} style={{ color: corTextoHex }}>{valorExibido}</span>
                  ) : (
                    /* Grade do Lápis (3x3 interno) com CSS HEX Puro na fonte */
                    <div 
                      className="w-full h-full p-1"
                      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' }}
                    >
                      {[1,2,3,4,5,6,7,8,9].map(n => (
                        <span 
                          key={n} 
                          style={{ color: '#9333ea' }} // Roxo visível
                          className="flex items-center justify-center text-[11px] sm:text-[13px] font-semibold leading-none"
                        >
                          {celula.anotacoes.includes(n) ? n : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* 🛠️ Barra de Ferramentas - Mais afastada e centralizada */}
      <div className="flex justify-center items-center gap-8 sm:gap-12 w-full max-w-[400px] mx-auto mt-6">
        <button 
          onClick={handleUndo} 
          disabled={historico.length === 0}
          className="flex flex-col items-center group transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
        >
          <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-2 group-hover:bg-slate-700 transition-all shadow-lg">
            <Undo2 size={24} className="text-slate-300 group-hover:text-white" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-white">Desfazer</span>
        </button>

        <button 
          onClick={() => handleAcao('apagar')} 
          className="flex flex-col items-center group transition-all hover:scale-105"
        >
          <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-2 group-hover:bg-red-900/40 transition-all shadow-lg">
            <Eraser size={24} className="text-slate-300 group-hover:text-red-400" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-red-400">Apagar</span>
        </button>

        <button 
          onClick={() => setModoLapis(!modoLapis)} 
          className={`flex flex-col items-center transition-all hover:scale-105 ${modoLapis ? 'scale-105' : ''}`}
        >
          <div className={`relative w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-all shadow-lg ${modoLapis ? 'bg-blue-500/30 ring-2 ring-blue-400' : 'bg-slate-800'}`}>
            <Pencil size={22} className={modoLapis ? 'text-blue-400' : 'text-slate-300'} />
            <span className={`absolute -top-1 -right-1 text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-slate-900 ${modoLapis ? 'bg-blue-500 text-white' : 'bg-slate-600 text-white'}`}>
              {modoLapis ? 'ON' : 'OFF'}
            </span>
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-wider ${modoLapis ? 'text-blue-400' : 'text-slate-400'}`}>Anotar</span>
        </button>
      </div>

      {/* 🔢 Teclado Numérico - Bem espaçado e centralizado */}
      <div className="flex justify-center items-center flex-wrap gap-3 sm:gap-4 w-full max-w-[400px] mx-auto mt-4 pb-8">
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <button 
            key={n} 
            onClick={() => handleAcao(n)}
            style={{ color: '#f8fafc' }} // Cor branca segura para o numpad
            className="w-11 h-14 sm:w-12 sm:h-16 flex items-center justify-center text-3xl sm:text-4xl font-bold bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl transition-all active:scale-95 shadow-lg border-b-4 border-slate-950 active:border-b-0 active:translate-y-1"
          >
            {n}
          </button>
        ))}
      </div>

    </div>
  );
}