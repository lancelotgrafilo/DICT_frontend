import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useGetRequest = () => {
  const [requests, setRequests] = useState([]);
  const [getLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/get-requests');
      setRequests(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return { requests, getLoading, error, refetch: fetchRequests };
};

export default useGetRequest;
