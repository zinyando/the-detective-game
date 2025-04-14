import { NextResponse } from "next/server";
import { gameData } from "../../../data/gameData";

export async function GET() {
  return NextResponse.json(gameData.notes);
}

export async function POST(request: Request) {
  const note = await request.json();
  gameData.notes.push({
    ...note,
    id: Date.now().toString()
  });
  return NextResponse.json(gameData.notes);
}

export async function PUT(request: Request) {
  const updatedNote = await request.json();
  const index = gameData.notes.findIndex(note => note.id === updatedNote.id);
  if (index !== -1) {
    gameData.notes[index] = updatedNote;
  }
  return NextResponse.json(gameData.notes);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  gameData.notes = gameData.notes.filter(note => note.id !== id);
  return NextResponse.json(gameData.notes);
}
