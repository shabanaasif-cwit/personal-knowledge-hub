import { useState, useEffect } from 'react';
import initializeFile from '../../features/fileManager/fileInitializer'
import readFile from '../../features/fileManager/fileReader';
import writeFile from '../../features/fileManager/fileWriter';

function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize file on mount
  //The hook initializes. loading is true, notes is [], and error is null.
  useEffect(() => {
    //The hook initializes. loading is true, notes is [], and error is null.
    const init = async () => {
      try {
        await initializeFile();
        const data = await readFile();
        setNotes(data.notes || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    init();
    //run only once because of empty dependency array
  }, []);
//
  const addNote = async (note) => {
    try {
      const newNotes = [...notes, note];
      //code pauses here (due to await) until the file system or API responds.
      await writeFile(newNotes);
      setNotes(newNotes);
      return note;
    } catch (err) { 
      //If writeFile fails, the setNotes line is skipped. Instead, the error state is updated,
      setError(err.message);
      throw err;
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const newNotes = notes.map(note => note.id === id ? updatedNote : note);
      await writeFile(newNotes);
      setNotes(newNotes);
      return updatedNote;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteNote = async (id) => {
    try {
      const newNotes = notes.filter(note => note.id !== id);
      await writeFile(newNotes);
      setNotes(newNotes);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    notes,
    loading,
    error,
    addNote,
    updateNote,
    deleteNote,
  };
}

export default useNotes;