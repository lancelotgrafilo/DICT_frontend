import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import useGetRequest from "../../utils/Hooks/RequestHooks/useGetRequest";

export function Activities() {
  const { requests } = useGetRequest();

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
  const filteredRequests = requests.filter((activity) => activity.status === "accepted" || activity.status === "done");

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4" style={{ minHeight: "80vh", borderRadius: "10px" }}>

        {/* Title */}
        <h4 className="text-center mb-3">
          {viewMode === "calendar"
            ? currentDate.toLocaleString("default", { month: "long", year: "numeric" })
            : "List of Activities"}
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
                      e.target.querySelector(".day-number").style.display = "none";
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
                      e.target.querySelector(".day-number").style.display = "block";
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
                      Done
                    </span>
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
                {filteredRequests.map((activity, index) => (
                  <tr key={index}>
                    <td style={{ width: "30%", textAlign: "left" }}>{`${activity.salutation || ""} ${activity.first_name} ${activity.middle_name || ""} ${activity.last_name || ""}`}</td>
                    <td style={{ width: "20%", textAlign: "center" }}>{activity.date_and_time.map((dateItem, idx) => (<div key={idx}>{dateItem.date}</div>))}</td>
                    <td style={{ width: "10%", textAlign: "center" }}>{activity.date_and_time.map((dateItem, idx) => (<div key={idx}>{dateItem.start_time}</div>))}</td>
                    <td style={{ width: "10%", textAlign: "center" }}>{activity.date_and_time.map((dateItem, idx) => (<div key={idx}>{dateItem.end_time}</div>))}</td>
                    <td style={{ width: "10%", textAlign: "center" }}>{activity.date_and_time.map((dateItem, idx) => (<div key={idx}>{dateItem.total_hours}</div>))}</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-2">
                        <i className="bi bi-eye"></i> View
                      </button>
                      <button className="btn btn-outline-success btn-sm">
                        <i className="bi bi-check-circle"></i> Done
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-outline-primary" onClick={() => changeMonth(-1)}>◀ Prev</button>
          <button className="btn btn-outline-secondary" onClick={() => setViewMode(viewMode === "calendar" ? "table" : "calendar")}>
            📋 {viewMode === "calendar" ? "Table View" : "Calendar View"}
          </button>
          <button className="btn btn-outline-primary" onClick={() => changeMonth(1)}>Next ▶</button>
        </div>

      </div>
    </div>
  );
}
