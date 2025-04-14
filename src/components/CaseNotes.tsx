import { FileText } from "lucide-react";

interface Note {
  title: string;
  content: string;
}

const notes: Note[] = [
  {
    title: "Timeline Inconsistency",
    content:
      "Marcus left office at 8:30pm but claims to have been working late. Murder occurred at 11pm.",
  },
  {
    title: "Financial Motive",
    content:
      "Business was struggling. Insurance policy names Marcus as beneficiary.",
  },
  {
    title: "Behavioral Observation",
    content:
      "Shows signs of nervousness when discussing alibi. Possible deception.",
  },
  {
    title: "Witness Statement",
    content: "Diana claims to have seen Marcus near the park at 10:30pm.",
  },
];

export function CaseNotes() {
  return (
    <div className="w-64 bg-zinc-900 border-l border-zinc-800 overflow-y-auto hidden lg:block">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs tracking-wider font-bold text-zinc-500">
            DETECTIVE&rsquo;S NOTES
          </div>
          <button className="bg-zinc-800 p-1 rounded hover:bg-zinc-700">
            <FileText size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.title} className="bg-zinc-800 rounded p-3 text-sm">
              <div className="text-amber-500 font-medium mb-1">{note.title}</div>
              <p className="text-zinc-400">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
