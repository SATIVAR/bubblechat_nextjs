"use client";

import React, { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleGenerateQuotation } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent hover:bg-accent/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Generate Quotation"
      )}
    </Button>
  );
}

export function GenerateQuoteForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState = {
    status: "idle" as const,
    message: "",
  };

  const [state, formAction] = useFormState(handleGenerateQuotation, initialState);

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Success!",
        description: state.message,
        variant: "default",
      });
      formRef.current?.reset();
    } else if (state.status === 'error') {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  
  const { pending } = useFormStatus();
  
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <form ref={formRef} action={formAction}>
          <Card>
            <CardHeader>
              <CardTitle>Quotation Parameters</CardTitle>
              <CardDescription>
                Provide the necessary document and data to generate a quote.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document">Document for Quotation</Label>
                <Input id="document" name="document" type="file" required className="file:text-foreground"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="historicalData">Historical Client Data (Optional)</Label>
                <Textarea id="historicalData" name="historicalData" placeholder="e.g., Previous orders, client preferences..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminParams">Admin-Defined Parameters (Optional)</Label>
                <Textarea id="adminParams" name="adminParams" placeholder="e.g., Special discounts, pricing tiers..." />
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </Card>
        </form>
         {state.status === 'error' && state.message && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Request Failed</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="lg:col-span-3">
        <Card className="h-full">
            <CardHeader>
              <CardTitle>Generated Results</CardTitle>
              <CardDescription>
                The extracted data and generated quotation will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
             {state.status === 'loading' || pending ? (
                <div className="space-y-6">
                    <div>
                        <Skeleton className="h-6 w-1/3 mb-2" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-6 w-1/3 mb-2" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            ) : state.status === 'success' ? (
                <>
                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-2"><FileText className="mr-2 h-5 w-5 text-primary"/> Extracted Data</h3>
                  <div className="p-4 bg-secondary rounded-lg text-sm text-secondary-foreground max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-body">{state.extractedData}</pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center mb-2"><CheckCircle2 className="mr-2 h-5 w-5 text-green-600"/> Generated Quotation</h3>
                  <div className="p-4 border-2 border-dashed border-accent/50 bg-accent/10 rounded-lg text-sm text-foreground">
                    <pre className="whitespace-pre-wrap font-body">{state.quotation}</pre>
                  </div>
                </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-full min-h-[300px]">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Your results will be displayed here.</p>
                </div>
            )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
