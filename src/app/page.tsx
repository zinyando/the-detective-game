"use client";

"use client";

import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { MainContent } from "../components/main/MainContent";
import { CaseNotes } from "../components/CaseNotes";
import { Person } from "../components/sidebar/PersonsList";
import { Evidence } from "../components/sidebar/EvidenceList";
import { Location } from "../components/sidebar/LocationsList";
import { fetchPersons, fetchEvidence, fetchLocations } from "../services/gameService";

export default function ModernNoirUI() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedTab, setSelectedTab] = useState("interview");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    // Select first item in the respective list when switching tabs
    switch (tab) {
      case "evidence":
        if (evidence.length > 0) setSelectedEvidence(evidence[0]);
        break;
      case "locations":
        if (locations.length > 0) setSelectedLocation(locations[0]);
        break;
      case "interview":
        if (persons.length > 0) setSelectedPerson(persons[0]);
        break;
    }
  };
  
  const [persons, setPersons] = useState<Person[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const [personsData, evidenceData, locationsData] = await Promise.all([
        fetchPersons(),
        fetchEvidence(),
        fetchLocations()
      ]);

      setPersons(personsData);
      setEvidence(evidenceData);
      setLocations(locationsData);

      // Set initial selected person
      if (personsData.length > 0) {
        setSelectedPerson(personsData[0]);
      }
    };

    loadData();
  }, []);


  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-zinc-300 font-sans">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          showSidebar={showSidebar}
          selectedTab={selectedTab}
          persons={persons}
          selectedPerson={selectedPerson?.name || ""}
          onSelectPerson={setSelectedPerson}
          evidence={evidence}
          selectedEvidence={selectedEvidence?.id}
          onSelectEvidence={setSelectedEvidence}
          locations={locations}
          selectedLocation={selectedLocation?.id}
          onSelectLocation={setSelectedLocation}
        />

        <MainContent 
          selectedTab={selectedTab} 
          setSelectedTab={handleTabChange}
          selectedPerson={selectedPerson}
          selectedEvidence={selectedEvidence}
          selectedLocation={selectedLocation}
        />

        <CaseNotes />
      </div>
    </div>
  );
}
