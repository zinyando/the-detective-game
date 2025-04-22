import { Thread } from "@/components/assistant-ui/thread";
import { GameRuntimeProvider } from "@/components/providers/game-runtime";
import { Person } from "../sidebar/PersonsList";
import { useState } from "react";
import { CharacterDetailsModal } from "./CharacterDetailsModal";

interface InterviewSectionProps {
  selectedPerson: Person | null;
}

export function InterviewSection({ selectedPerson }: InterviewSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div className="bg-zinc-800 border-b border-zinc-700 px-3 sm:px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between shadow-sm rounded-t-lg">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 min-w-0 pr-16 relative">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-400 tracking-tight truncate">{selectedPerson.name}</h1>
          <span className="text-xs sm:text-sm md:text-base text-zinc-100 font-medium truncate">{selectedPerson.role}</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute right-0 top-0 sm:hidden px-2 py-1 text-xs font-medium text-zinc-200 hover:text-zinc-100 bg-zinc-700/50 hover:bg-zinc-700 rounded-full transition-colors"
          >
            Details
          </button>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden sm:block px-3 py-1 text-xs font-medium text-zinc-200 hover:text-zinc-100 bg-zinc-700/50 hover:bg-zinc-700 rounded-full transition-colors"
        >
          View Details
        </button>
        <CharacterDetailsModal
          person={selectedPerson}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      {/* Interview Thread */}
      <GameRuntimeProvider personId={selectedPerson.id}>
        <Thread />
      </GameRuntimeProvider>
    </div>
  );
}
