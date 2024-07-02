import React, { useContext } from 'react';
import { FileContext } from '../context/FileContext';

const File = ({ file }) => {
  const { openFile } = useContext(FileContext);

  const handleClick = () => {
    openFile(file);
  };

  return (
    <li className="cursor-pointer p-1 hover:bg-gray-700" onClick={handleClick}>
      {file.name}
    </li>
  );
};

export default File;
