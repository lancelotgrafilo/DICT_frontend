import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styleRequestForm from "./requestForm.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast } from 'react-toastify';
import { Header } from "../../components/Header/Header";
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

import useGetAcceptedRequest from "../../utils/Hooks/RequestHooks/useGetAcceptedRequest";

import usePostRequest from "../../utils/Hooks/RequestHooks/usePostRequest";
import useModules from "../../utils/Hooks/ModulesHooks/useGetModules";

export function RequestForm() {
  const { requests } = useGetAcceptedRequest();

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
    region: '',
    date_and_time: [
      { date: '', start_time: '', end_time: '', total_hours: 0 },
    ],
    modules_selected: [
      { module_name: '', module_description: '', difficulty: '' },
    ],
    pdfFile: '',
  });


  const handleDownload = () => {
    const element = document.getElementById('step-5-content'); // The content to convert
  
    // Options for capturing all content in one page
    const options = {
      margin: 5, // Minimal margin
      filename: `Cybersecurity Awareness Request Form ${formValues.region}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 3, // Scale down content to fit
        scrollY: 0, // Ensure no scrolling issues
        windowWidth: 800 // Match the max-width of the content
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', // Use A4 format
        orientation: 'portrait',
        compress: true // Compress the PDF for smaller file size
      }
    };
  
    // Generate the PDF
    html2pdf().set(options).from(element).save();
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Step 1: Generate the PDF as a Blob
    const element = document.getElementById('step-5-content'); // The content to convert
    const pdfOptions = {
      margin: 5,
      filename: `Cybersecurity Awareness Request Form ${formValues.region}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, scrollY: 0, windowWidth: 800 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
    };
  
    try {
      // Generate the PDF and get it as a Blob
      const pdfBlob = await new Promise((resolve, reject) => {
        html2pdf()
          .set(pdfOptions)
          .from(element)
          .outputPdf('blob') // Get the PDF as a Blob
          .then(resolve)
          .catch(reject);
      });
  
      if (!pdfBlob) {
        throw new Error("Failed to generate PDF");
      }
  
      // Step 2: Create FormData and include all formValues
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Convert arrays (e.g., date_and_time, modules_selected) to JSON strings
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === 'object' && value !== null) {
          // Handle objects (if any) by converting them to JSON strings
          formData.append(key, JSON.stringify(value));
        } else {
          // Append other fields as-is
          formData.append(key, value);
        }
      });
  
      // Step 3: Append the generated PDF file to FormData
      formData.append('pdfFile', pdfBlob, pdfOptions.filename);
  
      // Log FormData contents for debugging
      console.log('FormData Contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      // Step 4: Send the FormData to the backend
      const response = await addRequest(formData); // Assuming addRequest accepts FormData
      console.log('Request submitted successfully:', response);
      toast.success('Request submitted successfully!');
      navigate('/home');
    } catch (err) {
      console.error('Error submitting request:', err);
      toast.error('Failed to submit request. Please try again.');
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
      // Scroll to the first invalid field
      const firstInvalidField = document.querySelector(".form-control:invalid");
      if (firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstInvalidField.focus();
      }
    }
  };
  
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formValues.salutation && formValues.first_name && formValues.last_name && formValues.middle_name && formValues.gender && formValues.position && formValues.contact_number && formValues.email_address && formValues.address;
      case 2:
        return formValues.organization_name && formValues.department && formValues.region;
      case 3:
        return formValues.date_and_time.every((dateInfo) => dateInfo.date && dateInfo.start_time && dateInfo.end_time);
      case 4:
        return rows.every((row) => row.category && row.subcategory.module_name && row.subcategory.module_description && row.subcategory.difficulty);
      case 5:
        return true;
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

  const sanitizeInput = (input) => {
    return input.replace(/[^\w\s.-]/g, '').replace(/\s+/g, ' ');
};

  const sanitizeInputAddress = (input) => {
    // Allow only alphanumeric characters, spaces, and commas
    return input.replace(/[^a-zA-Z0-9\s.,]/g, '');
  };

  const handleContactNumberChange = (e) => {
    const input = e.target.value;
    // Allow only numbers and ensure the length is exactly 11 digits
    if (/^\d{0,11}$/.test(input)) {
      setFormValues({ ...formValues, contact_number: input });
    }
  };
  
  const sanitizeEmailInput = (input) => {
    // Replace any special characters except for "@" with an empty string
    return input.replace(/[^a-zA-Z0-9@.]/g, '');
  };
  const validateEmail = (email) => {
    // Simple regex for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styleRequestForm.mainContent} style={{borderColor:"black"}}>
      <Header />
      <div className="container my-5" style={{ borderRadius: "12px", marginBottom: "24px",}}>
        <div className="card shadow p-4" style={{ borderRadius: "12px", marginTop: "-24px" }}>
          <h2 style={{backgroundColor: "#003366", textAlign: "center", color: 'white', padding:" 20px 0", borderRadius: "5px" }} className="text-center mb-4">CYBERSECURITY AWARENESS REQUEST FORM</h2>
          <form onSubmit={handleSubmit}>
          
            {step === 1 && (
              <div >
                <h4 className="mb-3">Personal Information</h4>
                <div className="row g-3">
                  {/* Personal Info Fields */}
                  <div className="col-md-4">
                    <label className="form-label">Salutation</label>
                    <span style={{ color: 'red' }}>*</span>
                    <select
                      name="salutation"
                      value={formValues.salutation}
                      onChange={(e) =>
                        setFormValues({ ...formValues, salutation: sanitizeInput(e.target.value) })
                      }
                      className="form-select"
                      required
                    >
                      <option value=""></option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Engr.">Engr.</option>
                      <option value="Prof.">Prof.</option>
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
                        setFormValues({ ...formValues, last_name: sanitizeInput(e.target.value) })
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
                        setFormValues({ ...formValues, first_name: sanitizeInput(e.target.value) })
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
                        setFormValues({ ...formValues, middle_name: sanitizeInput(e.target.value) })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Extension Name</label>
                    <select
                      name="extension_name"
                      value={formValues.extension_name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, extension_name: sanitizeInput(e.target.value) })
                      }
                      className="form-select"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Sr.">Sr.</option>
                      <option value="Jr.">Jr.</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="">N/A</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Gender</label>
                    <span style={{ color: 'red' }}>*</span>
                    <select
                      name="gender"
                      value={formValues.gender}
                      onChange={(e) =>
                        setFormValues({ ...formValues, gender: sanitizeInput(e.target.value) })
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
                    <label className="form-label">Position</label>
                    <span style={{ color: 'red' }}>*</span>
                    <input
                      type="text"
                      name="position"
                      value={formValues.position}
                      onChange={(e) =>
                        setFormValues({ ...formValues, position: sanitizeInput(e.target.value) })
                      }
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact No.</label>
                    <span style={{ color: 'red' }}>*</span>
                    <input
                      type="tel"
                      name="contactNo"
                      value={formValues.contact_number}
                      onChange={handleContactNumberChange}
                      className="form-control"
                      required
                      maxLength="11" // Restricts input to 11 characters in the UI
                      
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <span style={{ color: 'red' }}>*</span>
                    <input
                      type="email"
                      name="email"
                      value={formValues.email_address}
                      onChange={(e) => {
                        const sanitizedValue = sanitizeEmailInput(e.target.value);
                        
                        setFormValues({ ...formValues, email_address: sanitizedValue });
                      }}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address</label>
                    <span style={{ color: 'red' }}>*</span>
                    <input
                      type="text"
                      name="address"
                      value={formValues.address}
                      onChange={(e) =>
                        setFormValues({ ...formValues, address: sanitizeInputAddress(e.target.value) })
                      }
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className={styleRequestForm.btn_cancel}
                    onClick={() => navigate("/home")}
                  >
                    <i className="bi bi-x-circle"></i> Cancel
                  </button>
                  <button
                    type="button"
                    className={styleRequestForm.btn_primary}
                    onClick={() => {
                      const sanitizedEmail = sanitizeEmailInput(formValues.email_address);

                      // Validate the email format
                      if (!validateEmail(sanitizedEmail)) {
                        toast.warn("Please input a valid email");
                        return; // Prevent proceeding if the email is invalid
                      }

                      // Proceed with the next action
                      handleNext();
                    }}
                  >
                    <i className="bi bi-arrow-right-circle"></i> Next
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
                        setFormValues({ ...formValues, organization_name: sanitizeInput(e.target.value) })
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
                        setFormValues({ ...formValues, department: sanitizeInput(e.target.value) })
                      }
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6 region-dropdown-container">
                    <label className="form-label">Region</label>
                    <span style={{ color: "red" }}>*</span>
                    <select
                      name="region"
                      value={formValues.region}
                      onChange={(e) => setFormValues({ ...formValues, region: e.target.value })
                      }
                      className="form-control"
                      required
                    >
                      <option value="">Select a Region</option>
                      <option value="Region I - Ilocos Region">Region I - Ilocos Region</option>
                      <option value="Region II - Cagayan Valley">Region II - Cagayan Valley</option>
                      <option value="Region III - Central Luzon">Region III - Central Luzon</option>
                      <option value="Region IV-A - CALABARZON">Region IV-A - CALABARZON</option>
                      <option value="MIMAROPA Region">MIMAROPA Region</option>
                      <option value="Region V - Bicol Region">Region V - Bicol Region</option>
                      <option value="Region VI - Western Visayas">Region VI - Western Visayas</option>
                      <option value="Region VII - Central Visayas">Region VII - Central Visayas</option>
                      <option value="Region VIII - Eastern Visayas">Region VIII - Eastern Visayas</option>
                      <option value="Region IX - Zamboanga Peninsula">Region IX - Zamboanga Peninsula</option>
                      <option value="Region X - Northern Mindanao">Region X - Northern Mindanao</option>
                      <option value="Region XI - Davao Region">Region XI - Davao Region</option>
                      <option value="Region XII - SOCCSKSARGEN">Region XII - SOCCSKSARGEN</option>
                      <option value="Region XIII - Caraga">Region XIII - Caraga</option>
                      <option value="NCR - National Capital Region">NCR - National Capital Region</option>
                      <option value="CAR - Cordillera Administrative Region">CAR - Cordillera Administrative Region</option>
                      <option value="BARMM - Bangsamoro Autonomous Region in Muslim Mindanao">BARMM - Bangsamoro Autonomous Region in Muslim Mindanao</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className={styleRequestForm.btn_secondary}
                    onClick={handlePrevious}
                  >
                    <i className="bi bi-arrow-left-circle"></i> Previous
                  </button>
                  <button
                    type="button"
                    className={styleRequestForm.btn_primary}
                    onClick={handleNext}
                  >
                    <i className="bi bi-arrow-right-circle"></i> Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h4 className="mb-3">Preferred Date and Time</h4>
                <div>
                  <table className="table">
                    <thead className="table-light">
                     
                        <th scope="col">Preferred Date</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Total Hours</th>
                     
                    </thead>
                    <tbody>
                      {formValues.date_and_time.map((dateInfo, index) => (
                        <tr key={index} style={{borderColor:"white"}}>
                          <td>
                            <input
                              type="date"
                              name="date"
                              value={dateInfo.date}
                              onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                const day = selectedDate.getDay();

                                // Restrict weekends
                                if (day === 0 || day === 7) {
                                  toast.warn("Sunday is not Available.");
                                  e.target.value = ""; // Clear invalid date
                                  return;
                                }

                                // Update the date field in the array
                                handleChange(e, "date_and_time", index);
                              }}
                              className="form-control"
                              required
                              min={getOneWeekAfterDate()} 
                              
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
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className={styleRequestForm.btn_secondary}
                    onClick={handlePrevious}
                  >
                    <i className="bi bi-arrow-left-circle"></i> Previous
                  </button>
                  <button
                    type="button"
                    className={styleRequestForm.btn_add}
                    onClick={addPreferredDate}
                  >
                    <i className="bi bi-plus-circle me-2"></i> Add Preferred Date and Time
                  </button>
                  <button
                    type="button"
                    className={styleRequestForm.btn_primary}
                    onClick={handleNext}
                  >
                    <i className="bi bi-arrow-right-circle"></i> Next
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
                      <th style={{ textAlign: "center" }}>Category</th>
                      <th style={{ textAlign: "center" }}>Subcategory (Module)</th>
                      <th style={{ textAlign: "center" }}>Description</th>
                      <th style={{ textAlign: "center" }}>Action</th>
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
                          {row.subcategory.module_description || "Select a module to see the description"} {/* Display description here */}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeRow(index)}
                            style={{ display: "block", margin: "0 auto" }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className={styleRequestForm.btn_secondary}
                    onClick={handlePrevious}
                  >
                    <i className="bi bi-arrow-left-circle"></i> Previous
                  </button>
                  <button
                    type="button"
                    className={styleRequestForm.btn_add}
                    onClick={addRow}
                  >
                    <i className="bi bi-plus-circle me-2"></i> Add Another Row
                  </button>
                  <button
                    type="button"
                    className={styleRequestForm.btn_primary}
                    onClick={handleNext}
                  >
                    <i className="bi bi-arrow-right-circle"></i> Next
                  </button>
                </div>
              </div>
            )}


            {step === 5 && (
              <>
              <div className="p-3" id="step-5-content" style={{ maxWidth: "100%", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
                {/* Personal Information Section */}
                <div style={{ border: "2px solid white", borderColor:"lightgrey", marginBottom: "7px", borderRadius: "8px", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
                  <h5 style={{ backgroundColor: "#003366", color: "white", padding: "10px", margin: 0, textAlign: "center" }}>
                    PERSONAL INFORMATION
                  </h5>
                  <div style={{ padding: "8px", backgroundColor: "white" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "8px" }}>
                      <div>
                        <label><strong>Salutation<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px", textAlign: "left", verticalAlign: "top", display: "flex", alignItems: "flex-start" }}>{formValues.salutation}</p>
                      </div>
                      <div>
                        <label><strong>Last Name<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px", textAlign: "left", verticalAlign: "top", display: "flex", alignItems: "flex-start" }}>{formValues.last_name}</p>
                      </div>
                      <div>
                        <label><strong>First Name<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px", textAlign: "left", verticalAlign: "top", display: "flex", alignItems: "flex-start" }}>{formValues.first_name}</p>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "8px" }}>
                      <div>
                        <label><strong>Middle Name<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px", textAlign: "left", verticalAlign: "top", display: "flex", alignItems: "flex-start" }}>{formValues.middle_name}</p>
                      </div>
                      <div>
                        <label><strong>Extension Name:<span style={{ color: "red" }}>*</span></strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px", textAlign: "left", verticalAlign: "top", display: "flex", alignItems: "flex-start" }}>{formValues.extension_name || "N/A"}</p>
                      </div>
                      <div>
                        <label><strong>Gender<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px", textAlign: "left", verticalAlign: "top", display: "flex", alignItems: "flex-start" }}>{formValues.gender}</p>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "8px" }}>
                      <div>
                        <label><strong>Position<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px", textAlign: "left", verticalAlign: "top", display: "flex", alignItems: "flex-start" }}>{formValues.position}</p>
                      </div>
                      <div>
                        <label><strong>Contact No.<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px", textAlign: "left", verticalAlign: "top", display: "flex", alignItems: "flex-start" }}>{formValues.contact_number}</p>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "8px" }}>
                      <div>
                        <label><strong>Email Address<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px", textAlign: "left", verticalAlign: "top", display: "flex", alignItems: "flex-start" }}>{formValues.email_address}</p>
                      </div>
                      <div>
                        <label><strong>Address<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px", textAlign: "left", verticalAlign: "top", display: "flex", alignItems: "flex-start" }}>{formValues.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Organization Information Section */}
                <div style={{ border: "2px solid white", borderColor:"lightgrey", marginBottom: "7px", borderRadius: "8px", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
                  <h5 style={{ backgroundColor: "#003366", color: "white", padding: "8px", margin: 0, textAlign: "center" }}>
                    ORGANIZATION INFORMATION
                  </h5>
                  <div style={{ padding: "8px", backgroundColor: "white" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", marginBottom: "8px" }}>
                      <div>
                        <label><strong>Organization Name<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px" }}>{formValues.organization_name}</p>
                      </div>
                      <div>
                        <label><strong>Department<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px" }}>{formValues.department}</p>
                      </div>
                    </div>
                    <div>
                        <label><strong>Region<span style={{ color: "red" }}>*</span>:</strong></label>
                        <p style={{margin: "3px 0",padding: "4px",backgroundColor: "#eaf4ff", border: "1px solid black",borderRadius: "5px",width: "calc(50% - 7.5px)",}}>{formValues.region}</p>
                      </div>
                  </div>
                </div>

                {/* Preferred Dates Section */}
                <div style={{ border: "2px solid white", borderColor:"lightgrey", marginBottom: "7px", borderRadius: "8px", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
                  <h5 style={{ backgroundColor: "#003366", color: "white", padding: "10px", margin: 0, textAlign: "center" }}>
                    PREFERRED DATE AND TIME OF THE EVENT
                  </h5>
                  <div style={{ padding: "8px", backgroundColor: "white" }}>
                    {formValues.date_and_time.length > 0 ? (
                      formValues.date_and_time.map((date, index) => (
                        <div key={index} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "8px" }}>
                          <div>
                            <label><strong>Date:</strong></label>
                            <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px" }}>{date.date || "Not Set"}</p>
                          </div>
                          <div>
                            <label><strong>Start Time:</strong></label>
                            <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px" }}>{date.start_time || "Not Set"}</p>
                          </div>
                          <div>
                            <label><strong>End Time:</strong></label>
                            <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px" }}>{date.end_time || "Not Set"}</p>
                          </div>
                          <div>
                            <label><strong>Total Hours:</strong></label>
                            <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px" }}>{date.total_hours || 0}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ textAlign: "center" }}>No dates provided.</p>
                    )}
                  </div>
                </div>

                {/* Modules Section */}
                <div style={{ border: "2px solid white", borderColor:"lightgrey", marginBottom: "7px", borderRadius: "8px", overflow: "hidden", fontFamily: "Arial,sans-serif" }}>
                  <h5 style={{ backgroundColor: "#003366", color: "white", padding: "10px", margin: 0, textAlign: "center" }}>
                    SELECTED MODULES
                  </h5>
                  <div style={{ padding: "8px", backgroundColor: "white" }}>
                    {rows.length > 0 ? (
                      rows.map((row, index) => (
                        <div key={index} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "8px" }}>
                          <div>
                            <label><strong>Category:</strong></label>
                            <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px" }}>{row.category || "Not Selected"}</p>
                          </div>
                          <div>
                            <label><strong>Module:</strong></label>
                            <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px" }}>{row.subcategory?.module_name || "Not Selected"}</p>
                          </div>
                          <div>
                            <label><strong>Description:</strong></label>
                            <p style={{ margin: "3px 0", padding: "4px", backgroundColor: "#eaf4ff", border: "1px solid black", borderRadius: "5px" }}>{row.subcategory?.module_description || "Not Selected"}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No modules selected.</p>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                

              </div>

              <div className="d-flex justify-content-between" style={{marginTop: "8px"}}>
                  <button
                    type="button"
                    style={{
                      marginTop:"0 auto",
                      backgroundColor: " transparent",
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
                    <i className="bi bi-arrow-left-circle"></i> Previous
                  </button>
                  <button
                    type="button"
                    className={styleRequestForm.btn_primary}
                    onClick={handleDownload}
                  >
                    <i className="bi bi-download"></i> Download
                  </button>
                  <button
                    type="submit"
                    className={styleRequestForm.btn_submit}
                  >
                    <i className="bi bi-check-circle"></i> {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};
