import { Evidence } from "../sidebar/EvidenceList";
import { OverviewCard } from "./InterviewOverview";

interface EvidenceOverviewProps {
  evidence: Evidence[];
  onSelectEvidence: (evidence: Evidence) => void;
}

export function EvidenceOverview({ evidence, onSelectEvidence }: EvidenceOverviewProps) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-zinc-100 mb-6">Evidence</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evidence.map((item) => (
          <OverviewCard
            key={item.id}
            title={item.title}
            subtitle={`Found: ${item.dateFound}`}
            description={item.description}
            onClick={() => onSelectEvidence(item)}
            tags={[
              {
                label: item.location,
                color: "bg-blue-900/50 text-blue-300",
              },
              {
                label: item.importance,
                color: getImportanceColor(item.importance),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
}

function getImportanceColor(importance: string) {
  switch (importance.toLowerCase()) {
    case "high":
      return "bg-red-900/50 text-red-300";
    case "medium":
      return "bg-yellow-900/50 text-yellow-300";
    case "low":
      return "bg-green-900/50 text-green-300";
    default:
      return "bg-purple-900/50 text-purple-300";
  }
}
