import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";  // Import toast

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

    // Show a toast to indicate the process has started
    toast.info("Processing... Please wait.");

    // Introduce a delay using the delay function
    await delay(3000); // 2000ms delay (2 seconds)

    try {
      console.log("Sending PATCH request...");
      const res = await axios.patch(`/api/${status}-request/${requestId}`, {}, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response received:", res.data);
      setResponse(res.data); // Save the response data

      // Show success toast when the request is processed
      toast.success("Request status updated successfully.");
    } catch (err) {
      console.error("Error occurred:", err);
      setError(err.response?.data?.message || err.message || "An error occurred");

      // Show error toast if something went wrong
      toast.error("Failed to update request status.");
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
