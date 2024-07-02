import React, { useState, useEffect } from 'react';

const ListMaker = ({ file, saveFile }) => {
  const [content, setContent] = useState(file.content);

  useEffect(() => {
    setContent(file.content);
  }, [file]);

  const handleSave = () => {
    saveFile({ ...file, content });
  };

  return (
    <div>
      <h2>Editing List: {file.name}</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="20"
        cols="80"
      />
      <button onClick={handleSave} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">Save</button>
    </div>
  );
};

export default ListMaker;
