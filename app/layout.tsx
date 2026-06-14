import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App Escolar | Gamificação",
  description: "Plataforma escolar gamificada",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // O suppressHydrationWarning é necessário para o next-themes funcionar perfeitamente
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-right" /> 
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}