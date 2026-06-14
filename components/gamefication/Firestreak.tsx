import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function FireStreak({ dias }: { dias: number }) {
  // Se dias for > 0, o fogo fica laranja e pulsa. Se for 0, fica cinza.
  const isAlive = dias > 0;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={isAlive ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Flame color={isAlive ? "#ff5a00" : "#d1d5db"} size={48} />
      </motion.div>
      <span className="font-bold text-xl">{dias}</span>
    </div>
  );
}