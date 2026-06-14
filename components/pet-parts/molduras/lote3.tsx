"use client";

// ==========================================
// LOTE 3: CYBERPUNK & FUTURO (VERSÃO ULTRA + LIGHT/DARK MODE)
// ==========================================

export const moldurasLote3 = [
  {
    nome: "Moldura Neon City",
    // Modo Claro: Fundo branco (#ffffff) com scanlines escuras suaves.
    // Modo Escuro: Fundo negro (#0a0a0a) com scanlines brancas suaves.
    classes: "border-4 border-transparent shadow-[0_0_120px_rgba(217,70,239,0.6),0_0_60px_rgba(6,182,212,0.5),inset_0_0_50px_rgba(217,70,239,0.3),inset_0_0_25px_rgba(6,182,212,0.2)] dark:shadow-[0_0_120px_rgba(217,70,239,1),0_0_60px_rgba(6,182,212,0.9),inset_0_0_50px_rgba(217,70,239,0.5),inset_0_0_25px_rgba(6,182,212,0.4)] bg-[linear-gradient(#ffffff,#ffffff),linear-gradient(45deg,#d946ef,#06b6d4,#ec4899,#14b8a6,#d946ef)] dark:bg-[linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(45deg,#d946ef,#06b6d4,#ec4899,#14b8a6,#d946ef)] bg-origin-border [background-clip:padding-box,_border-box] bg-[size:100%_100%,_400%_400%] animate-[neonPulse_2s_ease-in-out_infinite,rainbowMove_3s_linear_infinite] relative overflow-hidden before:absolute before:inset-0 before:bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.03)_3px,rgba(0,0,0,0.03)_4px)] dark:before:bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.05)_3px,rgba(255,255,255,0.05)_4px)] before:animate-[crtScan_4s_linear_infinite] after:absolute after:inset-0 after:bg-[url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"10\" cy=\"20\" r=\"1\" fill=\"%23d946ef\" opacity=\"0.5\"/><circle cx=\"80\" cy=\"15\" r=\"1.5\" fill=\"%2306b6d4\" opacity=\"0.4\"/><circle cx=\"45\" cy=\"85\" r=\"1\" fill=\"%23ec4899\" opacity=\"0.3\"/><circle cx=\"90\" cy=\"70\" r=\"0.8\" fill=\"%2314b8a6\" opacity=\"0.5\"/></svg>')] after:bg-repeat after:opacity-40 after:animate-[neonTwinkle_2s_ease-in-out_infinite]"
  },
  
  {
    nome: "Moldura Holográfica",
    // Modo Claro: Vidro ciano leitoso translúcido (bg-cyan-50/60).
    // Modo Escuro: Vidro ciano escuro profundo (dark:bg-cyan-950/40).
    classes: "border-4 border-cyan-400/60 shadow-[0_0_80px_rgba(34,211,238,0.5),0_0_40px_rgba(6,182,212,0.3),inset_0_0_70px_rgba(34,211,238,0.2)] dark:shadow-[0_0_80px_rgba(34,211,238,0.8),0_0_40px_rgba(6,182,212,0.5),inset_0_0_70px_rgba(34,211,238,0.3)] bg-cyan-50/60 dark:bg-cyan-950/40 backdrop-blur-xl relative overflow-hidden before:absolute before:inset-0 before:bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(6,182,212,0.1)_3px,rgba(6,182,212,0.1)_4px)] dark:before:bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(34,211,238,0.2)_3px,rgba(34,211,238,0.2)_4px)] before:animate-[hologramScan_6s_ease-in-out_infinite] after:absolute after:inset-0 after:bg-[url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"><text x=\"10\" y=\"20\" font-size=\"6\" fill=\"%230d9488\" opacity=\"0.3\" font-family=\"monospace\">01001010</text><text x=\"130\" y=\"50\" font-size=\"5\" fill=\"%230891b2\" opacity=\"0.25\" font-family=\"monospace\">11010001</text><text x=\"40\" y=\"80\" font-size=\"6\" fill=\"%230d9488\" opacity=\"0.2\" font-family=\"monospace\">00101110</text><text x=\"150\" y=\"120\" font-size=\"4\" fill=\"%230891b2\" opacity=\"0.3\" font-family=\"monospace\">101100</text><text x=\"20\" y=\"150\" font-size=\"5\" fill=\"%230d9488\" opacity=\"0.25\" font-family=\"monospace\">01101001</text></svg>')] dark:after:bg-[url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"><text x=\"10\" y=\"20\" font-size=\"6\" fill=\"%2334d399\" opacity=\"0.15\" font-family=\"monospace\">01001010</text><text x=\"130\" y=\"50\" font-size=\"5\" fill=\"%2306b6d4\" opacity=\"0.12\" font-family=\"monospace\">11010001</text><text x=\"40\" y=\"80\" font-size=\"6\" fill=\"%2334d399\" opacity=\"0.1\" font-family=\"monospace\">00101110</text><text x=\"150\" y=\"120\" font-size=\"4\" fill=\"%2306b6d4\" opacity=\"0.13\" font-family=\"monospace\">101100</text><text x=\"20\" y=\"150\" font-size=\"5\" fill=\"%2334d399\" opacity=\"0.11\" font-family=\"monospace\">01101001</text></svg>')] after:bg-repeat after:opacity-60 after:animate-[dataFloat_8s_linear_infinite]"
  },

  {
    nome: "Moldura Plasma Quântico",
    // Modo Claro: Núcleo fuchsia super claro.
    // Modo Escuro: Fundo de contenção roxo escuro.
    classes: "border-4 border-fuchsia-500 shadow-[0_0_150px_rgba(217,70,239,0.7),inset_0_0_80px_rgba(217,70,239,0.4)] dark:shadow-[0_0_150px_rgba(217,70,239,1),0_0_70px_rgba(168,85,247,0.9),inset_0_0_80px_rgba(217,70,239,0.7),inset_0_0_40px_rgba(168,85,247,0.5)] saturate-[1.8] contrast-150 bg-gradient-to-tr from-fuchsia-100/70 via-purple-100/40 dark:from-fuchsia-950/60 dark:via-purple-900/30 to-transparent relative overflow-hidden before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[180%] before:h-[180%] before:bg-[radial-gradient(circle,rgba(217,70,239,0.2),rgba(168,85,247,0.1),transparent_70%)] dark:before:bg-[radial-gradient(circle,rgba(217,70,239,0.3),rgba(168,85,247,0.15),transparent_70%)] before:animate-[quantumSpin_5s_linear_infinite] after:absolute after:inset-0 after:bg-[repeating-radial-gradient(circle,rgba(217,70,239,0.15)_1px,transparent_2px)] dark:after:bg-[repeating-radial-gradient(circle,rgba(217,70,239,0.1)_1px,transparent_2px)] after:animate-[quantumRipple_2s_ease-in-out_infinite]"
  },

  {
    nome: "Moldura Mecha",
    // Modo Claro: Placas de titânio escovado claro (bg-slate-200).
    // Modo Escuro: Chassi de metal pesado escuro (dark:bg-slate-900).
    classes: "border-4 border-slate-400 dark:border-slate-500 shadow-[0_0_50px_rgba(249,115,22,0.7),inset_0_0_60px_rgba(249,115,22,0.3)] dark:shadow-[0_0_50px_rgba(249,115,22,1),0_0_25px_rgba(194,65,12,0.8),inset_0_0_60px_rgba(249,115,22,0.4),inset_0_0_30px_rgba(194,65,12,0.3)] bg-slate-200/90 dark:bg-slate-900/90 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-[4px] before:bg-[repeating-linear-gradient(45deg,#f97316,#f97316_15px,#334155_15px,#334155_30px,#f97316_30px)] dark:before:bg-[repeating-linear-gradient(45deg,#f97316,#f97316_15px,#000_15px,#000_30px,#f97316_30px)] before:animate-[mechaLight_2s_linear_infinite] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:bg-[repeating-linear-gradient(-45deg,#f97316,#f97316_15px,#334155_15px,#334155_30px,#f97316_30px)] dark:after:bg-[repeating-linear-gradient(-45deg,#f97316,#f97316_15px,#000_15px,#000_30px,#f97316_30px)] after:animate-[mechaLight_reverse_2s_linear_infinite]"
  }
];