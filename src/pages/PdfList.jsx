import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../api/axios';
import Navbar from '../component/Navbar'

function PdfList() {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        fetchPdfList();
    }, []);

    const fetchPdfList = async () => {
        setIsLoading(true);
        try {
            const response = await API.get('/api/uploads/list-pdfs');
            if (Array.isArray(response.data)) {
                setPdfFiles(response.data);
            } else {
                setError('Received data is not an array');
                setPdfFiles([]);
            }
        } catch (error) {
            setError('Failed to fetch PDFs: ' + error.message);
            setPdfFiles([]);
        } finally {
            setIsLoading(false);
        }
    };


    const handleDownload = async (filename) => {
        console.log('Downloading file:', filename);
        setIsDownloading(true);
    
        try {
            const response = await axios({
                url: `http://localhost:4000/api/uploads/download/${filename}`, // Adjust the URL based on your setup
                method: 'GET',
                responseType: 'blob', // Important for downloading files
            });
    
            // Create a new Blob object using the response data
            const file = new Blob([response.data], { type: 'application/pdf' });
    
            // Generate a URL for the Blob object
            const fileURL = URL.createObjectURL(file);
    
            // Create a temporary anchor tag to initiate download
            const downloadLink = document.createElement('a');
            downloadLink.href = fileURL;
            downloadLink.setAttribute('download', filename); // Set the download attribute (filename)
            document.body.appendChild(downloadLink);
            downloadLink.click();
    
            // Clean up by removing the anchor tag afterwards
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error('Error downloading the file:', error);
            setError('Failed to download PDF: ' + error.message);
        } finally {
            setIsDownloading(false);
        }
    };
    
    

    return (
        <div className='font-poppins'>
      <div className='min-h-screen  flex-col bg-gradient-to-br from-purple-400 to-pink-300'>
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Available PDFs</h1>
            
            {isLoading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div>
                    {pdfFiles.length > 0 ? (
                        <ul className="space-y-2">
                            {pdfFiles.map((file, index) => (
                                <li key={index} className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                    <button 
                                        onClick={() => handleDownload(file)} 
                                        className="w-full p-3 flex items-center text-left"
                                    >
                                        <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                        </svg>
                                        <span className="text-gray-700 font-medium">{file.replace(/.*Z-/, '').replace('.pdf', '')}</span>
                                        <svg className="w-5 h-5 text-gray-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                            </svg>
                            <p className="mt-2 text-gray-500">No PDFs available to download.</p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                            <p className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                {error}
                            </p>
                        </div>
                    )}
                </div>
            )}
            <div className="mt-6">
                        <button 
                            onClick={fetchPdfList}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            Refresh List
                        </button>
                    </div>
        </div>
        </div>
        </div>
    );
}

export default PdfList;
