export default function PetBracos({ pose }: { pose: string }) {
  return (
    <g strokeLinecap="round" fill="none">
      
      {/* Definição do gradiente */}
      <defs>
        <linearGradient id="bracoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />   {/* laranja queimado */}
          <stop offset="50%" stopColor="#dc2626" />  {/* vermelho */}
          <stop offset="100%" stopColor="#b91c1c" /> {/* vermelho escuro */}
        </linearGradient>
        <linearGradient id="bracoGradFrente" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />   {/* laranja */}
          <stop offset="50%" stopColor="#ea580c" />  {/* laranja queimado */}
          <stop offset="100%" stopColor="#dc2626" /> {/* vermelho */}
        </linearGradient>
      </defs>

      {/* Braços */}
      {pose === "padrao" && (
        <>
          {/* Braço esquerdo - abaixado (mais escuro) */}
          <path 
            d="M 18 72 Q 8 82 12 92"
            stroke="url(#bracoGrad)"
            strokeWidth="5"
            className="origin-[18px_72px]"
            style={{ 
              animation: 'waveLeft 2.5s ease-in-out infinite',
              transformOrigin: '18px 72px'
            }}
          />
          {/* Braço direito - acenando (mais claro) */}
          <path 
            d="M 82 72 Q 92 55 85 40"
            stroke="url(#bracoGradFrente)"
            strokeWidth="5.5"
            className="origin-[82px_72px]"
            style={{ 
              animation: 'waveHi 1.5s ease-in-out infinite alternate',
              transformOrigin: '82px 72px'
            }}
          />
        </>
      )}

      {pose === "cruzados" && (
        <>
          {/* Braço esquerdo cruzado (atrás - mais escuro) */}
          <path 
            d="M 18 72 Q 30 80 48 74" 
            stroke="url(#bracoGrad)"
            strokeWidth="5"
          />
          {/* Braço direito cruzado (frente - mais claro) */}
          <path 
            d="M 82 72 Q 72 82 52 76" 
            stroke="url(#bracoGradFrente)"
            strokeWidth="5.5"
          />
        </>
      )}

      {pose === "levantados" && (
        <>
          {/* Braço esquerdo levantado */}
          <path 
            d="M 18 72 Q 8 50 18 30"
            stroke="url(#bracoGrad)"
            strokeWidth="5"
            className="origin-[18px_72px]"
            style={{ 
              animation: 'waveUp 1.2s ease-in-out infinite alternate',
              transformOrigin: '18px 72px'
            }}
          />
          {/* Braço direito levantado */}
          <path 
            d="M 82 72 Q 92 50 82 30"
            stroke="url(#bracoGradFrente)"
            strokeWidth="5"
            className="origin-[82px_72px]"
            style={{ 
              animation: 'waveUp 1.2s ease-in-out infinite alternate-reverse',
              transformOrigin: '82px 72px'
            }}
          />
        </>
      )}
    </g>
  );
}