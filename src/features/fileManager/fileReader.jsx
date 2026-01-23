/**
 * Fetches the current state of data from the browser's storage.
 * This is used by components to "read" the notes and display them on the screen.
 */
async function readFile() {
  try {
    // 1. ACCESS STORAGE: Request the string stored under the key 'pkh_notes'
    const data = localStorage.getItem('pkh_notes');
    
    // 2. SAFETY CHECK: If the user cleared their cache or the key doesn't exist...
    if (!data) {
      // Return a "fallback" object so the app doesn't crash when trying to read .notes
      return { notes: [] };
    }
    
    // 3. DESERIALIZATION: Convert the JSON string back into a JavaScript Object
    // Example: '{"notes": [...]}' becomes { notes: [...] }
    return JSON.parse(data);

  } catch (error) {
    // 4. ERROR CATCHING: Handles corrupted JSON or restricted browser permissions
    console.error('Error reading file:', error);
    
    // Re-throwing the error allows the calling component to handle the failure
    throw error;
  }
}

export default readFile;