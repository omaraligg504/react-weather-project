import { useState } from "react";
import { cn } from "../lib/utils";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Note {
  id: number;
  text: string;
  priority: "important" | "normal" | "delayed";
}

const TaskGroup: React.FC<{
  title: string;
  notes: Note[];
  priority: "important" | "normal" | "delayed";
  color: string;
  onPriorityChange: (
    id: number,
    newPriority: "important" | "normal" | "delayed"
  ) => void;
  onDelete: (id: number) => void;
}> = ({ title, notes, priority, color, onPriorityChange, onDelete }) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg border backdrop-blur-sm",
        `bg-${color}-50/10 border-${color}-200`
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={cn("w-2 h-2 rounded-full", `bg-${color}-500`)}></div>
        <h3 className={cn("font-semibold", `text-${color}-700`)}>{title}</h3>
        <span
          className={cn(
            "ml-auto text-xs px-2 py-1 rounded-full",
            `bg-${color}-100 text-${color}-700`
          )}
        >
          {notes.length} tasks
        </span>
      </div>
      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className={cn(
              "group p-4 rounded-xl border transition-all",
              `bg-gradient-to-br from-${color}-50 to-${color}-100/30`,
              `border-${color}-200`
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-gray-800 flex-1">{note.text}</p>
              <div className="flex items-center gap-2">
                <Select
                  value={note.priority}
                  onValueChange={(value) =>
                    onPriorityChange(
                      note.id,
                      value as "important" | "normal" | "delayed"
                    )
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="important">High Priority</SelectItem>
                      <SelectItem value="normal">Medium Priority</SelectItem>
                      <SelectItem value="delayed">Low Priority</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "opacity-0 group-hover:opacity-100 transition-opacity",
                    `hover:bg-${color}-50 hover:text-${color}-600`
                  )}
                  onClick={() => onDelete(note.id)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NoteManagerCard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState("");

  const addNote = () => {
    if (newNoteText.trim()) {
      const newNote: Note = {
        id: Date.now(),
        text: newNoteText,
        priority: "normal",
      };
      setNotes([...notes, newNote]);
      setNewNoteText("");
    }
  };

  const changePriority = (
    id: number,
    newPriority: "important" | "normal" | "delayed"
  ) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, priority: newPriority } : note
      )
    );
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getNotesByPriority = (priority: "important" | "normal" | "delayed") => {
    return notes.filter((note) => note.priority === priority);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/50 backdrop-blur-sm shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Task Manager
        </h2>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-grow">
            <Input
              type="text"
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addNote();
                }
              }}
              placeholder="Add a new task..."
              className="pl-10 shadow-sm"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <Button
            onClick={addNote}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
          >
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskGroup
            title="High Priority"
            notes={getNotesByPriority("important")}
            priority="important"
            color="red"
            onPriorityChange={changePriority}
            onDelete={deleteNote}
          />
          <TaskGroup
            title="Medium Priority"
            notes={getNotesByPriority("normal")}
            priority="normal"
            color="blue"
            onPriorityChange={changePriority}
            onDelete={deleteNote}
          />
          <TaskGroup
            title="Low Priority"
            notes={getNotesByPriority("delayed")}
            priority="delayed"
            color="purple"
            onPriorityChange={changePriority}
            onDelete={deleteNote}
          />
        </div>
      </div>
    </Card>
  );
};

export default NoteManagerCard;
