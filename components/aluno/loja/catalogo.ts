// components/aluno/loja/catalogo.ts

export const CATALOGO_GLOBAL = [
  // Acessórios
  { id: 'Laço Fio Stila', titulo: 'Laço Fio Stila', tipo: 'acessorios', preco: 30, descricao: 'Feito com o melhor material da região.', icone: '🎀' },
  { id: 'acc_oculos_sombrios', titulo: 'Óculos Sombrios', tipo: 'acessorios', preco: 50, descricao: 'Estilo puro e misterioso.', icone: '🕶️' },
  { id: 'acc_chapeu_palha', titulo: 'Chapéu de Palha', tipo: 'acessorios', preco: 60, descricao: 'Para quem sonha em ser o Rei da sala.', icone: '👒' },
  { id: 'acc_capacete_hipismo', titulo: 'Capacete de Hipismo', tipo: 'acessorios', preco: 70, descricao: 'Para quem corre atrás da vitória.', icone: '🏇' },
  { id: 'acc_cartola_sonho', titulo: 'Cartola do Sonho', tipo: 'acessorios', preco: 80, descricao: 'Lali-ho! Domine os sonhos da sala.', icone: '🎩' },
  { id: 'acc_cachecol_croche', titulo: 'Cachecol Stila', tipo: 'acessorios', preco: 100, descricao: 'Trabalho manual perfeito para o frio.', icone: '🧣' },
  { id: 'acc_visor_osint', titulo: 'Visor OSINT', tipo: 'acessorios', preco: 120, descricao: 'Não há barreira na internet para você.', icone: '🥽' },

  // Molduras - Nível Básico e Intermediário
  { id: 'Moldura Prata', titulo: 'Moldura Prata', tipo: 'molduras', preco: 100, descricao: 'O começo de uma grande jornada.', icone: '💿' },
  { id: 'Moldura de Ouro', titulo: 'Moldura de Ouro', tipo: 'molduras', preco: 250, descricao: 'Para quem gosta de brilhar.', icone: '🟡' },
  
  // Molduras - Nível Raro (Gemas)
  { id: 'Moldura Diamante', titulo: 'Moldura Diamante', tipo: 'molduras', preco: 500, descricao: 'Inquebrável e valiosa.', icone: '💎' },
  { id: 'Moldura Rubi', titulo: 'Moldura Rubi', tipo: 'molduras', preco: 500, descricao: 'A gema da paixão e do poder.', icone: '🔴' },
  { id: 'Moldura Esmeralda', titulo: 'Moldura Esmeralda', tipo: 'molduras', preco: 500, descricao: 'A energia da natureza viva.', icone: '🟢' },
  { id: 'Moldura Safira', titulo: 'Moldura Safira', tipo: 'molduras', preco: 500, descricao: 'A frieza e o mistério do oceano.', icone: '🔵' },
  { id: 'Moldura Ametista', titulo: 'Moldura Ametista', tipo: 'molduras', preco: 500, descricao: 'Uma aura de magia arcana.', icone: '🟣' },
  { id: 'Moldura Ônix', titulo: 'Moldura Ônix', tipo: 'molduras', preco: 500, descricao: 'A escuridão contida em uma pedra.', icone: '⚫' },
];

// O GACHA SUPREMO (Itens exclusivos da Caixa Misteriosa)
export const CATALOGO_SECRETO = [
  // ---------------- LOTE 1 a 3 ----------------
  { id: 'acc_venda_infinito', titulo: 'Venda do Infinito', tipo: 'acessorios', icone: '😎', raridade: 'Lendário' },
  { id: 'acc_bone_bizarro', titulo: 'Boné Bizarro', tipo: 'acessorios', icone: '🧢', raridade: 'Épico' },
  { id: 'acc_marcas_sukuna', titulo: 'Marcas Amaldiçoadas', tipo: 'acessorios', icone: '😈', raridade: 'Épico' },
  { id: 'acc_espada_zenite', titulo: 'Espada Zênite', tipo: 'acessorios', icone: '⚔️', raridade: 'Mítico' },
  { id: 'acc_terminal_kali', titulo: 'Terminal Kali', tipo: 'acessorios', icone: '💻', raridade: 'Épico' },
  { id: 'acc_gorrinho_croche', titulo: 'Gorrinho de Crochê', tipo: 'acessorios', icone: '🧶', raridade: 'Raro' },
  { id: 'acc_terraprisma', titulo: 'Prisma da Terra', tipo: 'acessorios', icone: '✨', raridade: 'Mítico' },
  { id: 'acc_roda_general', titulo: 'Roda do General', tipo: 'acessorios', icone: '☸️', raridade: 'Lendário' },
  { id: 'acc_capuz_raptor', titulo: 'Montaria de Raptor', tipo: 'acessorios', icone: '🦖', raridade: 'Épico' },
  { id: 'acc_coroa_pirata', titulo: 'Coroa dos Mares', tipo: 'acessorios', icone: '🏴‍☠️', raridade: 'Épico' },

  // ---------------- LOTE 4: NATUREZA ----------------
  { id: 'acc_coroa_flores', titulo: 'Coroa de Sylvan', tipo: 'acessorios', icone: '🌸', raridade: 'Raro' },
  { id: 'acc_chifres_cervo', titulo: 'Chifres Anciões', tipo: 'acessorios', icone: '🦌', raridade: 'Épico' },
  { id: 'acc_asas_borboleta', titulo: 'Asas de Fada', tipo: 'acessorios', icone: '🦋', raridade: 'Lendário' },
  { id: 'acc_espirito_floresta', titulo: 'Espírito Companheiro', tipo: 'acessorios', icone: '🧚', raridade: 'Mítico' },

  // ---------------- LOTE 5: MAGIA SOMBRIA ----------------
  { id: 'acc_chapeu_bruxo', titulo: 'Chapéu Corrompido', tipo: 'acessorios', icone: '🧙', raridade: 'Raro' },
  { id: 'acc_aura_toxica', titulo: 'Aura Tóxica', tipo: 'acessorios', icone: '🧪', raridade: 'Lendário' },
  { id: 'acc_foice_morte', titulo: 'Foice do Ceifador', tipo: 'acessorios', icone: '☠️', raridade: 'Mítico' },

  // ---------------- LOTE 6: TEMPO E ESPAÇO ----------------
  { id: 'acc_oculos_steampunk', titulo: 'Óculos Temporais', tipo: 'acessorios', icone: '🥽', raridade: 'Raro' },
  { id: 'acc_engrenagens', titulo: 'Engrenagens do Destino', tipo: 'acessorios', icone: '⚙️', raridade: 'Épico' },
  { id: 'acc_aura_galaxia', titulo: 'Aura Galáctica', tipo: 'acessorios', icone: '🌌', raridade: 'Lendário' },
  { id: 'acc_buraco_negro', titulo: 'Singularidade', tipo: 'acessorios', icone: '⚫', raridade: 'Mítico' },

  // ---------------- LOTE 7: ANIME / PODER MÁXIMO ----------------
  { id: 'acc_bandana_ninja', titulo: 'Bandana da Aldeia', tipo: 'acessorios', icone: '🥷', raridade: 'Raro' },
  { id: 'acc_brinco_potara', titulo: 'Brinco de Fusão', tipo: 'acessorios', icone: '💎', raridade: 'Épico' },
  { id: 'acc_cabelo_super', titulo: 'Cabelo Dourado Espetado', tipo: 'acessorios', icone: '⚡', raridade: 'Lendário' },
  { id: 'acc_mascara_hollow', titulo: 'Máscara Obscura', tipo: 'acessorios', icone: '👹', raridade: 'Mítico' },

  // ---------------- MOLDURAS ----------------
  { id: 'Moldura Infernal', titulo: 'Moldura Infernal', tipo: 'molduras', icone: '🔥', raridade: 'Épico' },
  { id: 'Moldura Arco-Íris', titulo: 'Moldura Arco-Íris', tipo: 'molduras', icone: '🌈', raridade: 'Épico' },
  { id: 'Moldura Flamejante', titulo: 'Moldura Flamejante', tipo: 'molduras', icone: '🌋', raridade: 'Épico' },
  { id: 'Moldura Gelada', titulo: 'Moldura Gelada', tipo: 'molduras', icone: '🧊', raridade: 'Épico' },
  { id: 'Moldura Elétrica', titulo: 'Moldura Elétrica', tipo: 'molduras', icone: '⚡', raridade: 'Épico' },
  { id: 'Moldura Sombria', titulo: 'Moldura Sombria', tipo: 'molduras', icone: '🦇', raridade: 'Épico' },
  { id: 'Moldura Neon City', titulo: 'Moldura Neon City', tipo: 'molduras', icone: '🌃', raridade: 'Épico' },
  { id: 'Moldura Holográfica', titulo: 'Moldura Holográfica', tipo: 'molduras', icone: '💽', raridade: 'Épico' },
  { id: 'Moldura Plasma Quântico', titulo: 'Moldura Plasma Quântico', tipo: 'molduras', icone: '⚛️', raridade: 'Épico' },
  { id: 'Moldura Mecha', titulo: 'Moldura Mecha', tipo: 'molduras', icone: '🤖', raridade: 'Épico' },
  { id: 'Moldura Pétalas de Sakura', titulo: 'Moldura Pétalas de Sakura', tipo: 'molduras', icone: '🌸', raridade: 'Épico' },
  { id: 'Moldura Fúria do Oceano', titulo: 'Moldura Fúria do Oceano', tipo: 'molduras', icone: '🌊', raridade: 'Épico' },
  { id: 'Moldura Outono Eterno', titulo: 'Moldura Outono Eterno', tipo: 'molduras', icone: '🍂', raridade: 'Épico' },
  { id: 'Moldura Espectro', titulo: 'Moldura Espectro', tipo: 'molduras', icone: '👻', raridade: 'Épico' },
  { id: 'Moldura Maldição Tóxica', titulo: 'Moldura Maldição Tóxica', tipo: 'molduras', icone: '🧪', raridade: 'Épico' },
  { id: 'Moldura Celestial', titulo: 'Moldura Celestial', tipo: 'molduras', icone: '👼', raridade: 'Lendário' },
  { id: 'Moldura Abissal', titulo: 'Moldura Abissal', tipo: 'molduras', icone: '🦑', raridade: 'Lendário' },
  { id: 'Moldura Aurora', titulo: 'Moldura Aurora', tipo: 'molduras', icone: '🌠', raridade: 'Lendário' },
  { id: 'Moldura Solar', titulo: 'Moldura Solar', tipo: 'molduras', icone: '🌞', raridade: 'Lendário' },
  { id: 'Moldura Lunar', titulo: 'Moldura Lunar', tipo: 'molduras', icone: '🌙', raridade: 'Lendário' },
  { id: 'Moldura Yggdrasil', titulo: 'Moldura Yggdrasil', tipo: 'molduras', icone: '🌳', raridade: 'Lendário' },
  { id: 'Moldura Lua Sangrenta', titulo: 'Moldura Lua Sangrenta', tipo: 'molduras', icone: '🩸', raridade: 'Lendário' },
  { id: 'Moldura Corrupção do Vazio', titulo: 'Moldura Corrupção do Vazio', tipo: 'molduras', icone: '👁️‍🗨️', raridade: 'Lendário' },
  { id: 'Moldura Serafim', titulo: 'Moldura Serafim', tipo: 'molduras', icone: '🪽', raridade: 'Lendário' },
  { id: 'Moldura Stardust', titulo: 'Moldura Stardust', tipo: 'molduras', icone: '✨', raridade: 'Lendário' },
  { id: 'Moldura Relíquia do Tempo', titulo: 'Moldura Relíquia do Tempo', tipo: 'molduras', icone: '⏳', raridade: 'Lendário' },
  { id: 'Moldura Supernova', titulo: 'Moldura Supernova', tipo: 'molduras', icone: '💥', raridade: 'Mítico' },
  { id: 'Moldura Instinto Prateado', titulo: 'Moldura Instinto Prateado', tipo: 'molduras', icone: '🤍', raridade: 'Mítico' },
  { id: 'Moldura Aura Super', titulo: 'Moldura Aura Super', tipo: 'molduras', icone: '🔥', raridade: 'Lendário' },
  { id: 'Moldura Chamas Negras', titulo: 'Moldura Chamas Negras', tipo: 'molduras', icone: '🖤', raridade: 'Mítico' },
  { id: 'Moldura Energia Amaldiçoada', titulo: 'Moldura Energia Amaldiçoada', tipo: 'molduras', icone: '💢', raridade: 'Lendário' },
  { id: 'Moldura Expansão de Domínio', titulo: 'Moldura Expansão de Domínio', tipo: 'molduras', icone: '🤞', raridade: 'SECRETO' },
  { id: 'Moldura Haki do Rei', titulo: 'Moldura Haki do Rei', tipo: 'molduras', icone: '👑', raridade: 'SECRETO' },
  { id: 'Moldura Matrix (CTF)', titulo: 'Moldura Matrix (CTF)', tipo: 'molduras', icone: '💻', raridade: 'SECRETO' },
  { id: 'Reino de Fogo Negro', titulo: 'Reino de Fogo Negro', tipo: 'molduras', icone: '🔥', raridade: 'SECRETO' },
  { id: 'Santuário Malevolente', titulo: 'Santuário Malevolente', tipo: 'molduras', icone: '⚔️', raridade: 'SECRETO' },
  { id: 'Jardim Zen', titulo: 'Jardim Zen', tipo: 'molduras', icone: '🪷', raridade: 'SECRETO' },
];

export const getRarityStyle = (raridade: string) => {
  switch (raridade) {
    case 'SECRETO': 
      return 'bg-zinc-950 text-red-500 border border-red-900 shadow-[0_0_20px_rgba(220,38,38,0.5),inset_0_0_10px_rgba(0,0,0,1)] animate-pulse font-bold tracking-widest';
    case 'Mítico': 
      return 'bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.6)] font-bold';
    case 'Lendário': 
      return 'bg-yellow-400 text-yellow-950 shadow-[0_0_30px_rgba(250,204,21,0.6)] font-bold';
    case 'Épico': 
      return 'bg-purple-600 text-white shadow-[0_0_30px_rgba(147,51,234,0.6)] font-semibold';
    case 'Raro': 
      return 'bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] font-semibold';
    default: 
      return 'bg-slate-500 text-white';
  }
};