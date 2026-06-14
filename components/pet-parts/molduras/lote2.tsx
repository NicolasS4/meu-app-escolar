"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// ==========================================
// 🌌 COMPONENTE: VAZIO INFINITO (GOJO)
// ==========================================
const VazioInfinitoBackground = () => {
  const vazioParticles = useMemo(() => 
    Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      duration: Math.random() * 6 + 3,
      delay: Math.random() * 6,
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 600,
      scale: Math.random() * 1.2 + 0.5,
      color: ['#fff', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7'][Math.floor(Math.random() * 5)]
    })), []
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[inherit]">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950" />
      
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,rgba(99,102,241,0.1)_25%,transparent_70%)]" />
      </motion.div>

      <motion.div 
        animate={{ rotate: -180, scale: [0.8, 1.1, 0.8] }} 
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-full opacity-50 will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_60%,rgba(168,85,247,0.1)_0%,transparent_50%)]" />
      </motion.div>

      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          animate={{ rotate: [i * 45, i * 45 + 360] }}
          transition={{ duration: 30 + i * 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-indigo-500/15 will-change-transform"
          style={{ boxShadow: '0 0 40px rgba(99,102,241,0.15)' }}
        />
      ))}

      {vazioParticles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0.5, 0], scale: [0, p.scale, 0.2, 0], x: [0, p.x], y: [0, p.y] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full will-change-transform"
          style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}, 0 0 25px ${p.color}80` }}
        />
      ))}

      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`, animationDelay: `${Math.random() * 3}s`,
            boxShadow: '0 0 3px rgba(255,255,255,0.8)'
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.9)_100%)]" />
    </div>
  );
};

// ==========================================
// 0️⃣ COMPONENTE: MATRIX DIGITAL RAIN (CTF)
// ==========================================
const MatrixBackground = () => {
  // OTIMIZAÇÃO: Reduzido número de elementos pela metade
  const matrixColumns = useMemo(() => 
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: (i / 25) * 100,
      height: Math.random() * 300 + 100,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 4,
      intensity: Math.random() * 0.4 + 0.2
    })), []
  );

  // OTIMIZAÇÃO: Menos caracteres, apenas binário + katakana
  const fallingChars = useMemo(() => {
    const chars = [];
    // 40 caracteres binários
    for (let i = 0; i < 40; i++) {
      chars.push({
        id: `bin-${i}`,
        left: Math.random() * 95,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 6,
        size: Math.random() * 8 + 8,
        type: 'binary',
        value: () => Math.random() > 0.5 ? '1' : '0'
      });
    }
    // 30 caracteres katakana
    const katakanaList = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン'];
    for (let i = 0; i < 30; i++) {
      chars.push({
        id: `kata-${i}`,
        left: Math.random() * 95,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 8,
        size: Math.random() * 10 + 10,
        type: 'katakana',
        value: () => katakanaList[Math.floor(Math.random() * katakanaList.length)]
      });
    }
    return chars;
  }, []);

  // OTIMIZAÇÃO: Blocos binários reduzidos
  const binaryBlocks = useMemo(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 85,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      size: Math.random() * 4 + 4,
      code: () => {
        let code = '';
        for (let j = 0; j < 6; j++) {
          code += Math.random() > 0.5 ? '1' : '0';
        }
        return code;
      }
    })), []
  );

  // OTIMIZAÇÃO: Comandos com ciclo mais longo
  const commands = useMemo(() => 
    [
      { text: '>_ SYSTEM ONLINE', delay: 0 },
      { text: '>_ ACCESS GRANTED', delay: 4 },
      { text: '>_ CONNECTION SECURE', delay: 8 },
      { text: '>_ root@matrix:~#', delay: 12 },
    ], []
  );

  // OTIMIZAÇÃO: Usar transform em vez de animar propriedades caras
  return (
    <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none bg-black">
      
      {/* Grade estática (sem animação) */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(rgba(34,197,94,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.06) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* COLUNAS DE CÓDIGO (usando will-change e transform) */}
      {matrixColumns.map((col) => (
        <motion.div
          key={`col-${col.id}`}
          initial={{ y: -col.height }}
          animate={{ y: '100vh' }}
          transition={{ 
            duration: col.duration, 
            repeat: Infinity, 
            ease: "linear", 
            delay: col.delay
          }}
          className="absolute w-px will-change-transform"
          style={{ left: `${col.left}%`, height: `${col.height}px` }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                rgba(34,197,94,${col.intensity}) 40%, 
                transparent 100%)`
            }}
          />
        </motion.div>
      ))}

      {/* CARACTERES CAINDO (otimizado - sem animações aninhadas) */}
      {fallingChars.map((char) => (
        <motion.div
          key={char.id}
          initial={{ y: -50 }}
          animate={{ y: '100vh' }}
          transition={{ 
            duration: char.duration, 
            repeat: Infinity, 
            ease: "linear", 
            delay: char.delay
          }}
          className="absolute font-mono font-bold will-change-transform"
          style={{ 
            left: `${char.left}%`, 
            fontSize: `${char.size}px`,
            textShadow: '0 0 5px rgba(34,197,94,0.6)',
            color: char.type === 'binary' ? '#4ade80' : '#22c55e'
          }}
        >
          {char.value()}
        </motion.div>
      ))}

      {/* BLOCOS BINÁRIOS (otimizado) */}
      {binaryBlocks.map((block) => (
        <motion.div
          key={`block-${block.id}`}
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{ 
            duration: block.duration, 
            repeat: Infinity, 
            ease: "linear", 
            delay: block.delay
          }}
          className="absolute font-mono will-change-transform"
          style={{ 
            left: `${block.left}%`, 
            fontSize: `${block.size}px`,
            textShadow: '0 0 3px rgba(34,197,94,0.5)',
            color: '#16a34a',
            background: 'rgba(0,0,0,0.2)',
            padding: '1px 3px',
            borderRadius: '3px',
            whiteSpace: 'nowrap'
          }}
        >
          {block.code()}
        </motion.div>
      ))}

      {/* LINHAS DE COMANDO (otimizado) */}
      {commands.map((cmd, idx) => (
        <motion.div
          key={`cmd-${idx}`}
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ 
            duration: 2, 
            delay: cmd.delay,
            repeat: Infinity,
            repeatDelay: 20,
            repeatType: 'reverse'
          }}
          className="absolute bottom-5 left-3 font-mono text-[11px] sm:text-xs z-[1]"
          style={{
            textShadow: '0 0 8px rgba(34,197,94,0.7)',
            color: '#4ade80',
            background: 'rgba(0,0,0,0.5)',
            padding: '3px 10px',
            borderRadius: '4px',
            borderLeft: `2px solid #22c55e`
          }}
        >
          {cmd.text}
          {cmd.text.includes('#') && (
            <span className="inline-block w-1.5 h-3 bg-green-500 ml-1 animate-pulse" />
          )}
        </motion.div>
      ))}

      {/* OTIMIZAÇÃO: Apenas 2 círculos concêntricos */}
      {[0, 1].map((i) => (
        <motion.div
          key={`circle-${i}`}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/20 will-change-transform"
          style={{ 
            width: `${150 + i * 80}px`, 
            height: `${150 + i * 80}px`
          }}
        />
      ))}

      {/* OTIMIZAÇÃO: Apenas 1 anel giratório */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/15 will-change-transform"
        style={{ 
          width: '350px', 
          height: '350px',
          borderWidth: '1px',
          borderStyle: 'dashed'
        }}
      />

      {/* ONDA DE SCAN (apenas horizontal, mais leve) */}
      <motion.div
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent will-change-transform"
      />

      {/* OVERLAY SIMPLES */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.7)_100%)]" />
      
      {/* Scanlines (mais leve) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)`,
          backgroundSize: '100% 2px'
        }}
      />
    </div>
  );
};

// ==========================================
// ⚡ COMPONENTE: HAKI DO REI
// ==========================================
const HakiBackground = () => {
  const hakiParticles = useMemo(() => 
    Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      duration: Math.random() * 2.5 + 1.5,
      delay: Math.random() * 4,
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 600,
      size: Math.random() * 4 + 2,
      intensity: Math.random() * 0.8 + 0.3
    })), []
  );

  // Raios que vêm da borda
  const borderRays = useMemo(() => 
    Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      angle: (i / 24) * 360,
      duration: Math.random() * 1.5 + 1,
      delay: Math.random() * 3,
      width: Math.random() * 60 + 30,
      intensity: Math.random() * 0.6 + 0.2
    })), []
  );

  // Faíscas negras (black lightning)
  const blackLightning = useMemo(() => 
    Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      startX: (Math.random() - 0.5) * 400,
      startY: (Math.random() - 0.5) * 400,
      angle: Math.random() * 360,
      length: Math.random() * 100 + 50
    })), []
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[inherit]">
      {/* Fundo gradiente - do escuro ao vermelho sangue */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-red-950/20 via-black to-zinc-950" />
      
      {/* Aura pulsante central (Haki sendo liberado) */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1, 1.2, 1], opacity: [0.2, 0.5, 0.2, 0.6, 0.2] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.3)_0%,rgba(139,0,0,0.1)_40%,transparent_70%)]" />
      </motion.div>

      {/* Ondas de choque expansivas (como no anime) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`shockwave-${i}`}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 3], opacity: [0, 0.5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-2 border-red-600/40 will-change-transform"
          style={{ 
            boxShadow: '0 0 30px rgba(220,38,38,0.3), inset 0 0 20px rgba(220,38,38,0.1)',
            borderTopColor: 'rgba(220,38,38,0.6)',
            borderRightColor: 'rgba(139,0,0,0.3)',
            borderBottomColor: 'rgba(220,38,38,0.2)',
            borderLeftColor: 'rgba(139,0,0,0.4)'
          }}
        />
      ))}

      {/* Ondas secundárias mais rápidas */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`shockwave-fast-${i}`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 2.2], opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5 + 0.2, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border border-red-500/30 will-change-transform"
        />
      ))}

      {/* ========== RAIOS VINDO DA BORDA (COMO NO ANIME) ========== */}
      {borderRays.map((ray) => {
        const rad = (ray.angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 55; // Começa na borda
        const y = 50 + Math.sin(rad) * 55;
        
        return (
          <motion.div
            key={`border-ray-${ray.id}`}
            initial={{ scaleX: 0, opacity: 0, x: `${x}%`, y: `${y}%` }}
            animate={{ 
              scaleX: [0, 1.5, 0], 
              opacity: [0, ray.intensity, 0],
              x: `${x}%`,
              y: `${y}%`
            }}
            transition={{ duration: ray.duration, repeat: Infinity, delay: ray.delay, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 origin-center will-change-transform"
            style={{
              width: `${ray.width}px`,
              height: '4px',
              background: `linear-gradient(90deg, 
                transparent, 
                rgba(220,38,38,${ray.intensity}), 
                rgba(255,0,0,${ray.intensity * 0.8}), 
                rgba(139,0,0,${ray.intensity * 0.5}),
                transparent
              )`,
              transform: `rotate(${ray.angle}deg)`,
              filter: 'blur(3px)',
              boxShadow: '0 0 15px rgba(220,38,38,0.5)'
            }}
          />
        );
      })}

      {/* RAIOS NEGROS (Black Lightning - característico do Haki do Rei) */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = Math.random() * 360;
        const length = Math.random() * 200 + 100;
        
        return (
          <motion.div
            key={`black-lightning-${i}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 0.7, 0], scaleX: [0, 1, 0] }}
            transition={{ duration: Math.random() * 1 + 0.5, repeat: Infinity, delay: Math.random() * 4, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center will-change-transform"
            style={{
              width: `${length}px`,
              height: '3px',
              background: `linear-gradient(90deg, 
                transparent, 
                rgba(0,0,0,0.9), 
                rgba(139,0,0,0.8), 
                rgba(220,38,38,0.6),
                transparent
              )`,
              transform: `rotate(${angle}deg)`,
              filter: 'blur(2px)'
            }}
          />
        );
      })}

      {/* FAÍSCAS ELÉTRICAS (traços finos e irregulares) */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          animate={{ 
            opacity: [0, 0.8, 0],
            x: [0, (Math.random() - 0.5) * 300],
            y: [0, (Math.random() - 0.5) * 300]
          }}
          transition={{ duration: Math.random() * 0.8 + 0.3, repeat: Infinity, delay: Math.random() * 5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full will-change-transform"
          style={{ boxShadow: '0 0 8px rgba(220,38,38,0.8)', filter: 'blur(0.5px)' }}
        />
      ))}

      {/* PARTÍCULAS DE HAKI (flutuando ao redor) */}
      {hakiParticles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, p.intensity, 0], 
            scale: [0, p.size, 0], 
            x: [0, p.x], 
            y: [0, p.y] 
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 bg-red-600 rounded-full will-change-transform"
          style={{ 
            width: `${p.size}px`, 
            height: `${p.size}px`,
            boxShadow: `0 0 ${p.size * 3}px rgba(220,38,38,0.6)`,
            filter: 'blur(0.5px)'
          }}
        />
      ))}

      {/* EFEITO DE DISTORÇÃO DO AMBIENTE (ondas de calor) */}
      <motion.div
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() * 2 + 1 }}
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(45deg, rgba(220,38,38,0.05) 0px, rgba(220,38,38,0.05) 2px, transparent 2px, transparent 8px)'
        }}
      />

      {/* CORTES/RAIOS NO CHÃO (efeito de impacto) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`ground-crack-${i}`}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatDelay: Math.random() * 3 + 2, delay: i * 0.3 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 will-change-transform"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: '1.5px',
            background: `linear-gradient(90deg, transparent, rgba(220,38,38,0.7), rgba(139,0,0,0.5), transparent)`,
            transform: `translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 30 - 15}deg)`,
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* RAIO QUE DIVIDE O CÉU (efeito característico) */}
      <motion.div
        animate={{ scaleX: [0, 1, 0], opacity: [0, 0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 origin-top will-change-transform"
        style={{
          width: '2px',
          height: '40vh',
          background: 'linear-gradient(to bottom, rgba(220,38,38,0.8), rgba(139,0,0,0.4), transparent)',
          filter: 'blur(3px)',
          boxShadow: '0 0 20px rgba(220,38,38,0.6)'
        }}
      />

      {/* FLICKER VERMELHO (intensidade do Haki) */}
      <motion.div 
        animate={{ opacity: [0, 0.15, 0] }} 
        transition={{ duration: 0.08, repeat: Infinity, repeatDelay: Math.random() * 2 + 1.5 }}
        className="absolute inset-0 bg-red-600 mix-blend-overlay pointer-events-none"
      />

      {/* VIGNETE + GRADIENTE FINAL */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.85)_80%,#000_100%)]" />
      
      {/* Efeito de pressão no ambiente */}
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </div>
  );
};

// ==========================================
// ⚡ COMPONENTE: REINO DO FOGO
// ==========================================
const ReinoFogoNegroBackground = () => {
  const chamasNegras = useMemo(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
      x: (Math.random() - 0.5) * 700,
      y: Math.random() * 400 + 100,
      size: Math.random() * 120 + 60,
      intensity: Math.random() * 0.7 + 0.3
    })), []
  );

  const faiscas = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 600,
      size: Math.random() * 3 + 1
    })), []
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[inherit]">
      {/* Fundo negro profundo com tons de cinza */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-slate-900" />
      
      {/* Brasas flutuantes do Amaterasu */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.4)_40%,transparent_70%)]" />
      </motion.div>

      {/* Chamas Negras principais */}
      {chamasNegras.map((chama) => (
        <motion.div
          key={`chama-${chama.id}`}
          initial={{ opacity: 0, scale: 0, y: chama.y + 200 }}
          animate={{ 
            opacity: [0, chama.intensity, 0], 
            scale: [0.3, 1, 0.5], 
            y: [chama.y + 200, chama.y - 100, chama.y - 300],
            x: chama.x
          }}
          transition={{ duration: chama.duration, repeat: Infinity, delay: chama.delay, ease: "easeOut" }}
          className="absolute left-1/2 will-change-transform"
          style={{
            width: `${chama.size}px`,
            height: `${chama.size * 1.5}px`,
            background: `radial-gradient(ellipse at center, 
              rgba(0,0,0,0.9) 0%, 
              rgba(30,30,30,0.7) 30%, 
              rgba(50,50,50,0.4) 60%, 
              transparent 100%)`,
            filter: 'blur(8px)',
            borderRadius: '50%',
            boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(20,20,20,0.3)'
          }}
        />
      ))}

      {/* Ondas de calor distorcidas */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`heatwave-${i}`}
          initial={{ scaleY: 0.1, opacity: 0 }}
          animate={{ scaleY: [0.1, 2, 0.1], opacity: [0, 0.15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-px will-change-transform"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(50,50,50,0.5), transparent)',
            filter: 'blur(2px)'
          }}
        />
      ))}

      {/* Faíscas negras/vermelhas escuras */}
      {faiscas.map((faisca) => (
        <motion.div
          key={`faisca-${faisca.id}`}
          animate={{ 
            opacity: [0, 0.9, 0],
            x: [0, faisca.x],
            y: [0, faisca.y]
          }}
          transition={{ duration: faisca.duration, repeat: Infinity, delay: faisca.delay, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 rounded-full will-change-transform"
          style={{
            width: `${faisca.size}px`,
            height: `${faisca.size}px`,
            backgroundColor: ['#000', '#1a1a1a', '#2d0000', '#3a0000'][Math.floor(Math.random() * 4)],
            boxShadow: '0 0 6px rgba(0,0,0,0.8), 0 0 12px rgba(40,0,0,0.5)'
          }}
        />
      ))}

      {/* Anéis de fogo negro */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`anel-${i}`}
          animate={{ scale: [0.5, 2.5, 0.5], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 will-change-transform"
          style={{
            width: '300px',
            height: '300px',
            borderColor: 'rgba(0,0,0,0.6)',
            boxShadow: '0 0 30px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.2)',
            borderTopColor: 'rgba(40,0,0,0.5)',
            borderBottomColor: 'rgba(0,0,0,0.8)'
          }}
        />
      ))}

      {/* Chamas que sobem das bordas */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`edge-flame-${i}`}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 4, ease: "easeOut" }}
          className="absolute bottom-0 will-change-transform"
          style={{
            left: `${Math.random() * 100}%`,
            width: '3px',
            height: '200px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(30,0,0,0.3), transparent)',
            filter: 'blur(2px)',
            transformOrigin: 'bottom'
          }}
        />
      ))}

      {/* Sombras que dançam */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-20 will-change-transform"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          style={{
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(0,0,0,0.3) 40deg,
              transparent 80deg,
              rgba(20,0,0,0.2) 120deg,
              transparent 160deg,
              rgba(0,0,0,0.3) 200deg,
              transparent 240deg,
              rgba(20,0,0,0.2) 280deg,
              transparent 320deg,
              rgba(0,0,0,0.3) 360deg
            )`
          }}
        />
      </motion.div>

      {/* Embers caindo como chuva */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`ember-${i}`}
          initial={{ y: -50, opacity: 1 }}
          animate={{ y: '100vh', opacity: [1, 0.5, 0] }}
          transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
          className="absolute w-0.5 h-0.5 rounded-full will-change-transform"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#000', '#1a1a1a', '#330000'][Math.floor(Math.random() * 3)],
            boxShadow: '0 0 4px rgba(0,0,0,0.6)'
          }}
        />
      ))}

      {/* Neblina escura */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163, 163, 163, 0.8)_0%,rgba(155, 155, 155, 0.6)_40%,rgba(154, 152, 152, 0.9)_80%,black_100%)]" />
    </div>
  );
};

// ==========================================
// ⚔️ COMPONENTE: SANTUÁRIO MALEVOLENTE (SUKUNA)
// ==========================================
const SantuarioMalevolenteBackground = () => {
  const cortesInvisiveis = useMemo(() => 
    Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      angle: Math.random() * 360,
      length: Math.random() * 400 + 200,
      width: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2
    })), []
  );

  const energiaAmaldicoada = useMemo(() => 
    Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 600,
      size: Math.random() * 3 + 1
    })), []
  );

  const simbolos = ['斬', '呪', '死', '怨', '滅', '獄', '殺', '骸'];
  const olhosFlutuantes = useMemo(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      symbol: simbolos[i % simbolos.length],
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 6,
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 500,
      size: Math.random() * 16 + 10
    })), []
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[inherit]">
      {/* Fundo vermelho sangue e preto */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/30 to-black" />
      
      {/* Energia amaldiçoada pulsante */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }} 
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.25)_0%,rgba(139,0,0,0.15)_35%,transparent_65%)]" />
      </motion.div>

      {/* Cortes invisíveis no ar */}
      {cortesInvisiveis.map((corte) => (
        <motion.div
          key={`corte-${corte.id}`}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: [0, corte.opacity, 0], 
            scaleX: [0, 1, 0]
          }}
          transition={{ duration: corte.duration, repeat: Infinity, delay: corte.delay, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center will-change-transform"
          style={{
            width: `${corte.length}px`,
            height: `${corte.width}px`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(220,38,38,0.6) 20%, 
              rgba(255,255,255,0.3) 40%, 
              rgba(220,38,38,0.7) 50%,
              rgba(255,255,255,0.2) 60%,
              rgba(220,38,38,0.4) 80%,
              transparent 100%
            )`,
            transform: `rotate(${corte.angle}deg)`,
            filter: 'blur(1px)',
            boxShadow: '0 0 20px rgba(220,38,38,0.4)'
          }}
        />
      ))}

      {/* Esferas de energia malévola */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`esfera-${i}`}
          animate={{ 
            scale: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.5, 0.2],
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200]
          }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
          style={{
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(220,38,38,0.3), rgba(139,0,0,0.2), transparent)',
            boxShadow: '0 0 40px rgba(220,38,38,0.3), inset 0 0 20px rgba(220,38,38,0.2)',
            filter: 'blur(3px)'
          }}
        />
      ))}

      {/* Olhos/símbolos flutuantes */}
      {olhosFlutuantes.map((simbolo) => (
        <motion.div
          key={`simbolo-${simbolo.id}`}
          animate={{ 
            opacity: [0, 0.4, 0],
            x: [0, simbolo.x],
            y: [0, simbolo.y],
            rotate: [0, Math.random() * 360]
          }}
          transition={{ duration: simbolo.duration, repeat: Infinity, delay: simbolo.delay, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 will-change-transform font-bold"
          style={{
            fontSize: `${simbolo.size}px`,
            color: '#dc2626',
            textShadow: '0 0 10px rgba(220,38,38,0.6), 0 0 20px rgba(139,0,0,0.4)'
          }}
        >
          {simbolo.symbol}
        </motion.div>
      ))}

      {/* Energia vermelha subindo */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`energy-up-${i}`}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-100vh', opacity: [0, 0.4, 0] }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 8, ease: "linear" }}
          className="absolute w-px will-change-transform"
          style={{
            left: `${Math.random() * 100}%`,
            height: '150px',
            background: 'linear-gradient(to top, transparent, rgba(220,38,38,0.5), transparent)',
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Ondas de choque vermelhas */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`shockwave-${i}`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 3], opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border will-change-transform"
          style={{
            borderColor: 'rgba(220,38,38,0.4)',
            boxShadow: '0 0 30px rgba(220,38,38,0.2)',
            borderWidth: '1.5px'
          }}
        />
      ))}

      {/* Partículas de energia amaldiçoada */}
      {energiaAmaldicoada.map((particula) => (
        <motion.div
          key={`particula-${particula.id}`}
          animate={{ 
            opacity: [0, 0.7, 0],
            x: [0, particula.x],
            y: [0, particula.y],
            scale: [0, 1, 0]
          }}
          transition={{ duration: particula.duration, repeat: Infinity, delay: particula.delay, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 rounded-full will-change-transform"
          style={{
            width: `${particula.size}px`,
            height: `${particula.size}px`,
            backgroundColor: '#dc2626',
            boxShadow: '0 0 8px rgba(220,38,38,0.8), 0 0 15px rgba(139,0,0,0.5)',
            filter: 'blur(0.5px)'
          }}
        />
      ))}

      {/* Garras/arcos vermelhos */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`garra-${i}`}
          animate={{ 
            opacity: [0, 0.5, 0],
            scaleX: [0, 1, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            width: '150px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.7), transparent)',
            transform: `rotate(${i * 36}deg)`,
            filter: 'blur(2px)'
          }}
        />
      ))}

      {/* Flicker vermelho intenso */}
      <motion.div 
        animate={{ opacity: [0, 0.1, 0] }} 
        transition={{ duration: 0.05, repeat: Infinity, repeatDelay: Math.random() * 1.5 + 0.5 }}
        className="absolute inset-0 bg-red-700 mix-blend-screen pointer-events-none"
      />

      {/* Gradiente final e vignete */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-red-950/20 to-transparent opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.9)_80%,black_100%)]" />
    </div>
  );
};

// ==========================================
// 🌸 COMPONENTE: JARDIM ZEN (PACÍFICO)
// ==========================================
const JardimZenBackground = () => {
  const petalas = useMemo(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      x: (Math.random() - 0.5) * 700,
      y: Math.random() * 500 + 100,
      size: Math.random() * 12 + 6,
      rotation: Math.random() * 360,
      color: ['#fbbf24', '#f59e0b', '#d97706', '#b45309'][Math.floor(Math.random() * 4)]
    })), []
  );

  const ondulacoesAgua = useMemo(() => 
    Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      duration: Math.random() * 4 + 3,
      delay: i * 0.8,
      scale: Math.random() * 0.5 + 0.5
    })), []
  );

  const reflexos = useMemo(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      x: Math.random() * 100,
      y: Math.random() * 60 + 40,
      size: Math.random() * 30 + 10,
      intensity: Math.random() * 0.4 + 0.2
    })), []
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[inherit]">
      {/* Fundo gradiente suave - tons de verde e dourado */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-900 to-green-950" />
      
      {/* Luz suave central */}
      <motion.div 
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.15)_0%,rgba(245,158,11,0.1)_30%,transparent_70%)]" />
      </motion.div>

      {/* Ondulações na água (como um lago zen) */}
      {ondulacoesAgua.map((onda) => (
        <motion.div
          key={`onda-${onda.id}`}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ 
            scale: [0.3, 2.5, 0.3], 
            opacity: [0, 0.3, 0]
          }}
          transition={{ duration: onda.duration, repeat: Infinity, delay: onda.delay, ease: "easeInOut" }}
          className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border will-change-transform"
          style={{
            width: '400px',
            height: '80px',
            borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: '1px',
            boxShadow: '0 0 30px rgba(255,255,255,0.08)'
          }}
        />
      ))}

      {/* Pétalas de lótus caindo */}
      {petalas.map((petala) => (
        <motion.div
          key={`petala-${petala.id}`}
          initial={{ 
            y: -50, 
            x: petala.x + (Math.random() - 0.5) * 200, 
            opacity: 0,
            rotate: petala.rotation
          }}
          animate={{ 
            y: '100vh', 
            x: petala.x + Math.sin(Date.now() * 0.001) * 50, 
            opacity: [0, 0.7, 0.4, 0],
            rotate: petala.rotation + 360
          }}
          transition={{ duration: petala.duration, repeat: Infinity, delay: petala.delay, ease: "linear" }}
          className="absolute will-change-transform"
          style={{
            width: `${petala.size}px`,
            height: `${petala.size}px`,
            backgroundColor: petala.color,
            borderRadius: '50% 0 50% 0',
            filter: 'blur(1px)',
            boxShadow: `0 0 ${petala.size}px rgba(251,191,36,0.2)`
          }}
        />
      ))}

      {/* Reflexos brilhantes na água */}
      {reflexos.map((reflexo) => (
        <motion.div
          key={`reflexo-${reflexo.id}`}
          animate={{ 
            opacity: [0, reflexo.intensity, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: reflexo.duration, repeat: Infinity, delay: reflexo.delay, ease: "easeInOut" }}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${reflexo.x}%`,
            top: `${reflexo.y}%`,
            width: `${reflexo.size}px`,
            height: `${reflexo.size * 0.3}px`,
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.4), transparent)',
            filter: 'blur(3px)'
          }}
        />
      ))}

      {/* Luzes douradas suaves */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`luz-${i}`}
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '2px',
            height: '2px',
            backgroundColor: '#fbbf24',
            boxShadow: '0 0 10px rgba(251,191,36,0.6), 0 0 20px rgba(245,158,11,0.3)'
          }}
        />
      ))}

      {/* Névoa suave flutuando */}
      <motion.div
        animate={{ x: [0, 50, 0, -50, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 inset-x-0 h-1/3 will-change-transform"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,0.08), transparent)',
          filter: 'blur(20px)'
        }}
      />

      {/* Grades de areia zen (padrão) */}
      <motion.div
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 inset-x-0 h-1/3 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(251,191,36,0.3) 10px,
            rgba(251,191,36,0.3) 11px
          )`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Círculos concêntricos (como ondas na água) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`circulo-${i}`}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
          className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border will-change-transform"
          style={{
            width: `${200 + i * 60}px`,
            height: `${200 + i * 60}px`,
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: '1px'
          }}
        />
      ))}

      {/* Lótus central (símbolo) */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform opacity-20"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`lotus-${i}`}
            className="absolute w-16 h-32 origin-bottom"
            style={{
              background: 'linear-gradient(to top, rgba(251,191,36,0.4), rgba(245,158,11,0.2), transparent)',
              borderRadius: '50%',
              transform: `rotate(${i * 45}deg) translateY(-40px)`,
              filter: 'blur(2px)'
            }}
          />
        ))}
      </motion.div>

      {/* Partículas de luz dourada subindo */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`particula-luz-${i}`}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.6, 0] }}
          transition={{ duration: Math.random() * 8 + 7, repeat: Infinity, delay: Math.random() * 12, ease: "linear" }}
          className="absolute w-1 h-1 rounded-full will-change-transform"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: '#fbbf24',
            boxShadow: '0 0 8px rgba(251,191,36,0.5), 0 0 15px rgba(245,158,11,0.2)',
            filter: 'blur(0.5px)'
          }}
        />
      ))}

      {/* Vignete suave e gradiente final */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0.9)_100%)]" />
    </div>
  );
};







export const moldurasLote2 = [
  {
    nome: "Reino de Fogo Negro",
    raridade: "SECRETO",
    renderBackground: () => <ReinoFogoNegroBackground />
  },
  {
    nome: "Santuário Malevolente",
    raridade: "SECRETO",
    renderBackground: () => <SantuarioMalevolenteBackground />
  },
  {
    nome: "Jardim Zen",
    raridade: "SECRETO",
    renderBackground: () => <JardimZenBackground />
  },
  
  {
    nome: "Moldura Expansão de Domínio",
    renderBackground: () => <VazioInfinitoBackground />
  },
  {
    nome: "Moldura Matrix (CTF)",
    renderBackground: () => <MatrixBackground />
  },
  {
    nome: "Moldura Haki do Rei",
    renderBackground: () => <HakiBackground />
  }
];