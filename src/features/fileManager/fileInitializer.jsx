async function initializeFile() {
  try {
    // Check if file exists in localStorage
    const existingData = localStorage.getItem('pkh_notes');
    
    if (!existingData) {
      const initialData = {
        version: '1.0',
        createdAt: new Date().toISOString(),
        notes: []
      };
      localStorage.setItem('pkh_notes', JSON.stringify(initialData));
      return initialData;
    }
    
    return JSON.parse(existingData);
  } catch (error) {
    console.error('Error initializing file:', error);
    throw error;
  }
}

export default initializeFile;