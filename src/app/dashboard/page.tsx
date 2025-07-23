import { GenerateQuoteForm } from "@/components/dashboard/generate-quote-form";

export default function GenerateQuotePage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Smart Quoting</h1>
        <p className="text-muted-foreground">
          Upload a document to parse its data and generate a dynamic quotation.
        </p>
      </div>
      <GenerateQuoteForm />
    </div>
  );
}
