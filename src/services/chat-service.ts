
import { ai } from "@/ai/genkit";
import { Message, Part } from "genkit/experimental/ai";

class ChatService {
  async generateResponse(
    history: Message[],
    newUserMessage: Part[]
  ): Promise<string | null> {
    try {
      const { response } = await ai.generate({
        prompt: {
          messages: [...history, { role: 'user', content: newUserMessage }],
        },
        model: ai.model("googleai/gemini-2.0-flash"),
      });

      const aiResponse = response.text;
      return aiResponse;
    } catch (error) {
      console.error("Error generating AI response:", error);
      // Depending on requirements, you might want to throw the error
      // or handle it gracefully by returning null or a default message.
      return null;
    }
  }
}

// Export a singleton instance of the service
export const chatService = new ChatService();
