"use client";

import {
  useExternalStoreRuntime,
  ThreadMessageLike,
  AppendMessage,
  AssistantRuntimeProvider,
} from "@assistant-ui/react";
import { useState, ReactNode } from "react";
import { Person } from "@/components/sidebar/PersonsList";

export interface GameMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
}

const convertMessage = (message: GameMessage): ThreadMessageLike => {
  return {
    role: message.role,
    content: [{ type: "text", text: message.content }],
  };
};

export function GameRuntimeProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const onNew = async (message: AppendMessage) => {
    if (message.content[0]?.type !== "text") {
      throw new Error("Only text messages are supported");
    }

    const input = message.content[0].text;
    const newMessage: GameMessage = {
      id: crypto.randomUUID(),
      content: input,
      role: "user",
      createdAt: new Date(),
    };

    setMessages((currentMessages) => [...currentMessages, newMessage]);
    setIsRunning(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: GameMessage = {
        id: crypto.randomUUID(),
        content: `Response to: ${input}`,
        role: "assistant",
        createdAt: new Date(),
      };
      setMessages((currentMessages) => [...currentMessages, aiResponse]);
      setIsRunning(false);
    }, 1000);
  };

  const runtime = useExternalStoreRuntime({
    isRunning,
    messages,
    convertMessage,
    onNew,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
