"use client";

export const acessoriosLote1 = [
  {
    id: "acc_marcas_sukuna",
    nome: "Marcas Amaldiçoadas",
    preco: 250,
    raridade: "Raro",
    tipo: "acessorio",
    offsetX: 0,
    offsetY: 3,
    rotate: 0,
    render: (offsetX = 0, offsetY = 3, rotate = 0) => (
      <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotate}, 50, 50)`} fill="#111" stroke="#111" strokeLinecap="round" strokeLinejoin="round" opacity="0.90">
        <path d="M 50 16 L 51.5 19 L 50 21 L 48.5 19 Z" stroke="none" />
        <path d="M 50 23 Q 54 28 50 35 Q 46 28 50 23 Z" stroke="none" />
        <path d="M 44 20 Q 36 28 40 38 Q 38 28 46 23 Z" stroke="none" />
        <path d="M 38 28 L 31 33 L 39 32 Z" stroke="none" />
        <path d="M 56 20 Q 64 28 60 38 Q 62 28 54 23 Z" stroke="none" />
        <path d="M 62 28 L 69 33 L 61 32 Z" stroke="none" />
        <path d="M 15 50 L 25 54 L 18 60 L 25 64 Q 28 75 42 85" fill="none" strokeWidth="2.5" />
        <path d="M 34 78 L 29 86" fill="none" strokeWidth="2" />
        <path d="M 40 84 L 38 91" fill="none" strokeWidth="2" />
        <path d="M 85 50 L 75 54 L 82 60 L 75 64 Q 72 75 58 85" fill="none" strokeWidth="2.5" />
        <path d="M 66 78 L 71 86" fill="none" strokeWidth="2" />
        <path d="M 60 84 L 62 91" fill="none" strokeWidth="2" />
      </g>
    )
  },

  {
    id: "acc_oculos_sombrios",
    nome: "Óculos Sombrios",
    preco: 100,
    raridade: "Comum",
    tipo: "acessorio",
    offsetX: 15,
    offsetY: 54,
    rotate: 0,
    render: (offsetX = 15, offsetY = 54, rotate = 0) => (
      <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotate}, 35, 10)`}>
        <path d="M -2 0 L 32 0 L 30 20 Q 15 25 2 20 Z" fill="#111" stroke="#222" strokeWidth="1" />
        <path d="M 38 0 L 72 0 L 68 20 Q 55 25 40 20 Z" fill="#111" stroke="#222" strokeWidth="1" />
        <path d="M 30 5 Q 35 2 38 5" stroke="#111" strokeWidth="4" fill="none" />
        <path d="M 2 2 L 28 2 L 26 18 Q 15 22 4 18 Z" fill="#475569" opacity="0.8" />
        <path d="M 42 2 L 68 2 L 66 18 Q 55 22 44 18 Z" fill="#475569" opacity="0.8" />
        <circle cx="3" cy="5" r="1.2" fill="#e2e8f0" />
        <circle cx="67" cy="5" r="1.2" fill="#e2e8f0" />
      </g>
    )
  },

  {
    id: "acc_venda_infinito",
    nome: "Venda do Infinito",
    preco: 500,
    raridade: "Épico",
    tipo: "acessorio",
    offsetX: -130,
    offsetY: -85,
    rotate: 0,
    render: (offsetX = -130, offsetY = -85, rotate = 0) => {
        const esferaLeftX = -6;
        const esferaRightX = 110;
        const esferaY = 150;
        
        return (
            <g transform={`rotate(${rotate}, 50, 50)`}>
                <defs>
                    <radialGradient id="vazioGradVenda" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                        <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="redSphereV" cx="40%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#fca5a5" /><stop offset="50%" stopColor="#dc2626" /><stop offset="100%" stopColor="#7f1d1d" />
                    </radialGradient>
                    <radialGradient id="blueSphereV" cx="40%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#93c5fd" /><stop offset="50%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1e3a8a" />
                    </radialGradient>
                    <linearGradient id="vendaGradLinear" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                </defs>

                <g transform={`translate(${esferaLeftX}, ${esferaY})`} style={{ animation: 'float 3s ease-in-out infinite' }}>
                    <circle cx="0" cy="0" r="18" fill="url(#redSphereV)" />
                    <circle cx="0" cy="0" r="26" fill="none" stroke="#ef4444" strokeWidth="0.8" opacity="0.2" style={{ animation: 'spin-slow 4s linear infinite', transformOrigin: 'center' }} />
                </g>

                <g transform={`translate(${esferaRightX}, ${esferaY})`} style={{ animation: 'float 3.5s ease-in-out infinite' }}>
                    <circle cx="0" cy="0" r="18" fill="url(#blueSphereV)" />
                    <circle cx="0" cy="0" r="26" fill="none" stroke="#60a5fa" strokeWidth="0.8" opacity="0.2" style={{ animation: 'spin-reverse 4s linear infinite', transformOrigin: 'center' }} />
                </g>

                <g transform={`translate(${offsetX + 130}, ${offsetY + 85})`}>
                    <path d="M 0 8 Q 40 12 80 8 L 78 32 Q 40 38 2 32 Z" fill="#000" opacity="0.15" />
                    <path d="M 6 58 L -4 40 L 12 36 L 6 12 L 28 22 L 26 -6 L 46 14 L 58 -10 L 66 16 L 88 0 L 80 24 L 104 32 L 88 44 L 100 58 L 94 58 Q 50 44 6 58 Z" fill="url(#vendaGradLinear)" stroke="#1e293b" strokeWidth="1.5" />
                    <path d="M 5 57 Q 50 44 95 57 L 90 76 Q 50 82 10 76 Z" fill="#0f172a" />
                    <path d="M 15 57 Q 50 67 85 57" stroke="#1e293b" strokeWidth="2" fill="none" />
                    <g transform="translate(50, 35) scale(1.2)">
                        <path d="M -15 0 C -15 -8 -5 -8 0 0 C 5 -8 15 -8 15 0 C 15 8 5 8 0 0 C -5 8 -15 8 -15 0 Z" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                    </g>
                    <ellipse cx="35" cy="50" rx="8" ry="12" fill="#38bdf8" style={{ animation: 'pulseOpacity 3s infinite' }} />
                    <ellipse cx="65" cy="50" rx="8" ry="12" fill="#38bdf8" style={{ animation: 'pulseOpacity 3s infinite 0.5s' }} />
                </g>
            </g>
        );
    }
  },

  {
    id: "acc_bone_bizarro",
    nome: "Boné Bizarro",
    preco: 300,
    raridade: "Raro",
    tipo: "acessorio",
    offsetX: 10,
    offsetY: -5,
    rotate: 0,
    render: (offsetX = 10, offsetY = -5, rotate = 0) => (
      <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotate}, 40, 25)`}>
        <path d="M 0 45 L -5 55 L 10 48 L 15 60 L 25 45 Z" fill="#111" />
        <path d="M 5 45 C 5 -5, 75 -5, 75 45 Z" fill="#171717" />
        <path d="M -5 45 Q 40 25 85 45 Q 40 38 -5 45 Z" fill="#111" />
        <rect x="25" y="32" width="16" height="8" fill="#fbbf24" rx="2" />
        <circle cx="33" cy="36" r="2" fill="#713f12" />
        <circle cx="55" cy="35" r="4" fill="#fbbf24" />
        <circle cx="55" cy="35" r="2" fill="#171717" />
        <rect x="10" y="40" width="60" height="3" fill="#222" />
      </g>
    )
  },

  {
    id: "acc_chapeu_palha",
    nome: "Chapéu de Palha",
    preco: 400,
    raridade: "Épico",
    tipo: "acessorio",
    offsetX: 5,
    offsetY: -8,
    rotate: -5,
    render: (offsetX = 5, offsetY = -8, rotate = -5) => (
      <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotate}, 45, 40)`}>
          <ellipse cx="45" cy="40" rx="48" ry="12" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
          <path d="M 20 38 C 20 0, 70 0, 70 38 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <path d="M 30 15 L 25 35 M 40 10 L 35 35 M 50 9 L 45 35 M 60 13 L 55 35 M 68 26 L 65 35" stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
          <path d="M 28 15 L 62 15 M 22 25 L 68 25 M 20 35 L 70 35" stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
          <path d="M 20 34 Q 45 42 70 34 L 69 38 Q 45 46 21 38 Z" fill="#ef4444" />
          <path d="M -3 40 Q 45 55 93 40 Q 45 48 -3 40 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <g transform="translate(0, 5)">
            <path d="M 58 74 Q 65 79 72 74 M 61 73 L 63 78 M 67 73 L 69 78" stroke="#7c2d12" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85" />
          </g>
      </g>
    )
  },

  {
    id: "acc_cartola_sonho",
    nome: "Cartola do Sonho",
    preco: 250,
    raridade: "Raro",
    tipo: "acessorio",
    offsetX: 15,
    offsetY: -15,
    rotate: 0,
    render: (offsetX = 15, offsetY = -15, rotate = 0) => (
      <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotate}, 35, 40)`}>
        <path d="M 18 40 L 18 -5 C 18 -30, 52 -30, 52 -5 L 52 40 Z" fill="#4c1d95" stroke="#3b0764" strokeWidth="1.5" />
        <path d="M 23 39 L 23 -5 C 23 -22, 30 -22, 30 -5 L 30 39 Z" fill="#7e22ce" opacity="0.6" />
        <ellipse cx="35" cy="15" rx="9" ry="22" fill="#fbbf24" stroke="#854d0e" strokeWidth="1.5" />
        <ellipse cx="35" cy="15" rx="4" ry="16" fill="#111" />
        <path d="M 17 38 Q 35 46 53 38 L 54 44 Q 35 52 16 44 Z" fill="#fbbf24" stroke="#854d0e" strokeWidth="1.5" />
        <circle cx="35" cy="43" r="3.5" fill="#22c55e" stroke="#064e3b" strokeWidth="1" />
        <circle cx="34" cy="42" r="1" fill="#fff" opacity="0.6" />
      </g>
    )
  },

  {
    id: "acc_gorrinho_croche",
    nome: "Gorrinho de Crochê",
    preco: 150,
    raridade: "Comum",
    tipo: "acessorio",
    offsetX: 15,
    offsetY: -12,
    rotate: 0,
    render: (offsetX = 15, offsetY = -12, rotate = 0) => {
        return (
            <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotate}, 35, 50)`}>
                <defs>
                    <radialGradient id="pompomGradL1" cx="40%" cy="30%" r="60%">
                        <stop offset="0%" stopColor="#fff5f9" /><stop offset="100%" stopColor="#f472b6" />
                    </radialGradient>
                </defs>
                <ellipse cx="35" cy="52" rx="32" ry="6" fill="#000" opacity="0.15" />
                <circle cx="35" cy="-5" r="16" fill="url(#pompomGradL1)" />
                <path d="M 5 35 C 5 -10, 65 -10, 65 35 C 65 42, 62 48, 58 50 C 50 54, 20 54, 12 50 C 8 48, 5 42, 5 35 Z" fill="#f472b6" />
                <g stroke="#db2777" strokeWidth="0.8" opacity="0.25" fill="none">
                    <path d="M 6 30 Q 35 33 64 30" /><path d="M 7 24 Q 35 27 63 24" /><path d="M 9 12 Q 35 15 61 12" />
                </g>
                <path d="M 5 35 C 5 42, 8 48, 12 50 C 20 54, 50 54, 58 50 C 62 48, 65 42, 65 35" fill="none" stroke="#be185d" strokeWidth="4" strokeLinecap="round" />
                <circle cx="68" cy="28" r="4" fill="#ec4899" />
            </g>
        );
    }
  },

  {
    id: "acc_terminal_kali",
    nome: "Terminal Kali",
    preco: 600,
    raridade: "Lendário",
    tipo: "acessorio",
    offsetX: 5,
    offsetY: 10,
    rotate: 0,
    render: (offsetX = 5, offsetY = 10, rotate = 0) => (
      <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotate}, 45, 25)`}>
        <rect x="-5" y="-5" width="100" height="55" rx="6" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
        <rect x="0" y="0" width="90" height="45" rx="3" fill="#000" />
        <rect x="0" y="0" width="90" height="12" rx="3" fill="#111" />
        
        <circle cx="7" cy="6" r="2.5" fill="#ef4444" />
        <circle cx="14" cy="6" r="2.5" fill="#eab308" />
        <circle cx="21" cy="6" r="2.5" fill="#22c55e" />

        <text x="26" y="9" fill="#888" fontSize="5.5" fontFamily="monospace" fontWeight="bold">kali@foguinho: ~/hack</text>
        <text x="5" y="22" fill="#22c55e" fontSize="7" fontFamily="monospace" fontWeight="bold">root@foguinho</text>
        <text x="5" y="32" fill="#22c55e" fontSize="7" fontFamily="monospace">./hack_ur_heart.sh</text>
        
        <text x="5" y="42" fill="#22c55e" fontSize="6" fontFamily="monospace">
            Hacking <tspan fill="#fff">▰▰▰</tspan> 100%
        </text>
        <text x="82" y="32" fill="#fff" fontSize="7" fontFamily="monospace" style={{ animation: 'blink 1s infinite' }}>_</text>

        <rect x="86" y="14" width="2" height="28" rx="1" fill="#222" />
        <rect x="86" y="14" width="2" height="8" rx="1" fill="#22c55e" style={{ animation: 'slideScroll 3s ease-in-out infinite' }} />

        <text x="20" y="0" fontSize="4" fill="#22c55e" style={{ animation: 'dropCode 2s linear infinite' }}>0110</text>
        <text x="40" y="0" fontSize="4" fill="#22c55e" style={{ animation: 'dropCode 3s linear infinite 1s' }}>1011</text>
        
        <g transform="translate(45, -4)">
            <line x1="0" y1="2" x2="-3" y2="-6" stroke="#555" />
            <circle cx="0" cy="-7" r="1.5" fill="#22c55e" style={{ animation: 'blink 1.5s infinite' }} />
        </g>
      </g>
    )
  },

  {
    id: "acc_capacete_hipismo",
    nome: "Capacete de Hipismo",
    preco: 200,
    raridade: "Incomum",
    tipo: "acessorio",
    offsetX: 10,
    offsetY: -5,
    rotate: 0,
    render: (offsetX = 10, offsetY = -5, rotate = 0) => (
      <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotate}, 40, 40)`}>
        <path d="M 10 40 C 10 -10, 70 -10, 70 40 Z" fill="#1e40af" />
        <path d="M 5 40 Q 40 55 75 40 Z" fill="#fbbf24" />
        <path d="M 35 1 L 35 41 M 45 1 L 45 41" stroke="#fde047" strokeWidth="2" />
        <text x="25" y="25" fill="#fde047" fontSize="16" fontWeight="900" fontFamily="monospace">DIO</text>
        <rect x="15" y="32" width="20" height="8" rx="2" fill="#111" stroke="#b45309" strokeWidth="2" />
        <rect x="45" y="32" width="20" height="8" rx="2" fill="#111" stroke="#b45309" strokeWidth="2" />
        <path d="M 35 36 L 45 36" stroke="#b45309" strokeWidth="3" />
      </g>
    )
  },

  {
    id: "acc_espada_zenite",
    nome: "Espada Zênite",
    preco: 1000,
    raridade: "Mítico",
    tipo: "acessorio",
    offsetX: 0,
    offsetY: 0,
    rotate: 0,
    render: (offsetX = 0, offsetY = 0, rotate = 0) => {
        const centroX = 50;
        const centroY = 68;
        const raioOrbita = 60;

        const espadas = [
            { cor: "#4ade80", delay: "0s", duracao: "10s", tamanho: 0.9 },
            { cor: "#a855f7", delay: "-1.4s", duracao: "10s", tamanho: 0.85 },
            { cor: "#f472b6", delay: "-2.8s", duracao: "10s", tamanho: 0.9 },
            { cor: "#fbbf24", delay: "-4.2s", duracao: "10s", tamanho: 0.85 },
            { cor: "#38bdf8", delay: "-5.7s", duracao: "10s", tamanho: 0.8 },
            { cor: "#c084fc", delay: "-7.1s", duracao: "10s", tamanho: 0.85 },
            { cor: "#e879f9", delay: "-8.5s", duracao: "10s", tamanho: 0.95 }
        ];

        return (
            <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotate}, 50, 50)`}>
                <defs>
                    <radialGradient id="zenithBaseGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#e879f9" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="gradzenith" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>

                <circle cx={centroX} cy={centroY + 110} r={raioOrbita + 20} fill="url(#zenithBaseGlow)" style={{ animation: 'pulseZenith 4s infinite', transformOrigin: `${centroX}px ${centroY + 110}px` }} />

                {espadas.map((espada, idx) => (
                    <g key={idx} className="will-change" style={{ animation: `orbitZenith ${espada.duracao} linear infinite`, animationDelay: espada.delay, transformOrigin: `${centroX}px ${centroY}px` }}>
                        <g transform={`scale(${espada.tamanho}) translate(-25, -25)`}>
                            <path d="M 10 42 L 20 32 L 40 -3 L 38 -5 L 18 30 L 8 40 Z" fill={espada.cor} opacity="0.9" />
                            <path d="M 10 42 L 20 32 L 40 -3 L 20 -8 L 6 3 Z" fill="url(#gradzenith)" opacity="0.8" />
                            <path d="M 10 42 L 20 32 L 40 -3 L 38 -1 L 18 30 Z" fill="#ffffff" opacity="0.6" />
                            <path d="M 5 38 L 31 38 L 32 42 L 4 42 Z" fill="#374151" stroke={espada.cor} strokeWidth="0.5" />
                            <rect x="12" y="42" width="12" height="18" rx="2" fill="#1f2937" />
                            <ellipse cx="18" cy="63" rx="7" ry="4" fill="#fbbf24" />
                        </g>
                    </g>
                ))}
            </g>
        );
    }
  }
];