import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import useGetRequest from "../../utils/Hooks/RequestHooks/useGetRequest";
import useUpdateRequestStatus from "../../utils/Hooks/RequestHooks/useUpdateRequestStatus";
import { useState } from "react";
import { useGetFiles } from "../../utils/Hooks/FileHooks/useGetFiles";

export function Request() {
  // Fetch requests using the custom hook
  const { requests = [], getLoading, error, refetch } = useGetRequest();
  // Custom hook for updating request status
  const { updateLoading, updateError, response, updateRequestStatus } = useUpdateRequestStatus();
  // Custom hook for fetching files
  const { files, loading: fileLoading, errorFile } = useGetFiles();

  // State to track processing state for accept/reject buttons
  const [processing, setProcessing] = useState({});
  // State to manage modal visibility and selected request
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Filter requests to only include those with "pending" status
  const pendingRequests = requests.filter((request) => request.status === "pending");

  // Handle opening the modal and setting the selected request
  const handleView = (index) => {
    const request = pendingRequests[index];
    setSelectedRequest(request); // Set the selected request
    console.log("Selected PDF File:", request.pdfFile); // Log the selected request's pdfFile
    setShowModal(true); // Open the modal
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedRequest(null); // Reset the selected request
  };

  // Handle accepting a request
  const handleAccept = async (requestId) => {
    if (!requestId) return;
    setProcessing((prev) => ({ ...prev, [requestId]: 'accept' }));
    await updateRequestStatus(requestId, "accept");
    refetch(); // Refetch requests after updating
    setProcessing((prev) => ({ ...prev, [requestId]: null }));
    if (showModal) handleCloseModal(); // Close the modal if open
  };

  // Handle rejecting a request
  const handleReject = async (requestId) => {
    if (!requestId) return;
    setProcessing((prev) => ({ ...prev, [requestId]: 'reject' }));
    await updateRequestStatus(requestId, "reject");
    refetch(); // Refetch requests after updating
    setProcessing((prev) => ({ ...prev, [requestId]: null }));
    if (showModal) handleCloseModal(); // Close the modal if open
  };

  return (
    <div className="container-fluid d-flex justify-content-center p-0 align-items-center mt-3">
      {/* Backdrop div when the modal is open */}
      {showModal && (
        <div
          className="modal-backdrop show"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
            zIndex: 1040, // Ensure it appears behind the modal
          }}
        ></div>
      )}
      <div
        className="card shadow-lg p-4 w-100"
        style={{ borderRadius: "12px", backgroundColor: "#ffffff", minHeight: "81.5vh" }}
      >
        <h3 className="text-center mb-3">List of Requests</h3>
        <div className="table-responsive">
          <table className="table table-bordered text-center bg-white">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date Submitted</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Total Hours</th>
                <th>Actions</th>
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
                          {`${request.salutation || ""} ${request.first_name} ${request.middle_name || ""} ${request.last_name || ""} ${request.extension_name || ""}`}
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
                            onClick={() => handleAccept(request._id)} // Pass the requestId directly
                            disabled={updateLoading || processing[request._id] === 'accept'}
                          >
                            {processing[request._id] === 'accept' ? "Processing..." : <><i className="bi bi-check-circle"></i> Accept</>}
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm mx-1 custom-btn"
                            onClick={() => handleReject(request._id)} // Pass the requestId directly
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

        {/* Modal for displaying PDF */}
        <div
          className={`modal fade ${showModal ? 'show' : ''}`}
          tabIndex="-1"
          style={{
            display: showModal ? 'block' : 'none',
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add semi-transparent background to modal itself
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Details</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {selectedRequest && (
                  <>
                    {selectedRequest.pdfFile && selectedRequest.pdfFile.data ? (
                      // Convert binary data to Blob URL and display in iframe
                      <iframe
                        src={URL.createObjectURL(
                          new Blob([new Uint8Array(selectedRequest.pdfFile.data)], { type: 'application/pdf' })
                        )}
                        title="Request PDF"
                        width="100%"
                        height="500px"
                        style={{ border: "none" }}
                      ></iframe>
                    ) : (
                      <p>No PDF available for this request.</p>
                    )}
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-success btn-sm mx-1 custom-btn"
                  onClick={() => handleAccept(selectedRequest?._id)} // Pass the requestId directly
                  disabled={updateLoading || processing[selectedRequest?._id] === 'accept'}
                >
                  {processing[selectedRequest?._id] === 'accept' ? "Processing..." : <><i className="bi bi-check-circle"></i> Accept</>}
                </button>
                <button
                  className="btn btn-outline-danger btn-sm mx-1 custom-btn"
                  onClick={() => handleReject(selectedRequest?._id)} // Pass the requestId directly
                  disabled={updateLoading || processing[selectedRequest?._id] === 'reject'}
                >
                  {processing[selectedRequest?._id] === 'reject' ? "Processing..." : <><i className="bi bi-x-circle"></i> Reject</>}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error and success messages */}
        {updateError && <div className="alert alert-danger mt-3">{updateError}</div>}
        {response && !updateError && <div className="alert alert-success mt-3">Request status updated successfully!</div>}
      </div>
    </div>
  );
}