import { useState } from 'react';
import useNotes from '../../hooks/custom/useNotes';
import NotesList from '../../features/notes/noteList';
import NoteEditor from '../../features/notes/noteEitor';
import NoteViewer from '../../features/notes/noteViewer';
import Button from '../../components/common/button';

function OrganizeNotes() {
  const { notes, addNote, updateNote, deleteNote, loading } = useNotes();
  const [view, setView] = useState('list');
  const [selectedNote, setSelectedNote] = useState(null);

  if (loading) {
    return <div className="text-center mt-10">Loading notes...</div>;
  }

  const goBack = () => {
    setView('list');
    setSelectedNote(null);
  };

  const createNote = () => {
    setSelectedNote(null);
    setView('editor');
  };

  const saveNote = async (noteData) => {
    if (noteData.id) {
      await updateNote(noteData.id, noteData);
    } else {
      await addNote(noteData);
    }
    goBack();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📚 Organize Notes</h1>
          <Button onClick={createNote}>+ New Note</Button>
        </div>

        <div className="bg-white p-6 rounded shadow">

          {view === 'list' && (
            <NotesList
              notes={notes}
              onSelectNote={(note) => {
                setSelectedNote(note);
                setView('viewer');
              }}
              onDeleteNote={deleteNote}
              onCreateNote={createNote}
            />
          )}

          {view === 'editor' && (
            <NoteEditor
              note={selectedNote}
              onSave={saveNote}
              onCancel={goBack}
            />
          )}

          {view === 'viewer' && selectedNote && (
            <NoteViewer
              note={selectedNote}
              onEdit={() => setView('editor')}
              onDelete={async () => {
                await deleteNote(selectedNote.id);
                goBack();
              }}
              onClose={goBack}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default OrganizeNotes;
