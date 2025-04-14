interface Evidence {
  title: string;
  description: string;
}

const evidenceItems: Evidence[] = [
  {
    title: "Security Footage",
    description: "Parkade Camera #3",
  },
  {
    title: "Threatening Email",
    description: "Sent 3 days before murder",
  },
  {
    title: "Phone Records",
    description: "Call logs from victim's phone",
  },
];

export function EvidenceList() {
  return (
    <div className="mb-6">
      <div className="mb-2 text-xs tracking-wider font-bold text-zinc-500 border-b border-zinc-800 pb-1">
        KEY EVIDENCE
      </div>
      <div className="space-y-1 text-sm">
        {evidenceItems.map((item) => (
          <div
            key={item.title}
            className="p-2 hover:bg-zinc-800 rounded cursor-pointer"
          >
            <div className="text-zinc-300">{item.title}</div>
            <div className="text-xs text-zinc-500">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
