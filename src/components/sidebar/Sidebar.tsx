import { SearchBar } from "./SearchBar";
import { PersonsList } from "./PersonsList";
import { EvidenceList } from "./EvidenceList";
import { LocationsList } from "./LocationsList";

import { Person } from "./PersonsList";
import { Evidence } from "./EvidenceList";
import { Location } from "./LocationsList";

interface SidebarProps {
  showSidebar: boolean;
  selectedTab: string;
  selectedPerson: string;
  onSelectPerson: (person: Person) => void;
  selectedEvidence: string | undefined;
  onSelectEvidence: (evidence: Evidence) => void;
  selectedLocation: string | undefined;
  onSelectLocation: (location: Location) => void;
}

export function Sidebar({ showSidebar, selectedTab, selectedPerson, onSelectPerson, selectedEvidence, onSelectEvidence, selectedLocation, onSelectLocation }: SidebarProps) {
  if (!showSidebar) return null;

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <SearchBar />
      <div className="flex-1 overflow-y-auto px-4">
        {selectedTab === "interview" && (
          <PersonsList selectedPerson={selectedPerson} onSelectPerson={onSelectPerson} />
        )}
        {selectedTab === "evidence" && (
          <EvidenceList selectedEvidence={selectedEvidence} onSelectEvidence={onSelectEvidence} />
        )}
        {selectedTab === "locations" && (
          <LocationsList selectedLocation={selectedLocation} onSelectLocation={onSelectLocation} />
        )}
      </div>
    </div>
  );
}
