// useGetFiles.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export function useGetFiles() {
  const [files, setFiles] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(true);
  const [errorFile, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('https://sample-dict-backend.onrender.com/api/files');
        setFiles(response.data); // Store the entire response data
      } catch (error) {
        // Handle different types of errors
        if (error.response) {
          setError(error.response.data.message || "Server error");
        } else if (error.request) {
          setError("No response from the server. Please check your connection.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  // Show toast notification once the files are successfully loaded
  useEffect(() => {
    // Safely check for the existence of cybersecurityForms and removalForms
    if (files.cybersecurityForms?.length > 0 && files.removalForms?.length > 0) {
      toast.info("📂 Files loaded successfully!");
    }
  }, [files]);

  return { files, loading, errorFile };
}