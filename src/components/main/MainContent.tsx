import { Tabs } from "./Tabs";
import { InterviewSection } from "./InterviewSection";

import { Person } from "../sidebar/PersonsList";

interface MainContentProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  selectedPerson: Person;
}

export function MainContent({ selectedTab, setSelectedTab, selectedPerson }: MainContentProps) {
  return (
    <div className="flex-1 flex flex-col bg-zinc-900">
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "interview" && <InterviewSection person={selectedPerson} />}
      {/* Add other tab content components when needed */}
    </div>
  );
}
