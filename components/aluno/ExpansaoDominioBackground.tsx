"use client";

import { useEffect, useState } from "react";

// Importa os lotes de molduras (Podemos criar um lote1 vazio futuramente se necessário)
import { moldurasLote2 } from "../pet-parts/molduras/lote2";

const todasMolduras = [...moldurasLote2];

interface DominioProps {
  bordaEquipada?: string | null;
}

export default function ExpansaoDominioBackground({ bordaEquipada }: DominioProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !bordaEquipada) return null;

  // O sistema procura a moldura na lista de todos os lotes
  const molduraEncontrada = todasMolduras.find(m => m.nome === bordaEquipada);

  // Se a moldura existir e tiver um background associado a ela, ele renderiza
  if (molduraEncontrada && molduraEncontrada.renderBackground) {
    return molduraEncontrada.renderBackground();
  }

  // Se for uma moldura comum do Lote 1 (que não tem background imersivo, apenas a borda do Card)
  return null;
}