import React, { useState } from 'react';
import FileUploadModal from './components/FileUploadModal';
import FileList from './components/FileList';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle file upload to the backend
  const handleFileUpload = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <h1>Cloud File Storage</h1>
      {/* File List Component */}
      <div className="file-list">
        <FileList />
      </div>
      
      {/* Button to trigger the file upload modal */}
      <div className="upload-button">
        <button onClick={openModal}>Upload</button>
      </div>

      {/* Modal for file upload */}
      <FileUploadModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
}

export default App;
