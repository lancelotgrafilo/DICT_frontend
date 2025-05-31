import { useState } from 'react';
import axios from 'axios';

// Custom hook to fetch and download a PDF file using Axios
const useGetRequestPdf = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch and download the PDF
  const fetchPdf = async (requestId) => {
    setLoading(true); // Start loading
    setError(null); // Reset error state

    try {
      // Fetch the PDF file from the backend using Axios
      const response = await axios.get(`https://sample-dict-backend.onrender.com/get-pdf/${requestId}`, {
        responseType: 'blob', // Important: Set the response type to 'blob' for binary data
      });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'downloaded_file.pdf'); // Set the filename
      document.body.appendChild(link);
      link.click(); // Trigger the download

      // Clean up the temporary URL and link
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error fetching PDF:', err);
      setError(err.message || 'An error occurred while fetching the PDF.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return { fetchPdf, loading, error };
};

export default useGetRequestPdf;