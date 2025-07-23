import { LoginForm } from "@/components/auth/login-form";
import { BotMessageSquare } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-secondary">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-primary text-primary-foreground p-4 rounded-full">
          <BotMessageSquare className="w-12 h-12" />
        </div>
        <h1 className="text-5xl font-headline font-bold text-primary">
          Bem-vindo ao Bubble Chat
        </h1>
        <p className="max-w-md text-foreground/80">
          Otimize seu fluxo de trabalho com um chat inteligente. Faça login para começar a conversar.
        </p>
      </div>
      <LoginForm className="mt-8" />
    </main>
  );
}
