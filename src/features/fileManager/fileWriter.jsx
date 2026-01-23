/**
 * Saves the provided notes array back to the browser's localStorage.
 * This is called whenever you create, edit, or delete a note.
 * @param {Array} data - The current array of notes from your React state.
 */
async function writeFile(data) {
  try {
    // 1. DATA WRAPPING: Instead of just saving the array, we wrap it in a "Meta" object.
    const fileData = {
      version: '1.0',                     // Keeps track of the data format version.
      updatedAt: new Date().toISOString(), // Automatically logs the "Last Saved" time.
      notes: data                         // The actual content provided by the user.
    };
    
    // 2. SERIALIZATION: Convert the JavaScript Object into a JSON string.
    // LocalStorage only accepts strings, so JSON.stringify is mandatory.
    const stringifiedData = JSON.stringify(fileData);

    // 3. PERSISTENCE: Overwrite the 'pkh_notes' key with the new string.
    localStorage.setItem('pkh_notes', stringifiedData);
    
    // 4. FEEDBACK: Return true to tell the calling component that the save was successful.
    return true;

  } catch (error) {
    // 5. ERROR HANDLING: Common errors include "QuotaExceededError" 
    // (if localStorage is full) or browser privacy settings blocking access.
    console.error('Error writing file:', error);
    
    // Pass the error up so the UI can show a "Save Failed" notification.
    throw error;
  }
}

export default writeFile;