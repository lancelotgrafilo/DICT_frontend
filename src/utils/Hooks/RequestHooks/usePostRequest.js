import { useState } from 'react';
import axios from 'axios';

// Utility function to add a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const usePostRequest = () => {
  const [data, setData] = useState(null); // For storing the response data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to post a new request with a delay
  const addRequest = async (requestPayload) => {
    console.log('Sending request payload:', requestPayload);
    setLoading(true);
    setError(null);

    try {
      // Adding a 2-second delay before making the request
      await delay(2000);

      const response = await axios.post('https://sample-dict-backend.onrender.com/api/post-request', requestPayload);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, addRequest };
};

export default usePostRequest;
