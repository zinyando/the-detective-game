import { SearchBar } from "./SearchBar";
import { PersonsList } from "./PersonsList";
import { EvidenceList } from "./EvidenceList";
import { LocationsList } from "./LocationsList";

import { Person } from "./PersonsList";

interface SidebarProps {
  showSidebar: boolean;
  selectedPerson: string;
  onSelectPerson: (person: Person) => void;
}

export function Sidebar({ showSidebar, selectedPerson, onSelectPerson }: SidebarProps) {
  if (!showSidebar) return null;

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <SearchBar />
      <div className="flex-1 overflow-y-auto px-4">
        <PersonsList selectedPerson={selectedPerson} onSelectPerson={onSelectPerson} />
        <EvidenceList />
        <LocationsList />
      </div>
    </div>
  );
}
