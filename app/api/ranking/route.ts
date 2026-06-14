import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  try {
    // Pega o ID do professor pela URL
    const { searchParams } = new URL(request.url);
    const profId = searchParams.get("professor_id");

    if (!profId) {
      return NextResponse.json({ error: "Faltou professor_id" }, { status: 400 });
    }

    // 1. Busca todos os alunos deste professor (Sem limite de 5 para os 3 rankings funcionarem)
    const { data: alunos, error: errorAlunos } = await supabaseAdmin
      .from("profiles")
      .select("id, nome, pontos, streak_atual")
      .eq("role", "aluno")
      .eq("professor_id", profId);

    if (errorAlunos) throw errorAlunos;

    // Se não tiver alunos, retorna array vazio
    if (!alunos || alunos.length === 0) {
      return NextResponse.json([]);
    }

    // 2. Busca todas as curtidas (corações) que esses alunos receberam
    const alunoIds = alunos.map(a => a.id);
    const { data: likesData, error: errorLikes } = await supabaseAdmin
      .from("pet_likes")
      .select("receiver_id")
      .in("receiver_id", alunoIds);

    // 3. Conta os corações de cada aluno de forma otimizada
    const likesCountMap: Record<string, number> = {};
    if (!errorLikes && likesData) {
      likesData.forEach(like => {
        likesCountMap[like.receiver_id] = (likesCountMap[like.receiver_id] || 0) + 1;
      });
    }

    // 4. Monta o objeto final fundindo os dados (Pontos, Fogo e Corações)
    const rankingCompleto = alunos.map(aluno => ({
      nome: aluno.nome,
      pontos: aluno.pontos || 0,
      streak_atual: aluno.streak_atual || 0,
      likes_count: likesCountMap[aluno.id] || 0
    }));

    return NextResponse.json(rankingCompleto);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}