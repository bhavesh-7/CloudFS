# CloudFS - Cloud File Storage System

CloudFS is a simple cloud-based file storage system built with **React** for the frontend and **Node.js** for the backend, using **AWS S3** to manage file storage. This project allows users to upload, download, delete, and view files stored in the cloud.

## Project Structure

```bash
CloudFS 
├── backend
    ├── package.json                  # Backend dependencies and scripts 
    ├── package-lock.json             # Backend dependency lock file 
    └── server.js                     # Backend server code 
├── frontend    
    ├── package.json                  # Frontend dependencies and scripts
    ├── package-lock.json             # Frontend dependency lock file
    ├── public     
    │   └── index.html                # Main HTML file for frontend     
    ├── README.md                     # This readme file     
    └── src           
        ├── App.css                   # Global CSS for the frontend         
        ├── App.js                    # Main React component         
        ├── components         
        │   ├── FileList.js           # Component to list files in the cloud         
        │   ├── FileUpload.js         # Component to upload files         
        │   ├── FileUploadModal.css   # Styling for the file upload modal         
        │   └── FileUploadModal.js    # Modal for file upload         
        ├── index.css                 # Index CSS         
        └── index.js                  # Main entry point for React app`
```
## Technologies Used

- **Frontend**: React, JavaScript, CSS
- **Backend**: Node.js, Express, AWS SDK
- **Cloud Storage**: AWS S3
- **Other Libraries**: Axios for HTTP requests, Multer for handling file uploads

## Features

- **Upload Files**: Users can upload files to the cloud storage.
- **View Files**: A list of uploaded files is displayed with options to view and manage them.
- **Download Files**: Users can download files from the cloud storage.
- **Delete Files**: Files can be deleted from the cloud storage.
- **Cloud Integration**: AWS S3 is used for cloud storage and file management.

## Setup Instructions

### Prerequisites

- **Node.js** (v14.x or higher)
- **AWS Account** with access to S3
- **AWS Access Keys** (you'll need these for configuring AWS SDK)

### Backend Setup

1. Navigate to the `backend` directory:
    
    ```bash
    cd backend
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    ```
    
3. Create a `.env` file in the `backend` directory with your AWS credentials and S3 bucket name:
    
    ```bash
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    S3_BUCKET_NAME=your_s3_bucket_name
    ```
    
4. Start the backend server:
    
    ```bash
    npm start
    ```
    
    The backend server will now be running on `http://localhost:5000`.
    

### Frontend Setup

1. Navigate to the `frontend` directory:
    
    ```bash
    cd frontend
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    ```
    
3. Start the frontend React app:
    
    ```bash
    npm start
    ```
    
    The frontend will now be running on `http://localhost:3000`.    

### Configuration for AWS S3

- Create an S3 bucket in AWS.
- Get your **Access Key ID** and **Secret Access Key** from the AWS IAM console.
- Set the correct permissions for your S3 bucket, allowing it to store and retrieve files.

## File Structure and Explanation

### **Backend (`/backend`)**

- **server.js**: The backend server file that handles file upload, listing, downloading, and deletion via API routes.
- **package.json**: The Node.js project file containing backend dependencies and scripts.

### **Frontend (`/frontend`)**

- **App.js**: The main React component that holds the layout of the application.
- **FileList.js**: Displays a list of files in the cloud with options to download, delete, or view them.
- **FileUpload.js**: The component that allows users to select and upload files to AWS S3.
- **FileUploadModal.js**: A modal window that opens when the user clicks the upload button.
- **index.js**: The entry point of the React app where the React app is rendered into the DOM.

## Common Issues

1. **CORS Issues**: If you encounter CORS errors, make sure your AWS S3 bucket's CORS configuration allows requests from `http://localhost:3000`.
    
2. **AWS Permissions**: Ensure that the AWS IAM user has the proper permissions to interact with S3.

## License

This project is open-source and available under the MIT License.
