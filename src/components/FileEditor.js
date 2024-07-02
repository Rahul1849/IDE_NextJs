import React, { useContext } from 'react';
import { FileContext } from '../context/FileContext';

const FileEditor = () => {
  const { activeFile, updateFileContent, saveFileContent } = useContext(FileContext);

  const handleChange = (e) => {
    updateFileContent(e.target.value);
  };

  return (
    <div className="p-4">
      {activeFile ? (
        <div>
          <textarea
            value={activeFile.content}
            onChange={handleChange}
            className="w-full h-64 border rounded p-2"
            placeholder="Write your code here..."
          />
          <button onClick={saveFileContent} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">
            Save
          </button>
        </div>
      ) : (
        <div>Select a file to open</div>
      )}
    </div>
  );
};

export default FileEditor;
