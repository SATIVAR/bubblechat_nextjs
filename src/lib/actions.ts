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
  document: z.instanceof(File).refine((file) => file.size > 0, { message: "Document is required." }),
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
        message: "Invalid form data. Please check your inputs.",
      };
    }
    
    const { document, historicalData, adminParams } = validatedFields.data;

    const documentDataUri = await fileToDataURI(document);

    const extractionResult = await extractDocumentData({ documentDataUri });

    if (!extractionResult?.extractedData) {
      return {
        status: "error",
        message: "Failed to extract data from the document.",
      };
    }
    
    const quotationResult = await generateQuotation({
        extractedData: extractionResult.extractedData,
        historicalClientData: historicalData,
        adminDefinedParameters: adminParams || "Standard pricing model"
    });

    if (!quotationResult?.quotation) {
        return {
            status: "error",
            message: "Failed to generate quotation.",
            extractedData: extractionResult.extractedData,
        }
    }

    return {
      status: "success",
      message: "Quotation generated successfully.",
      extractedData: extractionResult.extractedData,
      quotation: quotationResult.quotation,
    };

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      status: "error",
      message: `An error occurred: ${errorMessage}`,
    };
  }
}
