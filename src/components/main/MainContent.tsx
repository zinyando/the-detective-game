import { Tabs } from "./Tabs";
import { InterviewSection } from "./InterviewSection";

import { Person } from "../sidebar/PersonsList";
import { Evidence } from "../sidebar/EvidenceList";
import { EvidenceView } from "./EvidenceView";

interface MainContentProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  selectedPerson: Person;
  selectedEvidence: Evidence | null;
}

export function MainContent({ selectedTab, setSelectedTab, selectedPerson, selectedEvidence }: MainContentProps) {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900">
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "interview" && <InterviewSection person={selectedPerson} />}
      {selectedTab === "evidence" && <EvidenceView evidence={selectedEvidence} />}
    </div>
  );
}
