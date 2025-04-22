import Image from "next/image";
import { User } from "lucide-react";

export interface Person {
  id: string;
  name: string;
  role: string;
  mood?: string;
  trust?: string;
  background: string;
  alibi: string;
  motive: string;
  profileImage: string;
}

interface PersonsListProps {
  persons: Person[];
  selectedPerson: string;
  onSelectPerson: (person: Person) => void;
}

export function PersonsList({
  persons,
  selectedPerson,
  onSelectPerson,
}: PersonsListProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-xs tracking-wider font-bold text-zinc-500 border-b border-zinc-800 pb-1">
        PERSONS OF INTEREST
      </div>
      <div className="space-y-1 text-sm">
        {persons.map((person) => (
          <div
            key={person.id}
            onClick={() => onSelectPerson(person)}
            className={`flex items-center p-2 ${
              person.id === selectedPerson
                ? "bg-zinc-800 border-l-2 border-amber-500"
                : "hover:bg-zinc-800"
            } rounded cursor-pointer`}
          >
            <div className="relative w-8 h-8 bg-zinc-700 rounded-full overflow-hidden">
              <Image
                src={person.profileImage}
                alt={person.name}
                width={32}
                height={32}
                className="object-cover w-full h-full"
                onError={() => {
                  const fallback = (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={14} />
                    </div>
                  );
                  return fallback;
                }}
              />
            </div>
            <div className="ml-2">
              <div>{person.name}</div>
              <div className="text-xs text-zinc-500">{person.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
