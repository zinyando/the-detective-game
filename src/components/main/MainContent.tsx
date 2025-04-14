import { Tabs } from "./Tabs";
import { InterviewSection } from "./InterviewSection";

import { Person } from "../sidebar/PersonsList";
import { Evidence } from "../sidebar/EvidenceList";
import { Location } from "../sidebar/LocationsList";
import { EvidenceView } from "./EvidenceView";
import { LocationView } from "./LocationView";

interface MainContentProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  selectedPerson: Person;
  selectedEvidence: Evidence | null;
  selectedLocation: Location | null;
}

export function MainContent({ selectedTab, setSelectedTab, selectedPerson, selectedEvidence, selectedLocation }: MainContentProps) {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900">
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "interview" && <InterviewSection person={selectedPerson} />}
      {selectedTab === "evidence" && <EvidenceView evidence={selectedEvidence} />}
      {selectedTab === "locations" && <LocationView location={selectedLocation} />}
    </div>
  );
}
