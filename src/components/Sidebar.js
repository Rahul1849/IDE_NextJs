import React, { useContext } from 'react';
import { FileContext } from '../context/FileContext';
import File from './File';
import Folder from './Folder';

const Sidebar = () => {
  // Accessing file structure and file management functions from FileContext
  const { fileStructure, createFile, createFolder, openFile } = useContext(FileContext);

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      {/* Button to create a new folder */}
      <button onClick={() => createFolder(null)} className="mb-2 bg-blue-500 text-white py-1 px-3 rounded">New Folder</button>
      {/* Button to create a new file */}
      <button onClick={() => createFile(null)} className="mb-2 bg-green-500 text-white py-1 px-3 rounded">New File</button>
      
      {/* List to display folders and files */}
      <ul className="mt-4">
        {/* Map through fileStructure to render folders and files */}
        {fileStructure.map(item => (
          // Render Folder component if item type is 'folder'
          item.type === 'folder' ? (
            <Folder key={item.id} folder={item} openFile={openFile} />
          ) : (
            // Render File component if item type is 'file'
            <File key={item.id} file={item} onClick={() => openFile(item)} />
          )
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
