"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// ==========================================
// 👼 COMPONENTE: SERAFIM (Aura Divina)
// ==========================================
const SerafimBackground = () => {
  const feathers = useMemo(() => 
    Array.from({ length: 30 }).map((_, i) => ({
      id: i, left: Math.random() * 100, duration: Math.random() * 5 + 4, delay: Math.random() * 8,
      size: Math.random() * 8 + 4, opacity: Math.random() * 0.5 + 0.3
    })), []
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Fundo dourado celestial - Sensível a Modo Claro/Escuro via opacidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 via-white/10 dark:via-white/5 to-transparent backdrop-brightness-[1.1] dark:backdrop-brightness-[1.3]" />
      
      <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 will-change-transform">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.6),rgba(253,230,138,0.2),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.3),rgba(253,230,138,0.1),transparent_70%)]" />
      </motion.div>
      
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={`ray-${i}`} animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} className="absolute top-0 w-px h-full bg-gradient-to-b from-white/60 dark:from-white/40 to-transparent" style={{ left: `${(i / 12) * 100}%` }} />
      ))}
      
      {feathers.map((feather) => (
        <motion.div key={`feather-${feather.id}`} initial={{ y: -50, opacity: 0, rotate: 0 }} animate={{ y: '100vh', opacity: [0, feather.opacity, 0], rotate: 360 }} transition={{ duration: feather.duration, repeat: Infinity, delay: feather.delay, ease: "linear" }} className="absolute rounded-full bg-white/80 dark:bg-white/60 shadow-[0_0_10px_rgba(255,255,200,0.8)]" style={{ left: `${feather.left}%`, width: `${feather.size}px`, height: `${feather.size}px`, filter: 'blur(0.5px)' }} />
      ))}
      
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div key={`particle-${i}`} animate={{ x: [0, (Math.random() - 0.5) * 200], y: [0, (Math.random() - 0.5) * 200], opacity: [0, 0.6, 0] }} transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 5 }} className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-yellow-300 dark:bg-yellow-200" style={{ boxShadow: '0 0 6px rgba(253,230,138,0.8)' }} />
      ))}
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.2)_70%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_70%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
};

// ==========================================
// ✨ COMPONENTE: STARDUST (Nebulosa Perolada)
// ==========================================
const StardustBackground = () => {
  const stars = useMemo(() => 
    Array.from({ length: 80 }).map((_, i) => ({
      id: i, left: Math.random() * 100, top: Math.random() * 100, size: Math.random() * 2 + 0.5,
      duration: Math.random() * 3 + 2, delay: Math.random() * 4, color: ['#c084fc', '#818cf8', '#a855f7', '#6366f1'][Math.floor(Math.random() * 4)]
    })), []
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/80 via-indigo-50/70 to-violet-100/80 dark:from-purple-950/80 dark:via-indigo-950/70 dark:to-violet-950/80" />
      
      <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] will-change-transform">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.3),rgba(129,140,248,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.15),rgba(129,140,248,0.08),transparent_60%)]" />
      </motion.div>
      
      {[0, 1, 2].map((i) => (
        <motion.div key={`ring-${i}`} animate={{ rotate: [0, 360] }} transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/40 dark:border-purple-500/20 will-change-transform" style={{ width: `${200 + i * 80}px`, height: `${200 + i * 80}px` }} />
      ))}
      
      {stars.map((star) => (
        <motion.div key={`star-${star.id}`} animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }} className="absolute rounded-full" style={{ left: `${star.left}%`, top: `${star.top}%`, width: `${star.size}px`, height: `${star.size}px`, backgroundColor: star.color, boxShadow: `0 0 ${star.size * 3}px ${star.color}` }} />
      ))}
      
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div key={`dust-${i}`} animate={{ x: [0, (Math.random() - 0.5) * 300], y: [0, (Math.random() - 0.5) * 300], opacity: [0, 0.5, 0] }} transition={{ duration: Math.random() * 6 + 4, repeat: Infinity, delay: Math.random() * 6 }} className="absolute top-1/2 left-1/2 w-0.5 h-0.5 rounded-full bg-purple-200/60 dark:bg-white/40" />
      ))}
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.4)_60%,rgba(255,255,255,0.7)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
};

// ==========================================
// 🕰️ COMPONENTE: RELÍQUIA DO TEMPO (Relógio)
// ==========================================
interface ReliquiaTempoProps {
  clockX?: number;      // Posição X do relógio (0-100, padrão: 50)
  clockY?: number;      // Posição Y do relógio (0-100, padrão: 50)
  clockRadius?: number; // Raio do relógio em pixels (padrão: 300)
  speedMultiplier?: number; // Velocidade dos ponteiros (padrão: 1, >1 mais rápido)
}

const ReliquiaTempoBackground = ({ 
  clockX = 50, 
  clockY = 50, 
  clockRadius = 300,
  speedMultiplier = 1 
}: ReliquiaTempoProps) => {
  const gears = useMemo(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i, 
      left: Math.random() * 100, 
      top: Math.random() * 100, 
      size: Math.random() * 30 + 15,
      duration: Math.random() * 15 + 10, 
      direction: Math.random() > 0.5 ? 1 : -1
    })), []
  );

  // Calcula as posições baseadas nos percentuais
  const clockPosition = {
    left: `${clockX}%`,
    top: `${clockY}%`,
  };

  const radius = clockRadius;
  const center = radius / 2;
  const markerRadius = radius * 0.43; // Distância das marcas horárias
  const hourHandLength = radius * 0.25;
  const minuteHandLength = radius * 0.35;
  const secondHandLength = radius * 0.42;

  // Velocidades ajustadas pelo multiplicador
  const hourSpeed = 43200 / speedMultiplier;
  const minuteSpeed = 3600 / speedMultiplier;
  const secondSpeed = 60 / speedMultiplier;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Fundo gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/80 via-amber-50/70 to-amber-100/80 dark:from-amber-950/80 dark:via-amber-900/70 dark:to-amber-950/80 backdrop-sepia-[0.3] dark:backdrop-sepia-[0.6] backdrop-brightness-105 dark:backdrop-brightness-90" />
      
      {/* Relógio principal */}
      <div 
        className="absolute rounded-full"
        style={{ 
          left: clockPosition.left,
          top: clockPosition.top,
          width: `${radius}px`,
          height: `${radius}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Borda externa */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-600/50 dark:border-amber-700/40 shadow-[0_0_30px_rgba(217,119,6,0.4)] dark:shadow-[0_0_30px_rgba(180,83,9,0.3)]" />
        
        {/* Marcadores das horas */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x = center + markerRadius * Math.cos(angle);
          const y = center + markerRadius * Math.sin(angle);
          return (
            <div 
              key={`hour-${i}`} 
              className="absolute bg-amber-500/50 dark:bg-amber-600/40"
              style={{ 
                width: '3px', 
                height: `${radius * 0.066}px`, 
                left: x, 
                top: y, 
                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                transformOrigin: 'center',
                borderRadius: '2px'
              }} 
            />
          );
        })}

        {/* Marcadores dos minutos (opcional) */}
        {Array.from({ length: 60 }).map((_, i) => {
          if (i % 5 === 0) return null; // Pula as horas já marcadas
          const angle = (i * 6) * Math.PI / 180;
          const x = center + (markerRadius - 5) * Math.cos(angle);
          const y = center + (markerRadius - 5) * Math.sin(angle);
          return (
            <div 
              key={`minute-${i}`} 
              className="absolute bg-amber-400/30 dark:bg-amber-500/20"
              style={{ 
                width: '1px', 
                height: `${radius * 0.033}px`, 
                left: x, 
                top: y, 
                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                transformOrigin: 'center'
              }} 
            />
          );
        })}
        
        {/* Ponteiro das horas */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: hourSpeed, repeat: Infinity, ease: "linear" }} 
          className="absolute rounded-full bg-amber-700/70 dark:bg-amber-600/60 origin-bottom"
          style={{ 
            width: '4px', 
            height: `${hourHandLength}px`,
            left: '50%',
            bottom: '50%',
            transform: 'translateX(-50%)'
          }} 
        />
        
        {/* Ponteiro dos minutos */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: minuteSpeed, repeat: Infinity, ease: "linear" }} 
          className="absolute rounded-full bg-amber-600/60 dark:bg-amber-500/50 origin-bottom"
          style={{ 
            width: '3px', 
            height: `${minuteHandLength}px`,
            left: '50%',
            bottom: '50%',
            transform: 'translateX(-50%)'
          }} 
        />
        
        {/* Ponteiro dos segundos */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: secondSpeed, repeat: Infinity, ease: "linear" }} 
          className="absolute rounded-full bg-amber-500/80 dark:bg-amber-400/70 origin-bottom"
          style={{ 
            width: '1px', 
            height: `${secondHandLength}px`,
            left: '50%',
            bottom: '50%',
            transform: 'translateX(-50%)'
          }} 
        />
        
        {/* Centro */}
        <div className="absolute rounded-full bg-amber-600 dark:bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] dark:shadow-[0_0_10px_rgba(251,191,36,0.8)]"
          style={{
            width: `${radius * 0.04}px`,
            height: `${radius * 0.04}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>
      
      {/* Engrenagens decorativas */}
      {gears.map((gear) => (
        <motion.div 
          key={`gear-${gear.id}`} 
          animate={{ rotate: [0, gear.direction * 360] }} 
          transition={{ duration: gear.duration, repeat: Infinity, ease: "linear" }} 
          className="absolute rounded-full border-2 border-amber-600/40 dark:border-amber-700/30 will-change-transform" 
          style={{ 
            left: `${gear.left}%`, 
            top: `${gear.top}%`, 
            width: `${gear.size}px`, 
            height: `${gear.size}px`, 
            background: 'radial-gradient(circle, transparent 30%, rgba(217,119,6,0.15) 70%)' 
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute top-1/2 left-1/2 w-full h-1 bg-amber-600/40 dark:bg-amber-700/30 rounded-full" 
              style={{ transform: `translate(-50%, -50%) rotate(${i * 45}deg)` }} 
            />
          ))}
        </motion.div>
      ))}
      
      {/* Partículas de tempo */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div 
          key={`time-dust-${i}`} 
          animate={{ y: [0, -100], opacity: [0, 0.5, 0] }} 
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }} 
          className="absolute bottom-0 w-0.5 h-0.5 bg-amber-500/60 dark:bg-amber-400/40 rounded-full" 
          style={{ left: `${Math.random() * 100}%` }} 
        />
      ))}
      
      {/* Overlay de gradiente radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.4)_70%,rgba(255,255,255,0.7)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_70%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
};

// ==========================================
// 💥 COMPONENTE: SUPERNOVA (Explosão Estelar)
// ==========================================
const SupernovaBackground = () => {
  const shockwaves = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({ id: i, duration: Math.random() * 1 + 0.5, delay: Math.random() * 2, scale: Math.random() * 2 + 1 })), []);
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-red-50/40 to-transparent dark:from-white/30 dark:via-orange-500/40 dark:to-orange-800/50" />
      
      <motion.div animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-orange-200/60 dark:bg-white/40 blur-3xl" />
      
      {shockwaves.map((wave) => (
        <motion.div key={`shock-${wave.id}`} animate={{ scale: [1, wave.scale + 1], opacity: [0.6, 0] }} transition={{ duration: wave.duration, repeat: Infinity, delay: wave.delay, ease: "easeOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-500/50 dark:border-orange-400/60" style={{ width: '150px', height: '150px' }} />
      ))}
      
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div key={`ray-${i}`} animate={{ scaleX: [0.5, 1.5, 0.5], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }} className="absolute top-1/2 left-1/2 w-[300px] h-1 bg-gradient-to-r from-orange-400 via-red-300 dark:from-white dark:via-orange-300 to-transparent origin-left" style={{ transform: `translate(-50%, -50%) rotate(${i * 15}deg)` }} />
      ))}
      
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div key={`hot-particle-${i}`} animate={{ x: [0, (Math.random() - 0.5) * 400], y: [0, (Math.random() - 0.5) * 400], opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }} transition={{ duration: Math.random() * 1.5 + 0.8, repeat: Infinity, delay: Math.random() * 2 }} className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-red-400 dark:bg-orange-300" style={{ boxShadow: '0 0 10px rgba(249,115,22,0.8)' }} />
      ))}
      
      <motion.div animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() * 1.5 + 0.5 }} className="absolute inset-0 bg-orange-100 dark:bg-white mix-blend-overlay pointer-events-none" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.4)_60%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
};

// ==========================================
// 📦 EXPORTAÇÃO DO LOTE 6 (Classes + Backgrounds)
// ==========================================
export const moldurasLote6 = [
  {
    nome: "Moldura Serafim",
    classes: "border-4 border-yellow-300/60 dark:border-yellow-200 shadow-[0_0_80px_rgba(251,191,36,0.6),inset_0_0_40px_rgba(245,158,11,0.3)] dark:shadow-[0_0_120px_rgba(253,230,138,0.9),inset_0_0_80px_rgba(251,191,36,0.6)] bg-gradient-to-t from-yellow-100/50 via-white/40 to-transparent dark:from-yellow-500/20 dark:via-white/10 dark:to-transparent backdrop-brightness-[1.1] dark:backdrop-brightness-[1.2]",
    renderBackground: () => <SerafimBackground />
  },
  {
    nome: "Moldura Stardust",
    classes: "border-4 border-purple-300/50 dark:border-transparent shadow-[0_0_60px_rgba(168,85,247,0.5),inset_0_0_30px_rgba(168,85,247,0.2)] dark:shadow-[0_0_80px_rgba(192,132,252,0.6),inset_0_0_50px_rgba(192,132,252,0.3)] bg-[linear-gradient(#f8fafc,#f8fafc),linear-gradient(45deg,#d8b4fe,#a5b4fc,#d8b4fe)] dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(45deg,#c084fc,#818cf8,#c084fc)] bg-origin-border [background-clip:padding-box,_border-box] bg-[length:200%_200%] animate-[rainbowMove_4s_linear_infinite]",
    renderBackground: () => <StardustBackground />
  },
  {
    nome: "Moldura Relíquia do Tempo",
    classes: "border-4 border-amber-600/70 dark:border-amber-700 shadow-[0_0_80px_rgba(217,119,6,0.6),inset_0_0_40px_rgba(180,83,9,0.3)] dark:shadow-[0_0_100px_rgba(180,83,9,0.9),0_0_50px_rgba(217,119,6,0.6),inset_0_0_80px_rgba(180,83,9,0.6),inset_0_0_40px_rgba(217,119,6,0.4),inset_0_0_15px_rgba(251,191,36,0.3)] bg-gradient-to-br from-amber-100/60 to-transparent dark:from-amber-950/60 dark:via-amber-900/30 dark:to-black/40 backdrop-sepia-[0.4] dark:backdrop-sepia-[0.7] backdrop-contrast-110 dark:backdrop-contrast-125 relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_100px_rgba(217,119,6,0.8),inset_0_0_60px_rgba(180,83,9,0.5)] dark:hover:shadow-[0_0_150px_rgba(180,83,9,1),0_0_80px_rgba(217,119,6,0.8),inset_0_0_120px_rgba(180,83,9,0.8)] hover:scale-[1.01] hover:backdrop-contrast-125 dark:hover:backdrop-contrast-150 transition-all duration-500 before:absolute before:inset-[-50%] before:bg-[repeating-conic-gradient(from_0deg,#f59e0b_0deg,#f59e0b_10deg,transparent_10deg,transparent_20deg,rgba(251,191,36,0.1)_20deg,rgba(251,191,36,0.1)_30deg,transparent_30deg,transparent_40deg)] dark:before:bg-[repeating-conic-gradient(from_0deg,#d97706_0deg,#d97706_10deg,transparent_10deg,transparent_20deg,rgba(251,191,36,0.15)_20deg,rgba(251,191,36,0.15)_30deg,transparent_30deg,transparent_40deg)] before:animate-[timeGear_15s_linear_infinite] before:opacity-40 dark:before:opacity-60 after:absolute after:inset-0 after:bg-[url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"%23d97706\" stroke-width=\"0.8\" opacity=\"0.15\" stroke-dasharray=\"4,6\"/><circle cx=\"50\" cy=\"50\" r=\"25\" fill=\"none\" stroke=\"%23f59e0b\" stroke-width=\"0.5\" opacity=\"0.1\" stroke-dasharray=\"2,4\"/><line x1=\"50\" y1=\"10\" x2=\"50\" y2=\"50\" stroke=\"%23b45309\" stroke-width=\"0.8\" opacity=\"0.1\"/><line x1=\"50\" y1=\"50\" x2=\"90\" y2=\"50\" stroke=\"%23f59e0b\" stroke-width=\"0.5\" opacity=\"0.08\"/></svg>')] dark:after:bg-[url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"%23b45309\" stroke-width=\"0.8\" opacity=\"0.2\" stroke-dasharray=\"4,6\"/><circle cx=\"50\" cy=\"50\" r=\"25\" fill=\"none\" stroke=\"%23fbbf24\" stroke-width=\"0.5\" opacity=\"0.15\" stroke-dasharray=\"2,4\"/><line x1=\"50\" y1=\"10\" x2=\"50\" y2=\"50\" stroke=\"%23d97706\" stroke-width=\"0.8\" opacity=\"0.15\"/><line x1=\"50\" y1=\"50\" x2=\"90\" y2=\"50\" stroke=\"%23fbbf24\" stroke-width=\"0.5\" opacity=\"0.1\"/></svg>')] after:bg-repeat after:bg-[length:120px_120px] after:animate-[timeHands_25s_linear_infinite] after:opacity-60 dark:after:opacity-80 after:backdrop-blur-[0.5px]",
    renderBackground: () => <ReliquiaTempoBackground />
  },
  {
    nome: "Moldura Supernova",
    classes: "border-4 border-orange-300/70 dark:border-orange-200 shadow-[0_0_100px_rgba(251,146,60,0.6),inset_0_0_50px_rgba(251,146,60,0.3)] dark:shadow-[0_0_150px_rgba(255,237,213,1),0_0_50px_rgba(251,146,60,0.8),inset_0_0_80px_rgba(253,186,116,0.7)] bg-gradient-to-br from-orange-100/50 to-transparent dark:from-white/30 dark:via-orange-500/20 dark:to-transparent animate-[pulse_1s_infinite]",
    renderBackground: () => <SupernovaBackground />
  }
];