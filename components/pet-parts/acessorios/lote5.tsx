"use client";

export const acessoriosLote5 = [
  {
    id: "acc_chapeu_bruxo",
    nome: "Chapéu Corrompido",
    preco: 250,
    raridade: "Raro",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO - AJUSTE AQUI!
    offsetX: 15,    // ← valores negativos = mais pra esquerda | positivos = direita
    offsetY: 10,    // ← negativos = mais pra cima | positivos = pra baixo
    rotate: -8,      // ← graus de rotação (negativo = anti-horário)
    render: (offsetX = 15, offsetY = 10, rotate = -8) => (
      <g transform={`translate(${5 + offsetX}, ${-18 + offsetY}) rotate(${rotate}, 25, 20)`}>
        <defs>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d1b69" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f0b2a" />
          </linearGradient>
          <linearGradient id="hatBand" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>
          <radialGradient id="hatGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          <filter id="hatShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.6" />
          </filter>
          <filter id="hatGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes hatFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-3px) rotate(2deg); }
            }
          `}
        </style>

        <ellipse cx="25" cy="35" rx="45" ry="12" fill="url(#hatGlow)" filter="url(#hatGlowFilter)">
          <animate attributeName="rx" values="40;50;40" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.5s" repeatCount="indefinite" />
        </ellipse>

        <g style={{ animation: 'hatFloat 3s ease-in-out infinite' }} filter="url(#hatShadow)">
          <path d="M -14 42 Q 25 52 64 42 Q 50 38 25 38 Q 0 38 -14 42 Z" fill="url(#hatGrad)" stroke="#4c1d95" strokeWidth="2" />
          <path d="M 5 40 L 45 40 L 38 2 Q 25 -18 12 2 Z" fill="url(#hatGrad)" stroke="#4c1d95" strokeWidth="1.5" />
          <path d="M 12 2 Q 5 -12 -2 -8 Q 2 -2 8 2" fill="#2d1b69" stroke="#4c1d95" strokeWidth="1.5" />
          <rect x="3" y="35" width="44" height="5" rx="2" fill="url(#hatBand)" />
          <rect x="20" y="34" width="10" height="7" rx="1" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          <rect x="22" y="36" width="6" height="3" rx="0.5" fill="#fef3c7" />
          
          <g transform="translate(-4, -10)">
            <path d="M 0 -4 L 1 -1 L 4 0 L 1 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z" fill="#fbbf24" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
            </path>
          </g>
          
          <text x="15" y="32" fontSize="6" fill="#c084fc" opacity="0.6" fontFamily="serif">✦
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.5s" repeatCount="indefinite" />
          </text>
          <text x="35" y="32" fontSize="5" fill="#c084fc" opacity="0.6" fontFamily="serif">✧
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.2s" repeatCount="indefinite" />
          </text>
          
          <circle cx="10" cy="28" r="1" fill="#a855f7">
            <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="28;20;28" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="40" cy="30" r="0.8" fill="#c084fc">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
            <animate attributeName="cy" values="30;22;30" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
        </g>
      </g>
    )
  },

  {
    id: "acc_aura_toxica",
    nome: "Aura Tóxica",
    preco: 900,
    raridade: "Lendário",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO
    offsetX: 17,      // ← centralizado
    offsetY: -5,     // ← mais pra cima
    rotate: 0,       // ← sem rotação
    render: (offsetX = 17, offsetY = -5, rotate = 0) => (
      <g transform={`translate(${0 + offsetX}, ${65 + offsetY}) rotate(${rotate}, 35, 0)`}>
        <defs>
          <radialGradient id="toxicCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bef264" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#4ade80" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#22c55e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#166534" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="toxicOuter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#65a30d" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3f6212" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.4" />
          </linearGradient>
          <filter id="toxicGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="bubbleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes bubbleUp {
              0% { transform: translateY(0) scale(0.5); opacity: 0; }
              20% { opacity: 0.7; }
              80% { opacity: 0.5; }
              100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
            }
            @keyframes toxicWave {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(5deg); }
            }
          `}
        </style>

        <ellipse cx="35" cy="5" rx="55" ry="18" fill="url(#toxicOuter)" filter="url(#toxicGlow)">
          <animate attributeName="rx" values="50;60;50" dur="3s" repeatCount="indefinite" />
          <animate attributeName="ry" values="15;21;15" dur="2.5s" repeatCount="indefinite" />
        </ellipse>

        <ellipse cx="35" cy="0" rx="45" ry="14" fill="url(#toxicCore)" filter="url(#toxicGlow)">
          <animate attributeName="rx" values="42;48;42" dur="2s" repeatCount="indefinite" />
        </ellipse>

        <g style={{ animation: 'toxicWave 3s ease-in-out infinite' }}>
          <path d="M -5 0 Q 15 -8 35 0 Q 55 8 75 0" fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.4">
            <animate attributeName="d" values="M -5 0 Q 15 -8 35 0 Q 55 8 75 0;M -5 2 Q 15 -5 35 3 Q 55 10 75 2;M -5 0 Q 15 -8 35 0 Q 55 8 75 0" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite" />
          </path>
          <path d="M -5 4 Q 15 -4 35 4 Q 55 12 75 4" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.3">
            <animate attributeName="d" values="M -5 4 Q 15 -4 35 4 Q 55 12 75 4;M -5 6 Q 15 -1 35 7 Q 55 14 75 6;M -5 4 Q 15 -4 35 4 Q 55 12 75 4" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.8s" repeatCount="indefinite" />
          </path>

          <circle cx="10" cy="-5" r="5" fill="url(#bubbleGrad)" filter="url(#bubbleGlow)" style={{ animation: 'bubbleUp 2.2s infinite' }} />
          <circle cx="35" cy="-2" r="7" fill="url(#bubbleGrad)" filter="url(#bubbleGlow)" style={{ animation: 'bubbleUp 2.8s infinite 0.5s' }} />
          <circle cx="60" cy="-6" r="4" fill="url(#bubbleGrad)" filter="url(#bubbleGlow)" style={{ animation: 'bubbleUp 1.9s infinite 1s' }} />

          <circle cx="20" cy="-3" r="3" fill="#86efac" opacity="0.6" style={{ animation: 'bubbleUp 1.7s infinite 0.3s' }} />
          <circle cx="48" cy="-4" r="3.5" fill="#86efac" opacity="0.6" style={{ animation: 'bubbleUp 2.1s infinite 0.8s' }} />
          <circle cx="70" cy="-2" r="2.5" fill="#a3e635" opacity="0.5" style={{ animation: 'bubbleUp 1.5s infinite 1.2s' }} />

          {[5, 15, 25, 45, 55, 65].map((x, i) => (
            <circle key={`small-${i}`} cx={x} cy="-1" r="1.5" fill="#bef264" opacity="0.4" style={{ animation: `bubbleUp ${1.3 + i * 0.2}s infinite ${i * 0.25}s` }} />
          ))}

          {[...Array(12)].map((_, i) => (
            <circle key={`toxic-${i}`} cx={15 + Math.random() * 60} cy={-10 + Math.random() * 15} r="1" fill="#4ade80" opacity="0">
              <animate attributeName="opacity" values="0;0.5;0" dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${-5 + Math.random() * 10};-25`} dur={`${1.5 + Math.random() * 2}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      </g>
    )
  },
  {
    id: "acc_foice_morte",
    nome: "Foice do Ceifador",
    preco: 1500,
    raridade: "Mítico",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO
    offsetX: 35,    // ← bem mais pra esquerda
    offsetY: 15,     // ← mais pra baixo
    rotate: -34,     // ← inclinada pra esquerda
    render: (offsetX = 35, offsetY = 15, rotate = -34) => (
      <g transform={`translate(${-18 + offsetX}, ${-5 + offsetY}) rotate(${rotate}, 25, 40)`}>
        <defs>
          <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="30%" stopColor="#16213e" />
            <stop offset="60%" stopColor="#0f3460" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </linearGradient>
          <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="30%" stopColor="#cbd5e1" />
            <stop offset="60%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <radialGradient id="soulGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bloodDrip" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </linearGradient>
          <filter id="scytheShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="3" dy="5" stdDeviation="5" floodColor="#000" floodOpacity="0.8" />
          </filter>
          <filter id="bladeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.4 0 0 0 0 0.2 0 0 0 0 0.6 0 0 0 0.8 0" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="soulFilter" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes scytheSwing {
              0%, 100% { transform: rotate(-5deg) translateY(0px); }
              50% { transform: rotate(0deg) translateY(-5px); }
            }
            @keyframes soulOrbit {
              0% { transform: rotate(0deg) translateX(12px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
            }
          `}
        </style>

        <g style={{ animation: 'scytheSwing 3s ease-in-out infinite' }} filter="url(#scytheShadow)">
          <circle cx="25" cy="30" r="35" fill="url(#soulGlow)" filter="url(#soulFilter)">
            <animate attributeName="r" values="30;40;30" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="1.5s" repeatCount="indefinite" />
          </circle>

          <path d="M 5 85 L 25 -15" stroke="url(#handleGrad)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 8 75 Q 3 65 7 55 Q 12 45 8 35 Q 3 25 9 15 Q 14 5 11 -5" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="1.5s" repeatCount="indefinite" />
          </path>
          
          <circle cx="6" cy="88" r="5" fill="#1e1b4b" stroke="#4c1d95" strokeWidth="1.5" />
          <circle cx="6" cy="88" r="2" fill="#8b5cf6" opacity="0.6">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1s" repeatCount="indefinite" />
          </circle>

          <g filter="url(#bladeGlow)">
            <path d="M 22 -8 Q 48 -35 68 -5 Q 55 -12 40 -5 Q 28 -2 22 -8 Z" fill="url(#bladeGrad)" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M 22 -8 Q 48 -35 68 -5" fill="none" stroke="#f1f5f9" strokeWidth="1" opacity="0.8">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
            </path>
            <path d="M 22 -3 Q 45 5 62 -2" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.5" />
          </g>
          
          <rect x="19" y="-10" width="8" height="12" rx="2" fill="#1e1b4b" stroke="#312e81" strokeWidth="1" />
          <circle cx="23" cy="-6" r="2" fill="#ef4444" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="0.8s" repeatCount="indefinite" />
          </circle>

          {[-5, 0, 5, 10, 15].map((y, i) => (
            <circle key={`ice-${i}`} cx={30 + i * 5} cy={-15 + i * 3} r="1.5" fill="#bfdbfe" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${1 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}

          <path d="M 62 -2 Q 64 2 62 6" fill="none" stroke="url(#bloodDrip)" strokeWidth="2" strokeLinecap="round">
            <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
          </path>
          
          <circle cx="62" cy="10" r="1.5" fill="#ef4444" opacity="0">
            <animate attributeName="opacity" values="0;0.7;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
            <animate attributeName="cy" values="6;18" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>

          <g style={{ animation: 'soulOrbit 4s linear infinite' }}>
            <circle cx="12" cy="0" r="3" fill="#a78bfa" opacity="0.6" filter="url(#soulFilter)" />
            <circle cx="12" cy="0" r="1.5" fill="#c4b5fd" opacity="0.9">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
            </circle>
          </g>
          
          <g style={{ animation: 'soulOrbit 4.5s linear infinite reverse' }}>
            <circle cx="-10" cy="0" r="2.5" fill="#818cf8" opacity="0.5" filter="url(#soulFilter)" />
            <circle cx="-10" cy="0" r="1.2" fill="#a5b4fc" opacity="0.8">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </g>

          <text x="10" y="60" fontSize="7" fill="#6366f1" opacity="0.5" fontFamily="monospace">𓋹
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.8s" repeatCount="indefinite" />
          </text>
          <text x="12" y="40" fontSize="6" fill="#8b5cf6" opacity="0.4" fontFamily="monospace">𓆣
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
          </text>
        </g>
      </g>
    )
  }
];