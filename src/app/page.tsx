"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useEffect, useState, useCallback } from "react";
import { GameIntroModal } from "../components/GameIntroModal";
import { getGameState, startNewGame } from "../services/gameStateService";
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

function ModernNoirUI() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedTab, setSelectedTab] = useState("interview");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["interview", "evidence", "locations", "case"].includes(tab)) {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    
    // Clear selections when switching tabs
    setSelectedPerson(null);
    setSelectedEvidence(null);
    setSelectedLocation(null);

    // Update URL with just the tab parameter
    const params = new URLSearchParams();
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
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
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const updateSelectedPerson = useCallback(
    (person: Person | null, preserveOtherParams = true) => {
      setSelectedPerson(person);
      if (person) {
        const params = preserveOtherParams
          ? new URLSearchParams(searchParams.toString())
          : new URLSearchParams();
        params.set("person", person.id);
        router.push(`?${params.toString()}`);
      }
    },
    [searchParams, router]
  );

  const updateSelectedEvidence = useCallback(
    (evidence: Evidence | null, preserveOtherParams = true) => {
      setSelectedEvidence(evidence);
      if (evidence) {
        const params = preserveOtherParams
          ? new URLSearchParams(searchParams.toString())
          : new URLSearchParams();
        params.set("evidence", evidence.id);
        router.push(`?${params.toString()}`);
      }
    },
    [searchParams, router]
  );

  const updateSelectedLocation = useCallback(
    (location: Location | null, preserveOtherParams = true) => {
      setSelectedLocation(location);
      if (location) {
        const params = preserveOtherParams
          ? new URLSearchParams(searchParams.toString())
          : new URLSearchParams();
        params.set("location", location.id);
        router.push(`?${params.toString()}`);
      }
    },
    [searchParams, router]
  );

  useEffect(() => {
    // Check if this is a new game
    const gameState = getGameState();
    if (!gameState) {
      setShowIntroModal(true);
    }
  }, []);

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

      // Get the current tab from URL or default to interview
      const tab = searchParams.get("tab") || "interview";
      setSelectedTab(tab);

      // Handle item selection based on URL parameters
      if (tab === "interview" && searchParams.has("person")) {
        const personId = searchParams.get("person");
        const person = personId
          ? personsData.find((p) => p.id === personId)
          : null;
        if (person) {
          setSelectedPerson(person);
        }
      } else if (tab === "evidence" && searchParams.has("evidence")) {
        const evidenceId = searchParams.get("evidence");
        const evidence = evidenceId
          ? evidenceData.find((e) => e.id === evidenceId)
          : null;
        if (evidence) {
          setSelectedEvidence(evidence);
        }
      } else if (tab === "locations" && searchParams.has("location")) {
        const locationId = searchParams.get("location");
        const location = locationId
          ? locationsData.find((l) => l.id === locationId)
          : null;
        if (location) {
          setSelectedLocation(location);
        }
      }

      // URL is already updated by handleTabChange
    };

    loadData();
  }, [
    searchParams,
    router,
  ]);

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-zinc-300 font-sans">
      <GameIntroModal
        isOpen={showIntroModal}
        onClose={() => {
          startNewGame();
          setShowIntroModal(false);
          handleTabChange("case");
        }}
      />
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
          selectedPerson={selectedPerson}
          persons={persons}
          evidence={evidence}
          locations={locations}
          onSelectPerson={updateSelectedPerson}
          onSelectEvidence={updateSelectedEvidence}
          onSelectLocation={updateSelectedLocation}
        />

        <CaseNotes />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-zinc-900 text-zinc-300">
          Loading...
        </div>
      }
    >
      <ModernNoirUI />
    </Suspense>
  );
}
