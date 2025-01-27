import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styleHomePage from "./homePage.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Header } from "../../components/Header/Header";

export function Homepage() {
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
    categories: [],
  });


  const calculateTotalHours = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const diffInMilliseconds = end - start;
    return diffInMilliseconds / (1000 * 60 * 60);
  };

  const [rows, setRows] = useState([{ category: "", subcategory: "" }]);

  const categories = [
    { id: "beginners", label: "Beginners", subcategories: ["Module 1", "Module 2"] },
    { id: "intermediate", label: "Intermediate", subcategories: ["Module 3", "Module 4"] },
    { id: "technical", label: "Technical", subcategories: ["Module 5", "Module 6"] },
  ];

  const handleCategoryChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].category = value;
    updatedRows[index].subcategory = ""; // Reset subcategory when category changes
    setRows(updatedRows);
  };

  const handleSubcategoryChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].subcategory = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { category: "", subcategory: "" }]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (e, section, index = null) => {
    const { name, value } = e.target;
    if (section === "preferredDates" && index !== null) {
      const updatedDates = [...formData.preferredDates];
      updatedDates[index][name] = value;

      // Automatically calculate total hours if both start and end times are provided
      if (name === "startTime") {
        // When the start time is changed, set the end time to be 1 hour later
        const newStartTime = value;
        const newEndTime = calculateEndTime(newStartTime);
        updatedDates[index].endTime = newEndTime; // Automatically update end time
      }

      // Calculate total hours if both start and end times are available
      if (updatedDates[index].startTime && updatedDates[index].endTime) {
        const totalHours = calculateTotalHours(
          updatedDates[index].startTime,
          updatedDates[index].endTime
        );
        updatedDates[index].totalHours = totalHours;
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

  const calculateEndTime = (startTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    start.setHours(start.getHours() + 1); // Add 1 hour
    if (start.getHours() >= 17) { // Check if it exceeds 17:00
      return "17:00";
    }
    return formatTime(start);
  };

  const handleNext = () => {
    const isValid = validateStep(step);
    if (isValid) {
      setStep(step + 1);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.personalInfo.firstName && formData.personalInfo.lastName && formData.personalInfo.gender && formData.personalInfo.contactNo && formData.personalInfo.email;
      case 2:
        return formData.organizationInfo.organizationName && formData.organizationInfo.department && formData.organizationInfo.position;
      case 3:
        return formData.preferredDates.every((dateInfo) => dateInfo.date && dateInfo.startTime && dateInfo.endTime);
      case 4:
        return rows.every((row) => row.category && row.subcategory);
      case 5:
        return true; // No additional validation needed for review step
      default:
        return true;
    }
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData, selectedCategories);
    alert("Form submitted successfully!");
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

  // Helper function to generate time options
  const generateTimeOptions = (startTime, endTime) => {
    const times = [];
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    let currentTime = start;

    while (currentTime <= end) {
      times.push(formatTime(currentTime));
      currentTime += 60; // Increment by 60 minutes
    }

    return times;
  };

  // Helper function to parse time string (e.g., "08:00") into minutes
  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  // Helper function to format time in 12-hour format with AM/PM
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // 12-hour format
    return `${formattedHours}:${mins.toString().padStart(2, "0")} ${period}`;
  };


  return (
    <div className={styleHomePage.mainContent}>
      <Header />
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
                    <span style={{ color: 'red' }}>*</span>
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
                    <span style={{ color: 'red' }}>*</span>
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
                    <span style={{ color: 'red' }}>*</span>
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
                    <span style={{ color: 'red' }}>*</span>
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
                    <span style={{ color: 'red' }}>*</span>
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
                    <span style={{ color: 'red' }}>*</span>
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
                    <span style={{ color: 'red' }}>*</span>
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
                    <span style={{ color: 'red' }}>*</span>
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
                    <span style={{ color: 'red' }}>*</span>
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
                    <span style={{ color: 'red' }}>*</span>
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
                <div className="table-responsive">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Preferred Date</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Total Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.preferredDates.map((dateInfo, index) => (
                        <tr key={index}>
                          <td>
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
                          </td>
                          <td>
                            <select
                              name="startTime"
                              value={dateInfo.startTime}
                              onChange={(e) => handleChange(e, "preferredDates", index)}
                              className="form-control"
                              required
                            >
                              <option value="" disabled>Select Start Time</option>
                              {generateTimeOptions("08:00", "16:00").map((time, idx) => (
                                <option key={idx} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select
                              name="endTime"
                              value={dateInfo.endTime}
                              onChange={(e) => handleChange(e, "preferredDates", index)}
                              className="form-control"
                              required
                            >
                              <option value="" disabled>Select End Time</option>
                              {generateTimeOptions(dateInfo.startTime, "17:00").map((time, idx) => (
                                <option key={idx} value={time}>{time}</option>
                              ))}
                            </select>
                          </td>

                          <td>
                            <input
                              type="number"
                              name="totalHours"
                              value={dateInfo.totalHours}
                              className="form-control"
                              readOnly
                            />
                          </td>
                          <td className="text-center">
                            {formData.preferredDates.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => removePreferredDate(index)}
                              >
                                <i className="bi bi-trash"></i> Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

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
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}


            {step === 4 && (
              <div>
                <h4 className="mb-3">Module Categories</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Subcategory (Module)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <select
                            className="form-select"
                            value={row.category}
                            onChange={(e) => handleCategoryChange(index, e.target.value)}
                          >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.label}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={row.subcategory}
                            onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                            disabled={!row.category}
                          >
                            <option value="">Select Module</option>
                            {categories
                              .find((cat) => cat.label === row.category)
                              ?.subcategories.map((sub, subIndex) => (
                                <option key={subIndex} value={sub}>
                                  {sub}
                                </option>
                              ))}
                          </select>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeRow(index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  className="btn btn-secondary mt-3"
                  onClick={addRow}
                >
                  Add Another Row
                </button>
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

            {step === 5 && (
              <div>
                <h4 className="mb-3">Review and Submit</h4>
                <p>Please review your selections before submitting.</p>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  <button type="submit" className="btn btn-success">
                    Submit
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
