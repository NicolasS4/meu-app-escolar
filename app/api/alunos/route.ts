import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// ROTA PARA CRIAR ALUNO
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, senha, professor_id, turma_id } = body;

    if (!nome || !email || !senha || !professor_id || !turma_id) {
      return NextResponse.json({ error: "Dados incompletos. Selecione uma turma." }, { status: 400 });
    }

    // 1. Cria na Autenticação
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: senha,
      email_confirm: true,
    });

    if (authError) throw authError;

    // 2. Cria o Perfil no Banco
    const { error: profileError } = await supabaseAdmin.from("profiles").insert({
      id: authData.user.id,
      role: "aluno",
      nome: nome,
      professor_id: professor_id,
      turma_id: turma_id,
    });

    if (profileError) throw profileError;

    return NextResponse.json({ success: true, message: "Aluno matriculado com sucesso!" });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// NOVA ROTA PARA APAGAR ALUNO
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });

    // 1. Apaga o perfil da tabela (e por causa do CASCADE, apaga tickets associados)
    await supabaseAdmin.from("profiles").delete().eq("id", id);
    
    // 2. Apaga o usuário do sistema de login do Supabase
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: "Aluno removido com sucesso!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}