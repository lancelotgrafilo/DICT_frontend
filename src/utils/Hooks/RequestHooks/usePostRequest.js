import { useState } from 'react';
import axios from 'axios';

const usePostRequest = () => {
  const [data, setData] = useState(null); // For storing the response data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to post a new request
  const addRequest = async (requestPayload) => {
    setLoading(true);
    setError(null);

    try {
      // Send POST request to the API
      const response = await axios.post('/api/post-requests', requestPayload);

      // Set response data
      setData(response.data);
      return response.data; // Return data for further usage
    } catch (err) {
      // Handle and set the error
      setError(err.response?.data?.message || err.message);
      throw err; // Rethrow the error for the caller to handle
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, addRequest };
};

export default usePostRequest;
