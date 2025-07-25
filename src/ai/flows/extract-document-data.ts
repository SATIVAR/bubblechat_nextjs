// src/ai/flows/extract-document-data.ts
'use server';

/**
 * @fileOverview An AI agent for extracting data from documents.
 *
 * - extractDocumentData - A function that handles the document data extraction process.
 * - ExtractDocumentDataInput - The input type for the extractDocumentData function.
 * - ExtractDocumentDataOutput - The return type for the extractDocumentData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractDocumentDataInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractDocumentDataInput = z.infer<typeof ExtractDocumentDataInputSchema>;

const ExtractDocumentDataOutputSchema = z.object({
  extractedData: z
    .string()
    .describe('The extracted data from the document.'),
});
export type ExtractDocumentDataOutput = z.infer<typeof ExtractDocumentDataOutputSchema>;

export async function extractDocumentData(input: ExtractDocumentDataInput): Promise<ExtractDocumentDataOutput> {
  return extractDocumentDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractDocumentDataPrompt',
  input: {schema: ExtractDocumentDataInputSchema},
  output: {schema: ExtractDocumentDataOutputSchema},
  prompt: `You are an expert data extraction specialist.

You will extract all relevant information from the following document.

Document: {{media url=documentDataUri}}

Extracted Data:`,
});

const extractDocumentDataFlow = ai.defineFlow(
  {
    name: 'extractDocumentDataFlow',
    inputSchema: ExtractDocumentDataInputSchema,
    outputSchema: ExtractDocumentDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
