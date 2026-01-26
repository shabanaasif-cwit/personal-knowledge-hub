import { useState, useEffect } from 'react';// Imports React hooks for state and lifecycle management
import Button from "../../components/common/button";// Imports a custom reusable Button component
import { NotebookPen} from 'lucide-react';// Imports a pen icon from the Lucide icon library


function NoteEditor({ note, onSave, onCancel }) {// Receives 'note' (data), 'onSave' (function), and 'onCancel' (function) as props
  // 1. STATE INITIALIZATION: Local variables for form fields
  const [title, setTitle] = useState('');// Creates 'title' state; initialized as empty string because it's a text input
  const [content, setContent] = useState('');// Creates 'content' state for the description/body text
  const [fileData, setFileData] = useState(null);// Creates 'fileData' state; null means no file is currently attached
  const [fileName, setFileName] = useState('');// Creates 'fileName' state to store the original name of the uploaded file
  const [externalLink, setExternalLink] = useState(''); // Creates state for the optional URL link input

  // 2. EDIT MODE LOGIC: Runs whenever the 'note' prop changes  
  useEffect(() => {
    if (note) {// Checks if a note object exists (means we are editing, not creating)
      setTitle(note.title);// Populates the title field with existing data
      setContent(note.content || '');// Populates description, falling back to empty string if null
      setFileData(note.fileData || null);// Loads existing Base64 file data if it exists
      setFileName(note.fileName || '');// Loads the existing filename
      setExternalLink(note.externalLink || ''); // Load existing link
    }
  }, [note]);// Dependency array: this effect triggers only when the 'note' prop is updated

  // 3. FILE HANDLING: Processes the user's file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];// Grabs the first file from the file picker input
    if (file) {// Proceed only if a file was actually selected
      const reader = new FileReader(); // Initializes the web API that reads file contents
      reader.onloadend = () => {// Defines what happens once the file reading is finished
        setFileData(reader.result);// Stores the file as a Base64 encoded string (text representation of a file)
        setFileName(file.name); // Updates state with the actual name of the file 
        // Smart UX: If the user hasn't typed a title yet, use the filename (minus extension) as the title
        if (!title) setTitle(file.name.split('.')[0]); 
      }; 
      reader.readAsDataURL(file);// Starts reading the file and converts it into a Data URL string
    }
  };

  // 4. SAVE LOGIC: Prepares the data bundle to be sent back to the parent component
  const handleSave = () => {// Validation: prevents saving if the title is empty or just spaces
    if (!title.trim()) { //.trim remove the whitespaces
      alert('Please enter a title');// Simple browser alert for validation feedback
      return; // Exit the function so onSave is not called
    }
    
    onSave({
      id: note?.id || Date.now(), //this line ensures that existing notes keep their ID, while new notes get a unique timestamp ID
      title, 
      content,
      fileData,
      fileName,
      externalLink, // Save the URL to JSON
      // Determine type based on what data exists
      type: fileData ? 'document' : externalLink ? 'link' : 'text', 
      createdAt: note?.createdAt || new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <div className="bg-white rounded-lg p-2">
      <div className="flex items-center gap-4 mb-6">
    {/* The Lucide Icon Box */}
    <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-100 opacity-100">
      <NotebookPen size={24} strokeWidth={2.5} />
    </div>

    {/* The Dynamic H2 Title */}
    <h2 className="text-2xl font-bold text-gray-900">
      {note ? 'Edit Entry' : ' Create New Entry'}
    </h2>
  </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Title <span className="text-red-500">**</span>
          </label>
          <input
            type="text"
            placeholder="e.g. React Documentation or Project Specs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/30"
            required
          />
        </div>

        {/* External Link Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">🔗 External Link (URL)</label>
          <input
            type="url"
            placeholder="https://example.com"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/30"
          />
        </div>

        {/* File Upload Area */}
        <div className={`border-2 border-dashed rounded-xl p-6 ${fileData ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">📎 Attach Document (Optional)</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description / Notes</label>
          <textarea
            placeholder="Add details here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 h-32 focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/30"
          />
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="success" onClick={handleSave}>Save to Hub</Button>
        </div>
      </div>
    </div>
  );
}

export default NoteEditor;