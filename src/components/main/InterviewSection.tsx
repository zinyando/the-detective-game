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
      {/* Character Info Section */}
      <div className="bg-zinc-800 border-b border-zinc-700 px-6 py-5 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm rounded-t-lg">
        <div className="flex-1">
          <div className="text-3xl font-extrabold text-amber-400 mb-0.5 tracking-tight">{selectedPerson.name}</div>
          <div className="text-zinc-100 text-lg font-semibold mb-3">{selectedPerson.role}</div>
          <div className="flex flex-wrap gap-6 mb-3">
            <div className="text-zinc-200 text-sm"><span className="font-bold">Mood:</span> <span className="text-zinc-100">{selectedPerson.mood || "Unknown"}</span></div>
            <div className="text-zinc-200 text-sm"><span className="font-bold">Trust:</span> <span className="text-zinc-100">{selectedPerson.trust || "Unknown"}</span></div>
          </div>
          <div className="space-y-1">
            <div className="text-zinc-200 text-sm"><span className="font-bold">Alibi:</span> <span className="text-zinc-100">{selectedPerson.alibi}</span></div>
            <div className="text-zinc-200 text-sm"><span className="font-bold">Motive:</span> <span className="text-zinc-100">{selectedPerson.motive}</span></div>
          </div>
        </div>
        <div className="max-w-md bg-zinc-900/80 rounded-lg p-4 text-zinc-100 text-sm border border-zinc-700 shadow hidden md:block">
          <div className="font-bold text-zinc-200 mb-1">Background</div>
          <div>{selectedPerson.background}</div>
        </div>
      </div>
      {/* Interview Thread */}
      <GameRuntimeProvider personId={selectedPerson.id}>
        <Thread />
      </GameRuntimeProvider>
    </div>
  );
}
