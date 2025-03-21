import React, { useState } from 'react';
import API from '../api/axios';

function PdfUploader() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setMessage('');
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await API.post('/api/uploads/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('File uploaded successfully: ' + response.data.fileUrl);
        } catch (error) {
            setMessage('Error uploading file: ' + error.response.data.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-lg font-bold mb-4">Upload a PDF</h1>
                <input type="file" onChange={handleFileChange} className="mb-4"/>
                <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload PDF
                </button>
                {message && <p className="mt-4">{message}</p>}
            </div>
        </div>
    );
}

export default PdfUploader;
