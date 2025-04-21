"use client";

import {
  useExternalStoreRuntime,
  ThreadMessageLike,
  AppendMessage,
  AssistantRuntimeProvider,
} from "@assistant-ui/react";
import { useState, ReactNode, useEffect, useCallback } from "react";
import { useMessagesStore } from "@/store/messagesStore";

export interface GameMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  createdAt: Date;
}

type PersonId = string;

interface GameRuntimeProviderProps {
  children: ReactNode;
  personId: PersonId;
}
const EMPTY_MESSAGES: GameMessage[] = [];

export function GameRuntimeProvider({
  children,
  personId,
}: GameRuntimeProviderProps) {
  const convertMessageCallback = useCallback(
    (message: GameMessage): ThreadMessageLike => {
      return {
        role: message.role,
        content: [{ type: "text", text: message.content }],
      };
    },
    []
  );

  const addMessage = useMessagesStore((state) => state.addMessage);
  const messagesFromStore = useMessagesStore((state) =>
    state.allMessages.get(personId)
  );

  const [displayMessages, setDisplayMessages] =
    useState<GameMessage[]>(EMPTY_MESSAGES);

  useEffect(() => {
    setDisplayMessages(messagesFromStore || EMPTY_MESSAGES);
  }, [messagesFromStore]);

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

    addMessage(personId, newMessage);

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

      if (!response.body) {
        throw new Error("Response has no body");
      }

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      const messageId = crypto.randomUUID();
      const baseMessage: GameMessage = {
        id: messageId,
        content: "",
        role: "assistant",
        createdAt: new Date(),
      };

      addMessage(personId, baseMessage);

      try {
        let accumulatedContent = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const lines = value.split("\n").filter((line) => line.trim());
          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const content = JSON.parse(line.substring(2));
                accumulatedContent += content;
                addMessage(personId, {
                  ...baseMessage,
                  content: accumulatedContent,
                });
              } catch {}
            }
            if (line.startsWith("e:") || line.startsWith("d:")) {
              return;
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error("[GameRuntimeProvider] onNew error:", error);
      const errorResponse: GameMessage = {
        id: crypto.randomUUID(),
        content: "Sorry, something went wrong while contacting the assistant.",
        role: "assistant",
        createdAt: new Date(),
      };

      addMessage(personId, errorResponse);
    } finally {
      setIsRunning(false);
    }
  };

  const runtime = useExternalStoreRuntime({
    isRunning,
    messages: displayMessages,
    convertMessage: convertMessageCallback,
    onNew,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
