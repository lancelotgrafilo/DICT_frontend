import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styleRequest from "./request.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export function Request() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      lastName: "",
      firstName: "",
      middleName: "",
      extensionName: "",
      salutation: "",
      gender: "",
      contactNo: "",
      email: "",
    },
    organizationInfo: {
      organizationName: "",
      department: "",
      position: "",
    },
    preferredDates: [
      {
        date: "",
        startTime: "",
        endTime: "",
        totalHours: 0,
      },
    ],
  });

  const handleChange = (e, section, index = null) => {
    const { name, value } = e.target;
    if (section === "preferredDates" && index !== null) {
      const updatedDates = [...formData.preferredDates];
      updatedDates[index][name] = value;

      // Automatically calculate total hours if both start and end times are provided
      if (name === "startTime" || name === "endTime") {
        const startTime = updatedDates[index].startTime;
        const endTime = updatedDates[index].endTime;
        if (startTime && endTime) {
          const start = new Date(`1970-01-01T${startTime}:00`);
          const end = new Date(`1970-01-01T${endTime}:00`);
          const diff = (end - start) / (1000 * 60 * 60); // Difference in hours
          updatedDates[index].totalHours = diff > 0 ? diff : 0;
        }
      }

      setFormData((prevData) => ({
        ...prevData,
        preferredDates: updatedDates,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [name]: value,
        },
      }));
    }
  };

  const addPreferredDate = () => {
    setFormData((prevData) => ({
      ...prevData,
      preferredDates: [
        ...prevData.preferredDates,
        { date: "", startTime: "", endTime: "", totalHours: 0 },
      ],
    }));
  };

  const removePreferredDate = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      preferredDates: prevData.preferredDates.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className={styleRequest.mainContent}>
    
      <div className="container my-5">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Cybersecurity Awareness Request Form</h2>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <h4 className="mb-3">Personal Information</h4>
                <hr />
                <div className="row g-3">
                  {/* Personal Info Fields */}
                  <div className="col-md-4">
                    <label className="form-label">Salutation</label>
                    <select
                      name="salutation"
                      value={formData.personalInfo.salutation}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="form-select"
                    >
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Ms">Ms</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.personalInfo.firstName}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.personalInfo.lastName}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.personalInfo.middleName}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Extension Name</label>
                    <input
                      type="text"
                      name="extensionName"
                      value={formData.personalInfo.extensionName}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      value={formData.personalInfo.gender}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="form-select"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact No.</label>
                    <input
                      type="tel"
                      name="contactNo"
                      value={formData.personalInfo.contactNo}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h4 className="mb-3">Organization Information</h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Organization Name</label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationInfo.organizationName}
                      onChange={(e) => handleChange(e, "organizationInfo")}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.organizationInfo.department}
                      onChange={(e) => handleChange(e, "organizationInfo")}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.organizationInfo.position}
                      onChange={(e) => handleChange(e, "organizationInfo")}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h4 className="mb-3">Preferred Date and Time</h4>
                {formData.preferredDates.map((dateInfo, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="row g-3 flex-grow-1 align-items-center">
                      <div className="col-md-4">
                        <label className="form-label">Preferred Date</label>
                        <input
                          type="date"
                          name="date"
                          value={dateInfo.date}
                          onChange={(e) => {
                            const selectedDate = new Date(e.target.value);
                            const day = selectedDate.getDay();
                            if (day === 0 || day === 6) {
                              alert("Weekends are not allowed. Please select a weekday.");
                              e.target.value = ""; // Clear invalid date
                              return;
                            }
                            handleChange(e, "preferredDates", index);
                          }}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">Start Time</label>
                        <input
                          type="time"
                          name="startTime"
                          value={dateInfo.startTime}
                          onChange={(e) => handleChange(e, "preferredDates", index)}
                          className="form-control"
                          min="08:00"
                          max="17:00"
                          required
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">End Time</label>
                        <input
                          type="time"
                          name="endTime"
                          value={dateInfo.endTime}
                          onChange={(e) => handleChange(e, "preferredDates", index)}
                          className="form-control"
                          min="08:00"
                          max="17:00"
                          required
                        />
                      </div>
                        <div className="col-md-2">
                          <label className="form-label">Total Hours</label>
                          <input
                            type="number"
                            name="totalHours"
                            value={Math.round(dateInfo.totalHours)} // Ensure the value is a whole number
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-1 d-flex-grow-1 justify-content-center align-items-center">
                        {formData.preferredDates.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm delete-btn"
                            onClick={() => removePreferredDate(index)}
                          >
                            <i className="bi bi-trash" style={{ marginRight: "5px" }}></i> Delete
                          </button>
                        )}
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="d-flex justify-content-end mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={addPreferredDate}
                  >
                    Add Another Date
                  </button>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  <button
                    type="button" // Change from submit to button
                    className="btn btn-success"
                    onClick={handleNext} // Ensure this function moves to the next step
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h4 className="mb-3">Module Categories</h4>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Select Categories</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="beginner"
                        value="Beginner"
                        onChange={(e) => handleCategoryChange(e, "beginner")}
                        className="form-check-input"
                      />
                      <label htmlFor="beginner" className="form-check-label">
                        Beginner
                      </label>
                    </div>
                    {selectedCategories.beginner && (
                      <div className="sub-options">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="beginnerOption1"
                            value="Basic Concepts"
                            onChange={(e) => handleSubCategoryChange(e, "beginner")}
                            className="form-check-input"
                          />
                          <label htmlFor="beginnerOption1" className="form-check-label">
                            Basic Concepts
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="beginnerOption2"
                            value="Safe Browsing"
                            onChange={(e) => handleSubCategoryChange(e, "beginner")}
                            className="form-check-input"
                          />
                          <label htmlFor="beginnerOption2" className="form-check-label">
                            Safe Browsing
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="intermediate"
                        value="Intermediate"
                        onChange={(e) => handleCategoryChange(e, "intermediate")}
                        className="form-check-input"
                      />
                      <label htmlFor="intermediate" className="form-check-label">
                        Intermediate
                      </label>
                    </div>
                    {selectedCategories.intermediate && (
                      <div className="sub-options">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="intermediateOption1"
                            value="Network Security"
                            onChange={(e) => handleSubCategoryChange(e, "intermediate")}
                            className="form-check-input"
                          />
                          <label htmlFor="intermediateOption1" className="form-check-label">
                            Network Security
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="intermediateOption2"
                            value="Email Security"
                            onChange={(e) => handleSubCategoryChange(e, "intermediate")}
                            className="form-check-input"
                          />
                          <label htmlFor="intermediateOption2" className="form-check-label">
                            Email Security
                          </label>
                        </div>
                      </div>
                    )}
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="technical"
                          value="Technical"
                          onChange={(e) => handleCategoryChange(e, "technical")}
                          className="form-check-input"
                        />
                        <label htmlFor="technical" className="form-check-label">
                          Technical
                        </label>
                      </div>
                      {selectedCategories.technical && (
                        <div className="sub-options">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id="technicalOption1"
                              value="Penetration Testing"
                              onChange={(e) => handleSubCategoryChange(e, "technical")}
                              className="form-check-input"
                            />
                            <label htmlFor="technicalOption1" className="form-check-label">
                              Penetration Testing
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id="technicalOption2"
                              value="System Hardening"
                              onChange={(e) => handleSubCategoryChange(e, "technical")}
                              className="form-check-input"
                            />
                            <label htmlFor="technicalOption2" className="form-check-label">
                              System Hardening
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
          </form>
        </div>
      </div>
  </div>
  );
};
