import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetAcceptedRequest = () => {
  const [requests, setRequests] = useState([]);
  const [getLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://sample-dict-backend.onrender.com/api/get-requests');
        // Filter only accepted requests
        const acceptedRequests = response.data.filter(request => request.status === "accepted");
        setRequests(acceptedRequests);
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

export default useGetAcceptedRequest;