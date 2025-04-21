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
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedTab, setSelectedTab] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("evidence")) return "evidence";
      if (params.has("location")) return "locations";
      if (params.has("case")) return "case";
      if (params.has("person")) return "interview";
    }
    // Check if this is a new game
    const gameState = getGameState();
    if (!gameState) return "case";
    return "interview";
  });

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    const params = new URLSearchParams(searchParams.toString());

    // Clear existing tab parameters
    params.delete("evidence");
    params.delete("location");
    params.delete("person");
    params.delete("case");

    // Set the appropriate parameter based on the selected tab
    switch (tab) {
      case "evidence":
        if (evidence.length > 0) {
          const selectedEvidence = evidence[0];
          params.set("evidence", selectedEvidence.id);
          router.push(`?${params.toString()}`);
          updateSelectedEvidence(selectedEvidence, false);
        }
        break;
      case "locations":
        if (locations.length > 0) {
          const selectedLocation = locations[0];
          params.set("location", selectedLocation.id);
          router.push(`?${params.toString()}`);
          updateSelectedLocation(selectedLocation, false);
        }
        break;
      case "interview":
        if (persons.length > 0) {
          const selectedPerson = persons[0];
          params.set("person", selectedPerson.id);
          router.push(`?${params.toString()}`);
          updateSelectedPerson(selectedPerson, false);
        }
        break;
      case "case":
        // Clear all selections without triggering their update callbacks
        setSelectedPerson(null);
        setSelectedEvidence(null);
        setSelectedLocation(null);
        // Set only the notes parameter
        params.set("case", "true");
        router.push(`?${params.toString()}`);
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
    } else {
      setPlayerName(gameState.playerName);
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

      // Handle default case (no params) or person tab
      const hasAnyParam = ["person", "evidence", "location", "case"].some(
        (param) => searchParams.has(param)
      );

      if (
        personsData.length > 0 &&
        (!hasAnyParam || searchParams.has("person"))
      ) {
        const personId = searchParams.get("person");
        const person = personId
          ? personsData.find((p) => p.id === personId)
          : personsData[0];

        if (!hasAnyParam) {
          // If no parameters, set interview tab with first person
          setSelectedTab("interview");
          const params = new URLSearchParams();
          params.set("person", personsData[0].id);
          router.push(`?${params.toString()}`);
        } else {
          // Otherwise just update the selected person
          updateSelectedPerson(person || personsData[0]);
        }
      }

      // Set initial selected evidence only if on evidence tab
      if (evidenceData.length > 0 && searchParams.has("evidence")) {
        const evidenceId = searchParams.get("evidence");
        const evidence = evidenceId
          ? evidenceData.find((e) => e.id === evidenceId)
          : evidenceData[0];
        updateSelectedEvidence(evidence || evidenceData[0]);
      }

      // Set initial selected location only if on locations tab
      if (locationsData.length > 0 && searchParams.has("location")) {
        const locationId = searchParams.get("location");
        const location = locationId
          ? locationsData.find((l) => l.id === locationId)
          : locationsData[0];
        updateSelectedLocation(location || locationsData[0]);
      }
    };

    loadData();
  }, [
    searchParams,
    updateSelectedPerson,
    updateSelectedEvidence,
    updateSelectedLocation,
    router,
  ]);

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-zinc-300 font-sans">
      <GameIntroModal
        isOpen={showIntroModal}
        onClose={(name) => {
          setPlayerName(name);
          startNewGame(name);
          setShowIntroModal(false);
          setSelectedTab("case");
          const params = new URLSearchParams();
          params.set("case", "true");
          router.push(`?${params.toString()}`);
        }}
      />
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        playerName={playerName}
      />
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
        />

        <CaseNotes />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen bg-zinc-900 text-zinc-300">Loading...</div>}>
      <ModernNoirUI />
    </Suspense>
  );
}
