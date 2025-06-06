import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useModules = () => {
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoading] = useState(true);
  const [errorModule, setError] = useState(null);

  const fetchModules = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get('https://sample-dict-backend.onrender.com/api/get-module');
      
      // Check if the response is valid JSON (array)
      if (Array.isArray(response.data)) {
        setModules(response.data);
      } else {
        console.error("Expected an array, but got:", response.data);
        setModules([]);
      }
    } catch (err) {
      console.error("Error fetching modules:", err);
      setError(err.message || 'An error occurred while fetching modules');
      setModules([]); // Optionally clear modules
    } finally {
      setLoading(false); // Set loading to false once the request is done
    }
  }, []);

  // Initial fetch when the component mounts
  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return { modules, loadingModules, errorModule, refetch: fetchModules };
};

export default useModules;
