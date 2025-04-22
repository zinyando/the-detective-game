import type { FC } from "react";
import { Person } from "../sidebar/PersonsList";
import Image from "next/image";
import { User } from "lucide-react";

interface ThreadListProps {
  persons: Person[];
  selectedPerson: string;
  onSelectPerson: (person: Person) => void;
}

export const ThreadList: FC<ThreadListProps> = ({ persons, selectedPerson, onSelectPerson }) => {
  return (
    <div className="mb-6">
      <div className="mb-2 text-xs tracking-wider font-bold text-zinc-500 border-b border-zinc-800 pb-1">
        PERSONS OF INTEREST
      </div>
      <div className="space-y-1">
        <ThreadListItems 
          persons={persons}
          selectedPerson={selectedPerson}
          onSelectPerson={onSelectPerson}
        />
      </div>
    </div>
  );
};

const ThreadListItems: FC<ThreadListProps> = ({ persons, selectedPerson, onSelectPerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <ThreadListItem
          key={person.id}
          person={person}
          isSelected={person.id === selectedPerson}
          onSelect={() => onSelectPerson(person)}
        />
      ))}
    </div>
  );
};

interface ThreadListItemProps {
  person: Person;
  isSelected: boolean;
  onSelect: () => void;
}

const ThreadListItem: FC<ThreadListItemProps> = ({ person, isSelected, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left hover:bg-zinc-800 ${isSelected ? 'bg-zinc-800' : ''}`}
    >
      <div className="relative w-10 h-10 bg-zinc-700 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={person.profileImage}
          alt={person.name}
          width={40}
          height={40}
          className="object-cover"
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
      <div className="flex-1 min-w-0">
        <ThreadListItemTitle name={person.name} />
        {person.role && (
          <p className="text-xs text-zinc-500 truncate">{person.role}</p>
        )}
      </div>
    </button>
  );
};

const ThreadListItemTitle: FC<{ name: string }> = ({ name }) => {
  return (
    <p className="text-sm text-zinc-300 font-medium">
      {name}
    </p>
  );
};


