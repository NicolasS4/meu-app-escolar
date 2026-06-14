"use client";

import { motion } from "framer-motion";
import PetOrbitais from "./pet-parts/PetOrbitais";
import PetBracos from "./pet-parts/PetBracos";
import PetRosto from "./pet-parts/PetRosto";
import PetAcessorios from "./pet-parts/PetAcessorios";

interface PetProps {
  streak: number;
  acessorioEquipado?: string | null; 
  expressao?: string;
  pose?: string;
}

export default function PetFoguinho({ streak, acessorioEquipado, expressao = "feliz", pose = "padrao" }: PetProps) {
  const isFrozen = streak === 0;
  const isHot = streak >= 3;

  const expAtual = isFrozen ? "triste" : expressao;
  const poseAtual = isFrozen ? "escondidos" : pose;

  const colors = isFrozen 
    ? { stop1: "#fef08a", stop2: "#ca8a04", glow: "rgba(250, 204, 21, 0.2)" } 
    : isHot 
      ? { stop1: "#f87171", stop2: "#dc2626", glow: "rgba(239, 68, 68, 0.6)" } 
      : { stop1: "#fde047", stop2: "#ea580c", glow: "rgba(249, 115, 22, 0.4)" }; 

  const formaFogoClassico = "M 52 15 Q 60 40, 75 32 C 90 45, 95 65, 90 80 C 85 95, 70 100, 50 100 C 30 100, 15 95, 10 80 C 5 60, 25 30, 52 15 Z";

  return (
    <div className="relative w-56 h-56 flex items-center justify-center">
      {/* Bloco de Gelo */}
      {isFrozen && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 bg-blue-200/20 backdrop-blur-md rounded-3xl border-t-2 border-l-2 border-white/50 shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.2)]" style={{ clipPath: 'polygon(10% 0%, 90% 5%, 100% 90%, 5% 100%)' }}>
            <div className="absolute top-2 right-4 w-8 h-4 bg-white/40 rounded-full blur-[2px] transform rotate-12" />
          </div>
        </div>
      )}

      {/* Acessórios de Fundo (Orbitando) */}
      <PetOrbitais acessorio={acessorioEquipado} isFrozen={isFrozen} />

      {/* Brilho de Fundo */}
      <motion.div animate={{ scale: isFrozen ? 0.9 : [1, 1.05, 1], opacity: isFrozen ? 0.5 : [0.6, 0.9, 0.6] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute w-40 h-40 rounded-full blur-3xl z-0" style={{ backgroundColor: colors.glow }} />

      {/* CORPO DO PET - Flutuação base leve */}
      <motion.div 
        animate={isFrozen ? { y: 5 } : { y: [0, -3, 0] }} 
        transition={{ repeat: Infinity, duration: isHot ? 1.5 : 3, ease: "easeInOut" }} 
        className="relative z-10 w-44 h-44 drop-shadow-2xl"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible">
          
          <defs>
            <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={colors.stop1} />
              <stop offset="100%" stopColor={colors.stop2} />
            </linearGradient>
            
            <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#713f12" />
            </linearGradient>

            <linearGradient id="zenithGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" /><stop offset="50%" stopColor="#a855f7" /><stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="lacoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#be185d" />
            </linearGradient>
          </defs>

          {/* 1. ACESSÓRIOS DE FUNDO (Desenha as Asas e Espadas PRIMEIRO) */}
          <PetAcessorios acessorioEquipado={acessorioEquipado} camada="fundo" />

          {/* 2. CHAMA FIXA (Corpo do Pet fica na frente das asas) */}
          <path d={formaFogoClassico} fill="url(#flameGrad)" />
          
          {/* 3. ROSTO E BRAÇOS */}
          <PetBracos pose={poseAtual} />
          <PetRosto expressao={expAtual} isFrozen={isFrozen} />
          
          {/* 4. ACESSÓRIOS DE FRENTE (Desenha Bonés e Vendas por ÚLTIMO) */}
          <PetAcessorios acessorioEquipado={acessorioEquipado} camada="frente" />

        </svg>
      </motion.div>
    </div>
  );
}