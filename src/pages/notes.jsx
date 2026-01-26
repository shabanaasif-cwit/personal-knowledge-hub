import { useState, useMemo } from 'react';
import useNotes from '../hooks/custom/useNotes';
import NotesList from '../features/notes/noteList'; 
import NoteEditor from '../features/notes/noteEitor'; 
import NoteViewer from '../features/notes/noteViewer';
import { Plus, ArrowLeft, GraduationCap } from 'lucide-react';
  
function Notes() {
  const { notes, addNote, updateNote, deleteNote, loading } = useNotes();
  const [view, setView] = useState('list');
  const [selectedNote, setSelectedNote] = useState(null);
  const [sortBy, setSortBy] = useState('date'); 

  const sortedNotes = useMemo(() => {
    const copiedNotes = [...notes];
    if (sortBy === 'alpha') {
      return copiedNotes.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }
    if (sortBy === 'modified') {
      return copiedNotes.sort((a, b) => new Date(b.updatedAt || b.date) - new Date(a.updatedAt || a.date));
    }
    return copiedNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [notes, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading Hub...</p>
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
    const isDuplicate = notes.some(note => 
      note.title?.toLowerCase().trim() === noteData.title?.toLowerCase().trim() && 
      note.id !== noteData.id 
    );

    if (isDuplicate) {
      alert(`A note with the title "${noteData.title}" already exists.`);
      return; 
    }

    try {
      //arrow function to handle both adding and updating notes
      if (noteData.id && notes.find(n => n.id === noteData.id)) {
        // This overwrites the old version with your new changes.
        await updateNote(noteData.id, noteData);
      } else {
        //this create a new note completely
        await addNote(noteData);
      }
      // immediately after a note is successfully saved to provide a seamless User Experience (UX). expect the task to be "done."emoves the user from the "Edit Mode" entirely,
      navigateBack(); 
    } catch (err) {
      console.error('Error saving to Hub:', err);
    }
  };

  return (
    /* pt-28 (112px) provides plenty of space for the 80px fixed header */
    <div className="min-h-screen w-full bg-[#f8fafc] flex flex-col items-center p-10 font-sans pt-28">
      <div className="w-full max-w-5xl">
        
        {/* HEADER SECTION */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <GraduationCap className="text-blue-600" size={24} />
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Entry Manager</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none cursor-pointer">
                Knowledge <span className="text-blue-600" onClick={() => navigate('/home')}>Hub</span>
              </h1>
              <p className="text-gray-500 text-sm mt-2 font-medium">Manage and document your digital brain.</p>
            </div>
            
            <div className="flex w-full md:w-auto gap-2 items-center">
              {view === 'list' && (
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 md:flex-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm outline-none cursor-pointer"
                >
                  <option value="date">Sort by Date</option>
                  <option value="alpha">Alphabetical</option>
                  <option value="modified">Modified</option>
                </select>
              )}

              {view !== 'list' && (
                <button 
                  onClick={navigateBack} 
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-gray-700 hover:bg-gray-50 text-sm"
                >
                  <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to List</span>
                </button>
              )}

              {/* This button stays, but we adjust padding and text for mobile */}
              <button 
                onClick={handleCreateNote} 
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
              >
                <Plus size={18} /> 
                <span className="md:inline">New Notes</span>
              </button>
            </div>
          </header>

        {/* MAIN CONTENT AREA */}
        <main className="w-full bg-white rounded-[2rem] shadow-sm p-10 border border-gray-100">
          {view === 'list' && (
            <NotesList
              notes={sortedNotes} 
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

        {/* FOOTER */}
        <footer className="mt-8 flex justify-center">
          <div className="bg-white px-6 py-2.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
            <p className="text-gray-400 text-[10px] font-black tracking-[0.2em] uppercase">
              {`Total Entries: ${notes.length}`}
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Notes;