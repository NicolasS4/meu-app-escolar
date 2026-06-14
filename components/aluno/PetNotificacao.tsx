"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function PetNotificacao({ alunoId }: { alunoId: string }) {
  useEffect(() => {
    if (!alunoId) return;

    const channel = supabase
      .channel('global_pet_likes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'pet_likes',
          filter: `receiver_id=eq.${alunoId}`
        },
        async (payload) => {
          // Quando a curtida chegar, ele busca o nome de quem mandou rapidinho
          const { data: sender } = await supabase
            .from('profiles')
            .select('nome')
            .eq('id', payload.new.sender_id)
            .single();
            
          const nome = sender?.nome?.split(' ')[0] || 'Alguém';

          // Dispara o Toast bonitão na tela!
          toast(`${nome} curtiu o seu Pet!`, {
            icon: "❤️",
            duration: 5000,
            style: { borderRadius: '16px', background: '#fdf2f8', color: '#be185d', fontWeight: 'bold' }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [alunoId]);

  return null; // É um componente invisível (ninja 🥷)
}