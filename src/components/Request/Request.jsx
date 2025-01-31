import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import useGetRequest from "../../utils/Hooks/RequestHooks/useGetRequest";
import useUpdateRequestStatus from "../../utils/Hooks/RequestHooks/useUpdateRequestStatus";
import { useState } from "react";

export function Request() {
  const { requests = [], getLoading, error, refetch } = useGetRequest();
  const { updateLoading, updateError, response, updateRequestStatus } = useUpdateRequestStatus();

  // Track processing state for accept and reject buttons
  const [processing, setProcessing] = useState({});

  // Filter requests to only include those with "pending" status
  const pendingRequests = requests.filter(request => request.status === "pending");

  const handleView = (index) => {
    alert(`Viewing request #${index + 1}`);
  };

  const handleAccept = async (index) => {
    const requestId = pendingRequests[index]._id; // Get the correct requestId from pendingRequests

    // Set the processing state for this request
    setProcessing(prev => ({ ...prev, [requestId]: 'accept' }));

    // Wait for the status update
    await updateRequestStatus(requestId, "accept");

    // Manually refetch the data after the update
    refetch();

    // Reset the processing state after the request is processed
    setProcessing(prev => ({ ...prev, [requestId]: null }));
  };

  const handleReject = async (index) => {
    const requestId = pendingRequests[index]._id; // Get the correct requestId from pendingRequests

    // Set the processing state for this request
    setProcessing(prev => ({ ...prev, [requestId]: 'reject' }));

    // Wait for the status update
    await updateRequestStatus(requestId, "reject");

    // Manually refetch the data after the update
    refetch();

    // Reset the processing state after the request is processed
    setProcessing(prev => ({ ...prev, [requestId]: null }));
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-4">
      <div
        className="card shadow-lg p-4 w-100"
        style={{ borderRadius: "10px", backgroundColor: "#ffffff", minHeight: "81.5vh" }}
      >
        <h3 className="text-center mb-3">List of Requests</h3>
        <div className="table-responsive">
          <table className="table table-bordered text-center bg-white">
            <thead>
              <tr style={{ backgroundColor: "#003366", color: "white" }}>
                <th style={{ width: "20%", textAlign: "center", verticalAlign: "middle" }}>Name</th>
                <th style={{ width: "16%", textAlign: "center", verticalAlign: "middle" }}>Date Submitted</th>
                <th style={{ width: "10%", textAlign: "center", verticalAlign: "middle" }}>Preferred Date</th>
                <th style={{ width: "10%", textAlign: "center", verticalAlign: "middle" }}>Start Time</th>
                <th style={{ width: "10%", textAlign: "center", verticalAlign: "middle" }}>End Time</th>
                <th style={{ width: "5%", textAlign: "center", verticalAlign: "middle" }}>Total Hours</th>
                <th style={{ width: "21%", textAlign: "center", verticalAlign: "middle" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request, reqIndex) =>
                  request.date_and_time.map((date, dateIndex) => (
                    <tr key={`${reqIndex}-${dateIndex}`}>
                      {dateIndex === 0 ? (
                        <td
                          rowSpan={request.date_and_time.length}
                          style={{ textAlign: "left", paddingLeft: "15px", verticalAlign: "middle" }}
                        >
                          {`${request.salutation || ""} ${request.first_name} ${request.middle_name || ""} ${request.last_name || ""}`}
                        </td>
                      ) : null}

                      <td style={{ textAlign: "center" }}>{new Date(request.createdAt).toLocaleString()}</td>
                      <td style={{ textAlign: "center" }}>{date.date}</td>
                      <td style={{ textAlign: "center" }}>{date.start_time}</td>
                      <td style={{ textAlign: "center" }}>{date.end_time}</td>
                      <td style={{ textAlign: "center" }}>{date.total_hours}</td>

                      {dateIndex === 0 ? (
                        <td
                          rowSpan={request.date_and_time.length}
                          style={{ textAlign: "center", verticalAlign: "middle" }}
                        >
                          <button
                            className="btn btn-outline-primary btn-sm mx-1 custom-btn"
                            onClick={() => handleView(reqIndex)}
                            disabled={updateLoading || processing[request._id]}
                          >
                            <i className="bi bi-eye"></i> View
                          </button>
                          <button
                            className="btn btn-outline-success btn-sm mx-1 custom-btn"
                            onClick={() => handleAccept(reqIndex)}
                            disabled={updateLoading || processing[request._id] === 'accept'}
                          >
                            {processing[request._id] === 'accept' ? "Processing..." : <><i className="bi bi-check-circle"></i> Accept</>}
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm mx-1 custom-btn"
                            onClick={() => handleReject(reqIndex)}
                            disabled={updateLoading || processing[request._id] === 'reject'}
                          >
                            {processing[request._id] === 'reject' ? "Processing..." : <><i className="bi bi-x-circle"></i> Reject</>}
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="100%" className="text-center">
                    {getLoading ? "Loading..." : error ? "Error fetching requests" : "No pending requests available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {updateError && <div className="alert alert-danger mt-3">{updateError}</div>}
        {response && !updateError && <div className="alert alert-success mt-3">Request status updated successfully!</div>}
      </div>
    </div>
  );
}
