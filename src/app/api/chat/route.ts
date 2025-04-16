import { NextResponse } from 'next/server';

// Using direct fetch call to OpenAI REST API instead of SDK

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('[api/chat] Missing OPENAI_API_KEY');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const { message } = await request.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Call OpenAI REST API directly
    const apiKey = process.env.OPENAI_API_KEY;
    const completionRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are the detective assistant in the game. Respond helpfully to the user.' },
          { role: 'user', content: message },
        ],
      }),
    });
    if (!completionRes.ok) {
      console.error('[api/chat] OpenAI API error', await completionRes.text());
      return NextResponse.json({ error: 'OpenAI API error' }, { status: completionRes.status });
    }
    const completion = await completionRes.json();
    const reply = completion.choices?.[0]?.message?.content ?? '';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('[api/chat] Error:', error);
    return NextResponse.json({ reply: 'Sorry, I encountered an error processing your request.' }, { status: 500 });
  }
}
