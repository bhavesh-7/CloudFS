import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false); // Track if upload is in progress

  // Fetch the file list from the backend
  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/files');
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [uploading]); // Fetch files again when the uploading state changes

  const handleDownload = (fileName) => {
    window.location.href = `http://localhost:5000/files/download/${fileName}`;
  };

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`http://localhost:5000/files/delete/${fileName}`);
      setFiles(files.filter((file) => file !== fileName));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true); // Set uploading state to true
      const formData = new FormData();
      formData.append('file', file);

      try {
        await axios.post('http://localhost:5000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setUploading(false); // Reset uploading state to false after upload
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploading(false);
      }
    }
  };

  const handleView = (fileName) => {
    window.open(`http://localhost:5000/files/view/${fileName}`, '_blank');
  };

  return (
    <div className="file-list">
      <h2>Files in Storage</h2>
      {uploading && <p>Uploading...</p>}
      {files.length > 0 ? (
        <ul>
          {files.map((file) => (
            <li key={file}>
              <span>{file}</span>
              <div>
                <button onClick={() => handleDownload(file)}>Download</button>
                <button onClick={() => handleView(file)}>View</button>
                <button onClick={() => handleDelete(file)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default FileList;
