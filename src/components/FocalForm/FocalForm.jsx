import React, { useState } from 'react';
import styleFocalForm from './focalForm.module.css';
import { toast } from 'react-toastify';
import usePostFocal from '../../utils/Hooks/FocalHooks/usePostFocal';

export function FocalForm() {

  const { data, loading, error, addFocal } = usePostFocal();
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

  const handleNext = () => {
    // Validate form fields before proceeding to the next step
    const requiredFields = step === 1 
      ? ['focal_number', 'last_name', 'first_name', 'middle_name', 'email_address', 'gender', 'status', 'salutation', 'contact_number']
      : ['region', 'position', 'province', 'focal_status'];
    
    for (let field of requiredFields) {
      if (!formValues[field]) {
        alert(`Please fill out the ${field.replace('_', ' ')} field.`);
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

    try {
      // Show loading state
      console.log('Submitting form...');
      const response = await addFocal(formValues);

      // Success notification
      toast.success('Focal Form submitted successfully!');
      console.log('Focal Form submitted successfully:', response);

    } catch (err) {
      // Error notification
      console.error('Error submitting focal form:', err);
      toast.error('An error occurred while submitting the focal form. Please try again.');
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

  const sanitizeInput = (input) => {
    return input.replace(/[^\w\s.-]/g, '').replace(/\s+/g, ' ');
  };

  const sanitizeEmailInput = (input) => {
    // Replace any special characters except for "@" with an empty string
    return input.replace(/[^a-zA-Z0-9@.]/g, '');
  };

  const handleContactNumberChange = (e) => {
    const input = e.target.value;
    // Allow only numbers and ensure the length is exactly 11 digits
    if (/^\d{0,11}$/.test(input)) {
      setFormValues({ ...formValues, contact_number: input });
    }
  };

  return (
    <div className={styleFocalForm.container}>
      <div className={styleFocalForm.header}>CYBERSECURITY FOCAL FORM</div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <div className={styleFocalForm.sectionHeader}>PERSONAL INFORMATION</div>
            <div className={styleFocalForm.formContainer}>
              <div className={styleFocalForm.formLeft}>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="focal-number">Focal Number:</label>
                  <input 
                    type="text" 
                    value={formValues.focal_number} 
                    onChange={(e) =>
                      setFormValues({ ...formValues, focal_number: sanitizeInput(e.target.value) })
                    }
                    required
                  />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="last_name">Last Name:</label>
                  <input 
                    type="text" 
                    value={formValues.last_name} 
                    onChange={(e) =>
                      setFormValues({ ...formValues, last_name: sanitizeInput(e.target.value) })
                    }
                    required
                  />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="first_name">First Name:</label>
                  <input 
                    type="text" 
                    value={formValues.first_name} 
                    onChange={(e) =>
                      setFormValues({ ...formValues, first_name: sanitizeInput(e.target.value) })
                    }
                    required
                  />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="middle_name">Middle Name:</label>
                  <input 
                    type="text" 
                    value={formValues.middle_name} 
                    onChange={(e) =>
                      setFormValues({ ...formValues, middle_name: sanitizeInput(e.target.value) })
                    }
                    required
                  />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="email_address">Email Address:</label>
                  <input 
                    type="email"
                    value={formValues.email_address} 
                    onChange={(e) =>
                      setFormValues({ ...formValues, email_address: sanitizeEmailInput(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>
              <div className={styleFocalForm.formRight}>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="gender">Gender:</label>
                  <select 
                    id="gender" 
                    value={formValues.gender} 
                    onChange={(e) =>
                      setFormValues({ ...formValues, gender: sanitizeInput(e.target.value) })
                    }
                    required
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="status">Status:</label>
                  <select 
                    id="status" 
                    value={formValues.status} 
                    onChange={(e) =>
                      setFormValues({ ...formValues, status: sanitizeInput(e.target.value) })
                    }
                    required
                  >
                    <option value="">Select Status</option>
                    <option>Plantilla</option>
                    <option>Job Order</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="salutation">Salutation:</label>
                  <select 
                    id="salutation" 
                    value={formValues.salutation} 
                    onChange={(e) =>
                      setFormValues({ ...formValues, salutation: sanitizeInput(e.target.value) })
                    }
                    required
                  >
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
                    onChange={handleContactNumberChange}
                    maxLength="11"
                    required
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
              <select 
                id="region" 
                value={formValues.region} 
                onChange={(e) =>
                  setFormValues({ ...formValues, region: sanitizeInput(e.target.value) })
                }
                required
              >
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
              <input 
                type="text" 
                value={formValues.position} 
                onChange={(e) =>
                  setFormValues({ ...formValues, position: sanitizeInput(e.target.value) })
                } 
                required
              />
            </div>
            <div className={styleFocalForm.formGroupContainer}>
              <div className={styleFocalForm.formGroup}>
                <label htmlFor="province">Province:</label>
                <select 
                  value={formValues.province} 
                  onChange={(e) =>
                    setFormValues({ ...formValues, province: sanitizeInput(e.target.value) })
                  }
                  required
                >
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
                <select 
                  value={formValues.focal_status} 
                  onChange={(e) =>
                    setFormValues({ ...formValues, focal_status: sanitizeInput(e.target.value) })
                  }
                  required
                >
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
            <div className={styleFocalForm.sectionHeader}>PERSONAL INFORMATION</div>
            <div className={styleFocalForm.formContainer}>
              <div className={styleFocalForm.formLeft}>
                <div className={styleFocalForm.formGroup}>
                  <label>Focal Number:</label>
                  <input type="text" value={formValues.focal_number} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label>Last Name:</label>
                  <input type="text" value={formValues.last_name} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label>First Name:</label>
                  <input type="text" value={formValues.first_name} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label>Middle Name:</label>
                  <input type="text" value={formValues.middle_name} readOnly className={styleFocalForm.readOnlyInput} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label>Email Address:</label>
                  <input type="text" id='email_address' value={formValues.email_address} readOnly className={styleFocalForm.readOnlyInput} />
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
              <button
                type="submit"
                className={styleFocalForm.btn_primary}
                onClick={handleSubmit}
                disabled={loading} // Disable the button while loading
              >
                <i className="bi bi-check-circle" style={{marginRight: "8px"}}></i> 
                {loading ? 'Submitting...' : 'Confirm and Save'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

