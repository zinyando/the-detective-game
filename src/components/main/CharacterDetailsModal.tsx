import { Person } from "../sidebar/PersonsList";
import Image from "next/image";
import { User } from "lucide-react";

interface CharacterDetailsModalProps {
  person: Person;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterDetailsModal({ person, isOpen, onClose }: CharacterDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-zinc-800 w-full sm:rounded-lg shadow-xl sm:max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex justify-between items-start p-3 sm:p-4 border-b border-zinc-700 bg-zinc-800/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 bg-zinc-700 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={person.profileImage}
                alt={person.name}
                width={64}
                height={64}
                className="object-cover"
                onError={() => {
                  const fallback = (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={24} />
                    </div>
                  );
                  return fallback;
                }}
              />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-amber-400">{person.name}</h2>
              <p className="text-zinc-100 text-xs sm:text-sm">{person.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="-mr-1 p-1 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-3 sm:p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-zinc-900/50 p-2 sm:p-3 rounded-lg">
              <h3 className="text-zinc-400 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Mood</h3>
              <p className="text-zinc-100 text-sm sm:text-base">{person.mood || "Unknown"}</p>
            </div>
            <div className="bg-zinc-900/50 p-2 sm:p-3 rounded-lg">
              <h3 className="text-zinc-400 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Trust Level</h3>
              <p className="text-zinc-100 text-sm sm:text-base">{person.trust || "Unknown"}</p>
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-zinc-900/50 p-2 sm:p-3 rounded-lg">
              <h3 className="text-zinc-400 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Alibi</h3>
              <p className="text-zinc-100 text-sm sm:text-base">{person.alibi}</p>
            </div>
            <div className="bg-zinc-900/50 p-2 sm:p-3 rounded-lg">
              <h3 className="text-zinc-400 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Motive</h3>
              <p className="text-zinc-100 text-sm sm:text-base">{person.motive}</p>
            </div>
            <div className="bg-zinc-900/50 p-2 sm:p-3 rounded-lg">
              <h3 className="text-zinc-400 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Background</h3>
              <p className="text-zinc-100 text-sm sm:text-base">{person.background}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
