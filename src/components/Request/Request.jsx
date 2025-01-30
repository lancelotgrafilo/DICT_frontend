import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import useGetRequest from "../../utils/Hooks/RequestHooks/useGetRequest";
import useUpdateRequestStatus from "../../utils/Hooks/RequestHooks/useUpdateRequestStatus";

export function Request() {
  const { requests = [], getLoading, error } = useGetRequest();
  const { updateLoading, updateError, response, updateRequestStatus } = useUpdateRequestStatus();

  // Filter requests to only include those with "pending" status
  const pendingRequests = requests.filter(request => request.status === "pending");

  const handleView = (index) => {
    alert(`Viewing request #${index + 1}`);
  };

  const handleAccept = (index) => {
    const requestId = pendingRequests[index]._id; // Get the correct requestId from pendingRequests
    updateRequestStatus(requestId, "accept");
  };

  const handleReject = (index) => {
    const requestId = pendingRequests[index]._id; // Get the correct requestId from pendingRequests
    updateRequestStatus(requestId, "reject");
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-4">
      <div
        className="card shadow-lg p-4 w-100"
        style={{ borderRadius: "10px", backgroundColor: "#ffffff", minHeight: "81.5vh" }}
      >
        <h3 className="text-center mb-3">Request List</h3>
        <div className="table-responsive">
          <table className="table table-bordered text-center bg-white">
            <thead>
              <tr style={{ backgroundColor: "#003366", color: "white" }}>
                <th style={{ width: "30%", textAlign: "center" }}>Name</th>
                <th style={{ width: "20%", textAlign: "center" }}>Preferred Date</th>
                <th style={{ width: "10%", textAlign: "center" }}>Start Time</th>
                <th style={{ width: "10%", textAlign: "center" }}>End Time</th>
                <th style={{ width: "10%", textAlign: "center" }}>Total Hours</th>
                <th style={{ width: "30%", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((request, reqIndex) =>
                  request.date_and_time.map((date, dateIndex) => (
                    <tr key={`${reqIndex}-${dateIndex}`}>
                      <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                        {`${request.salutation || ""} ${request.first_name} ${request.middle_name || ""} ${request.last_name || ""}`}
                      </td>
                      <td style={{ textAlign: "center" }}>{date.date || "Not Set"}</td>
                      <td style={{ textAlign: "center" }}>{date.start_time || "Not Set"}</td>
                      <td style={{ textAlign: "center" }}>{date.end_time || "Not Set"}</td>
                      <td style={{ textAlign: "center" }}>{date.total_hours || "Not Set"}</td>
                      <td style={{ textAlign: "center" }}>
                        <button className="btn btn-outline-info btn-sm mx-1" onClick={() => handleView(reqIndex)}>
                          <i className="bi bi-eye"></i> View
                        </button>
                        <button
                          className="btn btn-outline-success btn-sm mx-1"
                          onClick={() => handleAccept(reqIndex)}
                          disabled={updateLoading}
                        >
                          {updateLoading ? "Processing..." : <><i className="bi bi-check-circle"></i> Accept</>}
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm mx-1"
                          onClick={() => handleReject(reqIndex)}
                          disabled={updateLoading}
                        >
                          {updateLoading ? "Processing..." : <><i className="bi bi-x-circle"></i> Reject</>}
                        </button>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
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
