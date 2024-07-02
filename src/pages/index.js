import React, { useContext } from 'react';
import Layout from '../components/Layout';
import FileEditor from '../components/FileEditor';
import NoteMaker from '../components/NoteMaker';
import ListMaker from '../components/ListMaker';
import ReadmePreview from '../components/ReadmePreview';
import { FileContext } from '../context/FileContext';

const Home = () => {
  const { activeFile } = useContext(FileContext);

  const renderActiveFile = () => {
    if (!activeFile) return <div className="p-4 text-gray-600">Select a file to open</div>;

    switch (activeFile.extension) {
      case 'ed':
        return <FileEditor />;
      case 'note':
        return <NoteMaker />;
      case 'lt':
        return <ListMaker />;
      case 'readme':
        return <ReadmePreview />;
      default:
        return <div className="p-4 text-gray-600">Unknown file type</div>;
    }
  };

  return (
    <Layout>
      {renderActiveFile()}
    </Layout>
  );
};

export default Home;
