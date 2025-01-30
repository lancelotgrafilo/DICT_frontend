import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetRequest = () => {
  const [requests, setRequests] = useState([]);
  const [getLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/get-requests');
        setRequests(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return { requests, getLoading, error };
};

export default useGetRequest;
