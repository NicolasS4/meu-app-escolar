"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, GraduationCap, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Tenta fazer o login no Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      toast.error("Erro ao entrar: Verifique seu e-mail e senha.");
      setIsLoading(false);
      return;
    }

    // 2. Busca no banco de dados quem é essa pessoa (Professor ou Aluno?)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (profileError || !profile) {
      toast.error("Erro ao buscar o perfil. Contate o administrador.");
      setIsLoading(false);
      return;
    }

    toast.success("Login realizado com sucesso!");
    
    // 3. O Roteamento Inteligente (A Mágica acontece aqui!)
    if (profile.role === "aluno") {
      router.push("/dashboard/aluno"); // Manda pro painel do Aluno
    } else {
      router.push("/dashboard/professor"); // Manda pro painel do Prof
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-4 relative overflow-hidden">
      
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200 dark:shadow-black/30 p-8 space-y-6 border border-gray-200 dark:border-gray-800 relative z-10"
      >
        
        {/* Cabeçalho */}
        <div className="flex flex-col items-center space-y-3">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl text-white shadow-lg shadow-indigo-600/20"
          >
            <GraduationCap size={36} />
          </motion.div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-2">
              Bem-vindo de volta!
              <Sparkles size={20} className="text-yellow-500" />
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Faça login para acessar sua conta.
            </p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Campo E-mail */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium"
              placeholder="seu@email.com"
            />
          </div>

          {/* Campo Senha */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all pr-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 font-medium"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Botão de Login */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={22} />
                Entrando...
              </>
            ) : (
              "Entrar no App"
            )}
          </motion.button>
        </form>

        {/* Rodapé decorativo */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-4">
          Sistema de Gamificação Educacional
        </p>
      </motion.div>
    </div>
  );
}