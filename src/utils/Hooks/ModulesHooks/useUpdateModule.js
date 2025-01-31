import { useState } from 'react';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const useUpdateModule = () => {
  const [updateLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const updateModule = async (id, moduleData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate a delay (e.g., 2 seconds)
      await delay(2000);

      const response = await axios.put(`/api/update-module/${id}`, moduleData);
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { updateModule, updateLoading, error, success };
};

export default useUpdateModule;
