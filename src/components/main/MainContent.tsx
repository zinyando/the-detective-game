import { Tabs } from "./Tabs";
import { InterviewSection } from "./InterviewSection";

import { Evidence } from "../sidebar/EvidenceList";
import { Location } from "../sidebar/LocationsList";
import { EvidenceView } from "./EvidenceView";
import { LocationView } from "./LocationView";
import { NotesView } from "./NotesView";

import { Person } from "../sidebar/PersonsList";

interface MainContentProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  selectedEvidence: Evidence | null;
  selectedLocation: Location | null;
  selectedPerson: Person | null;
  persons: Person[];
  evidence: Evidence[];
  locations: Location[];
  onSelectPerson: (person: Person) => void;
  onSelectEvidence: (evidence: Evidence) => void;
  onSelectLocation: (location: Location) => void;
}

export function MainContent({
  selectedTab,
  setSelectedTab,
  selectedEvidence,
  selectedLocation,
  selectedPerson,
  persons,
  evidence,
  locations,
  onSelectPerson,
  onSelectEvidence,
  onSelectLocation,
}: MainContentProps) {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900">
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "interview" && (
        <InterviewSection
          selectedPerson={selectedPerson}
          persons={persons}
          onSelectPerson={onSelectPerson}
        />
      )}
      {selectedTab === "evidence" && (
        <EvidenceView
          evidence={selectedEvidence}
          evidenceList={evidence}
          onSelectEvidence={onSelectEvidence}
        />
      )}
      {selectedTab === "locations" && (
        <LocationView
          location={selectedLocation}
          locations={locations}
          onSelectLocation={onSelectLocation}
        />
      )}
      {selectedTab === "case" && <NotesView />}
    </div>
  );
}
