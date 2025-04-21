import {
  sarahReynoldsAgent,
  marcusChenAgent,
  dianaWilkinsAgent,
} from "@/mastra/agents";

export const runtime = "nodejs";
export const maxDuration = 30;

interface RequestBody {
  message: string;
  personId: string;
}

export async function POST(req: Request) {
  const { message, personId }: RequestBody = await req.json();

  if (!personId) {
    return new Response("Invalid request body. 'personId' is required.", {
      status: 400,
    });
  }

  let streamResult;

  if (personId === "sarah-reynolds") {
    streamResult = await sarahReynoldsAgent.stream(message);
  } else if (personId === "marcus-chen") {
    streamResult = await marcusChenAgent.stream(message);
  } else if (personId === "diana-wilkins") {
    streamResult = await dianaWilkinsAgent.stream(message);
  } else {
    return new Response("Invalid personId", { status: 400 });
  }

  return streamResult.toDataStreamResponse();
}
