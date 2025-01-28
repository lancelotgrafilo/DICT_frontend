import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styleRequestForm from "./requestForm.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast } from 'react-toastify';
import { Header } from "../../components/Header/Header";
import { useNavigate } from 'react-router-dom';

import usePostRequest from "../../utils/Hooks/RequestHooks/usePostRequest";
import useModules from "../../utils/Hooks/ModulesHooks/useGetModules";

export function RequestForm() {
  const { data, loading, error, addRequest } = usePostRequest();
  const [formValues, setFormValues] = useState({
    salutation: '',
    last_name: '',
    first_name: '',
    middle_name: '',
    extension_name: '',
    gender: '',
    address: '',
    email_address: '',
    contact_number: '',
    organization_name: '',
    department: '',
    position: '',
    date_and_time: [
      { date: '', start_time: '', end_time: '', total_hours: 0 },
    ],
    modules_selected: [
      { module_name: '', module_description: '', difficulty: '' },
    ],
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Values:', formValues);  // Log all the formValues before submitting
    try {
      const response = await addRequest(formValues);
      console.log('Request submitted successfully:', response);
      toast.success('Request submitted successfully:', response);
      navigate('/home');
    } catch (err) {
      console.error('Error submitting request:', err);
    }
  };

  const [step, setStep] = useState(1);

  const { modules, loadingModules, errorModule } = useModules();

  const [rows, setRows] = useState([{ category: "", subcategory: { module_name: "", module_description: "", difficulty: "" } }]);

  const handleCategoryChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].category = value;
    updatedRows[index].subcategory = { module_name: "", module_description: "", difficulty: "" }; // Reset subcategory when category changes
    setRows(updatedRows);

    // Update modules_selected to reflect the changes
    const updatedModulesSelected = [...formValues.modules_selected];
    updatedModulesSelected[index] = { module_name: "", module_description: "", difficulty: "" };
    setFormValues({ ...formValues, modules_selected: updatedModulesSelected });
  };

  const handleSubcategoryChange = (index, moduleName) => {
    const selectedModule = modules.find((module) => module.module_name === moduleName); // Find the selected module

    if (selectedModule) {
      const updatedRows = [...rows];
      updatedRows[index].subcategory = {
        module_name: selectedModule.module_name,
        module_description: selectedModule.module_description,
        difficulty: selectedModule.difficulty
      };
      setRows(updatedRows);

      // Update modules_selected to reflect the changes
      const updatedModulesSelected = [...formValues.modules_selected];
      updatedModulesSelected[index] = {
        module_name: selectedModule.module_name,
        module_description: selectedModule.module_description,
        difficulty: selectedModule.difficulty
      };
      setFormValues({ ...formValues, modules_selected: updatedModulesSelected });
    } else {
      // Handle case where module is not found (optional)
      console.error("Selected module not found");
    }
  };



  const addRow = () => {
    setRows([...rows, { category: "", subcategory: { module_name: "", module_description: "", difficulty: "" } }]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (e, section, index = null) => {
    const { name, value } = e.target;

    if (section === "date_and_time" && index !== null) {
      const updatedDates = [...formValues.date_and_time];
      updatedDates[index][name] = value;

      // Automatically calculate total hours if both start and end times are provided
      if (name === "start_time") {
        // When the start time is changed, set the end time to be 1 hour later
        const newStartTime = value;
        const newEndTime = calculateEndTime(newStartTime);
        updatedDates[index].end_time = newEndTime; // Automatically update end time
      }

      // Validate endTime and ensure it’s at least 1 hour after startTime
      if (name === "end_time" || name === "start_time") {
        if (updatedDates[index].start_time && updatedDates[index].end_time) {
          const totalHours = calculateTotalHours(
            updatedDates[index].start_time,
            updatedDates[index].end_time
          );

          if (totalHours <= 0) {
            toast.info("End time must be at least 1 hour after the start time.");
            updatedDates[index].end_time = ""; // Clear invalid end time
          } else {
            updatedDates[index].total_hours = totalHours; // Update total hours
          }
        }
      }

      setFormValues((prevValues) => ({
        ...prevValues,
        date_and_time: updatedDates,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [section]: {
          ...prevValues[section],
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
      toast.info("Please fill in all required fields.");
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formValues.first_name && formValues.last_name && formValues.gender && formValues.contact_number && formValues.email_address;
      case 2:
        return formValues.organization_name && formValues.department && formValues.position;
      case 3:
        return formValues.date_and_time.every((dateInfo) => dateInfo.date && dateInfo.start_time && dateInfo.end_time);
      case 4:
        return rows.every((row) => row.category && row.subcategory);
      case 5:
        return true; // No additional validation needed for review step
      default:
        return true;
    }
  };

  const handlePrevious = () => setStep(step - 1);

  const addPreferredDate = () => {
    setFormValues((prevData) => ({
      ...prevData,
      date_and_time: [
        ...prevData.date_and_time,
        { date: "", start_time: "", end_time: "", total_hours: 0 },
      ],
    }));
  };

  const removePreferredDate = (index) => {
    setFormValues((prevData) => ({
      ...prevData,
      date_and_time: prevData.date_and_time.filter((_, i) => i !== index),
    }));
  };

  const generateTimeOptions = (startTime, endTime) => {
    const times = [];
    const start = parseTime(startTime); // Parse start time into minutes
    const end = parseTime(endTime); // Parse end time into minutes

    let currentTime = start + 60; // Start 1 hour after the selected startTime

    while (currentTime <= end) {
      times.push(formatTime(currentTime)); // Format and push time
      currentTime += 60; // Increment by 60 minutes
    }

    return times;
  };

  // Helper function to parse time string (e.g., "1:00 PM") into minutes
  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" "); // Split time and AM/PM
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12; // Convert PM hours to 24-hour format
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0; // Convert midnight to 0 hours
    }

    return hours * 60 + minutes; // Return total minutes
  };

  // Helper function to format time in 12-hour format with AM/PM
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert to 12-hour format
    return `${formattedHours}:${mins.toString().padStart(2, "0")} ${period}`;
  };

  const calculateTotalHours = (startTime, endTime) => {
    const start = parseTime(startTime); // Convert startTime to minutes
    const end = parseTime(endTime); // Convert endTime to minutes

    if (end > start) {
      const diffInMinutes = end - start; // Calculate the difference
      return diffInMinutes / 60; // Convert minutes to hours
    } else {
      return 0; // If the end time is invalid, return 0
    }
  };

  const getOneWeekAfterDate = () => {
    const today = new Date();
    const twoWeekAfter = new Date();
    twoWeekAfter.setDate(today.getDate() + 14);

    const year = twoWeekAfter.getFullYear();
    const month = (twoWeekAfter.getMonth() + 1).toString().padStart(2, "0");
    const day = twoWeekAfter.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styleRequestForm.mainContent}>
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
                      value={formValues.salutation}
                      onChange={(e) =>
                        setFormValues({ ...formValues, salutation: e.target.value })
                      }
                      className="form-select"
                    >
                      <option value=""></option>
                      <option value="Mr">Mr</option>
                      <option value="Ms">Ms</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Last Name</label>
                    <span style={{ color: 'red' }}>*</span>
                    <input
                      type="text"
                      name="lastName"
                      value={formValues.last_name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, last_name: e.target.value })
                      }
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">First Name</label>
                    <span style={{ color: 'red' }}>*</span>
                    <input
                      type="text"
                      name="firstName"
                      value={formValues.first_name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, first_name: e.target.value })
                      }
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
                      value={formValues.middle_name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, middle_name: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Extension Name</label>
                    <input
                      type="text"
                      name="extensionName"
                      value={formValues.extension_name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, extension_name: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Gender</label>
                    <span style={{ color: 'red' }}>*</span>
                    <select
                      name="gender"
                      value={formValues.gender}
                      onChange={(e) =>
                        setFormValues({ ...formValues, gender: e.target.value })
                      }
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
                      value={formValues.contact_number}
                      onChange={(e) =>
                        setFormValues({ ...formValues, contact_number: e.target.value })
                      }
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
                      value={formValues.email_address}
                      onChange={(e) =>
                        setFormValues({ ...formValues, email_address: e.target.value })
                      }
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address</label>
                    <span style={{ color: 'red' }}>*</span>
                    <input
                      type="address"
                      name="address"
                      value={formValues.address}
                      onChange={(e) =>
                        setFormValues({ ...formValues, address: e.target.value })
                      }
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
                      value={formValues.organization_name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, organization_name: e.target.value })
                      }
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
                      value={formValues.department}
                      onChange={(e) =>
                        setFormValues({ ...formValues, department: e.target.value })
                      }
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
                      value={formValues.position}
                      onChange={(e) =>
                        setFormValues({ ...formValues, position: e.target.value })
                      }
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn-secondary"
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
                      {formValues.date_and_time.map((dateInfo, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="date"
                              name="date"
                              value={dateInfo.date}
                              onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                const day = selectedDate.getDay();

                                // Restrict weekends
                                if (day === 0 || day === 6) {
                                  toast.warn("Weekends are not allowed. Please select a weekday.");
                                  e.target.value = ""; // Clear invalid date
                                  return;
                                }

                                // Update the date field in the array
                                handleChange(e, "date_and_time", index);
                              }}
                              className="form-control"
                              required
                              min={getOneWeekAfterDate()} // Restrict date selection to 1 week after today
                            />
                          </td>
                          <td>
                            <select
                              name="start_time"
                              value={dateInfo.start_time}
                              onChange={(e) => handleChange(e, "date_and_time", index)}
                              className="form-control"
                              required
                            >
                              <option value="" disabled>
                                Select Start Time
                              </option>
                              {generateTimeOptions("07:00", "16:00").map((time, idx) => (
                                <option key={idx} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select
                              name="end_time"
                              value={dateInfo.end_time}
                              onChange={(e) => {
                                handleChange(e, "date_and_time", index);

                                // Automatically calculate total hours when end time changes
                                const startTime = new Date(`1970-01-01T${dateInfo.start_time}:00`);
                                const endTime = new Date(`1970-01-01T${e.target.value}:00`);

                                if (endTime > startTime) {
                                  const diffInHours = (endTime - startTime) / (1000 * 60 * 60);
                                  handleChange({
                                    target: {
                                      name: "total_hours",
                                      value: diffInHours.toFixed(2),
                                    },
                                  }, "date_and_time", index);
                                }
                              }}
                              className="form-control"
                              required
                            >
                              <option value="" disabled>
                                Select End Time
                              </option>
                              {generateTimeOptions(dateInfo.start_time, "17:00").map((time, idx) => (
                                <option key={idx} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              name="total_hours"
                              value={dateInfo.total_hours || 0} // Display computed total hours
                              className="form-control"
                              readOnly
                            />
                          </td>
                          <td className="text-center">
                            {formValues.date_and_time.length > 1 && (
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
                      <th>Description</th>
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
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Technical">Technical</option>
                          </select>
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={row.subcategory.module_name}
                            onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                            disabled={!row.category}
                          >
                            <option value="">Select Module</option>
                            {modules
                              .filter((module) => {
                                if (row.category === "Technical") {
                                  return module.difficulty === "Technical";
                                }
                                if (row.category === "Intermediate") {
                                  return module.difficulty === "Intermediate";
                                }
                                if (row.category === "Beginner") {
                                  return module.difficulty === "Beginner";
                                }
                                return true; // Default case if no category is selected
                              })
                              .map((module) => (
                                <option key={module._id} value={module.module_name}>
                                  {module.module_name}
                                </option>
                              ))}

                          </select>
                        </td>
                        <td>
                          <span className="form-select">
                            {row.subcategory.module_description || "Select a module to see the description"} {/* Display description here */}
                          </span>
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
              <div className="p-3" style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
                <h4 className="text-center mb-4" style={{ color: "#ffffff", backgroundColor: "#003366", padding: "10px", borderRadius: "5px" }}>
                  CYBERSECURITY AWARENESS REQUEST FORM
                </h4>

                {/* Personal Information Section */}
                <div style={{ border: "2px solid #003366"}}>
                  <h5 style={{ backgroundColor: "#003366", color: "white", padding: "10px", margin: 0, textAlign: "center" }}>
                    PERSONAL INFORMATION
                  </h5>
                  <div style={{ padding: "10px", backgroundColor: "#f5faff" }}>
                    <p><strong>Last Name:</strong> {formValues.last_name}</p>
                    <p><strong>First Name:</strong> {formValues.first_name}</p>
                    <p><strong>Middle Name:</strong> {formValues.middle_name}</p>
                    <p><strong>Extension Name:</strong> {formValues.extension_name || "N/A"}</p>
                    <p><strong>Gender:</strong> {formValues.gender}</p>
                    <p><strong>Salutation:</strong> {formValues.salutation}</p>
                    <p><strong>Contact No:</strong> {formValues.contact_number}</p>
                    <p><strong>Email:</strong> {formValues.email_address}</p>
                    <p><strong>Address:</strong> {formValues.address}</p>
                  </div>
                </div>

                {/* Organization Information Section */}
                <div style={{ border: "2px solid #003366" }}>
                  <h5 style={{ backgroundColor: "#003366", color: "white", padding: "10px", margin: 0, textAlign: "center" }}>
                    ORGANIZATION INFORMATION
                  </h5>
                  <div style={{ padding: "10px", backgroundColor: "#f5faff" }}>
                    <p><strong>Organization Name:</strong> {formValues.organization_name}</p>
                    <p><strong>Department:</strong> {formValues.department}</p>
                    <p><strong>Position:</strong> {formValues.position}</p>
                  </div>
                </div>

                {/* Preferred Dates Section */}
                <div
                  style={{
                    border: "2px solid #003366",
                  }}
                >
                  <h5
                    style={{
                      backgroundColor: "#003366",
                      color: "white",
                      padding: "10px",
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    PREFERRED DATE AND TIME
                  </h5>
                  <div style={{ padding: "10px", backgroundColor: "#f5faff" }}>
                    {formValues.date_and_time.length > 0 ? (
                      <table className="table table-bordered" style={{ textAlign: "center", backgroundColor: "white" }}>
                        <thead>
                          <tr style={{ backgroundColor: "#003366", color: "white" }}>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Total Hours</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formValues.date_and_time.map((date, index) => (
                            <tr key={index}>
                              <td>{date.date || "Not Set"}</td>
                              <td>{date.start_time || "Not Set"}</td>
                              <td>{date.end_time || "Not Set"}</td>
                              <td>{date.total_hours || 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={{ textAlign: "center" }}>No dates provided.</p>
                    )}
                  </div>
                </div>


                {/* Modules Section */}
                <div style={{ border: "2px solid #003366", marginBottom: "20px"}}>
                  <h5 style={{ backgroundColor: "#003366", color: "white", padding: "10px", margin: 0, textAlign: "center" }}>
                    MODULES
                  </h5>
                  <div style={{ padding: "10px", backgroundColor: "#f5faff" }}>
                    {rows.length > 0 ? (
                      <table className="table table-bordered" style={{ backgroundColor: "white" }}>
                        <thead>
                          <tr style={{ backgroundColor: "#003366", color: "white" }}>
                            <th>Category</th>
                            <th>Module</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, index) => (
                            <tr key={index}>
                              <td>{row.category || "Not Selected"}</td>
                              <td>{row.subcategory?.module_name || "Not Selected"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No modules selected.</p>
                    )}
                  </div>
                </div>


                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid #6c757d",
                      color: "#6c757d",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => setStep(step - 1)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#6c757d";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#6c757d";
                    }}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid #007bff",
                      color: "#007bff",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    disabled={loading}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#007bff";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#007bff";
                    }}
                  >
                    {loading ? "Submitting..." : "Submit"}
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
