import React, { useState, useEffect, useRef } from 'react';
import styleFocalForm from './focalForm.module.css';

export function FocalForm() {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    focal_number: '',
    last_name: '',
    first_name: '',
    middle_name: '',
    email_address: '',
    gender: '',
    status: '',
    salutation: '',
    contact_number: '',
    region: '',
    position: '',
    province: '',
    focal_status: '',
  });
  const formRef = useRef(null);

  useEffect(() => {
    // Generate a unique focal number
    const generateFocalNumber = () => {
      const prefix = 'FN';
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      const date = new Date().getFullYear().toString().slice(-2);
      return `${prefix}-${randomNumber}-${date}`;
    };

    setFormValues((prevValues) => ({
      ...prevValues,
      focal_number: generateFocalNumber(),
    }));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Reset province when region changes
    if (id === "region") {
      setFormValues((prev) => ({
        ...prev,
        province: "", // Clear province selection
      }));
    }
  };

  const handleNext = () => {
    // Validate form fields before proceeding to the next step
    const requiredFields = step === 1 
      ? ['focal_number', 'last_name', 'first_name', 'middle_name', 'email', 'gender', 'status', 'salutation', 'contact_number']
      : ['region', 'position', 'province', 'focal_status'];
    
    for (let field of requiredFields) {
      if (!formValues[field]) {
        alert(`Please fill out the ${field.replace('_', ' ')} field.`);
        return;
      }
    }

    // Validate email format
    if (step === 1) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formValues.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Validate contact number format (example: 11 digits starting with 09)
      const contactNumberPattern = /^09\d{9}$/;
      if (!contactNumberPattern.test(formValues.contact_number)) {
        alert('Please enter a valid contact number.');
        return;
      }
    }

    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleCancel = () => {
    const hasInput = Object.values(formValues).some(value => value !== '');
    if (hasInput) {
      if (window.confirm('Are you sure you want to cancel? All data will be lost.')) {
        // Reset form values and step
        setFormValues({
          focal_number: '',
          last_name: '',
          first_name: '',
          middle_name: '',
          email_address: '',
          gender: '',
          status: '',
          salutation: '',
          contact_number: '',
          region: '',
          position: '',
          province: '',
          focal_status: '',
        });
        setStep(1);
      }
    } else {
      // Reset form values and step without confirmation
      setFormValues({
        focal_number: '',
        last_name: '',
        first_name: '',
        middle_name: '',
        email_address: '',
        gender: '',
        status: '',
        salutation: '',
        contact_number: '',
        region: '',
        position: '',
        province: '',
        focal_status: '',
      });
      setStep(1);
    }
  };
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

  const regionToProvinces = {
    "Region I - Ilocos Region": ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"],
    "Region II - Cagayan Valley": ["Batanes", "Cagayan", "Isabela", "Nueva Vizcaya", "Quirino"],
    "Region III - Central Luzon": ["Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Tarlac", "Zambales"],
    "Region IV-A - CALABARZON": ["Cavite", "Laguna", "Batangas", "Rizal", "Quezon"],
    "MIMAROPA Region": ["Occidental Mindoro", "Oriental Mindoro", "Marinduque", "Romblon", "Palawan"],
    "Region V - Bicol Region": ["Albay", "Camarines Norte", "Camarines Sur", "Catanduanes", "Masbate", "Sorsogon"],
    "Region VI - Western Visayas": ["Aklan", "Antique", "Capiz", "Guimaras", "Iloilo", "Negros Occidental"],
    "Region VII - Central Visayas": ["Bohol", "Cebu", "Negros Oriental", "Siquijor"],
    "Region VIII - Eastern Visayas": ["Biliran", "Eastern Samar", "Leyte", "Northern Samar", "Samar", "Southern Leyte"],
    "Region IX - Zamboanga Peninsula": ["Zamboanga del Norte", "Zamboanga del Sur", "Zamboanga Sibugay", "City of Isabela"],
    "Region X - Northern Mindanao": ["Bukidnon", "Camiguin", "Misamis Occidental", "Misamis Oriental"],
    "Region XI - Davao Region": ["Davao de Oro (Compostela Valley)", "Davao del Norte", "Davao del Sur", "Davao Occidental", "Davao Oriental"],
    "Region XII - SOCCSKSARGEN": ["Cotabato", "Sarangani", "South Cotabato", "Sultan Kudarat"],
    "Region XIII - Caraga": ["Agusan del Norte", "Agusan del Sur", "Dinagat Islands", "Surigao del Norte", "Surigao del Sur"],
    "NCR - National Capital Region": ["Manila", "Quezon City", "Caloocan", "Las Piñas", "Makati", "Malabon", "Mandaluyong", "Marikina", "Muntinlupa", "Navotas", "Parañaque", "Pasay", "Pasig", "San Juan", "Taguig", "Valenzuela"],
    "CAR - Cordillera Administrative Region": ["Abra", "Apayao", "Benguet", "Ifugao", "Kalinga", "Mountain Province"],
    "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao": ["Basilan", "Lanao del Sur", "Maguindanao", "Sulu", "Tawi-Tawi"]
  };

  const filteredProvinces = formValues.region
    ? regionToProvinces[formValues.region]
    : [];

  return (
    <div className={styleFocalForm.container}>
      <div className={styleFocalForm.header}>CYBERSECURITY FOCAL FORM</div>
      <form ref={formRef}>
        {step === 1 && (
          <div>
            <div className={styleFocalForm.sectionHeader}>PERSONAL INFORMATION</div>
            <div className={styleFocalForm.formContainer}>
              <div className={styleFocalForm.formLeft}>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="focal-number">Focal Number:</label>
                  <input type="text" id="focal-number" value={formValues.focal_number} readOnly />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="last_name">Last Name:</label>
                  <input type="text" id="last_name" value={formValues.last_name} onChange={handleChange} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="first_name">First Name:</label>
                  <input type="text" id="first_name" value={formValues.first_name} onChange={handleChange} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="middle_name">Middle Name:</label>
                  <input type="text" id="middle_name" value={formValues.middle_name} onChange={handleChange} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" value={formValues.email} onChange={handleChange} />
                </div>
              </div>
              <div className={styleFocalForm.formRight}>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="gender">Gender:</label>
                  <select id="gender" value={formValues.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="status">Status:</label>
                  <select id="status" value={formValues.status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option>Plantilla</option>
                    <option>Job Order</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="salutation">Salutation:</label>
                  <select id="salutation" value={formValues.salutation} onChange={handleChange}>
                    <option value="">Select Salutation</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Engr.">Engr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>
                <div className={styleFocalForm.formGroupContact}>
                  <label htmlFor="contact_number">Contact Number:</label>
                  <input
                    type="tel"
                    id="contact_number"
                    value={formValues.contact_number}
                    onChange={handleChange}
                    maxLength="11"
                  />
                </div>
              </div>
            </div>

            <div className={styleFocalForm.btnContainer} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className={styleFocalForm.btn_secondary} onClick={handleCancel}>
                <i className="bi bi-x-circle"></i> Cancel
              </button>
              <button type="button" className={styleFocalForm.btn_primary} onClick={handleNext}>
                <i className="bi bi-arrow-right-circle"></i> Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className={styleFocalForm.sectionHeader}>DICT ORGANIZATION INFORMATION</div>
            <div className={styleFocalForm.formGroup}>
              <label htmlFor="region">Region:</label>
              <select id="region" value={formValues.region} onChange={handleChange}>
                <option value="">Select Region</option>
                {Object.keys(regionToProvinces).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div className={styleFocalForm.formGroup}>
              <label htmlFor="position">Position:</label>
              <input type="text" id="position" value={formValues.position} onChange={handleChange} />
            </div>
            <div className={styleFocalForm.formGroupContainer}>
              <div className={styleFocalForm.formGroup}>
                <label htmlFor="province">Province:</label>
                <select id="province" value={formValues.province} onChange={handleChange}>
                  <option value="">Select Province</option>
                  {filteredProvinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styleFocalForm.formGroup}>
                <label htmlFor="focal_status">Focal Status:</label>
                <select id="focal_status" value={formValues.focal_status} onChange={handleChange}>
                  <option value="">Select Focal Status</option>
                  <option>PRIMARY</option>
                  <option>SECONDARY</option>
                  <option>THIRD</option>
                </select>
              </div>
            </div>
            <div className={styleFocalForm.focalStatus}>
              <strong>FOCAL STATUS:</strong><br />
              PRIMARY<br />
              SECONDARY<br />
              THIRD<br />
            </div><br />

            <div className={styleFocalForm.btnContainer} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className={styleFocalForm.btn_secondary} onClick={handlePrevious}>
                <i className="bi bi-arrow-left-circle"></i> Previous
              </button>
              <button type="button" className={styleFocalForm.btn_primary} onClick={handleNext}>
                <i className="bi bi-arrow-right-circle"></i> Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className={styleFocalForm.sectionHeader}>PERSONAL INFORMATIONS</div>
            <div className={styleFocalForm.formContainer}>
              <div className={styleFocalForm.formLeft}>
                <div className={styleFocalForm.formGroup}>
                  <label>Focal Number:</label>
                  <input type="text" value={formValues.focal_number} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label>Lastname:</label>
                  <input type="text" value={formValues.lastname} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label>First Name:</label>
                  <input type="text" value={formValues.firstname} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label>Middlename:</label>
                  <input type="text" value={formValues.middlename} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label>Email:</label>
                  <input type="text" value={formValues.email} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
              </div>
              <div className={styleFocalForm.formRight}>
                <div className={styleFocalForm.formGroup}>
                  <label>Gender:</label>
                  <input type="text" value={formValues.gender} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label>Status:</label>
                  <input type="text" value={formValues.status} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label>Salutation:</label>
                  <input type="text" value={formValues.salutation} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroupContact}>
                  <label>Contact Number:</label>
                  <input type="text" value={formValues.contact_number} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
              </div>
            </div>

            <div className={styleFocalForm.sectionHeader}>DICT ORGANIZATION INFORMATION</div>
            <div className={styleFocalForm.formGroup}>
              <label>Region:</label>
              <input type="text" value={formValues.region} readOnly className={styleFocalForm.readOnlyInput} />
            </div>
            <div className={styleFocalForm.formGroup}>
              <label>Position:</label>
              <input type="text" value={formValues.position} readOnly className={styleFocalForm.readOnlyInput} />
            </div>
            <div className={styleFocalForm.formGroupContainer}>
              <div className={styleFocalForm.formGroup}>
                <label>Province:</label>
                <input type="text" value={formValues.province} readOnly className={styleFocalForm.readOnlyInput} />
              </div>
              <div className={styleFocalForm.formGroup}>
                <label>Focal Status:</label>
                <input type="text" value={formValues.focal_status} readOnly className={styleFocalForm.readOnlyInput} />
              </div>
            </div>

            <div className={styleFocalForm.focalStatus}>
              <strong>FOCAL STATUS:</strong><br />
              PRIMARY<br />
              SECONDARY<br />
              THIRD<br />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="button" className={styleFocalForm.btn_secondary} onClick={handlePrevious}>
                <i className="bi bi-pencil-square"></i> Edit
              </button>
              <button type="submit" className={styleFocalForm.btn_primary}>
                <i className="bi bi-check-circle"></i> Confirm and Save
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

