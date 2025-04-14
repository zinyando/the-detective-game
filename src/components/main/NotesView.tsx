import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}

export function NotesView() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Initial Interview - Marcus Chen",
      content: "Suspect appears defensive. Claims to have been at office during time of murder. Need to verify security logs.",
      timestamp: "April 18, 2025 - 14:30"
    },
    {
      id: "2",
      title: "Security Footage Analysis",
      content: "Unidentified figure matches Chen&apos;s build. Timestamp correlates with phone records.",
      timestamp: "April 18, 2025 - 16:45"
    }
  ]);

  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const createNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    setNotes([...notes, newNote]);
    setActiveNote(newNote);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
  };

  const saveNote = () => {
    if (!activeNote) return;
    const updatedNotes = notes.map(note => 
      note.id === activeNote.id 
        ? { ...note, title: editTitle, content: editContent }
        : note
    );
    setNotes(updatedNotes);
    setActiveNote({ ...activeNote, title: editTitle, content: editContent });
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (activeNote?.id === noteId) {
      setActiveNote(null);
      setEditTitle("");
      setEditContent("");
    }
  };

  return (
    <div className="flex-1 flex">
      {/* Notes List */}
      <div className="w-64 border-r border-zinc-800 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-zinc-300">Case Notes</h2>
          <button
            onClick={createNewNote}
            className="p-1 hover:bg-zinc-800 rounded"
          >
            <Plus className="text-amber-500" size={20} />
          </button>
        </div>
        <div className="space-y-2">
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => {
                setActiveNote(note);
                setEditTitle(note.title);
                setEditContent(note.content);
              }}
              className={`p-3 rounded cursor-pointer ${
                activeNote?.id === note.id
                  ? "bg-zinc-800 border-l-2 border-amber-500"
                  : "hover:bg-zinc-800"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-sm font-medium text-zinc-300 mb-1">
                    {note.title}
                  </div>
                  <div className="text-xs text-zinc-500">{note.timestamp}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="p-1 hover:bg-zinc-700 rounded opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="text-zinc-500" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      {activeNote ? (
        <div className="flex-1 p-6">
          <div className="mb-6">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-transparent text-xl font-medium text-zinc-100 border-b border-zinc-800 pb-2 focus:outline-none focus:border-amber-500"
              placeholder="Note Title"
            />
          </div>
          <div className="mb-4">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-[calc(100vh-250px)] bg-transparent text-zinc-300 focus:outline-none resize-none"
              placeholder="Start typing your note..."
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={saveNote}
              className="flex items-center gap-2 bg-zinc-800 text-zinc-300 px-4 py-2 rounded-md text-sm hover:bg-zinc-700"
            >
              <Save size={16} />
              Save Note
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-zinc-500">
          Select a note to view or create a new one
        </div>
      )}
    </div>
  );
}
