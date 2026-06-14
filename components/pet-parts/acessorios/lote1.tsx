"use client";

export const acessoriosLote1 = [
  {
    id: "acc_marcas_sukuna",
    nome: "Marcas Amaldiçoadas",
    preco: 250,
    raridade: "Raro",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(0, 3)" fill="#111" stroke="#111" strokeLinecap="round" strokeLinejoin="round" opacity="0.90">
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
    render: () => (
      <g transform="translate(15, 54)">
        <path d="M -2 0 L 32 0 L 30 20 Q 15 25 2 20 Z" fill="#111" stroke="#222" strokeWidth="1" />
        <path d="M 38 0 L 72 0 L 68 20 Q 55 25 40 20 Z" fill="#111" stroke="#222" strokeWidth="1" />
        <path d="M 30 5 Q 35 2 38 5" stroke="#111" strokeWidth="4" fill="none" />
        <path d="M 2 2 L 28 2 L 26 18 Q 15 22 4 18 Z" fill="url(#lensGlare)" />
        <path d="M 42 2 L 68 2 L 66 18 Q 55 22 44 18 Z" fill="url(#lensGlare)" />
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
    render: () => {
        // 👇 AJUSTE A POSIÇÃO DA VENDA AQUI
        const vendaOffsetX = -130;   // Move a venda (esquerda/direita)
        const vendaOffsetY = -85;    // Move a venda (cima/baixo)
        
        // 👇 AJUSTE A POSIÇÃO DAS ESFERAS AQUI
        const esferaLeftX = -6;   // Esfera vermelha (esquerda)
        const esferaRightX = 110;  // Esfera azul (direita)
        const esferaY = 150;       // Altura das esferas
        
        return (
            <>
                <defs>
                    {/* Gradiente do Vazio Roxo */}
                    <radialGradient id="vazioGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                        <stop offset="30%" stopColor="#7c3aed" stopOpacity="0.9" />
                        <stop offset="60%" stopColor="#6d28d9" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
                    </radialGradient>

                    {/* Gradiente da Esfera Vermelha (Cursed Energy) */}
                    <radialGradient id="redSphereGrad" cx="40%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#fca5a5" />
                        <stop offset="20%" stopColor="#f87171" />
                        <stop offset="50%" stopColor="#dc2626" />
                        <stop offset="80%" stopColor="#b91c1c" />
                        <stop offset="100%" stopColor="#7f1d1d" />
                    </radialGradient>

                    {/* Gradiente da Esfera Azul (Limitless) */}
                    <radialGradient id="blueSphereGrad" cx="40%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#93c5fd" />
                        <stop offset="20%" stopColor="#60a5fa" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="80%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#1e3a8a" />
                    </radialGradient>

                    {/* Glow das esferas */}
                    <filter id="sphereGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="vazioGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Gradiente da venda */}
                    <linearGradient id="vendaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>

                    {/* Sombra da venda */}
                    <filter id="vendaShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
                    </filter>

                    {/* Padrão de energia (hexágonos) */}
                    <pattern id="energyPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <polygon points="10,0 19,5 19,15 10,20 1,15 1,5" fill="none" stroke="#a855f7" strokeWidth="0.5" opacity="0.15" />
                    </pattern>
                </defs>

                {/* ========== ESFERA VERMELHA (Cursed Energy - Esquerda) ========== */}
                <g transform={`translate(${esferaLeftX}, ${esferaY})`} filter="url(#sphereGlow)">
                    {/* Rastro de energia */}
                    <ellipse cx="0" cy="0" rx="35" ry="25" fill="#dc2626" opacity="0.1">
                        <animate attributeName="rx" values="35;45;35" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="ry" values="25;35;25" dur="2s" repeatCount="indefinite" />
                    </ellipse>

                    {/* Esfera principal */}
                    <circle cx="0" cy="0" r="18" fill="url(#redSphereGrad)" />
                    
                    {/* Brilho interno */}
                    <ellipse cx="-4" cy="-5" rx="6" ry="8" fill="#fff" opacity="0.3" />
                    
                    {/* Anel de energia */}
                    <circle cx="0" cy="0" r="22" fill="none" stroke="#dc2626" strokeWidth="1.5" opacity="0.4">
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="0" cy="0" r="26" fill="none" stroke="#ef4444" strokeWidth="0.8" opacity="0.2">
                        <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="4s" repeatCount="indefinite" />
                    </circle>

                    {/* Partículas de energia vermelha */}
                    {[0, 1, 2, 3, 4].map(i => {
                        const ang = Date.now() / 200 + i * 72;
                        const x = Math.cos(ang) * 28;
                        const y = Math.sin(ang) * 28;
                        return (
                            <circle key={i} cx={x} cy={y} r="1.5" fill="#fca5a5" opacity="0.8">
                                <animate attributeName="r" values="1;2.5;1" dur="0.8s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
                            </circle>
                        );
                    })}

                    {/* Flutuação */}
                    <animateTransform attributeName="transform" type="translate" values={`${esferaLeftX},${esferaY};${esferaLeftX},${esferaY - 8};${esferaLeftX},${esferaY}`} dur="3s" repeatCount="indefinite" additive="replace" />
                </g>

                {/* ========== ESFERA AZUL (Limitless - Direita) ========== */}
                <g transform={`translate(${esferaRightX}, ${esferaY})`} filter="url(#sphereGlow)">
                    {/* Rastro de energia */}
                    <ellipse cx="0" cy="0" rx="35" ry="25" fill="#3b82f6" opacity="0.1">
                        <animate attributeName="rx" values="35;45;35" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="ry" values="25;35;25" dur="2.5s" repeatCount="indefinite" />
                    </ellipse>

                    {/* Esfera principal */}
                    <circle cx="0" cy="0" r="18" fill="url(#blueSphereGrad)" />
                    
                    {/* Brilho interno */}
                    <ellipse cx="-4" cy="-5" rx="6" ry="8" fill="#fff" opacity="0.35" />
                    
                    {/* Anel de energia */}
                    <circle cx="0" cy="0" r="22" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4">
                        <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="3.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="0" cy="0" r="26" fill="none" stroke="#60a5fa" strokeWidth="0.8" opacity="0.2">
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4.5s" repeatCount="indefinite" />
                    </circle>

                    {/* Partículas de energia azul */}
                    {[0, 1, 2, 3, 4].map(i => {
                        const ang = Date.now() / 200 + i * 72 + 36;
                        const x = Math.cos(ang) * 28;
                        const y = Math.sin(ang) * 28;
                        return (
                            <circle key={i} cx={x} cy={y} r="1.5" fill="#93c5fd" opacity="0.8">
                                <animate attributeName="r" values="1;2.5;1" dur="0.9s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.3;1;0.3" dur="0.9s" repeatCount="indefinite" />
                            </circle>
                        );
                    })}

                    {/* Flutuação */}
                    <animateTransform attributeName="transform" type="translate" values={`${esferaRightX},${esferaY};${esferaRightX},${esferaY - 10};${esferaRightX},${esferaY}`} dur="3.5s" repeatCount="indefinite" additive="replace" />
                </g>

                {/* ========== LINHA DE ENERGIA (conexão entre as esferas) ========== */}
                <g opacity="0.4">
                    <line x1={esferaLeftX + 18} y1={esferaY} x2={esferaRightX - 18} y2={esferaY} stroke="url(#vazioGrad)" strokeWidth="2" strokeDasharray="4,6">
                        <animate attributeName="strokeDashoffset" values="0;20;0" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
                    </line>
                </g>

                {/* ========== VAZIO ROXO (centro - quando colidem) ========== */}
                <g transform="translate(200, 200)" filter="url(#vazioGlow)">
                    {/* Efeito de pulsação */}
                    <circle cx="0" cy="0" r="0" fill="url(#vazioGrad)">
                        {/* Expansão e contração rítmica */}
                        <animate attributeName="r" values="0;25;0" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Anel de expansão */}
                    <circle cx="0" cy="0" r="0" fill="none" stroke="#a855f7" strokeWidth="2">
                        <animate attributeName="r" values="0;40;0" dur="4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite" />
                    </circle>

                    {/* Anel secundário */}
                    <circle cx="0" cy="0" r="0" fill="none" stroke="#7c3aed" strokeWidth="1">
                        <animate attributeName="r" values="0;55;0" dur="4s" repeatCount="indefinite" begin="0.5s" />
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="4s" repeatCount="indefinite" begin="0.5s" />
                    </circle>

                    {/* Partículas roxas explodindo */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                        const ang = i * 45;
                        const delay = i * 0.1;
                        return (
                            <g key={i}>
                                <circle cx="0" cy="0" r="2" fill="#c084fc">
                                    <animate attributeName="cx" values={`0;${Math.cos(ang * Math.PI / 180) * 45}`} dur="2s" repeatCount="indefinite" begin={`${delay}s`} />
                                    <animate attributeName="cy" values={`0;${Math.sin(ang * Math.PI / 180) * 45}`} dur="2s" repeatCount="indefinite" begin={`${delay}s`} />
                                    <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" begin={`${delay}s`} />
                                </circle>
                            </g>
                        );
                    })}
                </g>

                {/* ========== VENDA DO INFINITO (nos olhos) ========== */}
                <g transform={`translate(${vendaOffsetX + 130}, ${vendaOffsetY + 85})`} filter="url(#vendaShadow)">
                    
                    {/* Sombra da venda */}
                    <path d="M 0 8 Q 40 12 80 8 L 78 32 Q 40 38 2 32 Z" fill="#000" opacity="0.2" />

                    {/* Venda principal */}
                    <path d="M 6 58 L -4 40 L 12 36 L 6 12 L 28 22 L 26 -6 L 46 14 L 58 -10 L 66 16 L 88 0 L 80 24 L 104 32 L 88 44 L 100 58 L 94 58 Q 50 44 6 58 Z" fill="url(#vendaGrad)" stroke="#1e293b" strokeWidth="1.5" strokeLinejoin="round" />
                    
                    {/* Detalhes de dobra */}
                    <path d="M 12 36 L 20 34 M 28 28 L 28 12 M 46 14 L 36 4 M 66 16 L 62 6 M 80 24 L 88 0.1" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    
                    {/* Sombra interna */}
                    <path d="M 6 58 L -4 40 L 12 36 L 6 12 L 28 22 L 26 -6 L 46 14 L 58 -10 L 66 16 L 88 0 L 80 24 L 104 32 L 88 44 L 100 58 L 94 58 Q 50 44 6 58 Z" fill="none" stroke="#64748b" strokeWidth="0.5" opacity="0.3" />

                    {/* Forro interno da venda */}
                    <path d="M 5 57 Q 50 44 95 57 L 90 76 Q 50 82 10 76 Z" fill="#0f172a" />
                    <path d="M 5 57 Q 50 44 95 57 L 90 76 Q 50 82 10 76 Z" fill="none" stroke="#1e293b" strokeWidth="1" />

                    {/* Dobras do tecido */}
                    <path d="M 15 57 Q 50 67 85 57" stroke="#1e293b" strokeWidth="2" fill="none" />
                    <path d="M 30 67 Q 50 74 70 67" stroke="#1e293b" strokeWidth="1.5" fill="none" opacity="0.6" />
                    <path d="M 20 72 Q 50 80 80 72" stroke="#334155" strokeWidth="1" fill="none" opacity="0.3" />

                    {/* Textura do tecido (linhas sutis) */}
                    <g stroke="#cbd5e1" strokeWidth="0.3" opacity="0.2">
                        <path d="M 10 20 L 30 15 M 15 25 L 35 20 M 20 30 L 40 25 M 50 15 L 70 10 M 55 20 L 75 15 M 60 25 L 80 20" />
                    </g>

                    {/* Brilho no tecido */}
                    <path d="M 20 5 Q 35 0 50 5" stroke="#fff" strokeWidth="1" fill="none" opacity="0.15" />
                    <path d="M 60 5 Q 75 0 90 5" stroke="#fff" strokeWidth="1" fill="none" opacity="0.1" />

                    {/* INFINITO SÍMBOLO (∞) na venda */}
                    <g transform="translate(50, 35) scale(1.2)">
                        <path d="M -15 0 C -15 -8 -5 -8 0 0 C 5 -8 15 -8 15 0 C 15 8 5 8 0 0 C -5 8 -15 8 -15 0 Z" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                        <path d="M -15 0 C -15 -8 -5 -8 0 0 C 5 -8 15 -8 15 0 C 15 8 5 8 0 0 C -5 8 -15 8 -15 0 Z" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
                        <animateTransform attributeName="transform" type="rotate" values="0 50 35;360 50 35" dur="20s" repeatCount="indefinite" />
                    </g>

                    {/* Efeito Six Eyes (olhos brilhando atrás da venda) */}
                    <ellipse cx="35" cy="50" rx="8" ry="12" fill="#38bdf8" opacity="0.15" filter="url(#sphereGlow)">
                        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="3s" repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx="65" cy="50" rx="8" ry="12" fill="#38bdf8" opacity="0.15" filter="url(#sphereGlow)">
                        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="3s" repeatCount="indefinite" begin="0.5s" />
                    </ellipse>
                </g>
            </>
        );
    }
},

  {
    id: "acc_bone_bizarro",
    nome: "Boné Bizarro",
    preco: 300,
    raridade: "Raro",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(10, -5)">
        <path d="M 0 45 L -5 55 L 10 48 L 15 60 L 25 45 Z" fill="#111" />
        <path d="M 5 45 C 5 -5, 75 -5, 75 45 Z" fill="#171717" />
        <path d="M -5 45 Q 40 25 85 45 Q 40 38 -5 45 Z" fill="#111" />
        <rect x="25" y="32" width="16" height="8" fill="url(#gold)" rx="2" />
        <circle cx="33" cy="36" r="2" fill="#713f12" />
        <circle cx="55" cy="35" r="4" fill="url(#gold)" />
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
    render: () => {
        // 👇 AJUSTE A POSIÇÃO DO CHAPÉU AQUI
        const offsetX = 5;    // Move para esquerda (-) ou direita (+)
        const offsetY = -8;   // Move para cima (-) ou para baixo (+)
        
        // 👇 AJUSTE A ROTAÇÃO AQUI
        const rotacao = -5;    // Inclinação do chapéu (negativo = esquerda, positivo = direita)
        
        return (
            <>
                <g transform={`translate(${offsetX}, ${offsetY}) rotate(${rotacao})`}>
                    {/* Aba do chapéu (parte de trás) */}
                    <ellipse cx="45" cy="40" rx="48" ry="12" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
                    
                    {/* Copa do chapéu (parte principal) */}
                    <path d="M 20 38 C 20 0, 70 0, 70 38 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                    
                    {/* Linhas verticais (fibra do palha) */}
                    <path d="M 30 15 L 25 35 M 40 10 L 35 35 M 50 9 L 45 35 M 60 13 L 55 35 M 68 26 L 65 35" 
                          stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
                    
                    {/* Linhas horizontais (fibra do palha) */}
                    <path d="M 28 15 L 62 15 M 22 25 L 68 25 M 20 35 L 70 35" 
                          stroke="#ca8a04" strokeWidth="1" opacity="0.4" />
                    
                    {/* Fita vermelha do chapéu */}
                    <path d="M 20 34 Q 45 42 70 34 L 69 38 Q 45 46 21 38 Z" fill="#ef4444" />
                    
                    {/* Aba do chapéu (parte da frente) */}
                    <path d="M -3 40 Q 45 55 93 40 Q 45 48 -3 40 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                </g>
                
                {/* Fios pendurados (cordinhas do chapéu) */}
                <g transform={`translate(${offsetX + 0}, ${offsetY + 5})`}>
                    <path d="M 58 74 Q 65 79 72 74" stroke="#7c2d12" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85" />
                    <path d="M 61 73 L 63 78" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
                    <path d="M 67 73 L 69 78" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
                </g>
            </>
        );
    }
},

  {
    id: "acc_cartola_sonho",
    nome: "Cartola do Sonho",
    preco: 250,
    raridade: "Raro",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(15, -15)">
        <path d="M 18 40 L 18 -5 C 18 -30, 52 -30, 52 -5 L 52 40 Z" fill="#4c1d95" stroke="#3b0764" strokeWidth="1.5" />
        <path d="M 23 39 L 23 -5 C 23 -22, 30 -22, 30 -5 L 30 39 Z" fill="#7e22ce" opacity="0.6" />
        <ellipse cx="35" cy="15" rx="9" ry="22" fill="url(#gold)" stroke="#854d0e" strokeWidth="1.5" />
        <ellipse cx="35" cy="15" rx="4" ry="16" fill="#111" />
        <circle cx="35" cy="3" r="1.2" fill="url(#gold)" />
        <circle cx="35" cy="9" r="1.2" fill="url(#gold)" />
        <circle cx="35" cy="15" r="1.2" fill="url(#gold)" />
        <circle cx="35" cy="21" r="1.2" fill="url(#gold)" />
        <circle cx="35" cy="27" r="1.2" fill="url(#gold)" />
        <path d="M 17 38 Q 35 46 53 38 L 54 44 Q 35 52 16 44 Z" fill="url(#gold)" stroke="#854d0e" strokeWidth="1.5" />
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
    render: () => {
        // 👇 AJUSTE A POSIÇÃO AQUI
        const offsetX = 15;  // Move para esquerda (-) ou direita (+)
        const offsetY = -12;  // Move para cima (-) ou para baixo (+)
        
        // Valores sugeridos para teste:
        // offsetX: 0 (centro), 15 (direita), -5 (esquerda)
        // offsetY: -20 (mais alto), -5 (mais baixo), 0 (na cabeça)
        
        return (
            <>
                <defs>
                    {/* Gradiente principal do gorro */}
                    <linearGradient id="gorroGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbcfe8" />
                        <stop offset="30%" stopColor="#f9a8d4" />
                        <stop offset="60%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>

                    {/* Gradiente do pompom */}
                    <radialGradient id="pompomGrad" cx="40%" cy="30%" r="60%">
                        <stop offset="0%" stopColor="#fff5f9" />
                        <stop offset="40%" stopColor="#fbcfe8" />
                        <stop offset="80%" stopColor="#f9a8d4" />
                        <stop offset="100%" stopColor="#f472b6" />
                    </radialGradient>

                    {/* Gradiente do laço */}
                    <linearGradient id="lacoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#be185d" />
                    </linearGradient>

                    {/* Gradiente da flor */}
                    <radialGradient id="florGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fff" />
                        <stop offset="30%" stopColor="#fce7f3" />
                        <stop offset="70%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#db2777" />
                    </radialGradient>

                    {/* Sombra do gorro */}
                    <filter id="gorroShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.2" />
                    </filter>

                    {/* Brilho */}
                    <filter id="gorroGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Textura de crochê - padrão de pontos */}
                    <pattern id="crochePattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                        <circle cx="4" cy="4" r="2.5" fill="#ec4899" opacity="0.15" />
                        <circle cx="0" cy="0" r="1.5" fill="#f472b6" opacity="0.1" />
                        <circle cx="8" cy="8" r="1.5" fill="#f472b6" opacity="0.1" />
                        <path d="M 2 4 L 6 4 M 4 2 L 4 6" stroke="#be185d" strokeWidth="0.3" opacity="0.1" />
                    </pattern>

                    {/* Padrão de tricô (zig-zag) */}
                    <pattern id="tricoPattern" x="0" y="0" width="12" height="6" patternUnits="userSpaceOnUse">
                        <path d="M 0 3 L 3 0 L 6 3 L 9 0 L 12 3" stroke="#db2777" strokeWidth="0.5" fill="none" opacity="0.2" />
                        <path d="M 0 6 L 3 3 L 6 6 L 9 3 L 12 6" stroke="#f472b6" strokeWidth="0.3" fill="none" opacity="0.15" />
                    </pattern>
                </defs>

                <g transform={`translate(${offsetX}, ${offsetY})`} filter="url(#gorroShadow)">
                    
                    {/* Sombra no fundo */}
                    <ellipse cx="35" cy="52" rx="32" ry="6" fill="#000" opacity="0.15" />

                    {/* Pompom (bola no topo) - camada base */}
                    <circle cx="35" cy="-5" r="16" fill="url(#pompomGrad)" filter="url(#gorroGlow)" />
                    
                    {/* Pompom - textura de fios */}
                    <g opacity="0.4">
                        {[-8, -6, -4, -2, 0, 2, 4, 6, 8].map(i => (
                            <path key={i} d={`M 35 -5 Q ${30 + i} ${-15 + Math.abs(i)} ${35 + i} -8`} stroke="#fff" strokeWidth="1" fill="none" opacity="0.6" />
                        ))}
                        {[-6, -3, 0, 3, 6].map(i => (
                            <path key={i} d={`M 35 -5 Q ${40 + i} ${-12 + Math.abs(i)} ${35 + i} -3`} stroke="#fbcfe8" strokeWidth="0.8" fill="none" opacity="0.5" />
                        ))}
                    </g>

                    {/* Pompom - detalhes de luz */}
                    <ellipse cx="30" cy="-10" rx="6" ry="4" fill="#fff" opacity="0.3" />
                    <circle cx="28" cy="-12" r="3" fill="#fff" opacity="0.2" />

                    {/* Corpo principal do gorro */}
                    <path d="M 5 35 C 5 -10, 65 -10, 65 35 C 65 42, 62 48, 58 50 C 50 54, 20 54, 12 50 C 8 48, 5 42, 5 35 Z" fill="url(#gorroGrad)" />
                    
                    {/* Textura de crochê sobreposta */}
                    <path d="M 5 35 C 5 -10, 65 -10, 65 35 C 65 42, 62 48, 58 50 C 50 54, 20 54, 12 50 C 8 48, 5 42, 5 35 Z" fill="url(#crochePattern)" />
                    <path d="M 5 35 C 5 -10, 65 -10, 65 35 C 65 42, 62 48, 58 50 C 50 54, 20 54, 12 50 C 8 48, 5 42, 5 35 Z" fill="url(#tricoPattern)" />

                    {/* Linhas horizontais de crochê (carreiras) */}
                    <g stroke="#db2777" strokeWidth="0.8" opacity="0.25" fill="none">
                        <path d="M 6 30 Q 35 33 64 30" />
                        <path d="M 7 24 Q 35 27 63 24" />
                        <path d="M 8 18 Q 35 21 62 18" />
                        <path d="M 9 12 Q 35 15 61 12" />
                        <path d="M 12 6 Q 35 9 58 6" />
                        <path d="M 18 1 Q 35 3 52 1" />
                    </g>

                    {/* Linhas verticais (efeito sanfona do crochê) */}
                    <g stroke="#f472b6" strokeWidth="0.5" opacity="0.2" fill="none">
                        <path d="M 15 35 Q 15 15 20 2" />
                        <path d="M 25 38 Q 25 18 28 0" />
                        <path d="M 35 40 Q 35 15 35 -2" />
                        <path d="M 45 38 Q 45 18 42 0" />
                        <path d="M 55 35 Q 55 15 50 2" />
                    </g>

                    {/* Brilho/reflexo no gorro */}
                    <path d="M 15 10 Q 18 5 22 8 Q 19 12 15 10 Z" fill="#fff" opacity="0.3" filter="url(#gorroGlow)" />
                    <path d="M 20 15 Q 23 11 27 14 Q 24 18 20 15 Z" fill="#fff" opacity="0.2" />

                    {/* Borda inferior (punho do gorro) */}
                    <path d="M 5 35 C 5 42, 8 48, 12 50 C 20 54, 50 54, 58 50 C 62 48, 65 42, 65 35" fill="none" stroke="#be185d" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 5 35 C 5 42, 8 48, 12 50 C 20 54, 50 54, 58 50 C 62 48, 65 42, 65 35" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    
                    {/* Detalhe da borda sanfonada */}
                    <g stroke="#db2777" strokeWidth="1" opacity="0.4" fill="none">
                        <path d="M 7 38 Q 12 41 17 38" />
                        <path d="M 17 41 Q 22 44 27 41" />
                        <path d="M 27 43 Q 32 46 37 43" />
                        <path d="M 37 43 Q 42 46 47 43" />
                        <path d="M 47 41 Q 52 44 57 41" />
                        <path d="M 57 38 Q 62 41 63 38" />
                    </g>

                    {/* LAÇO LATERAL (esquerdo) */}
                    <g transform="translate(-2, 38) rotate(-15)">
                        <ellipse cx="12" cy="12" rx="14" ry="8" fill="#000" opacity="0.15" />
                        <path d="M 5 10 Q -5 -5 2 -8 Q 8 -10 10 2 Z" fill="url(#lacoGrad)" />
                        <path d="M 5 10 Q -5 -5 2 -8 Q 8 -10 10 2 Z" fill="none" stroke="#be185d" strokeWidth="0.5" />
                        <path d="M 10 10 Q 20 -5 13 -8 Q 7 -10 10 2 Z" fill="url(#lacoGrad)" />
                        <path d="M 10 10 Q 20 -5 13 -8 Q 7 -10 10 2 Z" fill="none" stroke="#be185d" strokeWidth="0.5" />
                        <rect x="6" y="6" width="8" height="8" rx="2" fill="#be185d" />
                        <rect x="7" y="7" width="6" height="6" rx="1" fill="#f472b6" />
                        <path d="M 8 14 Q 5 22 2 28" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M 12 14 Q 15 22 18 28" stroke="#f472b6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M 8 14 Q 5 22 2 28" stroke="#be185d" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5" />
                        <path d="M 12 14 Q 15 22 18 28" stroke="#be185d" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5" />
                    </g>

                    {/* FLOR DECORATIVA (lado direito) */}
                    <g transform="translate(68, 28) rotate(10)">
                        <ellipse cx="0" cy="2" rx="10" ry="5" fill="#000" opacity="0.12" />
                        {[-60, -30, 0, 30, 60].map((ang, i) => (
                            <g key={i} transform={`rotate(${ang})`}>
                                <ellipse cx="0" cy="-7" rx="5" ry="7" fill="url(#florGrad)" transform="rotate(0)">
                                    <animate attributeName="ry" values="7;6.5;7" dur="2s" repeatCount="indefinite" />
                                </ellipse>
                                <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#fce7f3" opacity="0.4" transform="rotate(0)" />
                            </g>
                        ))}
                        {[-45, 15, 75].map((ang, i) => (
                            <g key={i} transform={`rotate(${ang})`}>
                                <ellipse cx="0" cy="-5" rx="3.5" ry="5" fill="#fbcfe8" opacity="0.8" />
                            </g>
                        ))}
                        <circle cx="0" cy="0" r="4" fill="#f472b6" />
                        <circle cx="0" cy="0" r="2.5" fill="#ec4899" />
                        <circle cx="0" cy="0" r="1.5" fill="#be185d" />
                        <circle cx="-1" cy="-1" r="1" fill="#fff" opacity="0.6" />
                        <path d="M -6 3 Q -12 8 -8 12 Q -4 8 -5 4 Z" fill="#4ade80" opacity="0.7" />
                        <path d="M 6 3 Q 12 8 8 12 Q 4 8 5 4 Z" fill="#4ade80" opacity="0.7" />
                    </g>

                    {/* BOTÕES DECORATIVOS */}
                    <g transform="translate(62, 45)">
                        <circle cx="0" cy="0" r="3" fill="#fbcfe8" stroke="#f472b6" strokeWidth="0.5" />
                        <circle cx="0" cy="0" r="1.5" fill="#f472b6" />
                        <circle cx="-0.5" cy="-0.5" r="0.5" fill="#fff" opacity="0.5" />
                    </g>

                    {/* PARTÍCULAS MÁGICAS */}
                    <g opacity="0.4">
                        <circle cx="20" cy="20" r="1" fill="#fff">
                            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="50" cy="15" r="0.8" fill="#fbcfe8">
                            <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                        </circle>
                        <circle cx="35" cy="45" r="0.6" fill="#fff">
                            <animate attributeName="opacity" values="0;0.8;0" dur="1.8s" repeatCount="indefinite" begin="1s" />
                        </circle>
                    </g>
                </g>
            </>
        );
    }
},

{
    id: "acc_terminal_kali",
    nome: "Terminal Kali",
    preco: 600,
    raridade: "Lendário",
    tipo: "acessorio",
    render: () => {
        // 👇 AJUSTE A POSIÇÃO AQUI
        const offsetX = 5;   // Move para esquerda (-) ou direita (+)
        const offsetY = 10;  // Move para cima (-) ou para baixo (+)
        
        return (
            <>
                <defs>
                    {/* Gradiente da tela CRT */}
                    <linearGradient id="crtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a1a1a" />
                        <stop offset="50%" stopColor="#0a0a0a" />
                        <stop offset="100%" stopColor="#000000" />
                    </linearGradient>

                    {/* Gradiente do brilho da tela */}
                    <radialGradient id="screenGlow" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" />
                        <stop offset="70%" stopColor="#22c55e" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#000" stopOpacity="0" />
                    </radialGradient>

                    {/* Gradiente do corpo do terminal */}
                    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2a2a2a" />
                        <stop offset="50%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#0a0a0a" />
                    </linearGradient>

                    {/* Sombra do terminal */}
                    <filter id="terminalShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
                    </filter>

                    {/* Brilho da tela */}
                    <filter id="screenFilter" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Efeito CRT (linhas de scan) */}
                    <pattern id="crtLines" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="0" x2="4" y2="0" stroke="#fff" strokeWidth="0.3" opacity="0.03" />
                    </pattern>

                    {/* Padrão Matrix Rain */}
                    <pattern id="matrixRain" x="0" y="0" width="20" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                        <text x="0" y="8" fontSize="4" fill="#22c55e" opacity="0.08" fontFamily="monospace">0110</text>
                        <text x="10" y="20" fontSize="3" fill="#22c55e" opacity="0.05" fontFamily="monospace">101</text>
                        <text x="5" y="35" fontSize="3.5" fill="#22c55e" opacity="0.06" fontFamily="monospace">010</text>
                    </pattern>

                    {/* Gradiente do LED power */}
                    <radialGradient id="ledGreen" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="60%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#166534" />
                    </radialGradient>

                    <radialGradient id="ledRed" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#f87171" />
                        <stop offset="60%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#991b1b" />
                    </radialGradient>

                    <radialGradient id="ledYellow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fde047" />
                        <stop offset="60%" stopColor="#eab308" />
                        <stop offset="100%" stopColor="#854d0e" />
                    </radialGradient>
                </defs>

                <g transform={`translate(${offsetX}, ${offsetY})`} filter="url(#terminalShadow)">
                    
                    {/* Corpo principal do terminal */}
                    <rect x="-5" y="-5" width="100" height="55" rx="6" fill="url(#bodyGrad)" stroke="#333" strokeWidth="1" />
                    
                    {/* Borda do corpo */}
                    <rect x="-3" y="-3" width="96" height="51" rx="4" fill="none" stroke="#444" strokeWidth="0.5" />

                    {/* Tela CRT */}
                    <rect x="0" y="0" width="90" height="45" rx="3" fill="url(#crtGrad)" />
                    
                    {/* Efeito de brilho na tela */}
                    <rect x="0" y="0" width="90" height="45" rx="3" fill="url(#screenGlow)" />
                    
                    {/* Linhas CRT */}
                    <rect x="0" y="0" width="90" height="45" rx="3" fill="url(#crtLines)" />
                    
                    {/* Matrix rain overlay */}
                    <rect x="0" y="0" width="90" height="45" rx="3" fill="url(#matrixRain)" />

                    {/* Borda da tela */}
                    <rect x="0" y="0" width="90" height="45" rx="3" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                    <rect x="1" y="1" width="88" height="43" rx="2.5" fill="none" stroke="#22c55e" strokeWidth="0.3" opacity="0.5" />

                    {/* BARRA DE TÍTULO */}
                    <rect x="0" y="0" width="90" height="12" rx="3" fill="#111" />
                    <rect x="0" y="6" width="90" height="6" fill="#111" />
                    
                    {/* Botões da janela (fechar, minimizar, maximizar) */}
                    <circle cx="7" cy="6" r="2.5" fill="url(#ledRed)">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="14" cy="6" r="2.5" fill="url(#ledYellow)">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="21" cy="6" r="2.5" fill="url(#ledGreen)">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                    </circle>

                    {/* Brilho dos botões */}
                    <circle cx="6.5" cy="5.5" r="1" fill="#fff" opacity="0.3" />
                    <circle cx="13.5" cy="5.5" r="1" fill="#fff" opacity="0.3" />
                    <circle cx="20.5" cy="5.5" r="1" fill="#fff" opacity="0.3" />

                    {/* Título da janela */}
                    <text x="26" y="9" fill="#888" fontSize="5.5" fontFamily="monospace" fontWeight="bold">kali@foguinho: ~/hack</text>

                    {/* ÁREA DO TERMINAL */}
                    {/* Linha 1 - Usuário */}
                    <text x="5" y="22" fill="#22c55e" fontSize="7" fontFamily="monospace" fontWeight="bold">
                        root@foguinho
                    </text>
                    <text x="62" y="22" fill="#fff" fontSize="7" fontFamily="monospace">:~$</text>

                    {/* Linha 2 - Comando */}
                    <text x="5" y="32" fill="#22c55e" fontSize="7" fontFamily="monospace">./hack_ur_heart.sh</text>
                    
                    {/* Linha 3 - Output com animação de digitação */}
                    <text x="5" y="42" fill="#22c55e" fontSize="6" fontFamily="monospace" opacity="0.9">
                        <tspan>Hacking </tspan>
                        <tspan fill="#fff">▰▰▰▰▰</tspan>
                        <tspan fill="#22c55e"> 100%</tspan>
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
                    </text>

                    {/* Cursor piscando */}
                    <text x="82" y="32" fill="#fff" fontSize="7" fontFamily="monospace" opacity="0.9">
                        <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                        _
                    </text>

                    {/* DETALHES EXTRAS - LEDs de atividade */}
                    <g transform="translate(-2, 20)">
                        {/* LED de atividade de rede */}
                        <circle cx="0" cy="0" r="1.5" fill="#22c55e">
                            <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="0" cy="8" r="1.5" fill="#22c55e">
                            <animate attributeName="opacity" values="1;0;1" dur="0.6s" repeatCount="indefinite" />
                        </circle>
                    </g>

                    {/* ÍCONE DE WIFI */}
                    <g transform="translate(82, 38)" opacity="0.6">
                        <path d="M -3 -2 Q 0 -5 3 -2" stroke="#22c55e" strokeWidth="0.8" fill="none" />
                        <path d="M -1.5 -0.5 Q 0 -2.5 1.5 -0.5" stroke="#22c55e" strokeWidth="0.8" fill="none" />
                        <circle cx="0" cy="1" r="0.8" fill="#22c55e" />
                    </g>

                    {/* SCROLLBAR NA LATERAL */}
                    <rect x="86" y="14" width="2" height="28" rx="1" fill="#222" />
                    <rect x="86" y="14" width="2" height="8" rx="1" fill="#22c55e" opacity="0.6">
                        <animate attributeName="y" values="14;34;14" dur="3s" repeatCount="indefinite" />
                    </rect>

                    {/* PARTÍCULAS DE HACK (código caindo) */}
                    <g opacity="0.4">
                        {[0, 1, 2].map(i => (
                            <text key={i} x={10 + i * 25} y={-5 + i * 10} fontSize="4" fill="#22c55e" fontFamily="monospace" opacity="0">
                                {Math.random().toString(2).substring(2, 6)}
                                <animate attributeName="y" values="-5;45" dur={`${2 + i}s`} repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0;0.6;0" dur={`${2 + i}s`} repeatCount="indefinite" />
                            </text>
                        ))}
                    </g>

                    {/* REFLEXO NA TELA */}
                    <path d="M 2 2 L 30 2 L 15 10 Z" fill="#fff" opacity="0.03" />
                    <path d="M 70 2 L 88 2 L 88 15 Z" fill="#fff" opacity="0.02" />

                    {/* ANTENA / PLACA DE REDE */}
                    <g transform="translate(45, -4)">
                        <line x1="0" y1="2" x2="-3" y2="-6" stroke="#555" strokeWidth="1" />
                        <line x1="0" y1="2" x2="0" y2="-7" stroke="#555" strokeWidth="1" />
                        <line x1="0" y1="2" x2="3" y2="-6" stroke="#555" strokeWidth="1" />
                        <circle cx="0" cy="-7" r="1" fill="#22c55e">
                            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                    </g>

                    {/* PORTAS USB (na base) */}
                    <g transform="translate(5, 48)" opacity="0.6">
                        <rect x="0" y="0" width="4" height="3" rx="0.5" fill="#333" stroke="#444" strokeWidth="0.3" />
                        <rect x="0" y="0" width="4" height="1.5" rx="0.5" fill="#222" />
                        <rect x="7" y="0" width="4" height="3" rx="0.5" fill="#333" stroke="#444" strokeWidth="0.3" />
                        <rect x="7" y="0" width="4" height="1.5" rx="0.5" fill="#222" />
                    </g>

                    {/* PÉS DO TERMINAL */}
                    <rect x="10" y="50" width="8" height="2" rx="1" fill="#222" />
                    <rect x="72" y="50" width="8" height="2" rx="1" fill="#222" />
                </g>
            </>
        );
    }
},

{
    id: "acc_capacete_hipismo",
    nome: "Capacete de Hipismo",
    preco: 200,
    raridade: "Incomum",
    tipo: "acessorio",
    render: () => (
      <g transform="translate(10, -5)">
        <path d="M 10 40 C 10 -10, 70 -10, 70 40 Z" fill="#1e40af" />
        <path d="M 5 40 Q 40 55 75 40 Z" fill="url(#gold)" />
        <path d="M 35 1 L 35 41 M 45 1 L 45 41" stroke="#fde047" strokeWidth="2" />
        <text x="25" y="25" fill="#fde047" fontSize="16" fontWeight="900" fontStyle="Arial" fontFamily="monospace" style={{ letterSpacing: '1px' }}>DIO</text>
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
    render: () => {
        // Centro onde o pet está (ajuste conforme necessário)
        const centroX = 50;
        const centroY = 68
        const raioOrbita = 60;

        const espadas = [
            { nome: "Terra Blade", cor: "#4ade80", corEscura: "#166534", anguloInicial: 0, tamanho: 0.9 },
            { nome: "True Night's Edge", cor: "#a855f7", corEscura: "#4c1d95", anguloInicial: 51.4, tamanho: 0.85 },
            { nome: "Meowmere", cor: "#f472b6", corEscura: "#be185d", anguloInicial: 102.8, tamanho: 0.9 },
            { nome: "True Excalibur", cor: "#fbbf24", corEscura: "#b45309", anguloInicial: 154.2, tamanho: 0.85 },
            { nome: "Star Veah", cor: "#38bdf8", corEscura: "#0369a1", anguloInicial: 205.7, tamanho: 0.8 },
            { nome: "Mythril Sword", cor: "#c084fc", corEscura: "#6b21a5", anguloInicial: 257.1, tamanho: 0.85 },
            { nome: "Zenith", cor: "#e879f9", corEscura: "#a21caf", anguloInicial: 308.5, tamanho: 0.95 }
        ];

        // Componente de Espada com formato real
        const SwordBlade = ({ cor, corEscura, tamanho = 1 }: { cor: string; corEscura: string; tamanho?: number }) => (
            <g transform={`scale(${tamanho})`}>
                {/* Sombra */}
                <ellipse cx="18" cy="65" rx="14" ry="3" fill="#000" opacity="0.25" />
                
                {/* Brilho da lâmina (glow) */}
                <path d="M 8 45 L 18 35 L 38 -5 L 18 -10 L 5 5 Z" fill={cor} opacity="0.25" filter="url(#swordGlow)" />
                
                {/* Lâmina principal - formato de espada (apontando para cima) */}
                <path d="M 10 42 L 20 32 L 40 -3 L 38 -5 L 18 30 L 8 40 Z" fill={cor} opacity="0.9" />
                <path d="M 10 42 L 20 32 L 40 -3 L 20 -8 L 6 3 Z" fill={`url(#grad${cor.replace("#", "")})`} />
                
                {/* Fio da lâmina (parte mais brilhante) */}
                <path d="M 10 42 L 20 32 L 40 -3 L 38 -1 L 18 30 Z" fill="#ffffff" opacity="0.6" />
                
                {/* Ponta da lâmina */}
                <path d="M 38 -3 L 40 -3 L 39 -6 Z" fill="#ffffff" opacity="0.9">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="0.5s" repeatCount="indefinite" />
                </path>
                
                {/* Guarda da espada (crossguard) */}
                <path d="M 5 38 L 31 38 L 32 42 L 4 42 Z" fill="#374151" stroke={cor} strokeWidth="0.5" />
                
                {/* Detalhes da guarda */}
                <path d="M 3 40 Q 0 42 -2 46 Q 2 44 5 41 Z" fill={cor} stroke="#374151" strokeWidth="0.3" />
                <path d="M 33 40 Q 36 42 38 46 Q 34 44 31 41 Z" fill={cor} stroke="#374151" strokeWidth="0.3" />
                
                {/* Gema na guarda */}
                <circle cx="18" cy="40" r="2.5" fill={cor}>
                    <animate attributeName="r" values="2.5;3;2.5" dur="1.5s" repeatCount="indefinite" />
                </circle>
                
                {/* Cabo da espada (grip) */}
                <rect x="12" y="42" width="12" height="18" rx="2" fill="#1f2937" />
                
                {/* Textura do cabo (enrolado) */}
                <line x1="12" y1="45" x2="24" y2="45" stroke="#374151" strokeWidth="0.8" />
                <line x1="12" y1="48" x2="24" y2="48" stroke="#374151" strokeWidth="0.8" />
                <line x1="12" y1="51" x2="24" y2="51" stroke="#374151" strokeWidth="0.8" />
                <line x1="12" y1="54" x2="24" y2="54" stroke="#374151" strokeWidth="0.8" />
                
                {/* Fio de ouro no cabo */}
                <path d="M 14 43 Q 18 46 14 49 Q 18 52 14 55 Q 18 58 14 60" stroke="#fbbf24" strokeWidth="0.5" fill="none" opacity="0.6" />
                
                {/* Punho (pommel) */}
                <ellipse cx="18" cy="63" rx="7" ry="4" fill="#fbbf24" />
                <ellipse cx="18" cy="62" rx="5" ry="2.5" fill="#fef08a" opacity="0.5" />
                
                {/* Gema do punho */}
                <circle cx="18" cy="61" r="2" fill={cor} stroke="#ffffff" strokeWidth="0.5">
                    <animate attributeName="r" values="2;2.5;2" dur="1s" repeatCount="indefinite" />
                </circle>
                
                {/* Fita decorativa */}
                <path d="M 11 62 Q 18 66 25 62" stroke="#fbbf24" strokeWidth="0.8" fill="none" opacity="0.5" />
            </g>
        );

        return (
            <>
                <defs>
                    {/* Filtros */}
                    <filter id="swordGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="orbitGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="starFilter" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" />
                    </filter>

                    {/* Gradientes das espadas */}
                    <linearGradient id="grad4ade80" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" /><stop offset="100%" stopColor="#166534" />
                    </linearGradient>
                    <linearGradient id="grada855f7" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#4c1d95" />
                    </linearGradient>
                    <linearGradient id="gradf472b6" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#be185d" />
                    </linearGradient>
                    <linearGradient id="gradfbbf24" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                    <linearGradient id="grad38bdf8" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#0369a1" />
                    </linearGradient>
                    <linearGradient id="gradc084fc" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#6b21a5" />
                    </linearGradient>
                    <linearGradient id="grade879f9" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e879f9" /><stop offset="100%" stopColor="#a21caf" />
                    </linearGradient>

                    {/* Gradiente do arco-íris celestial */}
                    <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff00ff" />
                        <stop offset="20%" stopColor="#ff4400" />
                        <stop offset="40%" stopColor="#ffcc00" />
                        <stop offset="60%" stopColor="#00ff88" />
                        <stop offset="80%" stopColor="#0088ff" />
                        <stop offset="100%" stopColor="#cc00ff" />
                    </linearGradient>
                </defs>

                {/* Círculo mágico no chão */}
                <ellipse cx={centroX} cy={centroY + 110} rx={raioOrbita + 25} ry="28" fill="none" stroke="url(#rainbowGrad)" strokeWidth="1.5" opacity="0.35" filter="url(#swordGlow)">
                    <animate attributeName="opacity" values="0.35;0.6;0.35" dur="3s" repeatCount="indefinite" />
                </ellipse>

                {/* 7 ESPADAS EM ÓRBITA - TODAS APONTANDO PARA O CENTRO */}
                {espadas.map((espada, idx) => {
                    const speed = 5;
                    const anguloRad = (espada.anguloInicial + Date.now() / speed) * Math.PI / 180;
                    const x = centroX + Math.cos(anguloRad) * raioOrbita;
                    const y = centroY + Math.sin(anguloRad) * raioOrbita;
                    
                    // Calcula o ângulo para a espada apontar para o centro
                    // O ângulo da posição + 180° faz a ponta mirar o centro
                    const anguloApontar = (Math.atan2(centroY - y, centroX - x) * 180 / Math.PI) + 90;

                    return (
                        <g key={idx} transform={`translate(${x}, ${y}) rotate(${anguloApontar})`} filter="url(#orbitGlow)">
                            {/* Rastro de luz */}
                            <circle cx="0" cy="0" r="4" fill={espada.cor} opacity="0.3">
                                <animate attributeName="r" values="3;6;3" dur="0.3s" repeatCount="indefinite" />
                            </circle>
                            
                            {/* A espada */}
                            <SwordBlade cor={espada.cor} corEscura={espada.corEscura} tamanho={espada.tamanho} />
                        </g>
                    );
                })}

                {/* Órbitas visíveis */}
                <ellipse cx={centroX} cy={centroY} rx={raioOrbita} ry={raioOrbita} fill="none" stroke="url(#rainbowGrad)" strokeWidth="0.8" strokeDasharray="3,6" opacity="0.25">
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${centroX} ${centroY}`} to={`360 ${centroX} ${centroY}`} dur="10s" repeatCount="indefinite" />
                </ellipse>

                <ellipse cx={centroX} cy={centroY} rx={raioOrbita - 15} ry={raioOrbita - 15} fill="none" stroke="#e879f9" strokeWidth="0.5" opacity="0.15">
                    <animateTransform attributeName="transform" type="rotate" from={`360 ${centroX} ${centroY}`} to={`0 ${centroX} ${centroY}`} dur="7s" repeatCount="indefinite" />
                </ellipse>

                {/* Partículas orbitais (centelhas) */}
                <g opacity="0.5">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                        const ang = (Date.now() / 4 + i * 45) * Math.PI / 180;
                        const x = centroX + Math.cos(ang) * (raioOrbita + 12);
                        const y = centroY + Math.sin(ang) * (raioOrbita + 12);
                        return (
                            <circle key={i} cx={x} cy={y} r="1.5" fill="#ffffff" filter="url(#starFilter)">
                                <animate attributeName="r" values="1;2.5;1" dur="0.4s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0;1;0" dur="0.4s" repeatCount="indefinite" />
                            </circle>
                        );
                    })}
                </g>
            </>
        );
    }
}

];