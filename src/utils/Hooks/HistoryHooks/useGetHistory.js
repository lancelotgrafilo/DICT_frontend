import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('https://sample-dict-backend.onrender.com/api/get-history');
        setHistory(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch transaction history");
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { history, loading, error };
};

export default useGetHistory;
