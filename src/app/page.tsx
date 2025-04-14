"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { MainContent } from "../components/main/MainContent";
import { CaseNotes } from "../components/CaseNotes";
import { Person } from "../components/sidebar/PersonsList";
import { Evidence } from "../components/sidebar/EvidenceList";

export default function ModernNoirUI() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedTab, setSelectedTab] = useState("interview");
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person>({
    name: "Marcus Chen",
    role: "Business Partner",
    mood: "Defensive",
    trust: "Low"
  });

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-zinc-300 font-sans">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          showSidebar={showSidebar}
          selectedPerson={selectedPerson.name}
          onSelectPerson={setSelectedPerson}
          selectedEvidence={selectedEvidence?.id}
          onSelectEvidence={setSelectedEvidence}
        />

        <MainContent 
          selectedTab={selectedTab} 
          setSelectedTab={setSelectedTab}
          selectedPerson={selectedPerson}
          selectedEvidence={selectedEvidence}
        />

        <CaseNotes />
      </div>
    </div>
  );
}
