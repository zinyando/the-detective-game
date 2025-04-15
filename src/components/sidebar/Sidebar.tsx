import { SearchBar } from "./SearchBar";
import { EvidenceList } from "./EvidenceList";
import { LocationsList } from "./LocationsList";
import { ThreadList } from "../assistant-ui/thread-list";

import { Person } from "./PersonsList";
import { Evidence } from "./EvidenceList";
import { Location } from "./LocationsList";

interface SidebarProps {
  showSidebar: boolean;
  selectedTab: string;
  persons: Person[];
  selectedPerson: string;
  onSelectPerson: (person: Person) => void;
  evidence: Evidence[];
  selectedEvidence: string | undefined;
  onSelectEvidence: (evidence: Evidence) => void;
  locations: Location[];
  selectedLocation: string | undefined;
  onSelectLocation: (location: Location) => void;
}

export function Sidebar({ showSidebar, selectedTab, persons, selectedPerson, onSelectPerson, evidence, selectedEvidence, onSelectEvidence, locations, selectedLocation, onSelectLocation }: SidebarProps) {
  if (!showSidebar) return null;

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <SearchBar />
      <div className="flex-1 overflow-y-auto px-4">
        {selectedTab === "interview" && (
          <ThreadList
            persons={persons}
            selectedPerson={selectedPerson}
            onSelectPerson={onSelectPerson}
          />
        )}
        {selectedTab === "evidence" && (
          <EvidenceList 
            evidence={evidence}
            selectedEvidence={selectedEvidence} 
            onSelectEvidence={onSelectEvidence} 
          />
        )}
        {selectedTab === "locations" && (
          <LocationsList 
            locations={locations}
            selectedLocation={selectedLocation} 
            onSelectLocation={onSelectLocation} 
          />
        )}
      </div>
    </div>
  );
}
