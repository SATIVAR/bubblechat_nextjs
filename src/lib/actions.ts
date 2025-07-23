"use server";

import { extractDocumentData } from "@/ai/flows/extract-document-data";
import { generateQuotation } from "@/ai/flows/generate-quotation";
import { z } from "zod";

const fileToDataURI = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString("base64")}`;
};

const formSchema = z.object({
  document: z.instanceof(File).refine((file) => file.size > 0, { message: "O documento é obrigatório." }),
  historicalData: z.string().optional(),
  adminParams: z.string().optional(),
});

type State = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  extractedData?: string;
  quotation?: string;
};

export async function handleGenerateQuotation(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const validatedFields = formSchema.safeParse({
      document: formData.get("document"),
      historicalData: formData.get("historicalData"),
      adminParams: formData.get("adminParams"),
    });

    if (!validatedFields.success) {
      return {
        status: "error",
        message: "Dados do formulário inválidos. Por favor, verifique seus dados.",
      };
    }
    
    const { document, historicalData, adminParams } = validatedFields.data;

    const documentDataUri = await fileToDataURI(document);

    const extractionResult = await extractDocumentData({ documentDataUri });

    if (!extractionResult?.extractedData) {
      return {
        status: "error",
        message: "Falha ao extrair dados do documento.",
      };
    }
    
    const quotationResult = await generateQuotation({
        extractedData: extractionResult.extractedData,
        historicalClientData: historicalData,
        adminDefinedParameters: adminParams || "Modelo de precificação padrão"
    });

    if (!quotationResult?.quotation) {
        return {
            status: "error",
            message: "Falha ao gerar a cotação.",
            extractedData: extractionResult.extractedData,
        }
    }

    return {
      status: "success",
      message: "Cotação gerada com sucesso.",
      extractedData: extractionResult.extractedData,
      quotation: quotationResult.quotation,
    };

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido.";
    return {
      status: "error",
      message: `Ocorreu um erro: ${errorMessage}`,
    };
  }
}
