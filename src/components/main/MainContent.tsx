import { Tabs } from "./Tabs";
import { InterviewSection } from "./InterviewSection";

import { Evidence } from "../sidebar/EvidenceList";
import { Location } from "../sidebar/LocationsList";
import { EvidenceView } from "./EvidenceView";
import { LocationView } from "./LocationView";
import { NotesView } from "./NotesView";

interface MainContentProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  selectedEvidence: Evidence | null;
  selectedLocation: Location | null;
}

export function MainContent({
  selectedTab,
  setSelectedTab,
  selectedEvidence,
  selectedLocation,
}: MainContentProps) {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900">
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "interview" && <InterviewSection />}
      {selectedTab === "evidence" && (
        <EvidenceView evidence={selectedEvidence} />
      )}
      {selectedTab === "locations" && (
        <LocationView location={selectedLocation} />
      )}
      {selectedTab === "notes" && <NotesView />}
    </div>
  );
}
