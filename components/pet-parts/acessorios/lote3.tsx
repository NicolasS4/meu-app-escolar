"use client";

export const acessoriosLote3 = [
  
  {
    id: "acc_terraprisma",
    nome: "Prisma da Terra",
    preco: 1500,
    raridade: "Mítico",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(-15, -15)">
        {/* Espadas Flutuantes Específicas do Prisma */}
        <path d="M 40 10 L 45 40 L 40 80 L 35 40 Z" fill="#fde047" opacity="0.9" filter="drop-shadow(0 0 10px rgba(253,224,71,0.8))" />
        <path d="M 40 15 L 43 40 L 40 70 L 37 40 Z" fill="#67e8f9" opacity="0.6" />
        
        <path d="M 0 35 L 15 55 L 40 90 L 10 65 Z" fill="#fde047" opacity="0.8" filter="drop-shadow(0 0 8px rgba(253,224,71,0.6))" />
        <path d="M 5 40 L 15 55 L 35 80 L 10 60 Z" fill="#f9a8d4" opacity="0.6" />

        <path d="M 80 35 L 65 55 L 40 90 L 70 65 Z" fill="#fde047" opacity="0.8" filter="drop-shadow(0 0 8px rgba(253,224,71,0.6))" />
        <path d="M 75 40 L 65 55 L 45 80 L 70 60 Z" fill="#67e8f9" opacity="0.6" />
      </g>
    )
  },
  {
    id: "acc_roda_general",
    nome: "Roda do General",
    preco: 800,
    raridade: "Lendário",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(15, -35)">
        {/* Roda Dourada Celestial */}
        <circle cx="25" cy="25" r="20" fill="none" stroke="url(#gold)" strokeWidth="4" />
        <circle cx="25" cy="25" r="8" fill="url(#gold)" />
        {/* Os 8 puxadores da roda */}
        <path d="M 25 5 L 25 -5 M 25 45 L 25 55 M 5 25 L -5 25 M 45 25 L 55 25" stroke="url(#gold)" strokeWidth="4" strokeLinecap="round" />
        <path d="M 11 11 L 4 4 M 39 39 L 46 46 M 11 39 L 4 46 M 39 11 L 46 4" stroke="url(#gold)" strokeWidth="4" strokeLinecap="round" />
        {/* Esferas nas pontas */}
        <circle cx="25" cy="-5" r="3" fill="#fff" />
        <circle cx="25" cy="55" r="3" fill="#fff" />
        <circle cx="-5" cy="25" r="3" fill="#fff" />
        <circle cx="55" cy="25" r="3" fill="#fff" />
      </g>
    )
  },
  {
    id: "acc_capuz_raptor",
    nome: "Capuz do Raptor",
    preco: 500,
    raridade: "Épico",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(5, -15)">
        {/* Corpo do Capuz de Dinossauro */}
        <path d="M 10 50 C -5 10, 75 10, 60 50 L 50 45 C 50 20, 20 20, 20 45 Z" fill="#0f766e" />
        <path d="M 15 50 C 5 15, 65 15, 55 50 Z" fill="#14b8a6" opacity="0.3" />
        {/* Espinhos Amarelos */}
        <polygon points="35,12 40,2 45,12" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
        <polygon points="20,16 22,6 28,14" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
        <polygon points="50,16 48,6 42,14" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
        {/* Olhos do Capuz */}
        <circle cx="22" cy="30" r="4" fill="#fef08a" />
        <circle cx="22" cy="30" r="1.5" fill="#111" />
        <circle cx="48" cy="30" r="4" fill="#fef08a" />
        <circle cx="48" cy="30" r="1.5" fill="#111" />
      </g>
    )
  },
  {
    id: "acc_coroa_pirata",
    nome: "Coroa dos Mares",
    preco: 450,
    raridade: "Épico",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(0, -10)">
        {/* Chapéu de Capitão Pirata Velho */}
        <path d="M -5 35 Q 40 -10 85 35 Q 40 25 -5 35 Z" fill="#7f1d1d" stroke="#fcd34d" strokeWidth="2" />
        <path d="M 15 25 Q 40 5 65 25 Q 40 18 15 25 Z" fill="#991b1b" />
        {/* Símbolo de Caveira (Jolly Roger Minimalista) */}
        <circle cx="40" cy="20" r="4" fill="#fff" />
        <path d="M 33 16 L 47 24 M 33 24 L 47 16" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        {/* Fita Vermelha */}
        <path d="M -5 32 Q 40 45 85 32 L 83 36 Q 40 50 -3 36 Z" fill="#fcd34d" />
      </g>
    )
  },
  {
    id: "acc_visor_osint",
    nome: "Visor OSINT",
    preco: 120,
    raridade: "Comum",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(15, 52)">
        {/* Visor Cyberpunk Neon */}
        <path d="M 0 0 L 50 0 L 45 15 L 5 15 Z" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
        <path d="M 0 0 L 50 0 L 45 15 L 5 15 Z" fill="#22c55e" opacity="0.2" />
        {/* Código Rodando */}
        <text x="5" y="10" fill="#4ade80" fontSize="8" fontFamily="monospace" fontWeight="bold">CTF_MODE: ON</text>
        {/* Hastes laterais */}
        <path d="M -5 -5 L 0 0" stroke="#22c55e" strokeWidth="2" />
        <path d="M 55 -5 L 50 0" stroke="#22c55e" strokeWidth="2" />
      </g>
    )
  },
  {
    id: "acc_cachecol_croche",
    nome: "Cachecol Stila",
    preco: 100,
    raridade: "Comum",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(10, 75)">
        {/* Corpo do Cachecol Grosso */}
        <path d="M 0 0 Q 35 15 60 0 L 60 15 Q 35 30 0 15 Z" fill="#db2777" />
        <path d="M 5 5 Q 35 20 55 5 L 55 10 Q 35 25 5 10 Z" fill="#be185d" />
        {/* Pedaço Caído com Franjas */}
        <path d="M 45 5 L 55 40 L 40 38 Z" fill="#9d174d" />
        <path d="M 45 38 L 45 45 M 50 39 L 50 46 M 55 40 L 55 47" stroke="#fbcfe8" strokeWidth="1.5" />
        {/* Textura de Crochê */}
        <path d="M 10 10 L 15 15 L 20 10 M 25 8 L 30 13 L 35 8" stroke="#fbcfe8" strokeWidth="1" fill="none" opacity="0.5" />
      </g>
    )
  },

];