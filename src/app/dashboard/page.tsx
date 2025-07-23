import { GenerateQuoteForm } from "@/components/dashboard/generate-quote-form";

export default function GenerateQuotePage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Cotação Inteligente</h1>
        <p className="text-muted-foreground">
          Carregue um documento para analisar seus dados e gerar uma cotação dinâmica.
        </p>
      </div>
      <GenerateQuoteForm />
    </div>
  );
}
