import { Thread } from "@/components/assistant-ui/thread";
import { GameRuntimeProvider } from "@/components/providers/game-runtime";
import { Person } from "../sidebar/PersonsList";
import { useState } from "react";
import { CharacterDetailsModal } from "./CharacterDetailsModal";
import Image from "next/image";
import { User } from "lucide-react";
import { PersonsOverview } from "./PersonsOverview";

interface InterviewSectionProps {
  selectedPerson: Person | null;
  persons: Person[];
  onSelectPerson: (person: Person) => void;
}

export function InterviewSection({ selectedPerson, persons, onSelectPerson }: InterviewSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!selectedPerson) {
    return (
      <div className="detective-assistant-ui h-full w-full flex flex-col bg-zinc-900 overflow-auto">
        <PersonsOverview persons={persons} onSelectPerson={onSelectPerson} />
      </div>
    );
  }

  return (
    <div className="detective-assistant-ui h-full w-full flex flex-col bg-zinc-900 relative overflow-hidden">
      {/* Character Info Section */}
      <div className="bg-zinc-800 border-b border-zinc-700 px-3 sm:px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between shadow-sm rounded-t-lg">
        <div className="flex items-center gap-3 min-w-0 pr-16 relative">
          <div className="relative w-10 h-10 bg-zinc-700 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={selectedPerson.profileImage}
              alt={selectedPerson.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
              onError={() => {
                const fallback = (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                );
                return fallback;
              }}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-400 tracking-tight truncate">{selectedPerson.name}</h1>
            <span className="text-xs sm:text-sm md:text-base text-zinc-100 font-medium truncate">{selectedPerson.role}</span>
          </div>
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
