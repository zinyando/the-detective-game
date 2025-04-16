import { Thread } from "@/components/assistant-ui/thread";

import { Person } from "../sidebar/PersonsList";

interface InterviewSectionProps {
  selectedPerson: Person | null;
}

export function InterviewSection({ selectedPerson }: InterviewSectionProps) {
  return (
    <div className="detective-assistant-ui h-full w-full flex flex-col bg-zinc-900">
      <Thread person={selectedPerson} />
    </div>
  );
}
