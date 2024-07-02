import React, { createContext, useState, useEffect } from 'react';

export const FileContext = createContext();

const FileProvider = ({ children }) => {
  const [fileStructure, setFileStructure] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  // Initialize file structure from local storage or create default
  useEffect(() => {
    const storedFiles = localStorage.getItem('fileStructure');
    if (storedFiles) {
      setFileStructure(JSON.parse(storedFiles));
    } else {
      // Default structure if nothing stored
      setFileStructure([]);
    }
  }, []);

  // Save file structure to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('fileStructure', JSON.stringify(fileStructure));
  }, [fileStructure]);

  // Function to find a folder by its ID
  const findFolder = (structure, id) => {
    for (let item of structure) {
      if (item.id === id && item.type === 'folder') {
        return item;
      }
      if (item.type === 'folder' && item.children) {
        const result = findFolder(item.children, id);
        if (result) return result;
      }
    }
    return null;
  };

  // Function to create a new file
  const createFile = (parentId = null) => {
    const name = prompt('Enter file name (with extension)');
    if (name) {
      const newFile = { id: Date.now(), name, type: 'file', extension: name.split('.').pop(), content: '' };
      console.log('Creating file:', newFile, 'in parent folder:', parentId);
      if (parentId) {
        setFileStructure(prevStructure => {
          const newStructure = prevStructure.map(item => {
            if (item.id === parentId && item.type === 'folder') {
              return {
                ...item,
                children: item.children ? [...item.children, newFile] : [newFile]
              };
            }
            return item;
          });
          console.log('Updated structure with new file in folder:', newStructure);
          return newStructure;
        });
      } else {
        setFileStructure(prevStructure => {
          const updatedStructure = [...prevStructure, newFile];
          console.log('Updated structure with new file:', updatedStructure);
          return updatedStructure;
        });
      }
      setActiveFile(newFile); // Set newly created file as active
    }
  };

  // Function to create a new folder
  const createFolder = (parentId = null) => {
    const name = prompt('Enter folder name');
    if (name) {
      const newFolder = { id: Date.now(), name, type: 'folder', children: [] };
      console.log('Creating folder:', newFolder, 'in parent folder:', parentId);
      if (parentId) {
        setFileStructure(prevStructure => {
          const newStructure = prevStructure.map(item => {
            if (item.id === parentId && item.type === 'folder') {
              return {
                ...item,
                children: item.children ? [...item.children, newFolder] : [newFolder]
              };
            }
            return item;
          });
          console.log('Updated structure with new folder:', newStructure);
          return newStructure;
        });
      } else {
        setFileStructure(prevStructure => {
          const updatedStructure = [...prevStructure, newFolder];
          console.log('Updated structure with new folder:', updatedStructure);
          return updatedStructure;
        });
      }
    }
  };

  // Function to open a file for editing
  const openFile = (file) => {
    console.log('Opening file for editing:', file);
    setActiveFile(file);
  };

  // Function to update content of the active file
  const updateFileContent = (content) => {
    setActiveFile(prevFile => ({
      ...prevFile,
      content
    }));
  };

  // Function to save content of the active file
  const saveFileContent = () => {
    if (activeFile) {
      console.log('Saving file:', activeFile);
      // Simulate saving to backend or local storage
      // For simplicity, we save to local storage here
      setFileStructure(prevStructure => {
        const updatedStructure = prevStructure.map(file => {
          if (file.id === activeFile.id) {
            return {
              ...file,
              content: activeFile.content
            };
          }
          return file;
        });
        return updatedStructure;
      });
    }
  };

  return (
    <FileContext.Provider value={{ fileStructure, createFile, createFolder, openFile, updateFileContent, saveFileContent, activeFile }}>
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;
