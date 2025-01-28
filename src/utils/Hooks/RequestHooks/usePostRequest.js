import { useState } from 'react';
import axios from 'axios';

const usePostRequest = () => {
  const [data, setData] = useState(null); // For storing the response data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to post a new request
  const addRequest = async (requestPayload) => {
    console.log('Sending request payload:', requestPayload);
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post('/api/post-request', requestPayload);
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
