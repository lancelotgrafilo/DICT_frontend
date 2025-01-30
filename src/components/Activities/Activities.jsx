import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Make sure to import Bootstrap icons

export function Activities() {
  const activities = [
    { date: "2025-02-10", title: "Meeting with Team", startTime: "10:00 AM", endTime: "12:00 PM", status: "accepted" },
    { date: "2025-02-12", title: "Project Deadline", startTime: "2:00 PM", endTime: "4:00 PM", status: "done" },
  ];

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

  const calculateTotalHours = (startTime, endTime) => {
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    return Math.abs((end - start) / 36e5);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4" style={{ minHeight: "80vh", borderRadius: "10px" }}>
        
        {/* Title for Calendar View (Month and Year) */}
        {viewMode === "calendar" && (
          <h4 className="text-center mb-3">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </h4>
        )}

        {/* Title for Table View */}
        {viewMode === "table" && (
          <h4 className="text-center mb-3">List of Activities</h4>
        )}

        {viewMode === "calendar" ? (
          <div className="d-grid" style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center fw-bold">{day}</div>
            ))}

            {generateCalendar().map((date, index) => {
              const activity = activities.find((a) => a.date === date);
              const status = activity?.status;

              return (
                <div
                  key={index}
                  className="calendar-day text-center p-3 border rounded position-relative"
                  style={{
                    minHeight: "60px",
                    backgroundColor:
                      status === "accepted"
                        ? "#007bff"
                        : status === "done"
                        ? "#28a745"
                        : "#f8f9fa",
                    color: status === "accepted" || status === "done" ? "white" : "black",
                    fontWeight: status === "accepted" || status === "done" ? "bold" : "normal",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (status === "accepted") {
                      e.target.style.backgroundColor = "#0056b3";
                      e.target.querySelector(".day-number").style.visibility = "hidden";
                      e.target.querySelector(".view-text").style.display = "block";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status === "accepted") {
                      e.target.style.backgroundColor = "#007bff";
                      e.target.querySelector(".day-number").style.visibility = "visible";
                      e.target.querySelector(".view-text").style.display = "none";
                    }
                  }}
                >
                  <span className="day-number">{date ? new Date(date).getDate() : ""}</span>
                  {status === "accepted" && (
                    <span
                      className="view-text"
                      style={{
                        display: "none",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      View
                    </span>
                  )}
                  {status === "done" && (
                    <span
                      className="view-text"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <i className="bi bi-check-circle" style={{ fontSize: "1.5em" }}></i>
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
                  <th style={{ width: "30%" }}>Name</th>
                  <th style={{ width: "20%" }}>Preferred Date</th>
                  <th style={{ width: "15%" }}>Start Time</th>
                  <th style={{ width: "15%" }}>End Time</th>
                  <th style={{ width: "10%" }}>Total Hours</th>
                  <th style={{ width: "10%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={index}>
                    <td>John Doe</td>
                    <td>{activity.date}</td>
                    <td>{activity.startTime}</td>
                    <td>{activity.endTime}</td>
                    <td>{calculateTotalHours(activity.startTime, activity.endTime)}</td>
                    <td>
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
