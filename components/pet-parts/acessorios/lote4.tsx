"use client";

export const acessoriosLote4 = [
  {
    id: "acc_coroa_flores",
    nome: "Coroa de Sylvan",
    preco: 200,
    raridade: "Raro",
    tipo: "acessorio",
    posicao: { x: 0, y: 40 }, // ← Coroa flutuando acima da cabeça (y=-30 é suficiente)
    render: (posX = 0, posY = 40) => (
      // Centralizado (x=25) + posX, y=-25 + posY (que já vem -30 = total -55 do topo do SVG)
      <g transform={`translate(${25 + posX}, ${-25 + posY})`}>
        <defs>
          <radialGradient id="florRosa" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="60%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#be185d" />
          </radialGradient>
          <radialGradient id="florRoxa" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="60%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7e22ce" />
          </radialGradient>
          <radialGradient id="florAzul" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="60%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1e40af" />
          </radialGradient>
          <radialGradient id="mioloFlor" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
          <filter id="brilhoCoroa" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="sombraSuave" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        <g filter="url(#sombraSuave)">
          {/* Grinalda base */}
          <path d="M -5 18 Q 25 32 55 18" fill="none" stroke="#064e3b" strokeWidth="4" strokeLinecap="round" />
          <path d="M -5 18 Q 25 32 55 18" fill="none" stroke="#166534" strokeWidth="2.5" strokeDasharray="4,6" strokeLinecap="round" />
          
          {/* Folhas */}
          {[-3, 5, 12, 20, 28, 35, 42, 50].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${15 + Math.sin(x) * 4})`}>
              <path d="M 0 0 Q -4 -6 0 -10 Q 4 -6 0 0 Z" fill="#22c55e" opacity="0.8" />
              <path d="M 0 0 Q 4 -6 0 -10 Q -4 -6 0 0 Z" fill="#16a34a" opacity="0.6" />
            </g>
          ))}
          
          {/* Flor Rosa (esquerda) */}
          <g transform="translate(8, 10)">
            <circle cx="0" cy="0" r="7" fill="url(#florRosa)" filter="url(#brilhoCoroa)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <ellipse
                key={i}
                cx={Math.cos(angle * Math.PI / 180) * 5}
                cy={Math.sin(angle * Math.PI / 180) * 5}
                rx="3"
                ry="5"
                fill="url(#florRosa)"
                transform={`rotate(${angle}, ${Math.cos(angle * Math.PI / 180) * 5}, ${Math.sin(angle * Math.PI / 180) * 5})`}
              />
            ))}
            <circle cx="0" cy="0" r="3" fill="url(#mioloFlor)" />
            <circle cx="0" cy="0" r="1" fill="#fef08a" />
          </g>
          
          {/* Flor Roxa (centro - maior) */}
          <g transform="translate(25, 16)">
            <circle cx="0" cy="0" r="9" fill="url(#florRoxa)" filter="url(#brilhoCoroa)" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <ellipse
                key={i}
                cx={Math.cos(angle * Math.PI / 180) * 7}
                cy={Math.sin(angle * Math.PI / 180) * 7}
                rx="3.5"
                ry="6"
                fill="url(#florRoxa)"
                transform={`rotate(${angle}, ${Math.cos(angle * Math.PI / 180) * 7}, ${Math.sin(angle * Math.PI / 180) * 7})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.5" fill="url(#mioloFlor)" />
            <circle cx="0" cy="0" r="1.5" fill="#fef08a" />
            <circle cx="0" cy="0" r="4" fill="#fef08a" opacity="0.3" filter="url(#brilhoCoroa)" />
          </g>
          
          {/* Flor Azul (direita) */}
          <g transform="translate(42, 10)">
            <circle cx="0" cy="0" r="7" fill="url(#florAzul)" filter="url(#brilhoCoroa)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <ellipse
                key={i}
                cx={Math.cos(angle * Math.PI / 180) * 5}
                cy={Math.sin(angle * Math.PI / 180) * 5}
                rx="3"
                ry="5"
                fill="url(#florAzul)"
                transform={`rotate(${angle}, ${Math.cos(angle * Math.PI / 180) * 5}, ${Math.sin(angle * Math.PI / 180) * 5})`}
              />
            ))}
            <circle cx="0" cy="0" r="3" fill="url(#mioloFlor)" />
            <circle cx="0" cy="0" r="1" fill="#fef08a" />
          </g>
          
          {/* Botões de flor */}
          {[0, 18, 35, 50].map((x, i) => (
            <g key={`bud-${i}`} transform={`translate(${x + 5}, ${5 + i * 2})`}>
              <ellipse cx="0" cy="0" rx="2.5" ry="4" fill="#f472b6" opacity="0.7" />
              <path d="M -1 0 Q 0 -3 1 0" fill="none" stroke="#fde047" strokeWidth="0.5" />
            </g>
          ))}
        </g>
        
        {/* Pétalas caindo */}
        <g opacity="0.4">
          <ellipse cx="-2" cy="30" rx="1.5" ry="2.5" fill="#f472b6" transform="rotate(25, -2, 30)">
            <animate attributeName="cy" values="30;50" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0" dur="4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="52" cy="28" rx="1.5" ry="2.5" fill="#60a5fa" transform="rotate(-15, 52, 28)">
            <animate attributeName="cy" values="28;48" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0" dur="3.5s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </g>
    )
  },
  
  {
    id: "acc_chifres_cervo",
    nome: "Chifres Anciões",
    preco: 400,
    raridade: "Épico",
    tipo: "acessorio",
    posicao: { x: 0, y: 40 }, // ← Chifres no topo da cabeça
    render: (posX = 0, posY = 40 ) => (
      <g transform={`translate(${25 + posX}, ${-30 + posY})`}>
        <defs>
          <linearGradient id="chifreGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="40%" stopColor="#78350f" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="chifreGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="50%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="brilhoChifre" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
            <feSpecularLighting result="specOut" specularExponent="20" lightingColor="#fbbf24">
              <fePointLight x="25" y="-30" z="10" />
            </feSpecularLighting>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="0.3" k4="0" />
          </filter>
          <filter id="sombraChifre" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>
        
        <g filter="url(#sombraChifre)">
          {/* Chifre Esquerdo */}
          <path d="M 10 35 Q 5 20 -5 5 Q -12 -8 -8 -15" fill="none" stroke="url(#chifreGrad)" strokeWidth="5" strokeLinecap="round" />
          <path d="M 5 18 Q -8 12 -15 5" fill="none" stroke="url(#chifreGrad2)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 0 10 Q -5 2 -12 -2" fill="none" stroke="url(#chifreGrad2)" strokeWidth="3" strokeLinecap="round" />
          <path d="M -10 -5 Q -15 -12 -20 -8" fill="none" stroke="url(#chifreGrad2)" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Textura */}
          <path d="M 8 30 Q 4 18 -4 8" fill="none" stroke="#451a03" strokeWidth="1" opacity="0.4" />
          <path d="M 6 25 Q 3 15 -2 12" fill="none" stroke="#451a03" strokeWidth="0.8" opacity="0.3" />
          
          {/* Chifre Direito */}
          <path d="M 40 35 Q 45 20 55 5 Q 62 -8 58 -15" fill="none" stroke="url(#chifreGrad)" strokeWidth="5" strokeLinecap="round" />
          <path d="M 45 18 Q 58 12 65 5" fill="none" stroke="url(#chifreGrad2)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 50 10 Q 55 2 62 -2" fill="none" stroke="url(#chifreGrad2)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 60 -5 Q 65 -12 70 -8" fill="none" stroke="url(#chifreGrad2)" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Textura */}
          <path d="M 42 30 Q 46 18 54 8" fill="none" stroke="#451a03" strokeWidth="1" opacity="0.4" />
          <path d="M 44 25 Q 47 15 52 12" fill="none" stroke="#451a03" strokeWidth="0.8" opacity="0.3" />
          
          {/* Pontas Brilhantes */}
          <circle cx="-8" cy="-15" r="2.5" fill="#fbbf24" opacity="0.8" filter="url(#brilhoChifre)">
            <animate attributeName="r" values="2;3.5;2" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="58" cy="-15" r="2.5" fill="#fbbf24" opacity="0.8" filter="url(#brilhoChifre)">
            <animate attributeName="r" values="2;3.5;2" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="-20" cy="-8" r="1.8" fill="#fbbf24" opacity="0.6" filter="url(#brilhoChifre)">
            <animate attributeName="r" values="1.5;2.5;1.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="-8" r="1.8" fill="#fbbf24" opacity="0.6" filter="url(#brilhoChifre)">
            <animate attributeName="r" values="1.5;2.5;1.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
          
          {/* Base dos Chifres */}
          <ellipse cx="10" cy="35" rx="8" ry="4" fill="#78350f" stroke="#451a03" strokeWidth="1" />
          <ellipse cx="40" cy="35" rx="8" ry="4" fill="#78350f" stroke="#451a03" strokeWidth="1" />
        </g>
      </g>
    )
  },
  
 
 {
    id: "acc_asas_borboleta",
    nome: "Asas de Fada",
    preco: 800,
    raridade: "Lendário",
    tipo: "acessorio",
    // Posição original sem deslocamento extra (centralizado atrás do pet)
    posicao: { x: 15, y: 20 },
    render: (posX = 15, posY = 20) => (
      <g transform={`translate(${25 + posX}, ${10 + posY})`}>
        <defs>
          <linearGradient id="asaEsquerdaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#6ee7b7" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#34d399" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="asaDireitaGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#6ee7b7" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#34d399" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.7" />
          </linearGradient>
          
          <filter id="brilhoAsa" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glowAsa" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.5  0 0 0 0 0.2  0 0 0 0.5 0" />
          </filter>
        </defs>
        
        <style>
          {`
            @keyframes flutterAsa {
              0%, 100% { transform: scaleX(1) scaleY(1); }
              50% { transform: scaleX(0.85) scaleY(1.05); }
            }
          `}
        </style>
        
        <circle cx="10" cy="15" r="45" fill="url(#asaEsquerdaGrad)" filter="url(#glowAsa)" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="15" r="45" fill="url(#asaDireitaGrad)" filter="url(#glowAsa)" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        
        <g style={{ animation: 'flutterAsa 0.25s ease-in-out infinite', transformOrigin: '25px 20px' }}>
          <g filter="url(#brilhoAsa)">
            <path d="M 0 0 C -35 -40, -65 5, 0 25 Z" fill="url(#asaEsquerdaGrad)" stroke="#059669" strokeWidth="1.5" />
            <path d="M 0 0 C -15 -15, -25 0, -10 12" fill="none" stroke="#047857" strokeWidth="0.8" opacity="0.5" />
            <path d="M -5 5 C -20 -5, -35 5, -20 15" fill="none" stroke="#047857" strokeWidth="0.6" opacity="0.4" />
            <path d="M -10 10 C -25 0, -40 10, -25 20" fill="none" stroke="#047857" strokeWidth="0.6" opacity="0.3" />
            
            <circle cx="-15" cy="-5" r="1.5" fill="#fef08a" opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="-30" cy="5" r="1" fill="#fef08a" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="-20" cy="15" r="1.2" fill="#fef08a" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.3s" repeatCount="indefinite" />
            </circle>
          </g>
          
          <g filter="url(#brilhoAsa)">
            <path d="M 0 15 C -25 20, -40 45, 0 35 Z" fill="url(#asaEsquerdaGrad)" stroke="#059669" strokeWidth="1.2" />
            <path d="M 0 20 C -10 25, -20 35, -10 30" fill="none" stroke="#047857" strokeWidth="0.6" opacity="0.4" />
            <circle cx="-10" cy="25" r="1" fill="#fef08a" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </g>
          
          <g filter="url(#brilhoAsa)">
            <path d="M 25 0 C 60 -40, 90 5, 25 25 Z" fill="url(#asaDireitaGrad)" stroke="#059669" strokeWidth="1.5" />
            <path d="M 25 0 C 40 -15, 50 0, 35 12" fill="none" stroke="#047857" strokeWidth="0.8" opacity="0.5" />
            <path d="M 30 5 C 45 -5, 60 5, 45 15" fill="none" stroke="#047857" strokeWidth="0.6" opacity="0.4" />
            <path d="M 35 10 C 50 0, 65 10, 50 20" fill="none" stroke="#047857" strokeWidth="0.6" opacity="0.3" />
            
            <circle cx="40" cy="-5" r="1.5" fill="#fef08a" opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="55" cy="5" r="1" fill="#fef08a" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="45" cy="15" r="1.2" fill="#fef08a" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.3s" repeatCount="indefinite" />
            </circle>
          </g>
          
          <g filter="url(#brilhoAsa)">
            <path d="M 25 15 C 50 20, 65 45, 25 35 Z" fill="url(#asaDireitaGrad)" stroke="#059669" strokeWidth="1.2" />
            <path d="M 25 20 C 35 25, 45 35, 35 30" fill="none" stroke="#047857" strokeWidth="0.6" opacity="0.4" />
            <circle cx="35" cy="25" r="1" fill="#fef08a" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {[...Array(6)].map((_, i) => (
            <circle
              key={`dust-${i}`}
              cx={10 + Math.random() * 40}
              cy={20 + Math.random() * 20}
              r="0.8"
              fill="#a7f3d0"
              opacity="0"
            >
              <animate 
                attributeName="cy" 
                values={`${20 + Math.random() * 30};60`} 
                dur={`${2 + Math.random() * 2}s`} 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="opacity" 
                values="0;0.6;0" 
                dur={`${2 + Math.random() * 2}s`} 
                repeatCount="indefinite" 
              />
            </circle>
          ))}
        </g>
      </g>
    )
  },
  
{
    id: "acc_espirito_floresta",
    nome: "Espírito Companheiro",
    preco: 1200,
    raridade: "Mítico",
    tipo: "acessorio",
    posicao: { x: 25, y: 35 },
    render: (posX = 25, posY = 35) => (
      <g transform={`translate(${50 + posX}, ${-20 + posY})`}>
        <defs>
          {/* Gradientes Principais */}
          <radialGradient id="wispCore" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="10%" stopColor="#c4f5e0" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#6ee7b7" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#34d399" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="wispAura" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#34d399" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="85%" stopColor="#059669" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="wispGlowOuter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#34d399" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#059669" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
          </radialGradient>

          {/* Gradiente dos Olhos */}
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#bef264" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a3e635" stopOpacity="0.6" />
          </radialGradient>

          {/* Gradiente da Coroa */}
          <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
          </linearGradient>
          
          {/* Filtros Melhorados */}
          <filter id="glowWisp" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowIntenso" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="15" result="blur1" />
            <feGaussianBlur stdDeviation="25" result="blur2" />
            <feGaussianBlur stdDeviation="35" result="blur3" />
            <feColorMatrix in="blur3" type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.5  0 0 0 0 0.1  0 0 0 0.8 0" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
            </feMerge>
          </filter>

          <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.4  0 0 0 0 0.9  0 0 0 0 0.3  0 0 0 0.8 0" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="starTwinkle" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <style>
          {`
            @keyframes floatWisp {
              0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
              20% { transform: translateY(-6px) translateX(4px) rotate(3deg); }
              40% { transform: translateY(-14px) translateX(2px) rotate(0deg); }
              60% { transform: translateY(-8px) translateX(-3px) rotate(-2deg); }
              80% { transform: translateY(-2px) translateX(-5px) rotate(-1deg); }
            }
            
            @keyframes spinReverse {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            
            @keyframes crownFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-3px) rotate(2deg); }
            }
          `}
        </style>
        
        {/* Aura Externa Massiva */}
        <circle cx="0" cy="0" r="45" fill="url(#wispGlowOuter)" filter="url(#glowIntenso)">
          <animate attributeName="r" values="38;52;38" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Aura Média */}
        <circle cx="0" cy="0" r="28" fill="url(#wispAura)" filter="url(#glowWisp)">
          <animate attributeName="r" values="24;32;24" dur="2.5s" repeatCount="indefinite" />
        </circle>
        
        <g style={{ animation: 'floatWisp 3.5s ease-in-out infinite' }}>
          {/* Anéis de Energia Múltiplos */}
          <circle 
            cx="0" 
            cy="0" 
            r="22" 
            fill="none" 
            stroke="#6ee7b7" 
            strokeWidth="1.2" 
            strokeDasharray="4,8"
            opacity="0.6"
          >
            <animate attributeName="strokeDashoffset" values="0;24" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="r" values="20;24;20" dur="2.2s" repeatCount="indefinite" />
          </circle>
          
          <circle 
            cx="0" 
            cy="0" 
            r="26" 
            fill="none" 
            stroke="#34d399" 
            strokeWidth="0.6" 
            strokeDasharray="2,10"
            opacity="0.4"
          >
            <animate attributeName="strokeDashoffset" values="0;36" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="24;28;24" dur="2.8s" repeatCount="indefinite" />
          </circle>

          {/* Corpo da Wisp com Forma Mais Orgânica */}
          <g filter="url(#glowWisp)">
            <path 
              d="M 0 -10 C 8 -10, 13 -4, 10 4 C 8 11, 3 15, 0 18 C -3 15, -8 11, -10 4 C -13 -4, -8 -10, 0 -10 Z" 
              fill="url(#wispCore)" 
            />
            
            {/* Camadas Internas para Profundidade */}
            <path 
              d="M 0 -6 C 5 -6, 8 -2, 6 3 C 5 8, 2 11, 0 13 C -2 11, -5 8, -6 3 C -8 -2, -5 -6, 0 -6 Z" 
              fill="#a7f3d0" 
              opacity="0.5"
            />
            
            {/* Caudas Múltiplas */}
            <path 
              d="M -3 16 Q -8 24 -12 32 Q -6 30 -4 22" 
              fill="#34d399" 
              opacity="0.6"
            >
              <animate attributeName="d" values="M -3 16 Q -8 24 -12 32 Q -6 30 -4 22;M -3 16 Q -10 26 -10 36 Q -4 32 -4 22;M -3 16 Q -8 24 -12 32 Q -6 30 -4 22" dur="2s" repeatCount="indefinite" />
            </path>
            
            <path 
              d="M 3 16 Q 10 22 14 30 Q 8 28 5 21" 
              fill="#10b981" 
              opacity="0.5"
            >
              <animate attributeName="d" values="M 3 16 Q 10 22 14 30 Q 8 28 5 21;M 3 16 Q 12 24 12 34 Q 6 30 5 21;M 3 16 Q 10 22 14 30 Q 8 28 5 21" dur="2.3s" repeatCount="indefinite" />
            </path>
            
            <path 
              d="M 0 17 Q -3 26 0 35 Q 5 27 2 20" 
              fill="#059669" 
              opacity="0.4"
            >
              <animate attributeName="d" values="M 0 17 Q -3 26 0 35 Q 5 27 2 20;M 0 17 Q -5 28 -2 38 Q 3 30 2 20;M 0 17 Q -3 26 0 35 Q 5 27 2 20" dur="2.5s" repeatCount="indefinite" />
            </path>
          </g>
          
          {/* Olhos Grandes e Expressivos */}
          <circle cx="-4" cy="1" r="2.8" fill="#022c22" opacity="0.8" />
          <circle cx="4" cy="1" r="2.8" fill="#022c22" opacity="0.8" />
          
          <circle cx="-3.5" cy="0.5" r="2" fill="url(#eyeGlow)" filter="url(#starTwinkle)">
            <animate attributeName="r" values="1.6;2.2;1.6" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="4.5" cy="0.5" r="2" fill="url(#eyeGlow)" filter="url(#starTwinkle)">
            <animate attributeName="r" values="1.6;2.2;1.6" dur="1.2s" repeatCount="indefinite" />
          </circle>
          
          {/* Brilho nos Olhos */}
          <circle cx="-4" cy="-0.5" r="0.7" fill="#ffffff" opacity="0.9" />
          <circle cx="4" cy="-0.5" r="0.7" fill="#ffffff" opacity="0.9" />
          
          {/* Sorriso Sutil */}
          <path d="M -2 5 Q 0 7 2 5" fill="none" stroke="#047857" strokeWidth="0.8" strokeLinecap="round" opacity="0.6">
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
          </path>
          
          {/* Núcleo Brilhante */}
          <circle cx="0" cy="-2" r="5" fill="#ffffff" opacity="0.9" filter="url(#starTwinkle)">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="r" values="4.5;5.5;4.5" dur="1s" repeatCount="indefinite" />
          </circle>
          
          {/* Coroa de Flores/Espinhos */}
          <g opacity="0.7" style={{ animation: 'crownFloat 2.5s ease-in-out infinite' }}>
            {[-12, -8, -4, 0, 4, 8, 12].map((x, i) => (
              <g key={`crown-${i}`} transform={`translate(${x}, -14)`}>
                <circle cx="0" cy="0" r="2.5" fill="#fcd34d" opacity="0.8">
                  <animate attributeName="r" values="2;3;2" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="1.2" fill="#fffbeb" opacity="0.9" />
              </g>
            ))}
          </g>
          
          {/* Partículas Orbitando (8) */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 + Date.now() * 0.08) % 360;
            const rad = angle * Math.PI / 180;
            const x = Math.cos(rad) * 20;
            const y = Math.sin(rad) * 18;
            const size = 1.5 + (i % 3) * 0.5;
            return (
              <circle
                key={`orb-${i}`}
                cx={x}
                cy={y}
                r={size}
                fill="#a7f3d0"
                opacity="0.7"
                filter="url(#particleGlow)"
              >
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur={`${1.5 + i * 0.15}s`} repeatCount="indefinite" />
                <animate attributeName="r" values={`${size};${size + 0.8};${size}`} dur="1s" repeatCount="indefinite" />
              </circle>
            );
          })}
          
          {/* Partículas Internas Orbitando (4) */}
          {[...Array(4)].map((_, i) => {
            const angle = (i * 90 + Date.now() * 0.12) % 360;
            const rad = angle * Math.PI / 180;
            const x = Math.cos(rad) * 10;
            const y = Math.sin(rad) * 9;
            return (
              <circle
                key={`inner-orb-${i}`}
                cx={x}
                cy={y}
                r="1.2"
                fill="#ffffff"
                opacity="0.8"
                filter="url(#particleGlow)"
              >
                <animate attributeName="opacity" values="0.5;1;0.5" dur={`${1.2 + i * 0.1}s`} repeatCount="indefinite" />
              </circle>
            );
          })}
          
          {/* Estrelas Cadentes/Partículas Emitidas */}
          {[...Array(12)].map((_, i) => {
            const delay = Math.random() * 3;
            const direction = (i % 2 === 0 ? 1 : -1);
            return (
              <circle
                key={`shoot-${i}`}
                cx={0}
                cy={10}
                r="1"
                fill="#bef264"
                opacity="0"
                filter="url(#particleGlow)"
              >
                <animate 
                  attributeName="cy" 
                  values="12;55" 
                  dur={`${1.5 + Math.random() * 1.5}s`} 
                  begin={`${delay}s`}
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="cx" 
                  values={`${direction * 2};${direction * (20 + Math.random() * 15)}`} 
                  dur={`${1.5 + Math.random() * 1.5}s`} 
                  begin={`${delay}s`}
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="opacity" 
                  values="0;0.7;0.5;0" 
                  dur={`${1.5 + Math.random() * 1.5}s`} 
                  begin={`${delay}s`}
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="r" 
                  values="0.5;1.8;1;0.3" 
                  dur={`${1.5 + Math.random() * 1.5}s`} 
                  begin={`${delay}s`}
                  repeatCount="indefinite" 
                />
              </circle>
            );
          })}
          
          {/* Esporos Mágicos Subindo */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={`spore-${i}`}
              cx={-8 + Math.random() * 16}
              cy={-20 + Math.random() * 15}
              r="0.8"
              fill="#86efac"
              opacity="0"
            >
              <animate 
                attributeName="cy" 
                values="-15;-45" 
                dur={`${2 + Math.random() * 2}s`} 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="cx" 
                values={`${-5 + Math.random() * 10};${-15 + Math.random() * 30}`} 
                dur={`${2 + Math.random() * 2}s`} 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="opacity" 
                values="0;0.6;0" 
                dur={`${2 + Math.random() * 2}s`} 
                repeatCount="indefinite" 
              />
            </circle>
          ))}
        </g>
        
        {/* Círculo Mágico Inferior */}
        <g opacity="0.25" transform="translate(0, 18)">
          <circle cx="0" cy="0" r="10" fill="none" stroke="#6ee7b7" strokeWidth="0.6">
            <animate attributeName="r" values="8;12;8" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="14" fill="none" stroke="#34d399" strokeWidth="0.4" strokeDasharray="2,4">
            <animate attributeName="r" values="12;16;12" dur="3s" repeatCount="indefinite" />
            <animate attributeName="strokeDashoffset" values="0;12" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* Runas Mágicas Flutuantes */}
        <g opacity="0.3" filter="url(#particleGlow)">
          {[
            { char: "✦", x: -18, y: -8, delay: 0 },
            { char: "✧", x: 20, y: -10, delay: 1 },
            { char: "❋", x: -15, y: 12, delay: 0.5 },
            { char: "✧", x: 17, y: 14, delay: 1.5 },
            { char: "✦", x: -22, y: 2, delay: 0.8 },
          ].map((rune, i) => (
            <text
              key={`rune-${i}`}
              x={rune.x}
              y={rune.y}
              fontSize="8"
              fill="#a7f3d0"
              fontFamily="serif"
              fontWeight="bold"
            >
              {rune.char}
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2 + rune.delay}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur={`${3 + rune.delay}s`} repeatCount="indefinite" />
            </text>
          ))}
        </g>
      </g>
    )
},
];