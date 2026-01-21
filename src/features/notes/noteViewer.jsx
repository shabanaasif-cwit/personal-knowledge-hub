import Button from "../../components/common/button"; // Corrected path and casing

function NoteViewer({ note, onEdit, onDelete, onClose }) {
  // Requirement: Conditional rendering to handle empty states
  if (!note) return <div className="p-4 text-gray-500">Select a note to view.</div>;

  return (
    <div className="note-viewer p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
      <p className="text-gray-700 mb-6">{note.content}</p>
      
      <div className="flex gap-2">
        {/* Requirement: Arrow functions for interaction handling */}
        <Button onClick={() => onEdit(note)} variant="primary">
          Edit Note
        </Button>
        <Button onClick={() => onDelete(note.id)} variant="danger">
          Delete
        </Button>
        <Button onClick={onClose} variant="secondary">
          Close
        </Button>
      </div>
    </div>
  );
}

export default NoteViewer;