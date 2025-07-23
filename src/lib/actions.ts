"use server";

import { z } from "zod";
import { ai } from "@/ai/genkit";
import { Message, Part, Role } from "genkit/experimental/ai";

const fileToDataURI = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString("base64")}`;
};

const chatSchema = z.object({
  message: z.string().min(1, { message: "A mensagem não pode estar vazia." }),
  history: z.string().optional(), // JSON string of historical messages
  file: z.instanceof(File).optional(),
});

type ChatState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  chatHistory?: { role: Role; content: Part[] }[];
};

export async function handleChat(
  prevState: ChatState,
  formData: FormData
): Promise<ChatState> {
  try {
    const validatedFields = chatSchema.safeParse({
      message: formData.get("message"),
      history: formData.get("history"),
      file: formData.get("file"),
    });

    if (!validatedFields.success) {
      return {
        status: "error",
        message: "Dados do formulário inválidos.",
        chatHistory: prevState.chatHistory,
      };
    }
    
    const { message, history, file } = validatedFields.data;

    const parsedHistory: Message[] = history ? JSON.parse(history) : [];

    const userMessage: Part[] = [{ text: message }];

    if (file && file.size > 0) {
      const media = await fileToDataURI(file);
      userMessage.push({ media: { url: media, contentType: file.type } });
    }

    const { response } = await ai.generate({
      prompt: {
        messages: [...parsedHistory, { role: 'user', content: userMessage }],
      },
      model: ai.model("googleai/gemini-2.0-flash"),
    });

    const aiResponse = response.text;
    if (!aiResponse) {
      return {
        status: "error",
        message: "A IA não conseguiu gerar uma resposta.",
        chatHistory: parsedHistory,
      };
    }
    
    const newHistory = [
      ...parsedHistory,
      { role: "user" as const, content: userMessage },
      { role: "model" as const, content: [{ text: aiResponse }] },
    ];

    return {
      status: "success",
      message: "Resposta recebida.",
      chatHistory: newHistory,
    };

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido.";
    return {
      status: "error",
      message: `Ocorreu um erro: ${errorMessage}`,
      chatHistory: prevState.chatHistory,
    };
  }
}
