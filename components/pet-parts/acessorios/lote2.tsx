"use client";

export const acessoriosLote2 = [

  // PRISMA DA TERRA
  {
    id: "acc_terraprisma",
    nome: "Prisma da Terra",
    preco: 1500,
    raridade: "Mítico",
    tipo: "acessorio",
    render: () => (
      // Reposicionado para flutuar perfeitamente nas costas do lado direito
      <g transform="translate(10, -10)">
        <path d="M 40 10 L 45 40 L 40 80 L 35 40 Z" fill="#fde047" opacity="0.9" filter="drop-shadow(0 0 10px rgba(253,224,71,0.8))" />
        <path d="M 40 15 L 43 40 L 40 70 L 37 40 Z" fill="#67e8f9" opacity="0.6" />
        <path d="M 0 35 L 15 55 L 40 90 L 10 65 Z" fill="#fde047" opacity="0.8" filter="drop-shadow(0 0 8px rgba(253,224,71,0.6))" />
        <path d="M 5 40 L 15 55 L 35 80 L 10 60 Z" fill="#f9a8d4" opacity="0.6" />
        <path d="M 80 35 L 65 55 L 40 90 L 70 65 Z" fill="#fde047" opacity="0.8" filter="drop-shadow(0 0 8px rgba(253,224,71,0.6))" />
        <path d="M 75 40 L 65 55 L 45 80 L 70 60 Z" fill="#67e8f9" opacity="0.6" />
      </g>
    )
  },

    // RODA DO GENERAL
{
    id: "acc_roda_general",
    nome: "Roda do General",
    preco: 800,
    raridade: "Lendário",
    tipo: "acessorio",
    render: () => (
      // Centralizado e elevado (y=-25) para flutuar acima da cabeça como um halo
      <g transform="translate(25, -25)">
        <style>
          {`
            /* A animação pesada de "Adaptação" do Mahoraga */
            @keyframes mahoragaAdapt {
              0%, 10% { transform: rotate(0deg); }
              12.5%, 22.5% { transform: rotate(45deg); }
              25%, 35% { transform: rotate(90deg); }
              37.5%, 47.5% { transform: rotate(135deg); }
              50%, 60% { transform: rotate(180deg); }
              62.5%, 72.5% { transform: rotate(225deg); }
              75%, 85% { transform: rotate(270deg); }
              87.5%, 97.5% { transform: rotate(315deg); }
              100% { transform: rotate(360deg); }
            }
            .wheel-mahoraga {
              transform-origin: 25px 25px;
              /* O cubic-bezier dá aquele peso de "estalo" seco e forte na roda */
              animation: mahoragaAdapt 16s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
          `}
        </style>

        {/* Sombra / Aura Divina (Brilho no fundo) */}
        <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(251, 191, 36, 0.25)" strokeWidth="6" filter="blur(3px)" />

        {/* O Grupo que Gira */}
        <g className="wheel-mahoraga">
          
          {/* As 8 Hastes (Spokes) com Esferas na Ponta */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 45} 25 25)`}>
              {/* Corpo da Haste */}
              <rect x="23" y="-2" width="4" height="27" fill="#fbbf24" stroke="#92400e" strokeWidth="0.5" />
              {/* Fio de luz para dar volume 3D à Haste */}
              <rect x="24.5" y="0" width="1" height="20" fill="#fef08a" />
              
              {/* Esfera Pesada na Ponta */}
              <circle cx="25" cy="-2" r="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
              {/* Ponto de luz na Esfera */}
              <circle cx="24" cy="-3" r="1.5" fill="#fef08a" opacity="0.9" />
            </g>
          ))}

          {/* ANEL EXTERNO DA RODA */}
          {/* Sombra/Borda Externa */}
          <circle cx="25" cy="25" r="15" fill="none" stroke="#92400e" strokeWidth="6" />
          {/* Base de Ouro */}
          <circle cx="25" cy="25" r="15" fill="none" stroke="#fbbf24" strokeWidth="4.5" />
          {/* Filete de Luz Interno (Reflexo Metálico) */}
          <circle cx="25" cy="25" r="13.5" fill="none" stroke="#fef08a" strokeWidth="0.5" />

          {/* EIXO CENTRAL (HUB) */}
          <circle cx="25" cy="25" r="6" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
          <circle cx="25" cy="25" r="4" fill="#fbbf24" />
          {/* Furo Central Negro Típico do Anime */}
          <circle cx="25" cy="25" r="2" fill="#1a1a1a" /> 
        </g>
      </g>
    )
  },

  //CAPUZ RAPTOR
{
    id: "acc_capuz_raptor",
    nome: "Capuz do Raptor",
    preco: 500,
    raridade: "Épico",
    tipo: "acessorio",
    render: () => {
        // AJUSTE A POSIÇÃO DO CAPUZ AQUI
        const offsetX = 16;    // Move horizontal
        const offsetY = 70;     // Move vertical
        const rotacao = 0;      // Inclinação
        
        return (
            <>
                <defs>
                    {/* Gradiente principal do capuz */}
                    <linearGradient id="capuzGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0f766e" />
                        <stop offset="30%" stopColor="#0d9488" />
                        <stop offset="60%" stopColor="#0f766e" />
                        <stop offset="100%" stopColor="#115e59" />
                    </linearGradient>

                    {/* Gradiente do interior */}
                    <linearGradient id="insideGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#134e4a" />
                        <stop offset="50%" stopColor="#0f766e" />
                        <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>

                    {/* Gradiente dos olhos */}
                    <radialGradient id="eyeGrad" cx="40%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="40%" stopColor="#fde047" />
                        <stop offset="80%" stopColor="#ca8a04" />
                        <stop offset="100%" stopColor="#854d0e" />
                    </radialGradient>

                    {/* Gradiente dos dentes */}
                    <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#f5f5f5" />
                        <stop offset="100%" stopColor="#e5e5e5" />
                    </linearGradient>

                    {/* Gradiente da crista (mais baixa) */}
                    <linearGradient id="crestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fde047" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>

                    {/* Sombra */}
                    <filter id="capuzShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
                    </filter>

                    {/* Brilho dos olhos */}
                    <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Textura de escamas */}
                    <pattern id="scalePattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                        <path d="M 4 0 Q 8 4 4 8 Q 0 4 4 0 Z" fill="#0d9488" opacity="0.15" />
                        <path d="M 0 4 Q 4 8 0 12 Q -4 8 0 4 Z" fill="#0d9488" opacity="0.1" />
                    </pattern>
                </defs>

                <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotacao})`} filter="url(#capuzShadow)">
                    
                    {/* CAPUZ PRINCIPAL (cabeça do raptor) */}
                    <path d="M 5 55 C -8 10, 78 10, 65 55 C 60 65, 55 68, 50 65 C 45 62, 25 62, 20 65 C 15 68, 10 65, 5 55 Z" fill="url(#capuzGrad)" stroke="#0d9488" strokeWidth="1" />
                    
                    {/* Textura de escamas sobreposta */}
                    <path d="M 5 55 C -8 10, 78 10, 65 55 C 60 65, 55 68, 50 65 C 45 62, 25 62, 20 65 C 15 68, 10 65, 5 55 Z" fill="url(#scalePattern)" />
                    
                    {/* INTERIOR DA BOCA (escuro) */}
                    <path d="M 18 48 C 25 55, 45 55, 52 48 C 45 58, 25 58, 18 48 Z" fill="url(#insideGrad)" stroke="#115e59" strokeWidth="0.8" />

                    {/* PARTE SUPERIOR DA CABEÇA (mais clara) */}
                    <path d="M 15 50 C 5 15, 65 15, 55 50 Z" fill="#14b8a6" opacity="0.25" />
                    

                    {/* PENAS LATERAIS (lado esquerdo) */}
                    <g transform="translate(8, 15)">
                        <path d="M 0 0 Q -10 -5 -8 -15 Q -4 -10 -2 -5 Z" fill="#0d9488" stroke="#0f766e" strokeWidth="0.5" />
                        <path d="M 0 5 Q -12 0 -10 -10 Q -6 -6 -3 0 Z" fill="#0f766e" stroke="#115e59" strokeWidth="0.5" />
                        <path d="M -2 -8 L -6 -12" stroke="#14b8a6" strokeWidth="0.3" opacity="0.5" />
                    </g>

                    {/* PENAS LATERAIS (lado direito) */}
                    <g transform="translate(62, 15)">
                        <path d="M 0 0 Q 10 -5 8 -15 Q 4 -10 2 -5 Z" fill="#0d9488" stroke="#0f766e" strokeWidth="0.5" />
                        <path d="M 0 5 Q 12 0 10 -10 Q 6 -6 3 0 Z" fill="#0f766e" stroke="#115e59" strokeWidth="0.5" />
                        <path d="M 2 -8 L 6 -12" stroke="#14b8a6" strokeWidth="0.3" opacity="0.5" />
                    </g>

                    {/* DENTES SUPERIORES (mandíbula de cima) */}
                    <g fill="url(#toothGrad)" stroke="#cbd5e1" strokeWidth="0.5">
                        {/* Caninos laterais */}
                        <path d="M 20 48 L 22 42 L 24 48 Z" />
                        <path d="M 50 48 L 52 42 L 54 48 Z" />
                        
                        {/* Dentes médios */}
                        <path d="M 25 49 L 27 44 L 29 49 Z" />
                        <path d="M 30 50 L 32 45 L 34 50 Z" />
                        <path d="M 36 50 L 38 45 L 40 50 Z" />
                        <path d="M 41 49 L 43 44 L 45 49 Z" />
                        <path d="M 46 48 L 48 43 L 50 48 Z" />
                        
                        {/* Dentes pequenos (internos) */}
                        <path d="M 27 48 L 28 45 L 29 48 Z" />
                        <path d="M 32 49 L 33 46 L 34 49 Z" />
                        <path d="M 37 49 L 38 46 L 39 49 Z" />
                        <path d="M 42 48 L 43 45 L 44 48 Z" />
                        
                        {/* Detalhe do dente (brilho) */}
                        <path d="M 21 46 L 22 44" stroke="#fff" strokeWidth="0.3" fill="none" opacity="0.6" />
                        <path d="M 51 46 L 52 44" stroke="#fff" strokeWidth="0.3" fill="none" opacity="0.6" />
                    </g>

                    {/* LÍNGUA (dentro da boca) */}
                    <path d="M 28 52 Q 35 58 42 52 Q 38 56 35 57 Q 32 56 28 52 Z" fill="#e11d48" opacity="0.7" />
                    <path d="M 32 53 Q 35 56 38 53" stroke="#be123c" strokeWidth="0.5" fill="none" opacity="0.5" />

                    {/* OLHO ESQUERDO */}
                    <g transform="translate(20, 28)">
                        {/* Órbita */}
                        <ellipse cx="0" cy="0" rx="7" ry="6" fill="#134e4a" stroke="#0d9488" strokeWidth="0.5" />
                        
                        {/* Globo ocular */}
                        <circle cx="0" cy="0" r="5" fill="url(#eyeGrad)" filter="url(#eyeGlow)" />
                        
                        {/* Pupila (vertical - olho de réptil) */}
                        <ellipse cx="0" cy="0" rx="1.5" ry="3.5" fill="#111" />
                        
                        {/* Brilho do olho */}
                        <circle cx="-1.5" cy="-1.5" r="1.5" fill="#fff" opacity="0.8" />
                        <circle cx="1.5" cy="1.5" r="0.8" fill="#fff" opacity="0.4" />
                        
                        {/* Sombra acima do olho */}
                        <path d="M -6 -4 Q 0 -8 6 -4" stroke="#115e59" strokeWidth="1" fill="none" opacity="0.5" />
                    </g>

                    {/* OLHO DIREITO */}
                    <g transform="translate(50, 28)">
                        {/* Órbita */}
                        <ellipse cx="0" cy="0" rx="7" ry="6" fill="#134e4a" stroke="#0d9488" strokeWidth="0.5" />
                        
                        {/* Globo ocular */}
                        <circle cx="0" cy="0" r="5" fill="url(#eyeGrad)" filter="url(#eyeGlow)" />
                        
                        {/* Pupila */}
                        <ellipse cx="0" cy="0" rx="1.5" ry="3.5" fill="#111" />
                        
                        {/* Brilho do olho */}
                        <circle cx="-1.5" cy="-1.5" r="1.5" fill="#fff" opacity="0.8" />
                        <circle cx="1.5" cy="1.5" r="0.8" fill="#fff" opacity="0.4" />
                        
                        {/* Sombra acima do olho */}
                        <path d="M -6 -4 Q 0 -8 6 -4" stroke="#115e59" strokeWidth="1" fill="none" opacity="0.5" />
                    </g>

                    {/* SOBRANCELHAS/CRISTA ACIMA DOS OLHOS */}
                    <path d="M 12 22 Q 20 18 28 22" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
                    <path d="M 42 22 Q 50 18 58 22" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />

                    {/* NARINA (fosca nasal) */}
                    <ellipse cx="35" cy="38" rx="3" ry="2" fill="#115e59" stroke="#0f766e" strokeWidth="0.5" />
                    <path d="M 33 38 Q 35 36 37 38" stroke="#0d9488" strokeWidth="0.5" fill="none" opacity="0.5" />

                    {/* ESCAMAS DETALHADAS NO CAPUZ */}
                    <g stroke="#0d9488" strokeWidth="0.5" fill="none" opacity="0.3">
                        <path d="M 15 35 Q 20 33 25 35" />
                        <path d="M 45 35 Q 50 33 55 35" />
                        <path d="M 25 40 Q 30 38 35 40" />
                        <path d="M 35 40 Q 40 38 45 40" />
                    </g>

                    {/* LINHAS DE EXPRESSÃO (rosto mais agressivo) */}
                    <path d="M 12 32 Q 15 35 14 40" stroke="#0f766e" strokeWidth="0.8" fill="none" opacity="0.5" />
                    <path d="M 58 32 Q 55 35 56 40" stroke="#0f766e" strokeWidth="0.8" fill="none" opacity="0.5" />

                    {/* BRILHO GERAL NO CAPUZ */}
                    <path d="M 20 15 Q 30 12 40 15 Q 35 18 20 15 Z" fill="#fff" opacity="0.06" />
                    <path d="M 25 20 Q 30 18 35 20" stroke="#fff" strokeWidth="0.5" fill="none" opacity="0.08" />

                    {/* SOMBRA ABAIXO DO CAPUZ */}
                    <path d="M 5 55 C 15 68, 55 68, 65 55 C 55 62, 15 62, 5 55 Z" fill="#0a0a0a" opacity="0.3" />
                </g>
            </>
        );
    }
},

// COROA PIRATA
{
    id: "acc_coroa_pirata",
    nome: "Coroa dos Mares",
    preco: 450,
    raridade: "Épico",
    tipo: "acessorio",
    render: () => {
        // 👇 AJUSTE A POSIÇÃO DO CHAPÉU AQUI
        const offsetX = 1;    // Move horizontal
        const offsetY = 28;    // Move vertical
        const rotacao = -20;     // Inclinação
        
        return (
            <>
                <defs>
                    {/* Gradiente do chapéu */}
                    <linearGradient id="chapeuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a1a1a" />
                        <stop offset="30%" stopColor="#2d2d2d" />
                        <stop offset="60%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#0a0a0a" />
                    </linearGradient>

                    {/* Gradiente da aba */}
                    <linearGradient id="abaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2d2d2d" />
                        <stop offset="50%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#0a0a0a" />
                    </linearGradient>

                    {/* Gradiente do dourado */}
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="30%" stopColor="#fcd34d" />
                        <stop offset="60%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>

                    {/* Sombra */}
                    <filter id="chapeuShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
                    </filter>

                    {/* Brilho do dourado */}
                    <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotacao})`} filter="url(#chapeuShadow)">
                    
                    {/* ABA DO CHAPÉU (parte de trás) */}
                    <path d="M -15 38 Q 40 -5 95 38 Q 70 30 -15 38 Z" fill="url(#abaGrad)" stroke="#333" strokeWidth="1" />
                    
                    {/* COPA DO CHAPÉU (parte principal) */}
                    <path d="M 5 30 C 5 -15, 75 -15, 75 30 C 75 35, 70 38, 65 38 C 40 42, 15 38, 5 30 Z" fill="url(#chapeuGrad)" stroke="#333" strokeWidth="1" />
                    
                    {/* DOBRAS E COSTURAS DO CHAPÉU */}
                    <path d="M 15 25 Q 20 20 25 25" stroke="#444" strokeWidth="0.8" fill="none" opacity="0.5" />
                    <path d="M 30 15 Q 35 10 40 15" stroke="#444" strokeWidth="0.8" fill="none" opacity="0.5" />
                    <path d="M 45 12 Q 50 8 55 12" stroke="#444" strokeWidth="0.8" fill="none" opacity="0.5" />
                    <path d="M 60 18 Q 65 14 70 18" stroke="#444" strokeWidth="0.8" fill="none" opacity="0.5" />
                    
                    {/* Costura central (vertical) */}
                    <path d="M 40 -5 L 40 38" stroke="#444" strokeWidth="1" strokeDasharray="3,3" fill="none" opacity="0.4" />
                    
                    {/* ABA DO CHAPÉU (parte da frente - virada para cima) */}
                    <path d="M -5 35 C 0 45, 80 45, 85 35 C 80 48, 0 48, -5 35 Z" fill="url(#abaGrad)" stroke="#333" strokeWidth="1" />
                    
                    {/* DOBRAS DA ABA */}
                    <path d="M 0 40 Q 20 46 40 42 Q 60 46 80 40" stroke="#444" strokeWidth="0.8" fill="none" opacity="0.4" />
                    <path d="M 5 43 Q 25 48 45 44 Q 65 48 85 43" stroke="#444" strokeWidth="0.5" fill="none" opacity="0.3" />

                    {/* CAVEIRA (na frente do chapéu) */}
                    <g transform="translate(40, 18)">
                        {/* Base da caveira */}
                        <ellipse cx="0" cy="0" rx="14" ry="12" fill="#e5e5e5" stroke="#999" strokeWidth="0.8" />
                        
                        {/* Olhos */}
                        <ellipse cx="-5" cy="-3" rx="3.5" ry="4" fill="#1a1a1a" />
                        <ellipse cx="5" cy="-3" rx="3.5" ry="4" fill="#1a1a1a" />
                        
                        {/* Brilho nos olhos */}
                        <circle cx="-4" cy="-4" r="1" fill="#fff" opacity="0.6" />
                        <circle cx="6" cy="-4" r="1" fill="#fff" opacity="0.6" />
                        
                        {/* Nariz (triângulo) */}
                        <path d="M -2 1 L 2 1 L 0 4 Z" fill="#999" />
                        
                        {/* Dentes (sorriso) */}
                        <path d="M -6 5 Q 0 10 6 5" stroke="#1a1a1a" strokeWidth="1" fill="none" />
                        <line x1="-3" y1="6" x2="-3" y2="9" stroke="#1a1a1a" strokeWidth="0.6" />
                        <line x1="0" y1="7" x2="0" y2="10" stroke="#1a1a1a" strokeWidth="0.6" />
                        <line x1="3" y1="6" x2="3" y2="9" stroke="#1a1a1a" strokeWidth="0.6" />
                        
                        {/* Rachadura na caveira */}
                        <path d="M -8 -8 L -6 -5 L -4 -7" stroke="#999" strokeWidth="0.5" fill="none" opacity="0.6" />
                    </g>

                    {/* OSSOS CRUZADOS (atrás da caveira) */}
                    <g transform="translate(40, 18)" opacity="0.8">
                        {/* Osso esquerdo */}
                        <path d="M -18 8 L 0 4 L -2 2 L -18 6 Z" fill="#e5e5e5" stroke="#999" strokeWidth="0.5" transform="rotate(-35, -9, 5)" />
                        <circle cx="-18" cy="8" r="2" fill="#e5e5e5" stroke="#999" strokeWidth="0.5" />
                        <circle cx="0" cy="4" r="2" fill="#e5e5e5" stroke="#999" strokeWidth="0.5" />
                        
                        {/* Osso direito */}
                        <path d="M 18 8 L 0 4 L 2 2 L 18 6 Z" fill="#e5e5e5" stroke="#999" strokeWidth="0.5" transform="rotate(35, 9, 5)" />
                        <circle cx="18" cy="8" r="2" fill="#e5e5e5" stroke="#999" strokeWidth="0.5" />
                    </g>

                    {/* FITAS DOURADAS NA LATERAL */}
                    <path d="M 5 30 Q 2 25 5 20" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#goldGlow)" />
                    <path d="M 75 30 Q 78 25 75 20" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#goldGlow)" />

                    {/* BORDA DOURADA NA BASE */}
                    <path d="M 5 30 C 5 35, 75 35, 75 30" stroke="url(#goldGrad)" strokeWidth="2" fill="none" opacity="0.8" />
                    <path d="M -5 35 C 0 42, 80 42, 85 35" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />

                    {/* PENA (decorativa no chapéu) */}
                    <g transform="translate(70, -2) rotate(25)">
                        <path d="M 0 0 Q 10 -15 5 -35 Q 0 -30 -5 -15 Q -8 -5 0 0 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="0.5" />
                        <path d="M 0 0 Q 8 -12 4 -30 Q 2 -25 -2 -12 Z" fill="#dc2626" opacity="0.7" />
                        <path d="M -1 -10 L -3 -20" stroke="#991b1b" strokeWidth="0.5" opacity="0.5" />
                        <path d="M 0 0 L 0 -8" stroke="#7c2d12" strokeWidth="1" />
                    </g>

                    {/* SEGUNDA PENA (menor) */}
                    <g transform="translate(65, -4) rotate(15) scale(0.7)">
                        <path d="M 0 0 Q 10 -15 5 -35 Q 0 -30 -5 -15 Q -8 -5 0 0 Z" fill="#fcd34d" stroke="#b45309" strokeWidth="0.5" />
                        <path d="M 0 0 Q 8 -12 4 -30 Q 2 -25 -2 -12 Z" fill="#fbbf24" opacity="0.7" />
                    </g>

                    {/* COSTURAS DETALHADAS (efeito couro) */}
                    <g stroke="#555" strokeWidth="0.5" strokeDasharray="2,3" fill="none" opacity="0.5">
                        <path d="M 10 25 Q 15 20 20 25" />
                        <path d="M 25 15 Q 30 10 35 15" />
                        <path d="M 45 10 Q 50 7 55 10" />
                        <path d="M 60 15 Q 65 12 70 15" />
                    </g>

                    {/* REFLEXO DE LUZ (couro brilhando) */}
                    <path d="M 15 10 Q 20 5 30 8 Q 25 12 15 10 Z" fill="#fff" opacity="0.05" />
                    <path d="M 50 8 Q 55 5 65 10 Q 58 13 50 8 Z" fill="#fff" opacity="0.04" />

                    {/* REBITE/BOTÃO DOURADO (lateral) */}
                    <circle cx="8" cy="28" r="2.5" fill="url(#goldGrad)" stroke="#b45309" strokeWidth="0.5" />
                    <circle cx="8" cy="28" r="1" fill="#fef08a" opacity="0.5" />
                    
                    <circle cx="72" cy="28" r="2.5" fill="url(#goldGrad)" stroke="#b45309" strokeWidth="0.5" />
                    <circle cx="72" cy="28" r="1" fill="#fef08a" opacity="0.5" />

                    {/* TECIDO INTERNO (forro vermelho) */}
                    <path d="M 10 30 C 15 35, 65 35, 70 30 C 50 38, 30 38, 10 30 Z" fill="#991b1b" opacity="0.6" />
                </g>
            </>
        );
    }
},
  
  // VISOR OSINT
  {
    id: "acc_visor_osint",
    nome: "Visor OSINT",
    preco: 120,
    raridade: "Comum",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(16, 54)">
        <defs>
          <linearGradient id="cyberGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(15, 23, 42, 0.95)" />
            <stop offset="50%" stopColor="rgba(22, 163, 74, 0.3)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0.8)" />
          </linearGradient>
          <pattern id="hexGrid" width="6" height="10" patternUnits="userSpaceOnUse">
            <path d="M 3 0 L 6 2.5 L 6 7.5 L 3 10 L 0 7.5 L 0 2.5 Z" fill="none" stroke="rgba(34, 197, 94, 0.15)" strokeWidth="0.5" />
          </pattern>
        </defs>

        <path d="M -4 5 L 0 8 L 0 16 L -4 19 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
        <path d="M 72 5 L 68 8 L 68 16 L 72 19 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
        
        <circle cx="-2" cy="12" r="1.5" fill="#475569" />
        <circle cx="70" cy="12" r="1.5" fill="#475569" />
        <path d="M -6 12 L -2 12 M 70 12 L 74 12" stroke="#22c55e" strokeWidth="1" filter="drop-shadow(0 0 2px #22c55e)" />

        <path d="M -1 7 L 34 7 L 38 10 L 69 7 L 69 18 L 65 24 L 38 24 L 34 20 L -1 24 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        
        <path d="M 1 9 L 33 9 L 36 12 L 67 9 L 67 17 L 64 22 L 37 22 L 34 18 L 1 22 Z" fill="url(#cyberGlass)" />
        <path d="M 1 9 L 33 9 L 36 12 L 67 9 L 67 17 L 64 22 L 37 22 L 34 18 L 1 22 Z" fill="url(#hexGrid)" />

        <g filter="drop-shadow(0 0 3px rgba(34,197,94,0.8))">
          <circle cx="16" cy="15" r="4" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.6" />
          <path d="M 16 9 L 16 11 M 16 19 L 16 21 M 10 15 L 12 15 M 20 15 L 22 15" stroke="#22c55e" strokeWidth="0.8" />
          <circle cx="16" cy="15" r="1" fill="#4ade80" />

          <circle cx="52" cy="15" r="4" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.6" />
          <path d="M 52 9 L 52 11 M 52 19 L 52 21 M 46 15 L 48 15 M 56 15 L 58 15" stroke="#22c55e" strokeWidth="0.8" />
          <circle cx="52" cy="15" r="1" fill="#4ade80" />

          <text x="3" y="13" fill="#4ade80" fontSize="3" fontFamily="monospace">SYS.IP: 192.168.1.X</text>
          <text x="3" y="17" fill="#4ade80" fontSize="3" fontFamily="monospace">PROXY: SECURE</text>
          
          <text x="44" y="13" fill="#4ade80" fontSize="3" fontFamily="monospace">TRGT: ACQUIRED</text>
          <text x="44" y="17" fill="#4ade80" fontSize="3" fontFamily="monospace">LAT: 12ms</text>

          <rect x="3" y="20" width="10" height="1.5" fill="rgba(34,197,94,0.3)" />
          <rect x="3" y="20" width="7" height="1.5" fill="#4ade80" />
          <rect x="55" y="20" width="10" height="1.5" fill="rgba(34,197,94,0.3)" />
          <rect x="55" y="20" width="9" height="1.5" fill="#4ade80" />

          <path d="M 32 14 L 33 12 L 34 16 L 35 13 L 36 17 L 37 14" fill="none" stroke="#4ade80" strokeWidth="0.5" />
        </g>

        <path d="M 2 9 L 20 9 L 10 20 L 2 20 Z" fill="rgba(255,255,255,0.15)" />
        <path d="M 50 9 L 66 9 L 66 15 L 55 20 Z" fill="rgba(255,255,255,0.05)" />

        <rect x="28" y="4" width="12" height="4" fill="#0f172a" rx="1" stroke="#334155" strokeWidth="1" />
        <circle cx="30" cy="6" r="1" fill="#ef4444" filter="drop-shadow(0 0 2px #ef4444)" />
        <circle cx="34" cy="6" r="1.5" fill="#3b82f6" />
        <rect x="37" y="5.5" width="2" height="1" fill="#cbd5e1" />
      </g>
    )
  },

  // CACHECOL STILA
  {
    id: "acc_cachecol_croche",
    nome: "Cachecol Stila",
    preco: 100,
    raridade: "Comum",
    tipo: "acessorio",
    render: () => {
      const generateStitches = () => {
        const stitches = [];
        for(let x = 5; x < 65; x += 4) {
          for(let y = 3; y < 18; y += 3) {
            const curve = Math.sin(x * 0.1) * 3; 
            stitches.push(
              <path key={`h_${x}_${y}`} d={`M ${x} ${y+curve} L ${x+2} ${y+2+curve} L ${x+4} ${y+curve}`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            );
          }
        }
        for(let x = 42; x < 55; x += 3) {
          for(let y = 18; y < 45; y += 3) {
            stitches.push(
              <path key={`v_${x}_${y}`} d={`M ${x} ${y} L ${x+1.5} ${y+2} L ${x+3} ${y}`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            );
          }
        }
        return stitches;
      };

      const generateFringes = () => {
        const fringes = [];
        for(let i = 0; i < 8; i++) {
          const x = 40 + (i * 2);
          const yStart = 45;
          const yEnd = 45 + 5 + Math.random() * 4; 
          const bend = Math.sin(i) * 2; 
          fringes.push(
            <path key={`f_${i}`} d={`M ${x} ${yStart} Q ${x + bend} ${yStart + 3} ${x} ${yEnd}`} stroke="#fbcfe8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          );
        }
        return fringes;
      };

      return (
        <g transform="translate(14, 80)">
          <defs>
            <linearGradient id="yarnVolumetric" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="40%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
            <linearGradient id="tailVolumetric" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9f1239" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#4c0519" />
            </linearGradient>
          </defs>

          <path d="M -2 15 Q 35 30 72 15 L 68 25 Q 35 40 2 25 Z" fill="rgba(0,0,0,0.4)" filter="blur(3px)" />

          <path d="M 40 15 Q 48 30 40 45 L 56 47 Q 60 30 52 15 Z" fill="url(#tailVolumetric)" />
          
          <path d="M 42 15 Q 48 25 43 35 T 48 46" fill="none" stroke="url(#gold)" strokeWidth="1" filter="drop-shadow(0 0 2px #fde047)" opacity="0.8" />
          
          <path d="M 46 15 Q 50 30 46 45" fill="none" stroke="#4c0519" strokeWidth="2" opacity="0.6" />
          <path d="M 51 16 Q 55 30 52 46" fill="none" stroke="#4c0519" strokeWidth="1.5" opacity="0.4" />

          <path d="M -2 5 Q 35 22 72 5 L 68 20 Q 35 38 2 20 Z" fill="url(#yarnVolumetric)" />
          
          <path d="M -2 5 Q 35 22 72 5 L 70 12 Q 35 28 0 12 Z" fill="rgba(255,255,255,0.15)" />
          
          <path d="M 2 20 Q 35 38 68 20 L 66 18 Q 35 34 4 18 Z" fill="rgba(0,0,0,0.3)" />

          <path d="M 38 12 Q 45 10 52 16 Q 50 25 40 22 Z" fill="#be185d" stroke="#881337" strokeWidth="1" />
          <path d="M 42 14 Q 45 18 43 21" fill="none" stroke="#4c0519" strokeWidth="1.5" opacity="0.5" />

          <path d="M 0 10 Q 35 26 68 10" fill="none" stroke="url(#gold)" strokeWidth="0.8" filter="drop-shadow(0 0 2px #fde047)" opacity="0.7" strokeDasharray="3 2" />

          {generateStitches()}
          {generateFringes()}

          <rect x="52" y="40" width="5" height="3" fill="#f8fafc" rx="0.5" transform="rotate(-10 52 40)" />
          <text x="53" y="42" fill="#0f172a" fontSize="1.5" fontWeight="bold" transform="rotate(-10 52 40)">STILA</text>
        </g>
      );
    }
  },

];