async function readFile() {
  try {
    const data = localStorage.getItem('pkh_notes');
    
    if (!data) {
      return { notes: [] };
    }
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

export default readFile;