"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2, Trophy, ArrowLeft, Swords, Flag, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import JogoDaVelha from "@/components/aluno/jogos/JogoDaVelha";
import SudokuArena from "@/components/aluno/jogos/SudokuArena";
import JokenpoArena from "@/components/aluno/jogos/JokenpoArena";
import ImparParArena from "@/components/aluno/jogos/ImparParArena";
import VinteEUmArena from "@/components/aluno/jogos/VinteEUmArena";

export default function ArenaMasterPage() {
  const { id: dueloId } = useParams();
  const router = useRouter();
  
  const [meuId, setMeuId] = useState<string | null>(null);
  const [duelo, setDuelo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarArena = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");
      setMeuId(user.id);

      const { data: dadosDuelo } = await supabase
        .from("duelos")
        .select("*, criador:profiles!criador_id(nome), oponente:profiles!oponente_id(nome)")
        .eq("id", dueloId)
        .single();
      
      if (!dadosDuelo) return router.push("/dashboard/aluno");
      setDuelo(dadosDuelo);
      setIsLoading(false);
    };

    carregarArena();

    const channel = supabase.channel(`arena-${dueloId}`).on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'duelos', filter: `id=eq.${dueloId}` },
      (payload) => {
        setDuelo((prev: any) => ({ ...prev, ...payload.new }));
      }
    ).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [dueloId, router]);

  const handleJogada = async (novosDadosJogo: any, vencedorId: string | null, deuVelha: boolean) => {
    const atualizacao: any = { dados_jogo: novosDadosJogo };

    if (vencedorId) {
      atualizacao.vencedor_id = vencedorId;
      atualizacao.status = 'finalizado';
      
      // 🐛 O BUG FOI ESMAGADO AQUI! 
      // Agora o juiz verifica exatamente quem é o perdedor baseando-se em quem foi o vencedor,
      // impedindo que o vencedor roube os pontos de si mesmo!
      const perdedorId = vencedorId === duelo.criador_id ? duelo.oponente_id : duelo.criador_id;

      await supabase.rpc('transferir_pontos_duelo', { 
        p_vencedor_id: vencedorId, 
        p_perdedor_id: perdedorId, 
        p_valor: duelo.aposta 
      });
    } else if (deuVelha) {
      atualizacao.status = 'empate';
    }

    setDuelo((prev: any) => ({ ...prev, ...atualizacao }));
    await supabase.from("duelos").update(atualizacao).eq("id", dueloId);
  };

  const handleAbandonar = async () => {
    if (duelo?.vencedor_id) return; 

    const oponenteId = meuId === duelo.criador_id ? duelo.oponente_id : duelo.criador_id;
    
    await supabase.rpc('transferir_pontos_duelo', { 
      p_vencedor_id: oponenteId, 
      p_perdedor_id: meuId, 
      p_valor: duelo.aposta 
    });

    await supabase.from("duelos").update({
      status: 'finalizado',
      vencedor_id: oponenteId,
      dados_jogo: { ...duelo.dados_jogo, abandono: true }
    }).eq("id", dueloId);

    toast("Você fugiu da batalha e perdeu a aposta!", { icon: "🏳️" });
    router.push("/dashboard/aluno");
  };

  if (isLoading || !duelo || !meuId) return <div className="h-screen flex items-center justify-center bg-slate-950"><Loader2 className="animate-spin text-red-600" size={48} /></div>;

  const vencedor = duelo.vencedor_id || (duelo.status === 'empate' ? 'empate' : null);
  const abandono = duelo.dados_jogo?.abandono || false;
  const turnoAtual = duelo.dados_jogo?.turno_atual;
  const ehMeuTurno = turnoAtual === meuId && !vencedor;
  const souCriador = meuId === duelo.criador_id;
  const nomeOponente = souCriador ? duelo.oponente?.nome || "Oponente" : duelo.criador?.nome || "Desafiante";

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center py-12 px-4 font-sans selection:bg-red-500/30">
      
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <div>
          {!vencedor && (
            <button onClick={handleAbandonar} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors font-bold">
              <ArrowLeft size={20} /> Fugir da Arena
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 shadow-md">
          <span className="text-yellow-500 font-black flex items-center gap-2">⭐ Aposta: {duelo?.aposta} pts</span>
        </div>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-white uppercase tracking-widest flex items-center justify-center gap-3 mb-2">
          <Swords className="text-red-500" size={36} /> Arena Batalha
        </h1>
        <p className="text-slate-400 text-lg">Você vs <strong className="text-white">{nomeOponente}</strong></p>
      </div>

      {!vencedor && duelo.jogo === 'jogo_da_velha' && (
        <div className={`mb-8 px-6 py-3 rounded-full font-bold text-lg transition-all ${ehMeuTurno ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
          {ehMeuTurno ? "⚔️ É a sua vez de jogar!" : "⏳ Aguardando oponente..."}
        </div>
      )}

      {!vencedor && duelo.jogo === 'vinte_e_um' && (
        <VinteEUmArena duelo={duelo} meuId={meuId} onJogada={handleJogada} />
      )}
      
      {!vencedor && duelo.jogo === 'impar_par' && (
        <ImparParArena duelo={duelo} meuId={meuId} onJogada={handleJogada} />
      )}

      {vencedor && (
        <div className="mb-8 p-6 rounded-2xl bg-slate-900 border-2 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.2)] text-center animate-in zoom-in w-full max-w-md">
          {vencedor === 'empate' ? (
            <h2 className="text-2xl font-black text-slate-300">Deu Velha! Empate. 🛡️</h2>
          ) : vencedor === meuId ? (
            <div>
              <Trophy className="text-yellow-400 mx-auto mb-2" size={48} />
              <h2 className="text-3xl font-black text-white uppercase">Você Venceu!</h2>
              {abandono && <p className="text-orange-400 font-bold mt-2 flex justify-center items-center gap-2"><Flag size={18}/> O oponente fugiu!</p>}
              <p className="text-yellow-400 font-bold mt-1 text-lg">+{duelo?.aposta} pontos na conta</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-black text-red-500 uppercase">Você foi Derrotado 💀</h2>
              {abandono ? <p className="text-slate-400 text-sm mt-2">Você fugiu da batalha.</p> : <p className="text-slate-400 text-sm mt-2">Menos {duelo?.aposta} pontos na conta.</p>}
            </div>
          )}

          <button 
            onClick={() => router.push("/dashboard/aluno")}
            className="mt-8 w-full py-4 rounded-xl font-black text-lg flex justify-center items-center gap-2 bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-transform hover:scale-105"
          >
            <CheckCircle2 size={24} /> Voltar para o Lobby
          </button>
        </div>
      )}

      {!vencedor && duelo.jogo === 'jogo_da_velha' && (
        <JogoDaVelha duelo={duelo} meuId={meuId} onJogada={handleJogada} />
      )}

      {!vencedor && duelo.jogo === 'sudoku' && (
        <SudokuArena duelo={duelo} meuId={meuId} onJogada={handleJogada} />
      )}

      {!vencedor && duelo.jogo === 'jokenpo' && (
        <JokenpoArena duelo={duelo} meuId={meuId} onJogada={handleJogada} />
      )}
    </div>
  );
}