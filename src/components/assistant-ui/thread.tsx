import {
  ActionBarPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useThreadRuntime,
} from "@assistant-ui/react";
import type { FC } from "react";
import { SendHorizontalIcon, ArrowDownIcon, PencilIcon, CopyIcon, CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";

import { Person } from "../sidebar/PersonsList";
import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import type { ThreadMessageLike, TextContentPart, AppendMessage } from "@assistant-ui/react";
import { useExternalStoreRuntime } from "@assistant-ui/react";

interface ThreadProps {
  person: Person | null;
}

interface GameMessage {
  role: "user" | "assistant";
  content: string;
}

export const Thread: FC<ThreadProps> = ({ person }) => {
  const [messages, setMessages] = useState<GameMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useExternalStoreRuntime<GameMessage>({
    isRunning,
    messages,
    convertMessage: (message: GameMessage): ThreadMessageLike => ({
      role: message.role,
      content: [{ type: "text", text: message.content } as TextContentPart],
    }),
    onNew: async (message: AppendMessage) => {
      console.log("[onNew] Triggered with message:", JSON.stringify(message, null, 2));
      if (message.content[0]?.type === "text") {
        const userText = message.content[0].text;
        console.log("[onNew] User text:", userText);
        const newMessage: GameMessage = {
          role: "user",
          content: userText,
        };
        setMessages(prev => {
          const updatedMessages = [...prev, newMessage];
          console.log("[onNew] Updated messages with user message:", JSON.stringify(updatedMessages, null, 2));
          return updatedMessages;
        });
        setIsRunning(true);

        // Send message to API
        try {
          console.log("[onNew] Sending to API:", userText);
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userText }),
          });
          console.log("[onNew] API response status:", response.status);

          if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
          }

          const data = await response.json();
          console.log("[onNew] API response data:", JSON.stringify(data, null, 2));

          const aiResponse: GameMessage = {
            role: "assistant",
            content: data?.reply || "Sorry, I couldn't get a response.",
          };
          setMessages(prev => {
            const updatedMessages = [...prev, aiResponse];
            console.log("[onNew] Updated messages with AI response:", JSON.stringify(updatedMessages, null, 2));
            return updatedMessages;
          });

        } catch (error) {
          console.error("[onNew] API fetch error:", error);
          const errorResponse: GameMessage = {
            role: "assistant",
            content: "Sorry, something went wrong while contacting the assistant.",
          };
          setMessages(prev => {
            const updatedMessages = [...prev, errorResponse];
            console.log("[onNew] Updated messages with error response:", JSON.stringify(updatedMessages, null, 2));
            return updatedMessages;
          });
        } finally {
          setIsRunning(false);
          console.log("[onNew] Finished processing.");
        }
      } else {
        console.log("[onNew] Message content is not text, skipping processing.");
      }
    },
  });

  useEffect(() => {
    // Clear messages when the person changes
    setMessages([]);
    // Optionally, fetch initial messages or show a welcome message
    // For now, let's just clear the state
  }, [person]);

  useEffect(() => {
    if (person) {
      console.log("Thread rendering for person:", person);
    }
  }, [person]);

  return (
    <ThreadPrimitive.Root
      className="bg-zinc-900 box-border flex h-full flex-col overflow-hidden"
      style={{
        ["--thread-max-width" as string]: "42rem",
      }}
    >
      <ThreadPrimitive.Viewport className="flex h-full flex-col items-center overflow-y-scroll scroll-smooth bg-inherit px-4 pt-8">
        <ThreadWelcome />
        <ThreadPrimitive.Messages
          components={{
            UserMessage: UserMessage,
            EditComposer: EditComposer,
            AssistantMessage: AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <div className="min-h-8 flex-grow" />
        </ThreadPrimitive.If>

        <div className="sticky bottom-0 mt-3 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-lg bg-inherit pb-4">
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="absolute -top-8 rounded-full disabled:invisible"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className="flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col">
        <div className="flex w-full flex-grow flex-col items-center justify-center"></div>
      </div>
    </ThreadPrimitive.Empty>
  );
};

interface ComposerActionProps {
  onSubmit: () => void;
}

const Composer: FC = () => {
  const [message, setMessage] = useState("");
  const runtime = useThreadRuntime();

  const handleSubmit = () => {
    if (!message.trim()) return;
    runtime.append({
      role: "user",
      content: [{ type: "text", text: message } as TextContentPart],
    });
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <ComposerPrimitive.Root className="focus-within:border-amber-500/20 flex w-full flex-wrap items-end rounded-lg bg-zinc-800 px-2.5 shadow-sm transition-colors ease-in">
      <ComposerPrimitive.Input
        rows={1}
        className="flex-1 bg-transparent p-2.5 text-sm text-zinc-200 outline-none"
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ComposerAction onSubmit={handleSubmit} />
    </ComposerPrimitive.Root>
  );
};

const ComposerAction: FC<ComposerActionProps> = ({ onSubmit }) => {
  return (
    <button
      type="submit"
      onClick={onSubmit}
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-700 text-zinc-200 hover:bg-zinc-600"
    >
      <SendHorizontalIcon className="h-4 w-4" />
    </button>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="flex items-start gap-4 w-full max-w-[var(--thread-max-width)] py-4 flex-row-reverse">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-zinc-200">
        U
      </div>
      <div className="flex-1 flex justify-end">
        <div className="bg-zinc-900 text-zinc-300 max-w-[calc(var(--thread-max-width)*0.8)] break-words rounded-xl px-4 py-2">
          <MessagePrimitive.Content />
        </div>
      </div>
    </MessagePrimitive.Root>
  );
};



const EditComposer: FC = () => {
  const [editMessage, setEditMessage] = useState("");

  const handleEditSubmit = () => {
    if (!editMessage.trim()) return;
    // TODO: Implement edit functionality
    setEditMessage("");
  };

  const handleEditKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEditSubmit();
    }
  };

  return (
    <ComposerPrimitive.Root className="bg-zinc-800 my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2 rounded-xl p-4">
      <ComposerPrimitive.Input 
        value={editMessage}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditMessage(e.target.value)}
        onKeyDown={handleEditKeyDown}
        placeholder="Edit your message..."
        className="text-zinc-200 flex min-h-[40px] w-full resize-none bg-transparent outline-none" 
      />

      <div className="flex items-center justify-between mt-2">
        <ComposerPrimitive.Cancel asChild>
          <Button 
            variant="ghost" 
            className="text-zinc-300 hover:text-zinc-100"
            onClick={() => setEditMessage("")}
          >
            Cancel
          </Button>
        </ComposerPrimitive.Cancel>
        <ComposerPrimitive.Send asChild>
          <Button 
            className="bg-amber-500 text-zinc-900 hover:bg-amber-600 flex items-center gap-2"
            onClick={handleEditSubmit}
            disabled={!editMessage.trim()}
          >
            Save
            <PencilIcon className="w-4 h-4" />
          </Button>
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="flex items-start gap-4 w-full max-w-[var(--thread-max-width)] py-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-zinc-900">
        D
      </div>
      <div className="flex-1">
        <div className="bg-zinc-800 text-zinc-200 max-w-[calc(var(--thread-max-width)*0.8)] break-words rounded-xl px-4 py-2">
          <MessagePrimitive.Content components={{ Text: MarkdownText }} />
        </div>
        <div className="mt-2 flex items-center gap-2 text-zinc-500">
          <ActionBarPrimitive.Root hideWhenRunning autohide="not-last">
            <ActionBarPrimitive.Copy asChild>
              <TooltipIconButton tooltip="Copy message">
                <MessagePrimitive.If copied={false}>
                  <CopyIcon className="h-4 w-4" />
                </MessagePrimitive.If>
                <MessagePrimitive.If copied>
                  <CheckIcon className="h-4 w-4" />
                </MessagePrimitive.If>
              </TooltipIconButton>
            </ActionBarPrimitive.Copy>
          </ActionBarPrimitive.Root>
        </div>
      </div>
    </MessagePrimitive.Root>
  );
};
