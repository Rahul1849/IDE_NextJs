import React, { useContext } from 'react';
import { FileContext } from '../context/FileContext';
import File from './File';

const Folder = ({ folder, openFile }) => {
  const { createFile, createFolder } = useContext(FileContext);

  return (
    <li className="p-1">
      {folder.name}
      <button onClick={() => createFile(folder.id)} className="ml-2 bg-green-500 text-white py-1 px-2 rounded">New File</button>
      <button onClick={() => createFolder(folder.id)} className="ml-2 bg-blue-500 text-white py-1 px-2 rounded">New Folder</button>
      <ul className="ml-4">
        {folder.children.map(item => (
          item.type === 'folder' ? (
            <Folder key={item.id} folder={item} openFile={openFile} />
          ) : (
            <File key={item.id} file={item} onClick={() => openFile(item)} />
          )
        ))}
      </ul>
    </li>
  );
};

export default Folder;
