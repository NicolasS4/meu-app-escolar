"use client";

// Importa TODOS os lotes criados
import { acessoriosLote1 } from "./acessorios/lote1";
import { acessoriosLote2 } from "./acessorios/lote2";
import { acessoriosLote3 } from "./acessorios/lote3";
import { acessoriosLote4 } from "./acessorios/lote4";
import { acessoriosLote5 } from "./acessorios/lote5";
import { acessoriosLote6 } from "./acessorios/lote6";
import { acessoriosLote7 } from "./acessorios/lote7";

// Junta o universo inteiro de acessórios
const todosAcessorios = [
  ...acessoriosLote1,
  ...acessoriosLote2,
  ...acessoriosLote3,
  ...acessoriosLote4,
  ...acessoriosLote5,
  ...acessoriosLote6,
  ...acessoriosLote7,
];

// 🔥 LISTA MÁGICA: Coloque aqui os IDs de tudo que deve ir para as COSTAS do Pet
const itensDeFundo = [
  "acc_asas_borboleta",
  "acc_terraprisma",
  "acc_roda_general",
  "acc_espada_zenite",
  "acc_foice_morte",
  "acc_aura_galaxia",
  "acc_buraco_negro"
];

export default function PetAcessorios({ 
  acessorioEquipado, 
  camada = "frente" 
}: { 
  acessorioEquipado?: string | null,
  camada?: "fundo" | "frente"
}) {
  if (!acessorioEquipado) return null;

  const acessorio = todosAcessorios.find(
    a => a.id === acessorioEquipado || a.nome === acessorioEquipado
  );

  if (!acessorio || !acessorio.render) return null;

  // Verifica se o item atual pertence à lista de itens que vão nas costas
  const isFundo = itensDeFundo.includes(acessorio.id);

  // Sistema de filtragem:
  // Se o componente pediu pra desenhar o fundo, mas o item é um chapéu (frente), não desenha nada.
  if (camada === "fundo" && !isFundo) return null;
  // Se o componente pediu pra desenhar a frente, mas o item é uma asa (fundo), não desenha nada.
  if (camada === "frente" && isFundo) return null;

  // Renderiza a arte SVG do acessório na camada certa!
  return acessorio.render();
}