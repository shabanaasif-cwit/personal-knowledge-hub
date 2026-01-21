import { useState } from 'react';
import useNotes from '../hooks/custom/useNotes';
import NotesList from '../features/notes/noteList'; 
import NoteEditor from '../features/notes/noteEitor'; 
import NoteViewer from '../features/notes/noteViewer';
import Button from '../components/common/button';

function Dashboard() {
  const { notes, addNote, updateNote, deleteNote, loading } = useNotes();
  const [view, setView] = useState('list');
  const [selectedNote, setSelectedNote] = useState(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">Loading Hub...</div>
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
    try {
      // Logic to check if we are updating an existing entry or adding a new one
      if (noteData.id && notes.find(n => n.id === noteData.id)) {
        await updateNote(noteData.id, noteData);
      } else {
        await addNote(noteData);
      }
      navigateBack(); 
    } catch (err) {
      console.error('Error saving to Hub:', err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Knowledge <span className="text-blue-600">Hub</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage notes and document files</p>
          </div>
          
          <div className="flex gap-3">
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

        <main className="w-full bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 transition-all duration-300">
          {view === 'list' && (
            <NotesList
              notes={notes}
              onSelectNote={(note) => { setSelectedNote(note); setView('viewer'); }}
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
                if(window.confirm('Are you sure you want to delete this entry?')) {
                  await deleteNote(selectedNote.id);
                  navigateBack();
                }
              }}
              onClose={navigateBack}
            />
          )}
        </main>

        <footer className="mt-6 flex justify-center">
          <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-gray-600 text-sm font-semibold tracking-wide uppercase">
              {`Total Hub Entries: ${notes.length}`}
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Dashboard;