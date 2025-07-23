import { LoginForm } from "@/components/auth/login-form";
import { FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-primary text-primary-foreground p-4 rounded-full">
          <FileText className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-headline font-bold text-primary">
          Bem-vindo ao DocuQuota
        </h1>
        <p className="max-w-md text-foreground/80">
          Otimize seu fluxo de trabalho com análise de documentos e cotações inteligentes por IA. Faça login para continuar.
        </p>
      </div>
      <LoginForm className="mt-8" />
    </main>
  );
}
