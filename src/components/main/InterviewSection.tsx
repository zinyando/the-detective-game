import { Thread } from "@/components/assistant-ui/thread";
import { GameRuntimeProvider } from "@/components/providers/game-runtime";
import { Person } from "../sidebar/PersonsList";

interface InterviewSectionProps {
  selectedPerson: Person | null;
}

export function InterviewSection({ selectedPerson }: InterviewSectionProps) {
  if (!selectedPerson) {
    return (
      <div className="detective-assistant-ui h-full w-full flex flex-col bg-zinc-900 items-center justify-center">
        <p className="text-zinc-500">Select a person to start the interview.</p>
      </div>
    );
  }

  return (
    <div className="detective-assistant-ui h-full w-full flex flex-col bg-zinc-900 relative overflow-hidden">
      <GameRuntimeProvider personId={selectedPerson.id}>
        <Thread />
      </GameRuntimeProvider>
    </div>
  );
}
