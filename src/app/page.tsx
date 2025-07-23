
"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BotMessageSquare, Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Se a sessão já existe e está autenticada, redireciona para o dashboard
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    
    setIsLoading(false);

    if (result?.error) {
      toast({
        title: "Falha no Login",
        description: "Credenciais inválidas. Por favor, tente novamente.",
        variant: "destructive",
      });
    } else if (result?.ok) {
      // O useEffect cuidará do redirecionamento
      toast({
        title: "Login bem-sucedido!",
        description: "Redirecionando para o dashboard...",
      });
      router.push("/dashboard");
    }
  };
  
  // Mostra um loader enquanto a sessão está sendo verificada
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  // Se não estiver autenticado, mostra a página de login
  if (status === "unauthenticated") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center justify-center gap-4 text-center mb-8">
              <div className="bg-primary text-primary-foreground p-4 rounded-full">
              <BotMessageSquare className="w-12 h-12" />
              </div>
              <h1 className="text-5xl font-headline font-bold text-primary">
              Bem-vindo ao Bubble Chat
              </h1>
              <p className="max-w-md text-foreground/80">
              Faça login para gerenciar sua plataforma de IA.
              </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                      id="email"
                      type="email"
                      placeholder="admin@bubblechat.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                  />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                      id="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                  />
              </div>
              <Button 
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                  >
                  {isLoading ? "Entrando..." : "Entrar"}
              </Button>
          </form>
        </div>
      </main>
    );
  }

  // Renderiza null ou um placeholder enquanto redireciona
  return null;
}
