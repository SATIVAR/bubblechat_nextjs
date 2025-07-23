"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleChat } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Send, Bot, User, Paperclip, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Part, Role } from "genkit/experimental/ai";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="icon" className="flex-shrink-0">
      {pending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Send className="h-5 w-5" />
      )}
      <span className="sr-only">Enviar Mensagem</span>
    </Button>
  );
}

function MessageBubble({ role, content }: { role: Role, content: Part[] }) {
    const isUser = role === 'user';
    const textContent = content.find(p => p.text)?.text;
    const mediaContent = content.find(p => p.media);

    return (
        <div className={cn("flex items-start gap-3 my-4 animate-in", isUser ? "justify-end" : "justify-start")}>
            {!isUser && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
            )}
            <div className={cn(
                "max-w-xs md:max-w-md lg:max-w-lg rounded-xl p-3 shadow-sm", 
                isUser ? "bg-primary text-primary-foreground" : "bg-secondary"
            )}>
                {textContent && <p className="text-sm whitespace-pre-wrap">{textContent}</p>}
                {mediaContent?.media?.url && (
                    <img src={mediaContent.media.url} alt="Uploaded content" className="mt-2 rounded-lg max-w-full h-auto" />
                )}
            </div>
             {isUser && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
            )}
        </div>
    )
}

export function ChatInterface() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const initialState = {
    status: "idle" as const,
    message: "",
    chatHistory: [],
  };

  const [state, formAction] = useFormState(handleChat, initialState);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
      setFile(null);
    } else if (state.status === 'error') {
      toast({
        title: "Erro no Chat",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [state.chatHistory]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  
  const removeFile = () => {
    setFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }


  return (
      <Card className="h-[75vh] flex flex-col">
        <CardHeader>
             {state.status === 'error' && state.message && (
                <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Falha na Solicitação</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
                 {(!state.chatHistory || state.chatHistory.length === 0) && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                        <Bot className="h-12 w-12 mb-4" />
                        <p className="text-lg">Como posso te ajudar hoje?</p>
                        <p className="text-sm">Envie uma mensagem ou anexe um arquivo para começar.</p>
                    </div>
                 )}
                {state.chatHistory?.map((msg, index) => (
                    <MessageBubble key={index} role={msg.role} content={msg.content} />
                ))}
            </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form ref={formRef} action={formAction} className="flex items-center gap-2 w-full">
            <input type="hidden" name="history" value={JSON.stringify(state.chatHistory)} />
             <input
              type="file"
              name="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline" size="icon" className="flex-shrink-0">
               <label htmlFor="file-upload" className="cursor-pointer">
                <Paperclip className="h-5 w-5" />
                <span className="sr-only">Anexar arquivo</span>
              </label>
            </Button>
            <div className="flex-1 relative">
                <Input name="message" placeholder="Digite sua mensagem..." autoComplete="off" required />
                {file && (
                    <div className="absolute bottom-12 left-0 bg-secondary p-2 rounded-lg text-sm flex items-center gap-2">
                        <span>{file.name}</span>
                        <Button variant="ghost" size="icon" onClick={removeFile} className="h-6 w-6">
                            <X className="h-4 w-4"/>
                        </Button>
                    </div>
                )}
            </div>
            <SubmitButton />
          </form>
        </CardFooter>
      </Card>
  );
}
