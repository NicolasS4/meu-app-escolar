import { motion } from "framer-motion";

export default function PetOrbitais({ acessorio, isFrozen }: { acessorio?: string | null, isFrozen: boolean }) {
  if (isFrozen || acessorio !== "Prisma da Terra") return null;
  
  return (
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }} 
      // Aumentamos o contêiner para w-72 h-72 para orbitar por FORA do pet
      className="absolute z-0 w-72 h-72" 
    >
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-90 overflow-visible">
        <defs>
          {/* Gradientes simulando vidro mágico / cristal */}
          <linearGradient id="terra1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fdf4ff" /><stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
          <linearGradient id="terra2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ecfeff" /><stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="terra3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fefce8" /><stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          <linearGradient id="terra4" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0fdf4" /><stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          <linearGradient id="terra5" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff1f2" /><stop offset="100%" stopColor="#fb7185" />
          </linearGradient>

          {/* O Molde da Espada: Uma lâmina de cristal com vinco no meio */}
          <g id="crystal-blade">
            <path d="M 50 -10 L 53.5 8 L 50 20 L 46.5 8 Z" />
            {/* Linha central para dar reflexo e profundidade de vidro */}
            <path d="M 50 -10 L 50 20" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
          </g>
        </defs>

        {/* Instanciando as 5 lâminas (360º / 5 = 72º) */}
        <use href="#crystal-blade" fill="url(#terra1)" filter="drop-shadow(0 0 8px rgba(232,121,249,0.8))" transform="rotate(0 50 50)" />
        <use href="#crystal-blade" fill="url(#terra2)" filter="drop-shadow(0 0 8px rgba(34,211,238,0.8))" transform="rotate(72 50 50)" />
        <use href="#crystal-blade" fill="url(#terra3)" filter="drop-shadow(0 0 8px rgba(250,204,21,0.8))" transform="rotate(144 50 50)" />
        <use href="#crystal-blade" fill="url(#terra4)" filter="drop-shadow(0 0 8px rgba(74,222,128,0.8))" transform="rotate(216 50 50)" />
        <use href="#crystal-blade" fill="url(#terra5)" filter="drop-shadow(0 0 8px rgba(251,113,133,0.8))" transform="rotate(288 50 50)" />
      </svg>
    </motion.div>
  );
}