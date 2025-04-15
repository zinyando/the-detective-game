import type { FC } from "react";
import { Person } from "../sidebar/PersonsList";

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
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left hover:bg-zinc-800 ${isSelected ? 'bg-zinc-800' : ''}`}
    >
      <div className="flex-1">
        <ThreadListItemTitle name={person.name} />
        {person.role && (
          <p className="text-xs text-zinc-500">{person.role}</p>
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


