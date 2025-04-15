"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { MainContent } from "../components/main/MainContent";
import { CaseNotes } from "../components/CaseNotes";
import { Person } from "../components/sidebar/PersonsList";
import { Evidence } from "../components/sidebar/EvidenceList";
import { Location } from "../components/sidebar/LocationsList";
import {
  fetchPersons,
  fetchEvidence,
  fetchLocations,
} from "../services/gameService";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

export default function ModernNoirUI() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedTab, setSelectedTab] = useState(() => {
    // Default to interview tab unless evidence or location parameter is present
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.has('evidence')) return 'evidence';
      if (params.has('location')) return 'locations';
      return 'interview';
    }
    return 'interview';
  });

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    // Select first item in the respective list when switching tabs
    switch (tab) {
      case "evidence":
        if (evidence.length > 0) {
          const evidenceId = searchParams.get('evidence');
          const selectedEvidence = evidenceId ? evidence.find((e: Evidence) => e.id === evidenceId) : evidence[0];
          updateSelectedEvidence(selectedEvidence || evidence[0], false);
        }
        break;
      case "locations":
        if (locations.length > 0) {
          const locationId = searchParams.get('location');
          const selectedLocation = locationId ? locations.find((l: Location) => l.id === locationId) : locations[0];
          updateSelectedLocation(selectedLocation || locations[0], false);
        }
        break;
      case "interview":
        if (persons.length > 0) {
          const personId = searchParams.get('person');
          const person = personId ? persons.find(p => p.id === personId) : persons[0];
          updateSelectedPerson(person || persons[0], false);
        }
        break;
    }
  };

  const [persons, setPersons] = useState<Person[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const updateSelectedPerson = useCallback((person: Person | null, preserveOtherParams = true) => {
    setSelectedPerson(person);
    if (person) {
      const params = preserveOtherParams ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
      params.set('person', person.id);
      router.push(`?${params.toString()}`);
    }
  }, [searchParams, router]);

  const updateSelectedEvidence = useCallback((evidence: Evidence | null, preserveOtherParams = true) => {
    setSelectedEvidence(evidence);
    if (evidence) {
      const params = preserveOtherParams ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
      params.set('evidence', evidence.id);
      router.push(`?${params.toString()}`);
    }
  }, [searchParams, router]);

  const updateSelectedLocation = useCallback((location: Location | null, preserveOtherParams = true) => {
    setSelectedLocation(location);
    if (location) {
      const params = preserveOtherParams ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
      params.set('location', location.id);
      router.push(`?${params.toString()}`);
    }
  }, [searchParams, router]);

  useEffect(() => {
    const loadData = async () => {
      const [personsData, evidenceData, locationsData] = await Promise.all([
        fetchPersons(),
        fetchEvidence(),
        fetchLocations(),
      ]);

      setPersons(personsData);
      setEvidence(evidenceData);
      setLocations(locationsData);

      // Set initial selected person
      if (personsData.length > 0) {
        const personId = searchParams.get('person');
        const person = personId ? personsData.find(p => p.id === personId) : personsData[0];
        updateSelectedPerson(person || personsData[0]);
      }

      // Set initial selected evidence only if on evidence tab
      if (evidenceData.length > 0 && searchParams.has('evidence')) {
        const evidenceId = searchParams.get('evidence');
        const evidence = evidenceId ? evidenceData.find(e => e.id === evidenceId) : evidenceData[0];
        updateSelectedEvidence(evidence || evidenceData[0]);
      }

      // Set initial selected location only if on locations tab
      if (locationsData.length > 0 && searchParams.has('location')) {
        const locationId = searchParams.get('location');
        const location = locationId ? locationsData.find(l => l.id === locationId) : locationsData[0];
        updateSelectedLocation(location || locationsData[0]);
      }
    };

    loadData();
  }, [searchParams, updateSelectedPerson, updateSelectedEvidence, updateSelectedLocation]);

  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex flex-col h-screen bg-zinc-900 text-zinc-300 font-sans">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            showSidebar={showSidebar}
            selectedTab={selectedTab}
            persons={persons}
            selectedPerson={selectedPerson?.id || ""}
            onSelectPerson={updateSelectedPerson}
            evidence={evidence}
            selectedEvidence={selectedEvidence?.id}
            onSelectEvidence={updateSelectedEvidence}
            locations={locations}
            selectedLocation={selectedLocation?.id}
            onSelectLocation={updateSelectedLocation}
          />

          <MainContent
            selectedTab={selectedTab}
            setSelectedTab={handleTabChange}
            selectedEvidence={selectedEvidence}
            selectedLocation={selectedLocation}
          />

          <CaseNotes />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}
