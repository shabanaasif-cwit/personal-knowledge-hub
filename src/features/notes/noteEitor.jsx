import { useState, useEffect } from 'react';
import Button from "../../components/common/button";

function NoteEditor({ note, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [externalLink, setExternalLink] = useState(''); // New State

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content || '');
      setFileData(note.fileData || null);
      setFileName(note.fileName || '');
      setExternalLink(note.externalLink || ''); // Load existing link
    }
  }, [note]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result);
        setFileName(file.name);
        if (!title) setTitle(file.name.split('.')[0]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    
    onSave({
      id: note?.id || Date.now(),
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {note ? '✏️ Edit Entry' : '📝 Create New Entry'}
      </h2>

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