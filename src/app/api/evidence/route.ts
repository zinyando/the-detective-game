import { NextResponse } from "next/server";
import { gameData } from "../../../data/gameData";

export async function GET() {
  return NextResponse.json(gameData.evidence);
}
