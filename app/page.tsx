import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <GraduationCap size={64} className="text-indigo-600 mb-6" />
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Educação com <span className="text-indigo-600">Gamificação</span>
      </h1>
      <p className="text-lg text-slate-600 max-w-xl mb-8">
        Acompanhe presenças, ganhe pontos de participação, mantenha sua ofensiva de fogo viva e suba no ranking da turma!
      </p>
      <Link 
        href="/login" 
        className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 hover:-translate-y-1 transition-all"
      >
        Acessar Plataforma
      </Link>
    </main>
  );
}