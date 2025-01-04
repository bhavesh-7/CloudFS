const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Upload file to S3
app.post('/upload', upload.single('file'), async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    res.status(200).json({ message: 'File uploaded successfully', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch list of files from S3
app.get('/files', async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents.map(file => file.Key);
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete file from S3
app.delete('/files/delete/:fileName', async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.params.fileName,
  };

  try {
    await s3.deleteObject(params).promise();
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download file from S3
app.get('/files/download/:fileName', async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.params.fileName,
  };

  try {
    const data = await s3.getObject(params).promise();
    res.attachment(req.params.fileName);
    res.send(data.Body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download file from S3 (View in browser)
app.get('/files/view/:fileName', async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.params.fileName,
  };

  try {
    const data = await s3.getObject(params).promise();

    // Set Content-Disposition to inline so the browser displays the file
    res.setHeader('Content-Disposition', 'inline; filename="' + req.params.fileName + '"');
    res.setHeader('Content-Type', data.ContentType); // Set the content type to the correct MIME type
    res.send(data.Body); // Send the file content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
