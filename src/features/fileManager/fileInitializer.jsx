/**
 * Ensures the application has a valid data structure in localStorage.
 * This runs when the app starts to prevent "undefined" errors when fetching notes.
 */
async function initializeFile() {
  try {
    // 1. ATTEMPT TO RETRIEVE: Look for the key 'pkh_notes' in the browser's storage
    const existingData = localStorage.getItem('pkh_notes');
    
    // 2. CHECK EXISTENCE: If 'existingData' is null, it means this is the user's first time visiting
    if (!existingData) {
      // Create a "Schema" - The industry standard structure for your data
      const initialData = {
        version: '1.0',                  // Useful for future data migrations/updates
        createdAt: new Date().toISOString(), // Timestamp of when the database was born
        notes: []                        // Start with an empty array to avoid .map() errors later
      };

      // 3. PERSIST: Convert the JS Object to a JSON string and save it
      localStorage.setItem('pkh_notes', JSON.stringify(initialData));
      
      // Return the fresh object so the app can use it immediately
      return initialData;
    }
    
    // 4. DATA EXISTS: Convert the stored JSON string back into a usable JavaScript object
    return JSON.parse(existingData);

  } catch (error) {
    // 5. ERROR HANDLING: Catches JSON parsing errors or storage quota limits
    console.error('Error initializing file:', error);
    throw error; // Pass the error up so the UI can show an alert if needed
  }
}

export default initializeFile;