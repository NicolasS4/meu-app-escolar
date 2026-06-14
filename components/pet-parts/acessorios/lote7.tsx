"use client";

export const acessoriosLote7 = [
  {
    id: "acc_bandana_ninja",
    nome: "Bandana da Aldeia",
    preco: 300,
    raridade: "Raro",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO
    offsetX: -12,     // ← levemente esquerda
    offsetY: 10,      // ← altura padrão
    rotate: -5,      // ← levemente inclinada
    render: (offsetX = -12, offsetY = 10, rotate = -5) => (
      <g transform={`translate(${35 + offsetX}, ${35 + offsetY}) rotate(${rotate}, 25, 10)`}>
        <defs>
          <linearGradient id="clothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="metalPlate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="30%" stopColor="#f8fafc" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="metalBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <filter id="clothShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
          </filter>
          <filter id="metalShine" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes clothWave {
              0%, 100% { transform: translateY(0px) scaleX(1); }
              50% { transform: translateY(-2px) scaleX(1.02); }
            }
            @keyframes metalPulse {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
            @keyframes symbolGlow {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          `}
        </style>

        <g style={{ animation: 'clothWave 2.5s ease-in-out infinite' }} filter="url(#clothShadow)">
          {/* Faixa de tecido principal */}
          <path d="M -5 12 Q 25 18 55 12 L 53 -2 Q 25 8 -3 -2 Z" fill="url(#clothGrad)" stroke="#0f172a" strokeWidth="1" />
          
          {/* Dobras do tecido */}
          <path d="M 5 10 Q 8 4 5 0" fill="none" stroke="#0f172a" strokeWidth="0.8" opacity="0.4" />
          <path d="M 20 12 Q 23 6 20 0" fill="none" stroke="#0f172a" strokeWidth="0.8" opacity="0.4" />
          <path d="M 35 12 Q 38 6 35 0" fill="none" stroke="#0f172a" strokeWidth="0.8" opacity="0.4" />
          <path d="M 45 10 Q 48 4 45 0" fill="none" stroke="#0f172a" strokeWidth="0.8" opacity="0.4" />
          
          {/* Pontas da bandana */}
          <path d="M -3 -2 L -10 -6 Q -8 2 -5 4" fill="url(#clothGrad)" stroke="#0f172a" strokeWidth="0.8" />
          <path d="M 53 -2 L 60 -6 Q 58 2 55 4" fill="url(#clothGrad)" stroke="#0f172a" strokeWidth="0.8" />

          {/* Placa de metal */}
          <rect x="12" y="0" width="26" height="12" rx="3" fill="url(#metalPlate)" stroke="url(#metalBorder)" strokeWidth="1.5" />
          
          {/* Brilho da placa */}
          <rect x="14" y="1" width="22" height="4" rx="2" fill="#ffffff" opacity="0.15" />
          <rect x="14" y="7" width="22" height="3" rx="1" fill="#000000" opacity="0.05" />

          {/* Símbolo da folha estilizada */}
          <g>
            {/* Aura do símbolo */}
            <path d="M 22 7 Q 25 2 28 7 Q 25 12 22 7" fill="#38bdf8" opacity="0.3" filter="url(#metalShine)">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" />
            </path>
            {/* Símbolo principal */}
            <path d="M 22 7 Q 25 2 28 7 Q 25 12 22 7" fill="none" stroke="#0f172a" strokeWidth="1.2" />
            {/* Veias da folha */}
            <line x1="25" y1="3" x2="25" y2="11" stroke="#0f172a" strokeWidth="0.6" opacity="0.6" />
            <line x1="23" y1="5" x2="24" y2="6" stroke="#0f172a" strokeWidth="0.5" opacity="0.4" />
            <line x1="27" y1="5" x2="26" y2="6" stroke="#0f172a" strokeWidth="0.5" opacity="0.4" />
          </g>

          {/* Parafusos decorativos */}
          {[
            { x: 15, y: 3, size: 1 },
            { x: 35, y: 3, size: 1 },
            { x: 15, y: 9, size: 1 },
            { x: 35, y: 9, size: 1 },
          ].map((screw, i) => (
            <g key={`screw-${i}`}>
              <circle cx={screw.x} cy={screw.y} r={screw.size} fill="#334155" />
              <circle cx={screw.x - 0.2} cy={screw.y - 0.2} r={0.3} fill="#64748b" />
              <line x1={screw.x - 0.6} y1={screw.y} x2={screw.x + 0.6} y2={screw.y} stroke="#1e293b" strokeWidth="0.3" />
            </g>
          ))}

          {/* Brilho na borda da placa */}
          <path d="M 13 1 L 37 1" stroke="#ffffff" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1s" repeatCount="indefinite" />
          </path>

          {/* Energia Chi saindo */}
          {[...Array(6)].map((_, i) => (
            <circle
              key={`chi-${i}`}
              cx={15 + Math.random() * 20}
              cy={-3 + Math.random() * 5}
              r="0.8"
              fill="#60a5fa"
              opacity="0"
            >
              <animate attributeName="opacity" values="0;0.6;0" dur={`${1 + Math.random() * 1.5}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${-2 + Math.random() * 5};-15`} dur={`${1 + Math.random() * 1.5}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      </g>
    )
  },
  {
    id: "acc_brinco_potara",
    nome: "Brinco de Fusão",
    preco: 600,
    raridade: "Épico",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO
    offsetX: 7,     // ← levemente esquerda
    offsetY: 10,      // ← levemente baixo
    rotate: 10,      // ← inclinado
    render: (offsetX = 7, offsetY = 10, rotate = 10) => (
      <g transform={`translate(${6 + offsetX}, ${45 + offsetY}) rotate(${rotate}, 0, 14)`}>
        <defs>
          <radialGradient id="potaraCore" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#4ade80" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#166534" />
          </radialGradient>
          <radialGradient id="potaraGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#166534" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="chainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="potaraFilter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="potaraIntense" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes swingEarring {
              0%, 100% { transform: rotate(-5deg) translateY(0px); }
              50% { transform: rotate(5deg) translateY(2px); }
            }
            @keyframes pulsePotara {
              0%, 100% { transform: scale(1); opacity: 0.6; }
              50% { transform: scale(1.15); opacity: 1; }
            }
            @keyframes sparklePotara {
              0%, 100% { opacity: 0; transform: scale(0); }
              50% { opacity: 1; transform: scale(1); }
            }
          `}
        </style>

        <g style={{ animation: 'swingEarring 2s ease-in-out infinite', transformOrigin: '0 0' }}>
          {/* Corrente/Conexão */}
          <line x1="0" y1="0" x2="0" y2="12" stroke="url(#chainGrad)" strokeWidth="2" strokeLinecap="round" />
          
          {/* Elos da corrente */}
          {[3, 6, 9].map((y, i) => (
            <ellipse key={`link-${i}`} cx="0" cy={y} rx="2" ry="3" fill="none" stroke="#f59e0b" strokeWidth="0.8" />
          ))}
          
          {/* Pequena conta no meio */}
          <circle cx="0" cy="6" r="1.5" fill="#fcd34d" />

          {/* Aura do brinco */}
          <circle cx="0" cy="14" r="8" fill="url(#potaraGlow)" filter="url(#potaraIntense)">
            <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite" />
          </circle>

          {/* Brinco principal */}
          <g style={{ animation: 'pulsePotara 1.5s ease-in-out infinite', transformOrigin: '0 14px' }}>
            <circle cx="0" cy="14" r="5" fill="url(#potaraCore)" filter="url(#potaraFilter)" />
            <circle cx="0" cy="14" r="4.5" fill="url(#potaraCore)" stroke="#22c55e" strokeWidth="1" />
            
            {/* Detalhe dourado */}
            <circle cx="0" cy="14" r="3" fill="none" stroke="#fcd34d" strokeWidth="0.8" />
            
            {/* Símbolo no centro */}
            <path d="M -1.5 13 L 1.5 13 M 0 11.5 L 0 16.5" stroke="#fef08a" strokeWidth="0.8" strokeLinecap="round" />
            
            {/* Brilho */}
            <circle cx="-1.5" cy="12" r="0.8" fill="#ffffff" opacity="0.8" />
          </g>

          {/* Partículas brilhantes */}
          {[...Array(6)].map((_, i) => (
            <circle
              key={`spark-${i}`}
              cx={-3 + Math.random() * 6}
              cy={10 + Math.random() * 8}
              r="0.6"
              fill="#bef264"
              style={{ animation: `sparklePotara ${0.5 + Math.random() * 0.5}s ease-in-out infinite ${Math.random() * 2}s`, transformOrigin: `${-3 + Math.random() * 6}px ${10 + Math.random() * 8}px` }}
            />
          ))}

          {/* Energia saindo do brinco */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 + Date.now() * 0.03) % 360;
            const rad = angle * Math.PI / 180;
            const x = Math.cos(rad) * 7;
            const y = Math.sin(rad) * 7 + 14;
            return (
              <circle
                key={`energy-${i}`}
                cx={x}
                cy={y}
                r="0.8"
                fill="#86efac"
                opacity="0.6"
              >
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1s" repeatCount="indefinite" />
                <animate attributeName="r" values="0.5;1.2;0.5" dur="1s" repeatCount="indefinite" />
              </circle>
            );
          })}
        </g>
      </g>
    )
  },
  {
    id: "acc_cabelo_super",
    nome: "Cabelo Dourado Espetado",
    preco: 1200,
    raridade: "Lendário",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO
    offsetX: 10,      // ← centralizado
    offsetY: 40,     // ← mais pra cima
    rotate: 0,       // ← sem rotação
    render: (offsetX = 10, offsetY = 40, rotate = 0) => (
      <g transform={`translate(${5 + offsetX}, ${-20 + offsetY}) rotate(${rotate}, 35, 35)`}>
        <defs>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#fde047" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="hairHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>
          <radialGradient id="ssjAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#fde047" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#eab308" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
          </radialGradient>
          <filter id="hairGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="hairIntense" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes ssjAura {
              0%, 100% { opacity: 0.7; transform: scaleY(1) scaleX(1); }
              50% { opacity: 1; transform: scaleY(1.08) scaleX(1.03); }
            }
            @keyframes hairWave {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes lightningBolt {
              0%, 100% { opacity: 0; }
              50% { opacity: 0.8; }
            }
            @keyframes emberFloat {
              0% { transform: translateY(0) scale(1); opacity: 0.8; }
              100% { transform: translateY(-40px) scale(0); opacity: 0; }
            }
          `}
        </style>

        {/* Aura Super Saiyajin massiva */}
        <ellipse cx="35" cy="20" rx="45" ry="40" fill="url(#ssjAuraGrad)" filter="url(#hairIntense)">
          <animate attributeName="rx" values="40;50;40" dur="2s" repeatCount="indefinite" />
          <animate attributeName="ry" values="35;45;35" dur="2s" repeatCount="indefinite" />
        </ellipse>

        <g style={{ animation: 'ssjAura 1.2s ease-in-out infinite', transformOrigin: '35px 35px' }}>
          
          {/* Cabelo principal - camada base */}
          <g style={{ animation: 'hairWave 1.5s ease-in-out infinite', transformOrigin: '35px 35px' }}>
            <path 
              d="M 30 35 L 5 -10 L 12 15 L 15 -20 L 22 10 L 28 -30 L 35 8 L 42 -30 L 48 10 L 55 -20 L 58 15 L 65 -10 L 40 35 Z" 
              fill="url(#hairGrad)" 
              stroke="#ca8a04" 
              strokeWidth="1.5" 
              filter="url(#hairGlow)"
            />
            
            {/* Camada de destaque */}
            <path 
              d="M 30 35 L 8 -5 L 14 18 L 18 -15 L 25 12 L 32 -20 L 38 10 L 45 -20 L 50 12 L 55 -15 L 60 18 L 62 -5 L 40 35 Z" 
              fill="url(#hairHighlight)" 
              opacity="0.6"
            />
            
            {/* Espinhos de cabelo adicionais */}
            <path d="M 25 25 L 20 -5 L 23 15" fill="url(#hairGrad)" stroke="#ca8a04" strokeWidth="0.8" />
            <path d="M 45 25 L 50 -5 L 47 15" fill="url(#hairGrad)" stroke="#ca8a04" strokeWidth="0.8" />
            
            {/* Franja */}
            <path d="M 25 30 Q 35 20 45 30 L 42 25 Q 35 18 28 25 Z" fill="url(#hairGrad)" stroke="#ca8a04" strokeWidth="1" />
            
            {/* Linhas de tensão no cabelo */}
            {[
              { x1: 20, y1: 15, x2: 12, y2: 0 },
              { x1: 28, y1: 10, x2: 25, y2: -10 },
              { x1: 35, y1: 8, x2: 35, y2: -15 },
              { x1: 42, y1: 10, x2: 45, y2: -10 },
              { x1: 50, y1: 15, x2: 58, y2: 0 },
            ].map((line, i) => (
              <line key={`line-${i}`} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#fef08a" strokeWidth="0.8" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${1 + i * 0.2}s`} repeatCount="indefinite" />
              </line>
            ))}
          </g>

          {/* Raios de energia ao redor */}
          {[...Array(10)].map((_, i) => {
            const angle = (i * 36 + Date.now() * 0.05) % 360;
            const rad = angle * Math.PI / 180;
            const x1 = 35 + Math.cos(rad) * 30;
            const y1 = 20 + Math.sin(rad) * 35;
            const x2 = 35 + Math.cos(rad) * 50;
            const y2 = 20 + Math.sin(rad) * 55;
            return (
              <line
                key={`ray-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#fde047"
                strokeWidth="1.5"
                opacity="0.4"
              >
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${0.5 + i * 0.1}s`} repeatCount="indefinite" />
              </line>
            );
          })}

          {/* Relâmpagos/faíscas */}
          <g style={{ animation: 'lightningBolt 0.5s ease-in-out infinite' }}>
            <path d="M 15 15 L 20 20 L 18 25 L 25 30" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 55 15 L 50 20 L 52 25 L 45 30" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
          </g>

          {/* Partículas de energia dourada */}
          {[...Array(20)].map((_, i) => (
            <circle
              key={`ember-${i}`}
              cx={20 + Math.random() * 30}
              cy={-10 + Math.random() * 20}
              r="1.5"
              fill="#fef08a"
              opacity="0"
            >
              <animate attributeName="cy" values={`${-5 + Math.random() * 20};-50`} dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.8;0" dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="0.5;2;0" dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Brilho central */}
          <circle cx="35" cy="35" r="4" fill="#ffffff" opacity="0.3" filter="url(#hairGlow)">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
    )
  },
  {
    id: "acc_mascara_hollow",
    nome: "Máscara Obscura",
    preco: 2000,
    raridade: "Mítico",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO
    offsetX: 13,      // ← centralizado
    offsetY: -2,     // ← levemente cima
    rotate: 0,       // ← sem rotação
    render: (offsetX = 13, offsetY = -2, rotate = 0) => (
      <g transform={`translate(${10 + offsetX}, ${20 + offsetY}) rotate(${rotate}, 25, 18)`}>
        <defs>
          <linearGradient id="maskBone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="30%" stopColor="#f1f5f9" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="maskShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#334155" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="voidEyes" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
            <stop offset="60%" stopColor="#1a0a0a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#450a0a" stopOpacity="0.6" />
          </radialGradient>
          <radialGradient id="redTears" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bloodDripMask" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.2" />
          </linearGradient>
          <filter id="maskDropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.7" />
          </filter>
          <filter id="eyeVoid" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="maskGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes maskFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes eyeFlickerHollow {
              0%, 100% { opacity: 0.9; }
              50% { opacity: 1; }
              25%, 75% { opacity: 0.5; }
            }
            @keyframes bloodFlow {
              0% { stroke-dashoffset: 20; opacity: 0.8; }
              100% { stroke-dashoffset: 0; opacity: 0.3; }
            }
            @keyframes tearDrop {
              0% { transform: translateY(0); opacity: 0.8; }
              100% { transform: translateY(20px); opacity: 0; }
            }
            @keyframes darkMist {
              0% { opacity: 0; transform: scale(0.8); }
              50% { opacity: 0.5; transform: scale(1); }
              100% { opacity: 0; transform: scale(1.2); }
            }
          `}
        </style>

        <g style={{ animation: 'maskFloat 2.5s ease-in-out infinite' }} filter="url(#maskDropShadow)">
          
          {/* Aura sombria ao redor */}
          <ellipse cx="25" cy="20" rx="35" ry="30" fill="#450a0a" opacity="0.15" filter="url(#eyeVoid)">
            <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
            <animate attributeName="rx" values="30;40;30" dur="3s" repeatCount="indefinite" />
          </ellipse>

          {/* Névoa escura */}
          {[...Array(6)].map((_, i) => (
            <circle
              key={`mist-${i}`}
              cx={15 + Math.random() * 20}
              cy={10 + Math.random() * 25}
              r="15"
              fill="#1a0a0a"
              opacity="0"
              filter="url(#eyeVoid)"
            >
              <animate attributeName="r" values="10;25" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.15;0" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Base da máscara óssea */}
          <path 
            d="M 8 2 C -8 0, -10 25, 12 32 C 20 35, 30 35, 38 32 C 60 25, 58 0, 42 2 C 35 -3, 15 -3, 8 2 Z" 
            fill="url(#maskBone)" 
            stroke="url(#maskShadow)" 
            strokeWidth="2" 
          />
          
          {/* Textura óssea */}
          <path d="M 15 5 Q 20 3 25 5" fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.4" />
          <path d="M 35 5 Q 40 3 45 5" fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.4" />
          
          {/* Curvatura das bochechas */}
          <path d="M 12 25 Q 18 30 25 28" fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.3" />
          <path d="M 48 25 Q 42 30 35 28" fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.3" />

          {/* Olhos vazios e sombrios */}
          <path d="M 10 14 Q 18 6 23 15 Q 15 22 10 14 Z" fill="url(#voidEyes)" filter="url(#eyeVoid)" />
          <path d="M 40 14 Q 32 6 27 15 Q 35 22 40 14 Z" fill="url(#voidEyes)" filter="url(#eyeVoid)" />
          
          {/* Brilho demoníaco nos olhos */}
          <path d="M 14 13 Q 17 10 19 14 Q 16 17 14 13 Z" fill="#ef4444" opacity="0.4" filter="url(#maskGlowFilter)">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="0.8s" repeatCount="indefinite" />
          </path>
          <path d="M 36 13 Q 33 10 31 14 Q 34 17 36 13 Z" fill="#ef4444" opacity="0.4" filter="url(#maskGlowFilter)">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="0.8s" repeatCount="indefinite" begin="0.4s" />
          </path>

          {/* Pupilas vazias */}
          <circle cx="16" cy="14" r="2" fill="#000000" />
          <circle cx="34" cy="14" r="2" fill="#000000" />

          {/* Listras vermelhas de sangue */}
          <path d="M 12 2 L 8 12" stroke="url(#bloodDripMask)" strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" values="20;0" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M 38 2 L 42 12" stroke="url(#bloodDripMask)" strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="stroke-dashoffset" values="20;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </path>
          
          {/* Rachaduras na máscara */}
          <path d="M 25 28 L 23 32 L 25 35" stroke="#64748b" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M 25 28 L 27 32 L 25 35" stroke="#64748b" strokeWidth="0.8" fill="none" opacity="0.5" />
          
          {/* Lágrimas de sangue escorrendo */}
          <path d="M 18 22 Q 17 28 18 32" stroke="#dc2626" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
          </path>
          <path d="M 32 22 Q 33 28 32 32" stroke="#dc2626" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
          </path>

          {/* Gotas caindo */}
          <circle cx="18" cy="34" r="1.5" fill="#dc2626" opacity="0">
            <animate attributeName="cy" values="32;45" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="32" cy="34" r="1.5" fill="#dc2626" opacity="0">
            <animate attributeName="cy" values="32;45" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
            <animate attributeName="opacity" values="0;0.6;0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
          </circle>

          {/* Dentes inferiores */}
          <path d="M 18 30 L 18 34" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 22 31 L 22 35" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 26 31.5 L 26 35.5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 30 31 L 30 35" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 34 30 L 34 34" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />

          {/* Marca de Hollow (estilizada) */}
          <path d="M 22 18 L 28 18 M 25 15 L 25 21" stroke="#dc2626" strokeWidth="1" opacity="0.5" />

          {/* Partículas escuras */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={`dark-${i}`}
              cx={10 + Math.random() * 30}
              cy={5 + Math.random() * 30}
              r="1"
              fill="#1a0a0a"
              opacity="0"
            >
              <animate attributeName="opacity" values="0;0.5;0" dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${10 + Math.random() * 20};-5`} dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Brilho maligno no topo */}
          <ellipse cx="25" cy="0" rx="15" ry="3" fill="#ef4444" opacity="0.2" filter="url(#maskGlowFilter)">
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="1.5s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </g>
    )
  }
];