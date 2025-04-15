import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";

export function InterviewSection() {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="detective-assistant-ui h-full w-full flex flex-col bg-zinc-900">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}
