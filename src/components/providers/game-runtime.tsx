"use client";

import {
  useExternalStoreRuntime,
  ThreadMessageLike,
  AppendMessage,
  AssistantRuntimeProvider,
} from "@assistant-ui/react";
import { useState, ReactNode, useEffect } from "react";

export interface GameMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
}

type PersonId = string;
type AllMessagesStore = Map<PersonId, GameMessage[]>;

interface GameRuntimeProviderProps {
  children: ReactNode;
  personId: PersonId;
}

const convertMessage = (message: GameMessage): ThreadMessageLike => {
  return {
    role: message.role,
    content: [{ type: "text", text: message.content }],
  };
};

export function GameRuntimeProvider({
  children,
  personId,
}: GameRuntimeProviderProps) {
  const [allMessages, setAllMessages] = useState<AllMessagesStore>(new Map());
  const [currentThreadMessages, setCurrentThreadMessages] = useState<
    GameMessage[]
  >([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const messagesForPerson = allMessages.get(personId) || [];
    setCurrentThreadMessages(messagesForPerson);
  }, [personId, allMessages]);

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

    setAllMessages((prevStore) => {
      const newStore = new Map(prevStore);
      const currentMessages = newStore.get(personId) || [];
      newStore.set(personId, [...currentMessages, newMessage]);
      return newStore;
    });

    setIsRunning(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, personId: personId }),
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

      setAllMessages((prevStore) => {
        const newStore = new Map(prevStore);
        const currentMessages = newStore.get(personId) || [];
        newStore.set(personId, [...currentMessages, aiResponse]);
        return newStore;
      });
    } catch (error) {
      console.error("[GameRuntimeProvider] onNew error:", error);
      const errorResponse: GameMessage = {
        id: crypto.randomUUID(),
        content: "Sorry, something went wrong while contacting the assistant.",
        role: "assistant",
        createdAt: new Date(),
      };

      setAllMessages((prevStore) => {
        const newStore = new Map(prevStore);
        const currentMessages = newStore.get(personId) || [];
        newStore.set(personId, [...currentMessages, errorResponse]);
        return newStore;
      });
    } finally {
      setIsRunning(false);
    }
  };

  const runtime = useExternalStoreRuntime({
    isRunning,
    messages: currentThreadMessages,
    convertMessage,
    onNew,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
