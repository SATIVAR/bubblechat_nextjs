'use server';

/**
 * @fileOverview Dynamically generates quotations based on extracted data, historical client data, and admin-defined parameters using AI.
 *
 * - generateQuotation - A function that handles the quotation generation process.
 * - GenerateQuotationInput - The input type for the generateQuotation function.
 * - GenerateQuotationOutput - The return type for the generateQuotation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuotationInputSchema = z.object({
  extractedData: z
    .string()
    .describe('The extracted data from the uploaded document.'),
  historicalClientData: z
    .string()
    .optional()
    .describe('Historical data for the client, if available.'),
  adminDefinedParameters: z
    .string()
    .describe('Admin-defined parameters for quotation generation.'),
});
export type GenerateQuotationInput = z.infer<typeof GenerateQuotationInputSchema>;

const GenerateQuotationOutputSchema = z.object({
  quotation: z.string().describe('The generated quotation.'),
});
export type GenerateQuotationOutput = z.infer<typeof GenerateQuotationOutputSchema>;

export async function generateQuotation(input: GenerateQuotationInput): Promise<GenerateQuotationOutput> {
  return generateQuotationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuotationPrompt',
  input: {schema: GenerateQuotationInputSchema},
  output: {schema: GenerateQuotationOutputSchema},
  prompt: `You are an AI assistant that generates quotations based on extracted data, historical client data, and admin-defined parameters.\n\nExtracted Data: {{{extractedData}}}\nHistorical Client Data: {{{historicalClientData}}}\nAdmin-Defined Parameters: {{{adminDefinedParameters}}}\n\nGenerate a quotation based on the above information. Consider all the provided information to come up with accurate pricing.`, // eslint-disable-line max-len
});

const generateQuotationFlow = ai.defineFlow(
  {
    name: 'generateQuotationFlow',
    inputSchema: GenerateQuotationInputSchema,
    outputSchema: GenerateQuotationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
