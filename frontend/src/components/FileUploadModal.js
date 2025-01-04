import React, { useState } from 'react';
import './FileUploadModal.css';

const FileUploadModal = ({ isOpen, closeModal, handleFileUpload }) => {
  const [file, setFile] = useState(null);

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Upload the selected file
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      await handleFileUpload(formData);
      closeModal(); // Close modal after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Upload File</h2>
            <button onClick={closeModal} className="close-btn">×</button>
          </div>
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>Drag and drop a file here, or click to select a file</p>
            <input
              type="file"
              onChange={handleFileSelect}
              onClick={(e) => (e.target.value = null)} // Allow selecting the same file again
            />
            {file && <p>Selected file: {file.name}</p>}
          </div>
          <button onClick={handleUpload} className="upload-btn">
            Upload
          </button>
        </div>
      </div>
    )
  );
};

export default FileUploadModal;
