import { Person } from "../sidebar/PersonsList";
import { OverviewCard } from "./InterviewOverview";

interface PersonsOverviewProps {
  persons: Person[];
  onSelectPerson: (person: Person) => void;
}

export function PersonsOverview({ persons, onSelectPerson }: PersonsOverviewProps) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-zinc-100 mb-6">Persons of Interest</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {persons.map((person) => (
          <OverviewCard
            key={person.id}
            title={person.name}
            subtitle={person.role}
            description={person.background}
            image={person.profileImage}
            onClick={() => onSelectPerson(person)}
            tags={[
              {
                label: `Trust: ${person.trust}`,
                color: getTrustLevelColor(person.trust),
              },
              {
                label: `Mood: ${person.mood}`,
                color: getMoodColor(person.mood),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
}

function getTrustLevelColor(trust?: string) {
  switch (trust?.toLowerCase()) {
    case "high":
      return "bg-green-900/50 text-green-300";
    case "medium":
      return "bg-yellow-900/50 text-yellow-300";
    case "low":
      return "bg-red-900/50 text-red-300";
    default:
      return "bg-zinc-700 text-zinc-300";
  }
}

function getMoodColor(mood?: string) {
  switch (mood?.toLowerCase()) {
    case "cooperative":
      return "bg-blue-900/50 text-blue-300";
    case "defensive":
      return "bg-orange-900/50 text-orange-300";
    case "nervous":
      return "bg-purple-900/50 text-purple-300";
    case "evasive":
      return "bg-red-900/50 text-red-300";
    case "helpful":
      return "bg-green-900/50 text-green-300";
    default:
      return "bg-zinc-700 text-zinc-300";
  }
}
