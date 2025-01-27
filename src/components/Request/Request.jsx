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
    categories: [],
  });

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

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, categories: rows }));
    console.log("Form Data Submitted:", formData);
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
                  <div className="col-md-4">
                    <label className="form-label">Salutation</label>
                    <select
                      name="salutation"
                      value={formData.personalInfo.salutation}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, salutation: e.target.value },
                        }))
                      }
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, firstName: e.target.value },
                        }))
                      }
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
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, lastName: e.target.value },
                        }))
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
                <h4 className="mb-3">Module Categories and Subcategories</h4>
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

            {step === 3 && (
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
}
