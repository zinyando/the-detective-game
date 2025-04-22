import { Person } from "../sidebar/PersonsList";

interface CharacterDetailsModalProps {
  person: Person;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterDetailsModal({ person, isOpen, onClose }: CharacterDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-zinc-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-4 border-b border-zinc-700">
          <div>
            <h2 className="text-xl font-bold text-amber-400">{person.name}</h2>
            <p className="text-zinc-100 text-sm">{person.role}</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Mood</h3>
              <p className="text-zinc-100">{person.mood || "Unknown"}</p>
            </div>
            <div>
              <h3 className="text-zinc-400 text-sm font-medium mb-1">Trust Level</h3>
              <p className="text-zinc-100">{person.trust || "Unknown"}</p>
            </div>
          </div>
          <div>
            <h3 className="text-zinc-400 text-sm font-medium mb-1">Alibi</h3>
            <p className="text-zinc-100">{person.alibi}</p>
          </div>
          <div>
            <h3 className="text-zinc-400 text-sm font-medium mb-1">Motive</h3>
            <p className="text-zinc-100">{person.motive}</p>
          </div>
          <div>
            <h3 className="text-zinc-400 text-sm font-medium mb-1">Background</h3>
            <p className="text-zinc-100">{person.background}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
