import React, { useState, useEffect } from 'react';

const NoteMaker = ({ file, saveFile }) => {
  // Check if file is defined and has content property before using it
  const initialContent = file && file.content ? file.content : '';
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (file && file.content) {
      setContent(file.content);
    }
  }, [file]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    // Implement save functionality here, e.g., calling saveFile(content)
    if (saveFile) {
      saveFile(content);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write your note here..."
        className="w-full h-40 px-3 py-2 border rounded"
      />
      <button onClick={handleSave} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">
        Save
      </button>
    </div>
  );
};

export default NoteMaker;
