async function writeFile(data) {
  try {
    const fileData = {
      version: '1.0',
      updatedAt: new Date().toISOString(),
      notes: data
    };
    
    localStorage.setItem('pkh_notes', JSON.stringify(fileData));
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
}

export default writeFile;