export interface Evidence {
  id: string;
  title: string;
  description: string;
  details: string;
  dateFound: string;
  location: string;
  importance: string;
  veracity: string;
}



interface EvidenceListProps {
  evidence: Evidence[];
  selectedEvidence: string | undefined;
  onSelectEvidence: (evidence: Evidence) => void;
}

export function EvidenceList({ evidence, selectedEvidence, onSelectEvidence }: EvidenceListProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-xs tracking-wider font-bold text-zinc-500 border-b border-zinc-800 pb-1">
        KEY EVIDENCE
      </div>
      <div className="space-y-1 text-sm">
        {evidence.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectEvidence(item)}
            className={`p-2 ${item.id === selectedEvidence ? "bg-zinc-800 border-l-2 border-amber-500" : "hover:bg-zinc-800"} rounded cursor-pointer`}
          >
            <div className="text-zinc-300">{item.title}</div>
            <div className="text-xs text-zinc-500">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
