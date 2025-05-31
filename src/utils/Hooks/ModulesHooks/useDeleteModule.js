import { useState } from 'react';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const useDeleteModule = () => {
  const [deleteLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const deleteModule = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate a delay (e.g., 2 seconds)
      await delay(2000);

      const response = await axios.delete(`https://sample-dict-backend.onrender.com/api/delete-module/${id}`);
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { deleteModule, deleteLoading, error, success };
};

export default useDeleteModule;
