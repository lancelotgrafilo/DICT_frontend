import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export function Request() {
  // Sample state (Replace with actual data source)
  const [formValues, setFormValues] = useState({
    personalInfo: {
      firstName: "John",
      middleName: "A.",
      lastName: "Doe",
    },
    date_and_time: [
      { date: "2025-02-10", start_time: "10:00 AM", end_time: "12:00 PM" },
      { date: "2025-02-12", start_time: "2:00 PM", end_time: "4:00 PM" },
    ],
  });

  // Handler functions (Replace with actual logic)
  const handleView = (index) => {
    alert(`Viewing request #${index + 1}`);
  };

  const handleAccept = (index) => {
    alert(`Accepted request #${index + 1}`);
  };

  const handleReject = (index) => {
    alert(`Rejected request #${index + 1}`);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-4" style={{}}>
      <div className="card shadow-lg p-4 w-100" style={{ borderRadius: "10px", backgroundColor: "#ffffff", minHeight: "81.5vh"}}>
        <h3 className="text-center mb-3">Request List</h3>
        <div className="table-responsive">
          <table className="table table-bordered text-center bg-white">
            <thead>
              <tr style={{ backgroundColor: "#003366", color: "white" }}>
                <th style={{ width: "30%", textAlign: "center" }}>Name</th>
                <th style={{ width: "20%", textAlign: "center" }}>Preferred Date</th>
                <th style={{ width: "10%", textAlign: "center" }}>Start Time</th>
                <th style={{ width: "10%", textAlign: "center" }}>End Time</th>
                <th style={{ width: "30%", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formValues.date_and_time.map((date, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                    {`${formValues.personalInfo.firstName} ${formValues.personalInfo.middleName} ${formValues.personalInfo.lastName}`}
                  </td>
                  <td style={{ textAlign: "center" }}>{date.date || "Not Set"}</td>
                  <td style={{ textAlign: "center" }}>{date.start_time || "Not Set"}</td>
                  <td style={{ textAlign: "center" }}>{date.end_time || "Not Set"}</td>
                  <td style={{ textAlign: "center" }}>
                    <button className="btn btn-outline-info btn-sm mx-1" onClick={() => handleView(index)}>
                      <i className="bi bi-eye"></i> View
                    </button>
                    <button className="btn btn-outline-success btn-sm mx-1" onClick={() => handleAccept(index)}>
                      <i className="bi bi-check-circle"></i> Accept
                    </button>
                    <button className="btn btn-outline-danger btn-sm mx-1" onClick={() => handleReject(index)}>
                      <i className="bi bi-x-circle"></i> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
