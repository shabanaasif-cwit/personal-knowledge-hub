import { useState, useMemo } from 'react';
import useNotes from '../hooks/custom/useNotes';
import NotesList from '../features/notes/noteList'; 
import NoteEditor from '../features/notes/noteEitor'; 
import NoteViewer from '../features/notes/noteViewer';
import Button from '../components/common/button';

function Dashboard() {
  const { notes, addNote, updateNote, deleteNote, loading } = useNotes();

  // ✅ ALL HOOKS AT TOP
  const [view, setView] = useState('list');
  const [selectedNote, setSelectedNote] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  // ✅ SORTING LOGIC
  const sortedNotes = useMemo(() => {
    const copiedNotes = [...notes];

    if (sortBy === 'alpha') {
      return copiedNotes.sort((a, b) =>
        (a.title || '').localeCompare(b.title || '')
      );
    }

    if (sortBy === 'modified') {
      return copiedNotes.sort(
        (a, b) =>
          new Date(b.updatedAt || b.date) -
          new Date(a.updatedAt || a.date)
      );
    }

    return copiedNotes.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }, [notes, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">
          Loading Hub...
        </div>
      </div>
    );
  }

  const navigateBack = () => {
    setView('list');
    setSelectedNote(null);
  };

  const handleCreateNote = () => {
    setSelectedNote(null);
    setView('editor');
  };

  const handleSaveNote = async (noteData) => {
    if (noteData.id) {
      await updateNote(noteData.id, noteData);
    } else {
      await addNote(noteData);
    }
    navigateBack();
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl">

        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Knowledge <span className="text-blue-600">Hub</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage notes and document files
            </p>
          </div>

          <div className="flex gap-3 items-center">
            {/* ✅ SORT DROPDOWN */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border rounded px-3 py-2 text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="alpha">Sort Alphabetically</option>
              <option value="modified">Last Modified</option>
            </select>

            {view !== 'list' && (
              <Button onClick={navigateBack} variant="secondary">
                ← Back to List
              </Button>
            )}

            <Button onClick={handleCreateNote} variant="primary" size="lg">
              + Create New Entry
            </Button>
          </div>
        </header>

        <main className="w-full bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
          {view === 'list' && (
            <NotesList
              notes={sortedNotes}
              onSelectNote={(note) => {
                setSelectedNote(note);
                setView('viewer');
              }}
              onDeleteNote={deleteNote}
              onCreateNote={handleCreateNote}
            />
          )}

          {view === 'editor' && (
            <NoteEditor
              note={selectedNote}
              onSave={handleSaveNote}
              onCancel={navigateBack}
            />
          )}

          {view === 'viewer' && selectedNote && (
            <NoteViewer
              note={selectedNote}
              onEdit={() => setView('editor')}
              onDelete={async () => {
                if (window.confirm('Delete this note?')) {
                  await deleteNote(selectedNote.id);
                  navigateBack();
                }
              }}
              onClose={navigateBack}
            />
          )}
        </main>

        <footer className="mt-6 flex justify-center">
          <div className="bg-white px-6 py-2 rounded-full shadow-sm border flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-gray-600 text-sm font-semibold uppercase">
              Total Hub Entries: {notes.length}
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Dashboard;
