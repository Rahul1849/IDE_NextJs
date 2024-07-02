import React, { useState, useEffect } from 'react';
import marked from 'marked';

const ReadmePreview = ({ file }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(marked(file.content || ''));
  }, [file]);

  return (
    <div>
      <h2>Preview: {file.name}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ReadmePreview;
