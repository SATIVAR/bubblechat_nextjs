import { ChatInterface } from "@/components/dashboard/chat-interface";

export default function ChatPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold font-headline">Bubble Chat</h1>
        <p className="text-muted-foreground">
          Comece uma conversa com nossa IA. Envie uma mensagem para começar.
        </p>
      </div>
      <ChatInterface />
    </div>
  );
}
