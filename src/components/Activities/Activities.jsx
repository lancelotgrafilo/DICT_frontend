import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import useGetRequest from "../../utils/Hooks/RequestHooks/useGetRequest";
import useUpdateRequestStatus from "../../utils/Hooks/RequestHooks/useUpdateRequestStatus";
import { FaRegCalendarAlt, FaRegListAlt } from 'react-icons/fa';
import { useGetFiles } from '../../utils/Hooks/FIleHooks/useGetFiles'

export function Activities() {
    const { files, loading: fileLoading, errorFile } = useGetFiles();
    const { updateLoading, updateError, response, updateRequestStatus } = useUpdateRequestStatus();
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [processing, setProcessing] = useState({});
  const { requests, refetch } = useGetRequest();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("calendar");
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const changeMonth = (offset) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  const generateCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = getDaysInMonth(month, year);
    const daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
    }
    return daysArray;
  };

  const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD

  // Filter requests to only include those with status "accepted" or "done"
  const filteredRequests = requests.filter((activity) => activity.status === "accepted" || activity.status === "done" || activity.status === "canceled");

  // Filter requests for the current month
  const getCurrentMonthRequests = () => {
    return filteredRequests.filter((activity) => {
      return activity.date_and_time.some((dateItem) => {
        const activityDate = new Date(dateItem.date);
        return activityDate.getMonth() === currentDate.getMonth() && activityDate.getFullYear() === currentDate.getFullYear();
      });
    });
  };

  const handleDone = (index) => {
    const requestId = getCurrentMonthRequests()[index]._id;
    updateRequestStatus(requestId, "done")
      .then(() => {
        console.log("Status updated, refetching...");
        refetch();
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  const getFileUrl = (fileName) => {
    if (!fileName || !files.cybersecurityForms) return null;
    const file = files.cybersecurityForms.find(file => file.name === fileName);
    return file ? `${'http://localhost:5000'}${file.url}` : null;
  };

  const handleView = (index) => {
    const request = getCurrentMonthRequests()[index];
    setSelectedRequest(request); // Set the selected request
    setShowModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedRequest(null); // Reset the selected request
  };
  
  const handleDoneInModal = async (requestId) => {
    if (!requestId) return;
  
    // Prevent multiple clicks while processing
    setProcessing((prev) => ({ ...prev, [requestId]: 'done' }));
  
    try {
      await updateRequestStatus(requestId, "done");
      console.log("Status updated, refetching...");
      refetch(); // Refetch the requests to reflect the updated status
      handleCloseModal(); // Close the modal after updating the status
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setProcessing((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  const handleCancel = async (requestId) => {
    if (!requestId) return;

    // Prevent multiple clicks while processing
    setProcessing((prev) => ({ ...prev, [requestId]: 'cancel' }));
    try {
        await updateRequestStatus(requestId, "canceled");
        console.log("Request canceled, refetching...");
        refetch(); // Refetch the requests to reflect the updated status
        handleCloseModal(); // Close the modal after canceling the request
    } catch (err) {
        console.error("Error canceling request:", err);
    } finally {
        setProcessing((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  const handleCancelInModal = async (requestId) => {
    if (!requestId) return;

    // Prevent multiple clicks while processing
    setProcessing((prev) => ({ ...prev, [requestId]: 'cancel' }));
    try {
        await updateRequestStatus(requestId, "canceled");
        console.log("Request canceled, refetching...");
        refetch(); // Refetch the requests to reflect the updated status
        handleCloseModal(); // Close the modal after canceling the request
    } catch (err) {
        console.error("Error canceling request:", err);
    } finally {
        setProcessing((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  return (
    <div className="container p-0 mt-3">
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

      <div className="card shadow-lg p-4" style={{ minHeight: "80vh", borderRadius: "12px" }}>

        {/* Title */}
        <h4 className="text-center mb-3">
          {viewMode === "calendar"
            ? currentDate.toLocaleString("default", { month: "long", year: "numeric" })
            : `List of Activities (${currentDate.toLocaleString("default", { month: "long", year: "numeric" })})`}
        </h4>

        {/* Calendar View */}
        {viewMode === "calendar" ? (
          <div className="d-grid" style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center fw-bold">{day}</div>
            ))}

            {generateCalendar().map((date, index) => {
              const activity = filteredRequests.find((a) =>
                a.date_and_time.some(item => item.date === date)
              );
              const status = activity?.status;
              const isToday = date === today;

              return (
                <div
                  key={index}
                  className="calendar-day text-center p-3 border rounded position-relative"
                  style={{
                    minHeight: "60px",
                    backgroundColor:
                      isToday
                        ? "#808080" // Gray background for today
                        : status === "accepted"
                          ? "#007bff" // Blue for accepted
                          : status === "done"
                            ? "#28a745" // Green for done
                            : "#f8f9fa", // Default background
                    color: isToday || status ? "white" : "black",
                    fontWeight: isToday || status ? "bold" : "normal",
                    border: isToday ? "3px solid #FF4500" : "1px solid #dee2e6",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (isToday) {
                      e.target.style.backgroundColor = "#808080"; // Gray for today on hover
                      e.target.querySelector(".day-number").style.display = "none"; // Hide number
                      e.target.querySelector(".view-text").style.display = "block"; // Show "Today"
                      e.target.querySelector(".view-text").style.color = "white"; // Change "Today" text to white
                    } else if (status === "accepted") {
                      e.target.style.backgroundColor = "#0056b3"; // Darker blue for accepted on hover
                      e.target.querySelector(".day-number").style.display = "none";
                      e.target.querySelector(".view-text").style.display = "block";
                    } else if (status === "done") {
                      e.target.style.backgroundColor = "#218838"; // Darker green for done on hover
                      e.target.querySelector(".check-icon").style.display = "none";
                      e.target.querySelector(".view-text").style.display = "block";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isToday) {
                      e.target.style.backgroundColor = "#808080"; // Keep gray color when hovering on today
                      e.target.querySelector(".view-text").style.display = "none"; // Hide "Today"
                      e.target.querySelector(".day-number").style.display = "block"; // Show number again
                    } else if (status === "accepted") {
                      e.target.style.backgroundColor = "#007bff"; // Blue for accepted
                      e.target.querySelector(".day-number").style.display = "block";
                      e.target.querySelector(".view-text").style.display = "none";
                    } else if (status === "done") {
                      e.target.style.backgroundColor = "#28a745"; // Green for done
                      e.target.querySelector(".check-icon").style.display = "block";
                      e.target.querySelector(".view-text").style.display = "none";
                    }
                  }}
                >
                  {isToday && <span className="view-text"
                    style={{
                      display: "none",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white", // Today text color is white
                      fontWeight: "bold",
                    }} >
                    Today
                  </span>}

                  {status !== "done" && <span className="day-number">{date ? new Date(date).getDate() : ""}</span>}

                  {status === "accepted" && (
                    <span className="view-text"
                      style={{
                        display: "none",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontWeight: "bold",
                      }} >
                      View
                    </span>
                  )}

                  {status === "done" && (
                    <>
                      <span className="check-icon"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }} >
                        <i className="bi bi-check-circle" style={{ fontSize: "1.5em" }}></i>
                      </span>
                      <span className="view-text"
                        style={{
                          display: "none",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                          fontWeight: "bold",
                        }} >
                        View
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered text-center bg-white">
              <thead>
                <tr style={{ backgroundColor: "#003366", color: "white" }}>
                  <th>Name</th>
                  <th>Preferred Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Total Hours</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentMonthRequests().length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted" style={{ padding: "20px" }}>
                      No activities scheduled for this month.
                    </td>
                  </tr>
                ) : (
                  getCurrentMonthRequests().map((activity, index) => (
                    <tr key={index}>
                      <td style={{ width: "20%", textAlign: "left", verticalAlign: "middle" }}>
                        {`${activity.salutation || ""} ${activity.first_name} ${activity.middle_name || ""} ${activity.last_name || ""} ${activity.extension_name}`}
                      </td>
                      <td style={{ width: "10%", textAlign: "center", verticalAlign: "middle" }}>
                        {activity.date_and_time.map((dateItem, idx) => (
                          <div key={idx}>{dateItem.date}</div>
                        ))}
                      </td>
                      <td style={{ width: "10%", textAlign: "center", verticalAlign: "middle" }}>
                        {activity.date_and_time.map((dateItem, idx) => (
                          <div key={idx}>{dateItem.start_time}</div>
                        ))}
                      </td>
                      <td style={{ width: "10%", textAlign: "center", verticalAlign: "middle" }}>
                        {activity.date_and_time.map((dateItem, idx) => (
                          <div key={idx}>{dateItem.end_time}</div>
                        ))}
                      </td>
                      <td style={{ width: "10%", textAlign: "center", verticalAlign: "middle" }}>
                        {activity.date_and_time.map((dateItem, idx) => (
                          <div key={idx}>{dateItem.total_hours}</div>
                        ))}
                      </td>
                      <td style={{ width: "20%", textAlign: "center", verticalAlign: "middle" }}>
                        <button 
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => handleView(index)}
                        >
                          <i className="bi bi-eye"></i> View
                        </button>
                        {/* Conditionally render Done button based on activity status */}
                        {activity.status === "done" ? (
                            <span className="text-success" style={{ fontWeight: "bold" }}>Completed</span>
                        ) : activity.status === "canceled" ? (
                            <span className="text-danger" style={{ fontWeight: "bold" }}>Canceled</span>
                        ) : (
                            <>
                                <button
                                    className="btn btn-outline-success btn-sm me-2"
                                    onClick={() => handleDone(index)} // Pass the index of the current activity
                                >
                                    <i className="bi bi-check-circle"></i> Done
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleCancel(activity._id)}
                                >
                                    <i className="bi bi-x-circle"></i> Cancel
                                </button>
                            </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-outline-primary" onClick={() => changeMonth(-1)}>◀ Prev</button>
          <button className="btn btn-outline-secondary d-flex align-items-center" onClick={() => setViewMode(viewMode === "calendar" ? "table" : "calendar")}>
            {viewMode === "calendar" ? (
              <>
                <FaRegListAlt className="me-2" /> Table View
              </>
            ) : (
              <>
                <FaRegCalendarAlt className="me-2" /> Calendar View
              </>
            )}
          </button>

          <button className="btn btn-outline-primary" onClick={() => changeMonth(1)}>Next ▶</button>
        </div>

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
                    {getFileUrl(selectedRequest.pdfFile) ? (
                      <iframe
                        src={getFileUrl(selectedRequest.pdfFile)}
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
                {selectedRequest?.status === "done" ? (
                  <span className="text-success" style={{ fontWeight: "bold" }}>
                    Completed
                  </span>
                ) : selectedRequest?.status === "canceled" ? (
                  <span className="text-danger" style={{ fontWeight: "bold" }}>
                    Canceled
                  </span>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-success btn-sm mx-1 custom-btn"
                      onClick={() => handleDoneInModal(selectedRequest?._id)}
                      disabled={processing[selectedRequest?._id] === 'done'}
                    >
                      {processing[selectedRequest?._id] === 'done' ? "Processing..." : <><i className="bi bi-check-circle"></i> Done</>}
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleCancelInModal(selectedRequest?._id)}
                    >
                      <i className="bi bi-x-circle"></i> Cancel
                    </button>
                  </>
                )}
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
