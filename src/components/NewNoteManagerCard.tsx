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

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Tasks</h2>

        <div className="flex gap-2 mb-6">
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
            className="flex-grow"
          />
          <Button onClick={addNote} className="bg-blue-600 hover:bg-blue-700">
            Add
          </Button>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className={cn(
                "p-3 rounded border flex items-center justify-between gap-2",
                note.priority === "important" && "bg-red-50 border-red-200",
                note.priority === "normal" && "bg-blue-50 border-blue-200",
                note.priority === "delayed" && "bg-gray-50 border-gray-200"
              )}
            >
              <p className="text-sm flex-grow">{note.text}</p>
              <div className="flex items-center gap-2 shrink-0">
                <Select
                  value={note.priority}
                  onValueChange={(value) =>
                    changePriority(
                      note.id,
                      value as "important" | "normal" | "delayed"
                    )
                  }
                >
                  <SelectTrigger className="w-[120px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="important">
                        <span className="text-red-600">●</span> High
                      </SelectItem>
                      <SelectItem value="normal">
                        <span className="text-blue-600">●</span> Normal
                      </SelectItem>
                      <SelectItem value="delayed">
                        <span className="text-gray-600">●</span> Low
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNote(note.id)}
                  className="h-8 px-2 text-gray-500 hover:text-red-600 hover:bg-red-50"
                >
                  ×
                </Button>
              </div>
            </div>
          ))}

          {notes.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              No tasks yet. Add your first task above.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NoteManagerCard;
