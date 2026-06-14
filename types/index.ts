// Tipagem para o Perfil (pode ser Aluno ou Professor)
export interface Profile {
  id: string;
  role: 'professor' | 'aluno';
  nome: string;
  professor_id?: string | null; // Apenas alunos terão isso preenchido
  streak_atual?: number;        // O Foguinho
  ultima_presenca?: string;     // Data da última presença
}

// Tipagem para o "Ticket" / Nota do aluno
export interface StudentNote {
  id: string;
  student_id: string;
  teacher_id: string;
  note_text: string;
  created_at: string;
}