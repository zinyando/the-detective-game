import { Plus, X, Save, Trash2 } from "lucide-react";
import { useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

const initialNotes: Note[] = [
  {
    id: "1",
    title: "Timeline Inconsistency",
    content: "Marcus left office at 8:30pm but claims to have been working late. Murder occurred at 11pm.",
    timestamp: "April 18, 2025 - 14:30"
  },
  {
    id: "2",
    title: "Financial Motive",
    content: "Business was struggling. Insurance policy names Marcus as beneficiary.",
    timestamp: "April 18, 2025 - 15:45"
  },
  {
    id: "3",
    title: "Behavioral Observation",
    content: "Shows signs of nervousness when discussing alibi. Possible deception.",
    timestamp: "April 18, 2025 - 16:30"
  },
  {
    id: "4",
    title: "Witness Statement",
    content: "Diana claims to have seen Marcus near the park at 10:30pm.",
    timestamp: "April 18, 2025 - 17:15"
  },
];

export function CaseNotes() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState<{ title: string; content: string }>({ title: '', content: '' });

  const handleAddNote = () => {
    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setNotes([...notes, note]);
    setNewNote({ title: '', content: '' });
    setIsModalOpen(false);
  };

  const handleDeleteClick = (note: Note) => {
    setNoteToDelete(note);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      setNotes(notes.filter(note => note.id !== noteToDelete.id));
      setIsDeleteModalOpen(false);
      setNoteToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  return (
    <>
      <div className="w-64 bg-zinc-900 border-l border-zinc-800 overflow-y-auto hidden lg:block">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xs tracking-wider font-bold text-zinc-500">
              DETECTIVE&rsquo;S NOTES
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-zinc-800 p-1 rounded hover:bg-zinc-700"
              title="Add new note"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="group bg-zinc-800 rounded p-3 text-sm relative">
                <div className="text-amber-500 font-medium mb-1">{note.title}</div>
                <p className="text-zinc-400">{note.content}</p>
                <div className="text-xs text-zinc-600 mt-2">{note.timestamp}</div>
                <button
                  onClick={() => handleDeleteClick(note)}
                  className="absolute top-2 right-2 p-1 rounded bg-zinc-700 text-zinc-400 opacity-0 group-hover:opacity-100 hover:bg-zinc-600 hover:text-zinc-300 transition-opacity duration-200"
                  title="Delete note"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-lg p-6 w-[500px] max-w-[90vw]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-zinc-100">Add New Note</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Note Title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full bg-zinc-800 border-none rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 text-zinc-100"
                />
              </div>
              <div>
                <textarea
                  placeholder="Note Content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="w-full h-32 bg-zinc-800 border-none rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 text-zinc-100 resize-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.title || !newNote.content}
                  className="flex items-center gap-2 bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md text-sm hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={16} />
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && noteToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-lg p-6 w-[400px] max-w-[90vw]">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-zinc-100 mb-2">Delete Note</h2>
              <p className="text-zinc-400 text-sm">Are you sure you want to delete the note &quot;{noteToDelete.title}&quot;? This action cannot be undone.</p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete Note
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
