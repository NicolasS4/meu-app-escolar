// components/dashboard/aluno/AlunoHeader.tsx
"use client";

import { Flame, LogOut, Moon, Sun, ShoppingBag, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface AlunoHeaderProps {
  nomeAluno?: string;
  onSair: () => void;
  onAbrirLoja: () => void;
}

export default function AlunoHeader({ nomeAluno, onSair, onAbrirLoja }: AlunoHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [showWelcome, setShowWelcome] = useState(true);

  // Esconde a mensagem de boas-vindas após 5 segundos
  useEffect(() => {
    if (nomeAluno) {
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [nomeAluno]);

  const primeiroNome = nomeAluno?.split(" ")[0] || "Aluno";

  return (
    <header className="sticky top-0 z-50 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        
        {/* Lado Esquerdo - Logo do Fogo + Boas-vindas */}
        <div className="flex items-center gap-3">
          {/* Ícone do Fogo (sempre visível) */}
          <div className="text-indigo-600 dark:text-indigo-400">
            <Flame className="animate-pulse" size={28} />
          </div>

          {/* Texto de boas-vindas ou nome */}
          <AnimatePresence mode="wait">
            {showWelcome && nomeAluno ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Bem-vindo(a) de volta,
                </p>
                <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                  {primeiroNome}!
                </h1>
              </motion.div>
            ) : (
              <motion.div
                key="name"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                  {primeiroNome}
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Lado Direito - Ações */}
        <div className="flex items-center gap-3">
          {/* Botão Loja */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAbrirLoja}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-yellow-900 font-bold rounded-xl transition-all shadow-md shadow-yellow-400/20 hover:shadow-yellow-400/30"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">Loja</span>
          </motion.button>

          {/* Botão Tema */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all shadow-sm"
            title="Alternar tema"
          >
            <Sun size={20} className="dark:hidden" />
            <Moon size={20} className="hidden dark:block" />
          </motion.button>

          {/* Separador */}
          <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>

          {/* Nome completo (desktop) */}
          <span className="font-bold text-gray-700 dark:text-gray-300 hidden md:block text-sm">
            {nomeAluno}
          </span>

          {/* Botão Sair */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onSair}
            className="p-2.5 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 rounded-xl transition-colors"
            title="Sair"
          >
            <LogOut size={18} />
          </motion.button>
        </div>
      </div>
    </header>
  );
}