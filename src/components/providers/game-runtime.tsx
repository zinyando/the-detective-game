"use client";

import {
  useExternalStoreRuntime,
  ThreadMessageLike,
  AppendMessage,
  AssistantRuntimeProvider,
} from "@assistant-ui/react";
import { useState, ReactNode } from "react";

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

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!response.ok) {
        throw new Error(`Network error ${response.status}`);
      }
      const data = await response.json();
      const aiResponse: GameMessage = {
        id: crypto.randomUUID(),
        content: data.reply || "",
        role: "assistant",
        createdAt: new Date(),
      };
      setMessages((currentMessages) => [...currentMessages, aiResponse]);
    } catch (error) {
      console.error("[GameRuntimeProvider] onNew error:", error);
      const errorResponse: GameMessage = {
        id: crypto.randomUUID(),
        content: "Sorry, something went wrong while contacting the assistant.",
        role: "assistant",
        createdAt: new Date(),
      };
      setMessages((currentMessages) => [...currentMessages, errorResponse]);
    } finally {
      setIsRunning(false);
    }
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
