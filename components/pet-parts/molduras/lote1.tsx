"use client";

// IMPORTAÇÕES DOS OUTROS LOTES
import { moldurasLote3 } from './lote3';
import { moldurasLote4 } from './lote4';
import { moldurasLote5 } from './lote5';
import { moldurasLote6 } from './lote6';
import { moldurasLote7 } from './lote7';

// ==========================================
// MOLDURAS LOTE 1 (ARRAY DE OBJETOS MESTRE)
// ==========================================
export const moldurasLote1 = [
  {
    nome: "Sem Moldura",
    classes: "border-2 border-slate-100 dark:border-[#222] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
  },
  
  // COMUNS & INCOMUNS
  {
    nome: "Moldura Prata",
    classes: "border-4 border-slate-300 shadow-[0_0_15px_rgba(203,213,225,0.3),inset_0_0_10px_rgba(203,213,225,0.2)] bg-gradient-to-br from-slate-50/50 to-transparent"
  },
  {
    nome: "Moldura de Ouro",
    classes: "border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.4),inset_0_0_15px_rgba(250,204,21,0.2)] bg-gradient-to-br from-yellow-500/5 to-transparent"
  },

  // RARAS
  {
    nome: "Moldura Diamante",
    classes: "border-4 border-cyan-300 shadow-[0_0_40px_rgba(103,232,249,0.5),inset_0_0_20px_rgba(103,232,249,0.3)] backdrop-brightness-110"
  },
  {
    nome: "Moldura Rubi",
    classes: "border-4 border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.6),0_0_80px_rgba(159,18,57,0.3)] saturate-150"
  },
  {
    nome: "Moldura Esmeralda",
    classes: "border-4 border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.5),inset_0_0_20px_rgba(52,211,153,0.2)] contrast-125"
  },
  {
    nome: "Moldura Safira",
    classes: "border-4 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.6),inset_0_0_30px_rgba(29,78,216,0.3)] saturate-150"
  },
  {
    nome: "Moldura Ametista",
    classes: "border-4 border-fuchsia-500 shadow-[0_0_45px_rgba(217,70,239,0.5),0_0_15px_rgba(192,38,211,0.8)] hue-rotate-15"
  },
  {
    nome: "Moldura Ônix",
    classes: "border-4 border-zinc-900 shadow-[0_0_50px_rgba(24,24,27,0.9),inset_0_0_40px_rgba(0,0,0,0.8)] backdrop-contrast-150"
  },

  // ÉPICAS (Animadas)
  {
    nome: "Moldura Infernal",
    classes: "border-4 border-red-600 shadow-[0_0_80px_rgba(220,38,38,1),0_0_40px_rgba(185,28,28,0.8),inset_0_0_60px_rgba(153,27,27,0.7)] animate-[infernalPulse_1.5s_ease-in-out_infinite] bg-gradient-to-t from-red-950/50 via-red-900/20 to-transparent relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.3),transparent_70%)] before:animate-[infernalGlow_2s_ease-in-out_infinite]"
  },
{
    nome: "Moldura Arco-Íris",
    classes: "border-4 border-transparent shadow-[0_0_30px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_80px_rgba(255,255,255,0.6),inset_0_0_50px_rgba(255,255,255,0.3)] bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(90deg,#ff0000,#ff4000,#ff8000,#ffbf00,#ffff00,#bfff00,#80ff00,#40ff00,#00ff40,#00ff80,#00ffbf,#00ffff,#00bfff,#0080ff,#0040ff,#0000ff,#4000ff,#8000ff,#bf00ff,#ff00ff,#ff00bf,#ff0080,#ff0040,#ff0000)] dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(90deg,#ff0000,#ff4000,#ff8000,#ffbf00,#ffff00,#bfff00,#80ff00,#40ff00,#00ff40,#00ff80,#00ffbf,#00ffff,#00bfff,#0080ff,#0040ff,#0000ff,#4000ff,#8000ff,#bf00ff,#ff00ff,#ff00bf,#ff0080,#ff0040,#ff0000)] bg-origin-border [background-clip:padding-box,_border-box] bg-[size:100%_100%,_400%_100%] animate-[rainbowMove_3s_linear_infinite]"
  },
  {
    nome: "Moldura Flamejante",
    classes: "border-4 border-orange-500 shadow-[0_0_70px_rgba(249,115,22,1),0_0_35px_rgba(234,88,12,0.8),inset_0_0_50px_rgba(194,65,12,0.7)] saturate-[1.5] contrast-125 animate-[flameFlicker_0.8s_ease-in-out_infinite] bg-gradient-to-t from-orange-950/40 via-orange-900/20 to-transparent relative overflow-hidden before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[30%] before:bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.4),transparent_70%)] before:animate-[flameRise_1.5s_ease-in-out_infinite]"
  },
  {
    nome: "Moldura Gelada",
    classes: "border-4 border-sky-300 shadow-[0_0_70px_rgba(125,211,252,0.8),0_0_35px_rgba(56,189,248,0.6),inset_0_0_50px_rgba(125,211,252,0.4)] backdrop-brightness-[1.2] backdrop-blur-sm bg-gradient-to-b from-sky-950/40 via-cyan-900/20 to-transparent animate-[iceBreath_3s_ease-in-out_infinite]"
  },
  {
    nome: "Moldura Elétrica",
    classes: "border-4 border-yellow-300 shadow-[0_0_80px_rgba(253,224,71,1),0_0_40px_rgba(234,179,8,0.8),inset_0_0_50px_rgba(253,224,71,0.5)] animate-[electricSurge_0.6s_ease-in-out_infinite] contrast-[1.5] saturate-[1.8] bg-gradient-to-br from-yellow-950/30 via-amber-900/20 to-transparent relative overflow-hidden before:absolute before:inset-0 before:bg-[repeating-linear-gradient(90deg,transparent,transparent_15px,rgba(253,224,71,0.3)_15px,rgba(253,224,71,0.1)_20px,transparent_25px)] before:animate-[lightningFlash_0.3s_linear_infinite]"
  },
  {
    nome: "Moldura Sombria",
    classes: "border-4 border-indigo-950 shadow-[0_0_80px_rgba(17,24,39,1),0_0_40px_rgba(88,28,135,0.8),inset_0_0_80px_rgba(0,0,0,1),inset_0_0_40px_rgba(46,16,101,0.6)] backdrop-saturate-0 backdrop-brightness-50 bg-gradient-to-br from-black/60 via-indigo-950/30 to-purple-950/20 animate-[darkVoid_4s_ease-in-out_infinite] relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_60%)] before:animate-[voidPulse_3s_ease-in-out_infinite]"
  },

  // LENDÁRIAS
  {
    nome: "Moldura Celestial",
    classes: "border-4 border-amber-200/80 shadow-[0_0_100px_rgba(253,230,138,0.8),0_0_50px_rgba(251,191,36,0.5),inset_0_0_60px_rgba(253,230,138,0.4),inset_0_0_30px_rgba(251,191,36,0.2)] bg-gradient-to-br from-amber-500/20 via-amber-400/10 to-white/10 backdrop-sepia-[0.3] backdrop-brightness-110 animate-[celestialPulse_3s_ease-in-out_infinite]"
  },
  {
    nome: "Moldura Abissal",
    classes: "border-4 border-fuchsia-900/90 shadow-[0_0_120px_rgba(112,26,117,1),0_0_60px_rgba(74,4,78,0.9),inset_0_0_80px_rgba(112,26,117,0.6),inset_0_0_40px_rgba(74,4,78,0.5)] bg-gradient-to-t from-fuchsia-950/40 via-purple-950/20 to-transparent saturate-[1.8] contrast-125 animate-[abyssalPulse_3s_ease-in-out_infinite]"
  },
  {
    nome: "Moldura Solar",
    classes: "border-4 border-orange-400 shadow-[0_0_120px_rgba(251,146,60,1),0_0_60px_rgba(234,88,12,0.8),inset_0_0_70px_rgba(251,146,60,0.5),inset_0_0_35px_rgba(234,88,12,0.4)] bg-gradient-to-br from-orange-500/30 via-amber-500/15 to-transparent animate-[solarFlare_2s_ease-in-out_infinite]"
  },
  {
    nome: "Moldura Lunar",
    classes: "border-4 border-slate-200/80 shadow-[0_0_100px_rgba(226,232,240,0.8),0_0_50px_rgba(148,163,184,0.5),inset_0_0_60px_rgba(226,232,240,0.4),inset_0_0_30px_rgba(148,163,184,0.3)] bg-gradient-to-tr from-slate-400/20 via-slate-300/10 to-transparent backdrop-brightness-[1.15] backdrop-blur-[1px] animate-[lunarBreath_4s_ease-in-out_infinite]"
  }
];

const todasAsMoldurasSimples = [
  ...moldurasLote1,
  ...moldurasLote3,
  ...moldurasLote4,
  ...moldurasLote5,
  ...moldurasLote6,
  ...moldurasLote7
];

// ==========================================
// 1. RETORNA APENAS AS CLASSES DA BORDA (STRING)
// ==========================================
export const obterEstiloDaMoldura = (nomeEquipado?: string | null) => {
  if (!nomeEquipado) return todasAsMoldurasSimples[0].classes;

  // Modificado: Bordas sólidas e com cores hiper-vivas para não sumirem no Dark Mode!
  if (nomeEquipado === "Moldura Expansão de Domínio") return "border-4 border-purple-500 shadow-[0_0_60px_rgba(168,85,247,0.7),0_0_120px_rgba(147,51,234,0.4),inset_0_0_20px_rgba(147,51,234,0.4)] relative";
  if (nomeEquipado === "Moldura Haki do Rei") return "border-4 border-red-600 shadow-[0_0_80px_rgba(220,38,38,0.9),0_0_150px_rgba(220,38,38,0.5),inset_0_0_30px_rgba(153,27,27,0.8)] relative animate-pulse";
  if (nomeEquipado === "Moldura Matrix (CTF)") return "border-4 border-green-400 shadow-[0_0_50px_rgba(34,197,94,0.6),0_0_100px_rgba(34,197,94,0.3),inset_0_0_20px_rgba(22,163,74,0.4)] relative";
  if (nomeEquipado === "Reino de Fogo Negro") return "border-4 border-purple-900 dark:border-purple-700 shadow-[0_0_80px_rgba(126,34,206,0.7),0_0_120px_rgba(88,28,135,0.5),inset_0_0_40px_rgba(88,28,135,0.8)] relative";
  if (nomeEquipado === "Santuário Malevolente") return "border-4 border-red-600 shadow-[0_0_80px_rgba(220,38,38,0.8),0_0_120px_rgba(153,27,27,0.6),inset_0_0_40px_rgba(153,27,27,0.8)] relative animate-pulse";
  if (nomeEquipado === "Jardim Zen") return "border-4 border-emerald-400 dark:border-teal-400 shadow-[0_0_50px_rgba(52,211,153,0.6),0_0_80px_rgba(20,184,166,0.4),inset_0_0_30px_rgba(20,184,166,0.3)] relative";

  const molduraEncontrada = todasAsMoldurasSimples.find(m => m.nome === nomeEquipado);
  return molduraEncontrada ? molduraEncontrada.classes : todasAsMoldurasSimples[0].classes;
};

// ==========================================
// 2. COMPONENTE REACT: RENDERIZA AS PARTÍCULAS EM VOLTA DO CARD
// ==========================================
export const EfeitosEspeciaisCard = ({ nomeEquipado }: { nomeEquipado?: string | null }) => {
  if (!nomeEquipado) return null;

  if (nomeEquipado === "Moldura Expansão de Domínio") return (
    <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-10">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={`gojo-ray-${i}`} className="absolute bg-gradient-to-r from-purple-500/60 via-indigo-400/30 to-transparent" style={{ width: '80px', height: '2px', top: `${(i / 12) * 100}%`, right: '-2px', transform: `rotate(${i * 30}deg)`, filter: 'blur(2px)', animation: `pulse ${1.5 + i * 0.2}s infinite`, boxShadow: '0 0 15px rgba(168,85,247,0.6)' }} />
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`gojo-particle-${i}`} className="absolute w-1.5 h-1.5 rounded-full bg-purple-400" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `float ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`, boxShadow: '0 0 10px rgba(168,85,247,0.8), 0 0 20px rgba(147,51,234,0.5)' }} />
      ))}
    </div>
  );

  if (nomeEquipado === "Moldura Haki do Rei") return (
    <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-10">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={`haki-lightning-${i}`} className="absolute bg-gradient-to-r from-red-700 via-red-500 to-transparent" style={{ width: `${60 + Math.random() * 40}px`, height: '3px', top: `${(i / 16) * 100}%`, left: '-2px', transform: `rotate(${i * 22.5}deg)`, filter: 'blur(1.5px)', animation: `lightning ${0.8 + Math.random() * 0.5}s infinite ${Math.random() * 2}s`, boxShadow: '0 0 20px rgba(220,38,38,0.8), 0 0 40px rgba(139,0,0,0.6)' }} />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={`haki-spark-${i}`} className="absolute w-2 h-2 rounded-full bg-black" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `spark ${1 + Math.random() * 1.5}s infinite ${Math.random() * 1}s`, boxShadow: '0 0 15px rgba(0,0,0,0.9), 0 0 30px rgba(220,38,38,0.7), 0 0 50px rgba(139,0,0,0.5)' }} />
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={`haki-shockwave-${i}`} className="absolute inset-0 border-2 border-red-600/50 rounded-[inherit]" style={{ animation: `shockwave ${2 + i * 0.5}s infinite ${i * 0.3}s`, boxShadow: '0 0 30px rgba(220,38,38,0.5), inset 0 0 30px rgba(220,38,38,0.3)' }} />
      ))}
    </div>
  );

  if (nomeEquipado === "Moldura Matrix (CTF)") return (
    <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-10">
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={`matrix-code-${i}`} className="absolute font-mono text-xs font-bold text-green-400" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `matrixRain ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`, textShadow: '0 0 8px rgba(34,197,94,0.8), 0 0 15px rgba(34,197,94,0.5)', opacity: 0.7, fontSize: `${8 + Math.random() * 6}px` }}>{Math.random() > 0.5 ? '1' : '0'}</div>
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={`matrix-glitch-${i}`} className="absolute h-px bg-green-400/60" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${30 + Math.random() * 50}px`, animation: `glitch ${0.5 + Math.random() * 0.5}s infinite ${Math.random() * 1}s`, boxShadow: '0 0 10px rgba(34,197,94,0.6)' }} />
      ))}
      <div className="absolute inset-0 pointer-events-none rounded-[inherit]" style={{ background: 'repeating-linear-gradient(0deg, rgba(34,197,94,0.08) 0px, rgba(34,197,94,0.08) 1px, transparent 1px, transparent 3px)', animation: 'scanline 0.1s linear infinite' }} />
    </div>
  );

  if (nomeEquipado === "Reino de Fogo Negro") return (
    <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`amaterasu-flame-${i}`} className="absolute" style={{ left: `${(i / 20) * 100}%`, bottom: '-20px', width: '30px', height: '60px', background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(147,51,234,0.8), transparent)', filter: 'blur(3px)', animation: `blackFlame ${1.5 + Math.random() * 1}s infinite ${Math.random() * 1}s`, borderRadius: '50% 50% 0 0', transform: `scaleX(${0.8 + Math.random() * 1})`, boxShadow: '0 0 15px rgba(147,51,234,0.5)' }} />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={`amaterasu-ash-${i}`} className="absolute w-1.5 h-1.5 bg-purple-400/80 rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `floatAsh ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`, boxShadow: '0 0 8px rgba(168,85,247,0.8)' }} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={`amaterasu-heat-${i}`} className="absolute inset-0 border border-purple-900/30 rounded-[inherit]" style={{ animation: `heatWave ${3 + i * 0.5}s infinite ${i * 0.4}s`, boxShadow: '0 0 30px rgba(147,51,234,0.2), inset 0 0 30px rgba(88,28,135,0.3)' }} />
      ))}
    </div>
  );

  if (nomeEquipado === "Santuário Malevolente") return (
    <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-10">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={`sukuna-cut-${i}`} className="absolute bg-gradient-to-r from-red-500/90 via-red-400/50 to-transparent" style={{ width: `${50 + Math.random() * 70}px`, height: '2px', top: `${(i / 18) * 100}%`, right: '-2px', transform: `rotate(${i * 20}deg)`, filter: 'blur(1px)', animation: `cut ${0.6 + Math.random() * 0.4}s infinite ${Math.random() * 1}s`, boxShadow: '0 0 25px rgba(239,68,68,0.9), 0 0 50px rgba(185,28,28,0.6)' }} />
      ))}
      {['斬', '呪', '死', '怨', '滅', '殺'].map((symbol, i) => (
        <div key={`sukuna-symbol-${i}`} className="absolute text-red-500 font-bold" style={{ left: `${(i / 6) * 100}%`, top: `${Math.random() * 100}%`, fontSize: `${14 + Math.random() * 10}px`, animation: `floatSymbol ${2 + Math.random() * 2}s infinite ${Math.random() * 1}s`, textShadow: '0 0 15px rgba(220,38,38,0.9), 0 0 30px rgba(139,0,0,0.7), 0 0 50px rgba(220,38,38,0.5)', opacity: 0.6 }}>{symbol}</div>
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={`sukuna-pulse-${i}`} className="absolute inset-0 border-2 border-red-600/40 rounded-[inherit]" style={{ animation: `energyPulse ${1.5 + i * 0.3}s infinite ${i * 0.2}s`, boxShadow: '0 0 40px rgba(239,68,68,0.5), inset 0 0 40px rgba(220,38,38,0.4)' }} />
      ))}
    </div>
  );

  if (nomeEquipado === "Jardim Zen") return (
    <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={`zen-petal-${i}`} className="absolute rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${6 + Math.random() * 8}px`, height: `${6 + Math.random() * 8}px`, backgroundColor: ['#34d399', '#10b981', '#059669', '#047857'][Math.floor(Math.random() * 4)], animation: `petalFloat ${5 + Math.random() * 5}s infinite ${Math.random() * 3}s`, boxShadow: '0 0 10px rgba(52,211,153,0.4), 0 0 20px rgba(16,185,129,0.2)', borderRadius: '50% 0 50% 0', opacity: 0.7 }} />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={`zen-light-${i}`} className="absolute w-1 h-1 bg-teal-300 rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `softGlow ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`, boxShadow: '0 0 15px rgba(45,212,191,0.5), 0 0 30px rgba(20,184,166,0.3)' }} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={`zen-water-${i}`} className="absolute inset-0 border border-teal-400/20 rounded-[inherit]" style={{ animation: `waterRipple ${4 + i * 1}s infinite ${i * 0.8}s`, boxShadow: '0 0 30px rgba(45,212,191,0.2), inset 0 0 30px rgba(45,212,191,0.15)' }} />
      ))}
      <div className="absolute inset-0 rounded-[inherit] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(45,212,191,0.1) 0%, transparent 70%)', animation: 'zenGlow 3s infinite ease-in-out' }} />
    </div>
  );

  return null;
};