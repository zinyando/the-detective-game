import { User, ChevronRight } from "lucide-react";

import { Person } from "../sidebar/PersonsList";

interface InterviewSectionProps {
  person: Person;
}

export function InterviewSection({ person }: InterviewSectionProps) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Character header */}
      <div className="p-4 border-b border-zinc-800 flex items-center">
        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
          <User size={32} />
        </div>
        <div className="ml-4">
          <div className="text-lg font-medium text-zinc-100">{person.name}</div>
          <div className="text-sm text-zinc-500">{person.role}</div>
          <div className="flex mt-1 text-xs">
            <div className="bg-zinc-800 rounded-full px-3 py-1 text-amber-500">
              Mood: {person.mood}
            </div>
            <div className="bg-zinc-800 rounded-full px-3 py-1 ml-2 text-red-500">
              Trust: {person.trust}
            </div>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <div className="text-zinc-500 text-xs mb-1">YOU</div>
          <div className="bg-zinc-800 rounded-lg p-3">
            <p>Where were you on the night of the murder, Mr. Chen?</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-zinc-500 text-xs mb-1">MARCUS CHEN</div>
          <div className="bg-zinc-700 rounded-lg p-3">
            <p>
              I was at the office until late. We had a deadline the next day.
              Check the security logs if you don&apos;t believe me.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-zinc-500 text-xs mb-1">YOU</div>
          <div className="bg-zinc-800 rounded-lg p-3">
            <p>
              The security logs show you left at 8:30pm, but the murder happened
              at 11pm. Where did you go after?
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-zinc-500 text-xs mb-1">MARCUS CHEN</div>
          <div className="bg-zinc-700 rounded-lg p-3">
            <p>
              I... went to grab dinner. Then straight home. Look, I didn&apos;t kill
              James. We had our differences, but I wouldn&apos;t kill him.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs text-amber-500 italic bg-zinc-800 bg-opacity-50 p-2 rounded border-l-2 border-amber-500">
            Marcus appears nervous when talking about his whereabouts after work.
            His right hand trembles slightly.
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-zinc-800">
        <div className="mb-3 flex flex-wrap gap-2">
          <button className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm hover:bg-zinc-700">
            Ask about relationship with victim
          </button>
          <button className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm hover:bg-zinc-700">
            Present evidence: Threatening email
          </button>
          <button className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm hover:bg-zinc-700">
            Press about alibi
          </button>
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Type your question..."
            className="flex-1 bg-zinc-800 border-none rounded-l-md p-3 text-zinc-200 focus:outline-none"
          />
          <button className="bg-amber-500 text-zinc-900 rounded-r-md px-4 font-medium">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
