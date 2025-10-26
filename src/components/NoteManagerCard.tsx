import { useState } from 'react';

interface Note {
  id: number;
  text: string;
  priority: 'important' | 'normal' | 'delayed';
}

const NoteManagerCard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState('');
  const [priority, setPriority] = useState<'important' | 'normal' | 'delayed'>('normal');

  const addNote = () => {
    if (noteText.trim()) {
      const newNote: Note = {
        id: Date.now(),
        text: noteText,
        priority: priority,
      };
      setNotes([...notes, newNote]);
      setNoteText('');
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const changePriority = (id: number, newPriority: 'important' | 'normal' | 'delayed') => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, priority: newPriority } : note
    ));
  };

  const getNotesByPriority = (p: string) => notes.filter(note => note.priority === p);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Note Manager</h2>
      
      {/* Input Section */}
      <div className="mb-4 space-y-2">
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter your note..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="important">Important</option>
            <option value="normal">Normal</option>
            <option value="delayed">Delayed</option>
          </select>
          <button
            onClick={addNote}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Note
          </button>
        </div>
      </div>

      {/* Notes Display */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {/* Important Notes */}
        <div className="border-l-4 border-red-500 pl-3">
          <h3 className="font-semibold text-red-600 mb-2">Important</h3>
          {getNotesByPriority('important').map(note => (
            <div key={note.id} className="bg-red-50 p-2 rounded mb-2 flex justify-between items-start">
              <p className="text-sm flex-1">{note.text}</p>
              <div className="flex gap-1">
                <select
                  value={note.priority}
                  onChange={(e) => changePriority(note.id, e.target.value as any)}
                  className="text-xs px-1 py-0.5 border rounded"
                >
                  <option value="important">Important</option>
                  <option value="normal">Normal</option>
                  <option value="delayed">Delayed</option>
                </select>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-600 hover:text-red-800 text-xs px-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Normal Notes */}
        <div className="border-l-4 border-blue-500 pl-3">
          <h3 className="font-semibold text-blue-600 mb-2">Normal</h3>
          {getNotesByPriority('normal').map(note => (
            <div key={note.id} className="bg-blue-50 p-2 rounded mb-2 flex justify-between items-start">
              <p className="text-sm flex-1">{note.text}</p>
              <div className="flex gap-1">
                <select
                  value={note.priority}
                  onChange={(e) => changePriority(note.id, e.target.value as any)}
                  className="text-xs px-1 py-0.5 border rounded"
                >
                  <option value="important">Important</option>
                  <option value="normal">Normal</option>
                  <option value="delayed">Delayed</option>
                </select>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-blue-600 hover:text-blue-800 text-xs px-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Delayed Notes */}
        <div className="border-l-4 border-gray-500 pl-3">
          <h3 className="font-semibold text-gray-600 mb-2">Delayed</h3>
          {getNotesByPriority('delayed').map(note => (
            <div key={note.id} className="bg-gray-50 p-2 rounded mb-2 flex justify-between items-start">
              <p className="text-sm flex-1">{note.text}</p>
              <div className="flex gap-1">
                <select
                  value={note.priority}
                  onChange={(e) => changePriority(note.id, e.target.value as any)}
                  className="text-xs px-1 py-0.5 border rounded"
                >
                  <option value="important">Important</option>
                  <option value="normal">Normal</option>
                  <option value="delayed">Delayed</option>
                </select>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-gray-600 hover:text-gray-800 text-xs px-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteManagerCard;
