export const formatFileName = (fileName) => {
    return fileName
      .split('.')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('.');
  };
  
  // Other utility functions can be added here
  