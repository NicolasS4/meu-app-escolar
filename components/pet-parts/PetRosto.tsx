import { motion } from "framer-motion";

export default function PetRosto({ expressao, isFrozen }: { expressao: string, isFrozen: boolean }) {
  return (
    <g transform="translate(0, 5)">
      
      {/* GRUPO DOS OLHOS (A ANIMAÇÃO DE PISCAR ACONTECE AQUI) */}
      <motion.g 
        animate={{ scaleY: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.1, 1] }} 
        transition={{ repeat: Infinity, duration: 4 }} 
        style={{ transformOrigin: "50px 65px" }}
      >
        {/* Base dos Olhos */}
        {expressao !== "cool" && <circle cx="35" cy="65" r="7" fill="#222" />}
        {expressao !== "cool" && <circle cx="65" cy="65" r="7" fill="#222" />}
        
        {/* Brilho dos Olhos */}
        {expressao !== "assustado" && expressao !== "cool" && (
          <><circle cx="37" cy="62" r="2.5" fill="#fff" /><circle cx="67" cy="62" r="2.5" fill="#fff" /></>
        )}
        {expressao === "assustado" && (
          <><circle cx="35" cy="65" r="1.5" fill="#fff" /><circle cx="65" cy="65" r="1.5" fill="#fff" /></>
        )}

        {/* Olhos Especiais (Cool) */}
        {expressao === "cool" && (
          <>
            <path d="M 28 65 A 7 7 0 0 0 42 65 Z" fill="#222" />
            <path d="M 58 65 A 7 7 0 0 0 72 65 Z" fill="#222" />
          </>
        )}
      </motion.g>

      {/* Expressões e Bocas (Ficam paradas enquanto o olho pisca) */}
      {expressao === "feliz" && (
        <path d="M 42 75 Q 50 82 58 75" stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      {expressao === "bravo" && (
        <g stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <path d="M 28 58 L 38 61" /> <path d="M 72 58 L 62 61" />
          <path d="M 45 78 Q 50 74 55 78" />
        </g>
      )}
      {expressao === "cool" && (
        <path d="M 45 78 Q 55 78 58 73" stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      {expressao === "assustado" && (
        <circle cx="50" cy="78" r="3" fill="#7c2d12" />
      )}
      {expressao === "triste" && (
        <g stroke={isFrozen ? "#ca8a04" : "#7c2d12"} strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M 30 58 Q 35 55 40 57" /><path d="M 70 58 Q 65 55 60 57" />
          <path d="M 45 78 Q 50 75 55 78" />
        </g>
      )}

    </g>
  );
}