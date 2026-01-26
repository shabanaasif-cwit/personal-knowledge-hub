import { useState } from 'react';
import Button from '../../components/common/button';
import { NotebookPen} from 'lucide-react';

function NotesList({ notes, onSelectNote, onDeleteNote, onCreateNote }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-xl shadow border border-gray-100">
        <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-100 opacity-70 mb-4">
            <NotebookPen size={24} strokeWidth={2.5} />
          </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">No Notes Yet</h2>
        <p className="text-gray-600 text-center mb-6 max-w-md">Create your first note to get started organizing your knowledge.</p>
        <Button onClick={onCreateNote} variant="primary">Create First Note</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm bg-blue-50/30"
        />
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {filteredNotes.length === 0 ? (
          <p className="text-gray-500 text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            No notes match your search.
          </p>
        ) : (
          filteredNotes.map(note => (
            <div
              key={note.id}
              className="group flex justify-between items-center bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200"
            >
              {/* Content Side - Clickable to View */}
              <div onClick={() => onSelectNote(note)} className="flex-1 cursor-pointer pr-4">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{note.content}</p>
                <p className="text-xs text-gray-400 mt-3 font-medium uppercase tracking-wider">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons Side */}
              <div className="flex items-center gap-2">
                {/* UPDATE BUTTON: Triggers the Editor via Notes */}
                <button
                  onClick={() => onSelectNote(note)}
                  className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200"
                  title="Update Note"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>

                {/* DELETE BUTTON: Dark style matching your screenshot */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the view/select note
                    onDeleteNote(note.id);
                  }}
                  className="p-2.5 bg-gray-900 text-white rounded-xl hover:bg-red-600 transition-all duration-200 shadow-sm"
                  title="Delete Note"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesList;