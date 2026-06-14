"use client";

export const acessoriosLote6 = [
  {
    id: "acc_oculos_steampunk",
    nome: "Óculos Temporais",
    preco: 300,
    raridade: "Raro",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO
    offsetX: 15,     // ← mais pra esquerda
    offsetY: 10,      // ← altura padrão
    rotate: 3,       // ← levemente inclinado
    render: (offsetX = 15, offsetY = 10, rotate = 3) => (
      <g transform={`translate(${10 + offsetX}, ${30 + offsetY}) rotate(${rotate}, 25, 10)`}>
        <defs>
          <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="30%" stopColor="#92400e" />
            <stop offset="60%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <filter id="lensFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="frameShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes floatGlasses {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-2px); }
            }
            @keyframes lensPulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
            @keyframes gearTick {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(15deg); }
              75% { transform: rotate(-15deg); }
            }
          `}
        </style>

        <g style={{ animation: 'floatGlasses 2.5s ease-in-out infinite' }} filter="url(#frameShadow)">
          {/* Haste esquerda */}
          <path d="M -15 8 L 5 12" stroke="url(#frameGrad)" strokeWidth="4" strokeLinecap="round" />
          {/* Haste direita */}
          <path d="M 45 12 L 65 8" stroke="url(#frameGrad)" strokeWidth="4" strokeLinecap="round" />
          
          {/* Ponte entre as lentes */}
          <path d="M 20 10 Q 25 6 30 10" fill="none" stroke="url(#bridgeGrad)" strokeWidth="3" strokeLinecap="round" />
          
          {/* Detalhes da ponte (engrenagem pequena) */}
          <circle cx="25" cy="8" r="3" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2">
            <animate attributeName="strokeDashoffset" values="0;8" dur="1s" repeatCount="indefinite" />
          </circle>

          {/* Lente Esquerda */}
          <g>
            <circle cx="12" cy="10" r="11" fill="url(#lensGrad)" stroke="url(#frameGrad)" strokeWidth="4" />
            <circle cx="12" cy="10" r="9" fill="url(#lensGlow)" filter="url(#lensFilter)">
              <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Brilho da lente */}
            <ellipse cx="8" cy="6" rx="3" ry="2" fill="#ffffff" opacity="0.3" transform="rotate(-30, 8, 6)" />
            {/* Pupila digital */}
            <circle cx="12" cy="10" r="2.5" fill="#38bdf8" opacity="0.8">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="11" cy="9" r="1" fill="#ffffff" opacity="0.7" />
          </g>

          {/* Lente Direita */}
          <g>
            <circle cx="38" cy="10" r="11" fill="url(#lensGrad)" stroke="url(#frameGrad)" strokeWidth="4" />
            <circle cx="38" cy="10" r="9" fill="url(#lensGlow)" filter="url(#lensFilter)">
              <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            {/* Brilho da lente */}
            <ellipse cx="34" cy="6" rx="3" ry="2" fill="#ffffff" opacity="0.3" transform="rotate(-30, 34, 6)" />
            {/* Pupila digital */}
            <circle cx="38" cy="10" r="2.5" fill="#38bdf8" opacity="0.8">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" begin="0.2s" />
            </circle>
            <circle cx="37" cy="9" r="1" fill="#ffffff" opacity="0.7" />
          </g>

          {/* Engrenagem decorativa na haste direita */}
          <g transform="translate(52, 9)" style={{ animation: 'gearTick 2s ease-in-out infinite', transformOrigin: '0 0' }}>
            <circle cx="0" cy="0" r="4" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="0" cy="0" r="1.5" fill="#f59e0b" />
          </g>

          {/* Partículas temporais */}
          {[...Array(6)].map((_, i) => (
            <circle
              key={`time-${i}`}
              cx={5 + Math.random() * 40}
              cy={-5 + Math.random() * 15}
              r="0.8"
              fill="#60a5fa"
              opacity="0"
            >
              <animate attributeName="opacity" values="0;0.6;0" dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${5 + Math.random() * 10};-10`} dur={`${1.5 + Math.random() * 2}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Relógio digital na lente esquerda */}
          <text x="8" y="14" fontSize="4" fill="#bfdbfe" opacity="0.6" fontFamily="monospace">24:01</text>
          <text x="34" y="14" fontSize="4" fill="#bfdbfe" opacity="0.6" fontFamily="monospace">24:01</text>
        </g>
      </g>
    )
  },
  {
    id: "acc_engrenagens",
    nome: "Engrenagens do Destino",
    preco: 600,
    raridade: "Épico",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO
    offsetX: -10,    // ← mais pra esquerda
    offsetY: -5,     // ← mais pra cima
    rotate: 15,      // ← inclinado
    render: (offsetX = -10, offsetY = -5, rotate = 15) => (
      <g transform={`translate(${60 + offsetX}, ${20 + offsetY}) rotate(${rotate}, 0, 0)`}>
        <defs>
          <radialGradient id="gearCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="60%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>
          <linearGradient id="gearMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="30%" stopColor="#fcd34d" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <filter id="gearGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="gearShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes spinGearLarge {
              100% { transform: rotate(360deg); }
            }
            @keyframes spinGearSmall {
              100% { transform: rotate(-360deg); }
            }
            @keyframes sparkFly {
              0% { transform: scale(0); opacity: 0; }
              50% { transform: scale(1); opacity: 1; }
              100% { transform: scale(0); opacity: 0; }
            }
          `}
        </style>

        <g filter="url(#gearShadow)">
          {/* Aura da engrenagem */}
          <circle cx="0" cy="0" r="18" fill="#f59e0b" opacity="0.15" filter="url(#gearGlow)">
            <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Engrenagem Grande Principal */}
          <g style={{ animation: 'spinGearLarge 6s linear infinite', transformOrigin: '0 0' }}>
            {/* Dentes da engrenagem */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * Math.PI / 180;
              const x1 = Math.cos(angle) * 14;
              const y1 = Math.sin(angle) * 14;
              const x2 = Math.cos(angle) * 18;
              const y2 = Math.sin(angle) * 18;
              return (
                <path
                  key={`tooth-${i}`}
                  d={`M ${x1} ${y1} L ${x2} ${y2} L ${Math.cos(angle + 0.2) * 18} ${Math.sin(angle + 0.2) * 18} L ${Math.cos(angle + 0.2) * 14} ${Math.sin(angle + 0.2) * 14} Z`}
                  fill="url(#gearMetal)"
                  stroke="#78350f"
                  strokeWidth="0.5"
                />
              );
            })}
            
            {/* Corpo da engrenagem */}
            <circle cx="0" cy="0" r="12" fill="url(#gearCore)" stroke="#b45309" strokeWidth="2" />
            
            {/* Raios da engrenagem */}
            {[...Array(6)].map((_, i) => {
              const angle = i * 60 * Math.PI / 180;
              const x = Math.cos(angle) * 9;
              const y = Math.sin(angle) * 9;
              return (
                <line key={`ray-${i}`} x1="0" y1="0" x2={x} y2={y} stroke="#78350f" strokeWidth="2" opacity="0.6" />
              );
            })}
            
            {/* Centro */}
            <circle cx="0" cy="0" r="4" fill="#78350f" />
            <circle cx="0" cy="0" r="2" fill="#fcd34d" />
            <circle cx="0" cy="0" r="1" fill="#111" />
          </g>

          {/* Engrenagem Pequena (orbitando) */}
          <g style={{ animation: 'spinGearSmall 4s linear infinite', transformOrigin: '20px -15px' }} transform="translate(20, -15)">
            {/* Dentes pequenos */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x1 = Math.cos(angle) * 7;
              const y1 = Math.sin(angle) * 7;
              const x2 = Math.cos(angle) * 10;
              const y2 = Math.sin(angle) * 10;
              return (
                <path
                  key={`small-tooth-${i}`}
                  d={`M ${x1} ${y1} L ${x2} ${y2} L ${Math.cos(angle + 0.25) * 10} ${Math.sin(angle + 0.25) * 10} L ${Math.cos(angle + 0.25) * 7} ${Math.sin(angle + 0.25) * 7} Z`}
                  fill="#fcd34d"
                  stroke="#b45309"
                  strokeWidth="0.5"
                />
              );
            })}
            <circle cx="0" cy="0" r="6" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="2" fill="#78350f" />
            <circle cx="0" cy="0" r="1" fill="#fcd34d" />
          </g>

          {/* Terceira Engrenagem Minúscula */}
          <g style={{ animation: 'spinGearLarge 3s linear infinite', transformOrigin: '-18px -12px' }} transform="translate(-18, -12)">
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * Math.PI / 180;
              const x1 = Math.cos(angle) * 5;
              const y1 = Math.sin(angle) * 5;
              const x2 = Math.cos(angle) * 7.5;
              const y2 = Math.sin(angle) * 7.5;
              return (
                <path
                  key={`tiny-tooth-${i}`}
                  d={`M ${x1} ${y1} L ${x2} ${y2} L ${Math.cos(angle + 0.3) * 7.5} ${Math.sin(angle + 0.3) * 7.5} L ${Math.cos(angle + 0.3) * 5} ${Math.sin(angle + 0.3) * 5} Z`}
                  fill="#fbbf24"
                  stroke="#b45309"
                  strokeWidth="0.5"
                />
              );
            })}
            <circle cx="0" cy="0" r="4.5" fill="#b45309" />
            <circle cx="0" cy="0" r="1.5" fill="#fcd34d" />
          </g>

          {/* Faíscas */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={`spark-${i}`}
              cx={-15 + Math.random() * 30}
              cy={-15 + Math.random() * 30}
              r="1"
              fill="#fef08a"
              style={{ animation: `sparkFly ${0.5 + Math.random() * 0.5}s ease-in-out infinite ${Math.random() * 2}s` }}
            />
          ))}

          {/* Partículas de metal voando */}
          {[...Array(12)].map((_, i) => (
            <circle
              key={`metal-${i}`}
              cx={Math.random() * 30 - 15}
              cy={Math.random() * 30 - 15}
              r="0.6"
              fill="#fcd34d"
              opacity="0"
            >
              <animate attributeName="opacity" values="0;0.8;0" dur={`${0.8 + Math.random() * 1}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values={`${Math.random() * 40 - 20};${Math.random() * 50 - 25}`} dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
              <animate attributeName="cy" values={`${Math.random() * 40 - 20};${Math.random() * 50 - 25}`} dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      </g>
    )
  },
  {
    id: "acc_aura_galaxia",
    nome: "Aura Galáctica",
    preco: 1000,
    raridade: "Lendário",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO
    offsetX: 15,      // ← centralizado
    offsetY: -20,     // ← mais pra cima
    rotate: 0,       // ← sem rotação
    render: (offsetX = 15, offsetY = -20, rotate = 0) => (
      <g transform={`translate(${35 + offsetX}, ${35 + offsetY}) rotate(${rotate}, 0, 0)`}>
        <defs>
          <radialGradient id="galaxyCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula" cx="30%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
          </radialGradient>
          <filter id="starGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="galaxyBlur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes galaxySpin {
              100% { transform: rotate(360deg); }
            }
            @keyframes galaxySpinReverse {
              100% { transform: rotate(-360deg); }
            }
            @keyframes starTwinkle {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.5); }
            }
            @keyframes cometFly {
              0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
              20% { opacity: 1; }
              80% { opacity: 0.5; }
              100% { transform: translate(60px, -40px) rotate(45deg); opacity: 0; }
            }
          `}
        </style>

        {/* Aura base da galáxia */}
        <circle cx="0" cy="0" r="50" fill="url(#galaxyCore)" filter="url(#galaxyBlur)">
          <animate attributeName="r" values="45;55;45" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Nebulosa interna */}
        <ellipse cx="0" cy="0" rx="35" ry="20" fill="url(#nebula)" filter="url(#galaxyBlur)" transform="rotate(20)">
          <animate attributeName="rx" values="30;38;30" dur="5s" repeatCount="indefinite" />
          <animate attributeName="ry" values="18;23;18" dur="4s" repeatCount="indefinite" />
        </ellipse>

        {/* Anéis galácticos */}
        <g style={{ animation: 'galaxySpin 12s linear infinite', transformOrigin: '0 0' }}>
          <ellipse cx="0" cy="0" rx="45" ry="18" fill="none" stroke="#c084fc" strokeWidth="2" opacity="0.5" transform="rotate(30)">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
          </ellipse>
        </g>

        <g style={{ animation: 'galaxySpinReverse 10s linear infinite', transformOrigin: '0 0' }}>
          <ellipse cx="0" cy="0" rx="40" ry="15" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" transform="rotate(-20)">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite" />
          </ellipse>
        </g>

        <g style={{ animation: 'galaxySpin 8s linear infinite', transformOrigin: '0 0' }}>
          <ellipse cx="0" cy="0" rx="32" ry="10" fill="none" stroke="#f472b6" strokeWidth="1" opacity="0.3" transform="rotate(50)" strokeDasharray="4 8">
            <animate attributeName="strokeDashoffset" values="0;24" dur="2s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* Estrelas principais */}
        {[
          { x: 20, y: 20, size: 2.5, delay: 0 },
          { x: -25, y: 10, size: 2, delay: 0.5 },
          { x: 10, y: -25, size: 3, delay: 1 },
          { x: -15, y: -20, size: 2, delay: 1.5 },
          { x: 30, y: -5, size: 1.5, delay: 2 },
          { x: -30, y: -5, size: 2, delay: 0.8 },
          { x: 15, y: -10, size: 1.8, delay: 1.2 },
          { x: -20, y: 25, size: 2.2, delay: 1.8 },
        ].map((star, i) => (
          <g key={`star-${i}`} style={{ animation: `starTwinkle ${1.5 + Math.random() * 1.5}s ease-in-out infinite ${star.delay}s`, transformOrigin: `${star.x}px ${star.y}px` }}>
            <circle cx={star.x} cy={star.y} r={star.size} fill="#ffffff" filter="url(#starGlow)" />
            <circle cx={star.x} cy={star.y} r={star.size * 0.5} fill="#ffffff" />
            {/* Cruz da estrela */}
            <line x1={star.x - star.size * 2} y1={star.y} x2={star.x + star.size * 2} y2={star.y} stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
            <line x1={star.x} y1={star.y - star.size * 2} x2={star.x} y2={star.y + star.size * 2} stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
          </g>
        ))}

        {/* Estrelas pequenas (background) */}
        {[...Array(30)].map((_, i) => (
          <circle
            key={`small-star-${i}`}
            cx={-45 + Math.random() * 90}
            cy={-35 + Math.random() * 70}
            r={0.5 + Math.random() * 1}
            fill="#ffffff"
            opacity={0.3 + Math.random() * 0.5}
          >
            <animate attributeName="opacity" values={`${0.2 + Math.random() * 0.3};${0.8 + Math.random() * 0.2};${0.2 + Math.random() * 0.3}`} dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Cometa */}
        <g style={{ animation: 'cometFly 4s ease-in-out infinite' }}>
          <line x1="-30" y1="20" x2="-10" y2="10" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
          <circle cx="-30" cy="20" r="2" fill="#ffffff" filter="url(#starGlow)" />
        </g>

        {/* Nebulosas coloridas adicionais */}
        <circle cx="-20" cy="-15" r="12" fill="#f472b6" opacity="0.15" filter="url(#galaxyBlur)">
          <animate attributeName="r" values="10;15;10" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="10" r="15" fill="#38bdf8" opacity="0.12" filter="url(#galaxyBlur)">
          <animate attributeName="r" values="12;18;12" dur="5s" repeatCount="indefinite" />
        </circle>

        {/* Buraco negro central (singularidade da galáxia) */}
        <circle cx="0" cy="0" r="5" fill="#1e1b4b" opacity="0.9">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="2" fill="#000" />
        <circle cx="0" cy="0" r="7" fill="none" stroke="#c084fc" strokeWidth="0.5" opacity="0.6" strokeDasharray="3 3">
          <animate attributeName="strokeDashoffset" values="0;12" dur="1s" repeatCount="indefinite" />
          <animate attributeName="r" values="6;8;6" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
    )
  },
  {
    id: "acc_buraco_negro",
    nome: "Singularidade",
    preco: 1800,
    raridade: "Mítico",
    tipo: "acessorio",
    // ⚙️ CONTROLE DE POSIÇÃO
    offsetX: 15,      // ← centralizado
    offsetY: -15,      // ← um pouco pra baixo
    rotate: 0,       // ← sem rotação
    render: (offsetX = 15, offsetY = -15, rotate = 0) => (
      <g transform={`translate(${35 + offsetX}, ${35 + offsetY}) rotate(${rotate}, 0, 0)`}>
        <defs>
          <radialGradient id="blackHoleCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
            <stop offset="30%" stopColor="#0f0f1a" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#1a1a2e" stopOpacity="0.7" />
            <stop offset="85%" stopColor="#4c1d95" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="accretionDisk" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0" />
            <stop offset="40%" stopColor="#a855f7" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="90%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.7" />
          </radialGradient>
          <filter id="bhGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="bhIntense" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <filter id="bhShadow" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#a855f7" floodOpacity="0.5" />
          </filter>
        </defs>

        <style>
          {`
            @keyframes pulseBlackHole {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.08); opacity: 1; }
            }
            @keyframes spinDisk {
              100% { transform: rotate(360deg); }
            }
            @keyframes spinDiskReverse {
              100% { transform: rotate(-360deg); }
            }
            @keyframes gravityRipple {
              0% { transform: scale(1); opacity: 0.6; }
              100% { transform: scale(2); opacity: 0; }
            }
            @keyframes particleSuck {
              0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
              100% { transform: translate(0, 0) scale(0); opacity: 0; }
            }
          `}
        </style>

        {/* Aura externa massiva */}
        <circle cx="0" cy="0" r="45" fill="url(#accretionDisk)" filter="url(#bhIntense)">
          <animate attributeName="r" values="40;50;40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Ondas gravitacionais */}
        {[1, 2, 3, 4].map((i) => (
          <circle
            key={`ripple-${i}`}
            cx="0"
            cy="0"
            r="15"
            fill="none"
            stroke="#a855f7"
            strokeWidth="1"
            opacity="0"
          >
            <animate attributeName="r" values="15;45" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
            <animate attributeName="opacity" values="0.6;0" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
            <animate attributeName="stroke-width" values="2;0.5" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
          </circle>
        ))}

        <g style={{ animation: 'pulseBlackHole 2.5s ease-in-out infinite', transformOrigin: '0 0' }} filter="url(#bhShadow)">
          
          {/* Disco de acreção - camada externa */}
          <g style={{ animation: 'spinDisk 8s linear infinite', transformOrigin: '0 0' }}>
            <ellipse cx="0" cy="0" rx="32" ry="12" fill="none" stroke="#c084fc" strokeWidth="2" opacity="0.6" transform="rotate(15)">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* Disco de acreção - camada média */}
          <g style={{ animation: 'spinDiskReverse 6s linear infinite', transformOrigin: '0 0' }}>
            <ellipse cx="0" cy="0" rx="25" ry="9" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.7" transform="rotate(-10)">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.2s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* Disco de acreção - camada interna */}
          <g style={{ animation: 'spinDisk 4s linear infinite', transformOrigin: '0 0' }}>
            <ellipse cx="0" cy="0" rx="18" ry="6" fill="none" stroke="#a855f7" strokeWidth="2.5" opacity="0.8" transform="rotate(30)" strokeDasharray="4 6">
              <animate attributeName="strokeDashoffset" values="0;20" dur="1s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* Anel de fogo/quente */}
          <g style={{ animation: 'spinDiskReverse 3s linear infinite', transformOrigin: '0 0' }}>
            <ellipse cx="0" cy="0" rx="12" ry="4" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.9" transform="rotate(-20)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="0.8s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* Núcleo do buraco negro */}
          <circle cx="0" cy="0" r="22" fill="url(#blackHoleCore)" filter="url(#bhGlow)" />
          
          {/* Horizonte de eventos */}
          <circle cx="0" cy="0" r="14" fill="#05050a" stroke="#4c1d95" strokeWidth="1.5">
            <animate attributeName="r" values="13;15;13" dur="2s" repeatCount="indefinite" />
            <animate attributeName="stroke-width" values="1;2;1" dur="2s" repeatCount="indefinite" />
          </circle>
          
          {/* Singularidade central */}
          <circle cx="0" cy="0" r="5" fill="#000000" />
          <circle cx="0" cy="0" r="2" fill="#1a1a2e">
            <animate attributeName="r" values="1.5;2.5;1.5" dur="1s" repeatCount="indefinite" />
          </circle>

          {/* Lente gravitacional - distorção de luz */}
          <circle cx="0" cy="0" r="8" fill="none" stroke="#c084fc" strokeWidth="0.8" opacity="0.5">
            <animate attributeName="r" values="7;9;7" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>

          {/* Partículas sendo sugadas */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 22.5 + Date.now() * 0.02) % 360;
            const rad = angle * Math.PI / 180;
            const startX = Math.cos(rad) * 28;
            const startY = Math.sin(rad) * 28;
            return (
              <circle
                key={`suck-${i}`}
                cx={startX}
                cy={startY}
                r="1.2"
                fill="#c084fc"
                opacity="0.6"
              >
                <animate 
                  attributeName="cx" 
                  values={`${startX};${startX * 0.5};0`} 
                  dur={`${1.5 + Math.random() * 1}s`} 
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="cy" 
                  values={`${startY};${startY * 0.5};0`} 
                  dur={`${1.5 + Math.random() * 1}s`} 
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="opacity" 
                  values="0.6;0.8;0" 
                  dur={`${1.5 + Math.random() * 1}s`} 
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="r" 
                  values="1.2;0.8;0" 
                  dur={`${1.5 + Math.random() * 1}s`} 
                  repeatCount="indefinite" 
                />
              </circle>
            );
          })}

          {/* Raios de energia expelidos */}
          {[...Array(8)].map((_, i) => {
            const angle = i * 45;
            return (
              <g key={`jet-${i}`} transform={`rotate(${angle})`}>
                <line x1="14" y1="0" x2="24" y2="0" stroke="#a855f7" strokeWidth="1" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${0.8 + i * 0.1}s`} repeatCount="indefinite" />
                  <animate attributeName="x2" values="22;28;22" dur={`${0.8 + i * 0.1}s`} repeatCount="indefinite" />
                </line>
                <line x1="14" y1="-2" x2="20" y2="-2" stroke="#c084fc" strokeWidth="0.5" opacity="0.3">
                  <animate attributeName="opacity" values="0.1;0.5;0.1" dur={`${1 + i * 0.1}s`} repeatCount="indefinite" />
                </line>
                <line x1="14" y1="2" x2="20" y2="2" stroke="#c084fc" strokeWidth="0.5" opacity="0.3">
                  <animate attributeName="opacity" values="0.1;0.5;0.1" dur={`${1 + i * 0.1}s`} repeatCount="indefinite" begin="0.5s" />
                </line>
              </g>
            );
          })}

          {/* Estrelas distorcidas pelo campo gravitacional */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const rad = angle;
            const x = Math.cos(rad) * 35;
            const y = Math.sin(rad) * 35;
            return (
              <ellipse
                key={`distorted-${i}`}
                cx={x}
                cy={y}
                rx="1.5"
                ry="0.8"
                fill="#ffffff"
                opacity="0.4"
                transform={`rotate(${angle * 180 / Math.PI}, ${x}, ${y})`}
              >
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${1 + Math.random() * 1.5}s`} repeatCount="indefinite" />
                <animate attributeName="rx" values="1;2;1" dur={`${1.5 + Math.random() * 1}s`} repeatCount="indefinite" />
              </ellipse>
            );
          })}
        </g>
      </g>
    )
  }
];