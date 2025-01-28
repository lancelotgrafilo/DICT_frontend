import { useState, useEffect } from 'react';
import axios from 'axios';

const useModules = () => {
  const [modules, setModules] = useState([]);
  const [loadingModules, setLoading] = useState(true);
  const [errorModule, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('/api/get-module');
        
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
        setLoading(false);
      }
    };    

    fetchModules();
  }, []);

  return { modules, loadingModules, errorModule };
};

export default useModules;
