import { Person } from "../components/sidebar/PersonsList";
import { Evidence } from "../components/sidebar/EvidenceList";
import { Location } from "../components/sidebar/LocationsList";

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

export async function fetchPersons(): Promise<Person[]> {
  const response = await fetch("/api/persons");
  return response.json();
}

export async function fetchEvidence(): Promise<Evidence[]> {
  const response = await fetch("/api/evidence");
  return response.json();
}

export async function fetchLocations(): Promise<Location[]> {
  const response = await fetch("/api/locations");
  return response.json();
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetch("/api/notes");
  return response.json();
}

export async function createNote(note: Omit<Note, "id">): Promise<Note[]> {
  const response = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function updateNote(note: Note): Promise<Note[]> {
  const response = await fetch("/api/notes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(id: string): Promise<Note[]> {
  const response = await fetch("/api/notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return response.json();
}
