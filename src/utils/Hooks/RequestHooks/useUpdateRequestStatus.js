import { useState } from "react";
import axios from "axios";

const useUpdateRequestStatus = () => {
  const [updateLoading, setLoading] = useState(false);
  const [updateError, setError] = useState(null);
  const [response, setResponse] = useState(null);

  // Function to update request status to accepted or rejected
  const updateRequestStatus = async (requestId, status) => {
    console.log(`Updating request status... Request ID: ${requestId}, Status: ${status}`);

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      console.log("Sending PATCH request...");
      const res = await axios.patch(`/api/${status}-request/${requestId}`, {}, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response received:", res.data);
      setResponse(res.data); // Save the response data
    } catch (err) {
      console.error("Error occurred:", err);
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      console.log("Request processing completed.");
      setLoading(false);
    }
  };

  return {
    updateLoading,
    updateError,
    response,
    updateRequestStatus,
  };
};

export default useUpdateRequestStatus;
