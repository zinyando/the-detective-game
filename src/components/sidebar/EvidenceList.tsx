export interface Evidence {
  id: string;
  title: string;
  description: string;
  details: string;
  dateFound: string;
  location: string;
}

const evidenceItems: Evidence[] = [
  {
    id: "security-footage",
    title: "Security Footage",
    description: "Parkade Camera #3",
    details: "Footage shows an unidentified figure entering the building at 10:45 PM. The figure appears to be of similar build to the victim&apos;s business partner.",
    dateFound: "April 17, 2025",
    location: "Riverside Corporate Center"
  },
  {
    id: "threatening-email",
    title: "Threatening Email",
    description: "Sent 3 days before murder",
    details: "Email contains explicit threats regarding a business dispute. IP address traced to a local coffee shop frequented by Marcus Chen.",
    dateFound: "April 16, 2025",
    location: "Victim&apos;s Laptop"
  },
  {
    id: "phone-records",
    title: "Phone Records",
    description: "Call logs from victim&apos;s phone",
    details: "Multiple calls between victim and Marcus Chen on the night of the murder. Last call at 9:30 PM lasted 45 seconds.",
    dateFound: "April 18, 2025",
    location: "Phone Company Records"
  },
];

interface EvidenceListProps {
  selectedEvidence: string | undefined;
  onSelectEvidence: (evidence: Evidence) => void;
}

export function EvidenceList({ selectedEvidence, onSelectEvidence }: EvidenceListProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-xs tracking-wider font-bold text-zinc-500 border-b border-zinc-800 pb-1">
        KEY EVIDENCE
      </div>
      <div className="space-y-1 text-sm">
        {evidenceItems.map((item) => (
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
