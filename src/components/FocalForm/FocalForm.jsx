import React, { useState, useEffect, useRef } from 'react';
import styleFocalForm from './focalForm.module.css';

export function FocalForm() {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    focal_number: '',
    lastname: '',
    firstname: '',
    middlename: '',
    email: '',
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
    setFormValues({ ...formValues, [id]: value });
  };

  const handleNext = () => {
    // Validate form fields before proceeding to the next step
    const requiredFields = step === 1 
      ? ['focal_number', 'lastname', 'firstname', 'email', 'gender', 'status', 'salutation', 'contact_number']
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
          lastname: '',
          firstname: '',
          middlename: '',
          email: '',
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
        lastname: '',
        firstname: '',
        middlename: '',
        email: '',
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
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // lance make the database na for this, i would like to send formValues to it na.

    // Reset form values
    setFormValues({
      focal_number: '',
      lastname: '',
      firstname: '',
      middlename: '',
      email: '',
      gender: '',
      status: '',
      salutation: '',
      contact_number: '',
      region: '',
      position: '',
      province: '',
      focal_status: '',
    });
    alert('Form saved successfully!'); // Display success message

  };

  return (
    <div className={styleFocalForm.container}>
      <div className={styleFocalForm.header}>CYBERSECURITY FOCAL FORM</div>
      <form ref={formRef} onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <div className={styleFocalForm.sectionHeader}>PERSONAL INFORMATIONS</div>
            <div className={styleFocalForm.formContainer}>
              <div className={styleFocalForm.formLeft}>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="focal-number">Focal Number:</label>
                  <input type="text" id="focal-number" value={formValues.focal_number} readOnly />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="lastname">Lastname:</label>
                  <input type="text" id="lastname" value={formValues.lastname} onChange={handleChange} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="firstname">First Name:</label>
                  <input type="text" id="firstname" value={formValues.firstname} onChange={handleChange} />
                </div>
                <div className={styleFocalForm.formGroup}>
                  <label htmlFor="middlename">Middlename:</label>
                  <input type="text" id="middlename" value={formValues.middlename} onChange={handleChange} />
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
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                    <option>Dr.</option>
                  </select>
                </div>
                <div className={styleFocalForm.formGroupContact}>
                  <label htmlFor="contact_number">Contact Number:</label>
                  <input
                    type="tel"
                    id="contact_number"
                    value={formValues.contact_number}
                    onChange={handleChange}
                    pattern="^09\d{9}$"
                    maxLength="11"
                  />
                </div>
              </div>
            </div>

            <div className={styleFocalForm.btnContainer} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className={styleFocalForm.btn_cancel} onClick={handleCancel}>
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
            <div className={styleFocalForm.sectionHeader}>DICT ORGANIZATION INFORMATIONS</div>
            <div className={styleFocalForm.formGroup}>
              <label htmlFor="region">Region:</label>
              <select id="region" value={formValues.region} onChange={handleChange}>
                <option value="">Select Region</option>
                <option value="Region I">Region I</option>
                <option value="Region II">Region II</option>
                <option value="Region III">Region III</option>
                <option value="Region IV-A">Region IV-A</option>
                <option value="Region IV-B">Region IV-B</option>
                <option value="Region V">Region V</option>
                <option value="Region VI">Region VI</option>
                <option value="Region VII">Region VII</option>
                <option value="Region VIII">Region VIII</option>
                <option value="Region IX">Region IX</option>
                <option value="Region X">Region X</option>
                <option value="Region XI">Region XI</option>
                <option value="Region XII">Region XII</option>
                <option value="NCR">NCR</option>
                <option value="CAR">CAR</option>
                <option value="ARMM">ARMM</option>
                <option value="CARAGA">CARAGA</option>
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
                  <option value="Abra">Abra</option>
                  <option value="Agusan del Norte">Agusan del Norte</option>
                  <option value="Agusan del Sur">Agusan del Sur</option>
                  <option value="Aklan">Aklan</option>
                  <option value="Albay">Albay</option>
                  <option value="Antique">Antique</option>
                  <option value="Apayao">Apayao</option>
                  <option value="Aurora">Aurora</option>
                  <option value="Basilan">Basilan</option>
                  <option value="Bataan">Bataan</option>
                  <option value="Batanes">Batanes</option>
                  <option value="Batangas">Batangas</option>
                  <option value="Benguet">Benguet</option>
                  <option value="Biliran">Biliran</option>
                  <option value="Bohol">Bohol</option>
                  <option value="Bukidnon">Bukidnon</option>
                  <option value="Bulacan">Bulacan</option>
                  <option value="Cagayan">Cagayan</option>
                  <option value="Camarines Norte">Camarines Norte</option>
                  <option value="Camarines Sur">Camarines Sur</option>
                  <option value="Camiguin">Camiguin</option>
                  <option value="Capiz">Capiz</option>
                  <option value="Catanduanes">Catanduanes</option>
                  <option value="Cavite">Cavite</option>
                  <option value="Cebu">Cebu</option>
                  <option value="Compostela Valley">Compostela Valley</option>
                  <option value="Cotabato">Cotabato</option>
                  <option value="Davao del Norte">Davao del Norte</option>
                  <option value="Davao del Sur">Davao del Sur</option>
                  <option value="Davao Occidental">Davao Occidental</option>
                  <option value="Davao Oriental">Davao Oriental</option>
                  <option value="Dinagat Islands">Dinagat Islands</option>
                  <option value="Eastern Samar">Eastern Samar</option>
                  <option value="Guimaras">Guimaras</option>
                  <option value="Ifugao">Ifugao</option>
                  <option value="Ilocos Norte">Ilocos Norte</option>
                  <option value="Ilocos Sur">Ilocos Sur</option>
                  <option value="Iloilo">Iloilo</option>
                  <option value="Isabela">Isabela</option>
                  <option value="Kalinga">Kalinga</option>
                  <option value="La Union">La Union</option>
                  <option value="Laguna">Laguna</option>
                  <option value="Lanao del Norte">Lanao del Norte</option>
                  <option value="Lanao del Sur">Lanao del Sur</option>
                  <option value="Leyte">Leyte</option>
                  <option value="Maguindanao">Maguindanao</option>
                  <option value="Marinduque">Marinduque</option>
                  <option value="Masbate">Masbate</option>
                  <option value="Misamis Occidental">Misamis Occidental</option>
                  <option value="Misamis Oriental">Misamis Oriental</option>
                  <option value="Mountain Province">Mountain Province</option>
                  <option value="Negros Occidental">Negros Occidental</option>
                  <option value="Negros Oriental">Negros Oriental</option>
                  <option value="Northern Samar">Northern Samar</option>
                  <option value="Nueva Ecija">Nueva Ecija</option>
                  <option value="Nueva Vizcaya">Nueva Vizcaya</option>
                  <option value="Occidental Mindoro">Occidental Mindoro</option>
                  <option value="Oriental Mindoro">Oriental Mindoro</option>
                  <option value="Palawan">Palawan</option>
                  <option value="Pampanga">Pampanga</option>
                  <option value="Pangasinan">Pangasinan</option>
                  <option value="Quezon">Quezon</option>
                  <option value="Quirino">Quirino</option>
                  <option value="Rizal">Rizal</option>
                  <option value="Romblon">Romblon</option>
                  <option value="Samar">Samar</option>
                  <option value="Sarangani">Sarangani</option>
                  <option value="Siquijor">Siquijor</option>
                  <option value="Sorsogon">Sorsogon</option>
                  <option value="South Cotabato">South Cotabato</option>
                  <option value="Southern Leyte">Southern Leyte</option>
                  <option value="Sultan Kudarat">Sultan Kudarat</option>
                  <option value="Sulu">Sulu</option>
                  <option value="Surigao del Norte">Surigao del Norte</option>
                  <option value="Surigao del Sur">Surigao del Sur</option>
                  <option value="Tarlac">Tarlac</option>
                  <option value="Tawi-Tawi">Tawi-Tawi</option>
                  <option value="Zambales">Zambales</option>
                  <option value="Zamboanga del Norte">Zamboanga del Norte</option>
                  <option value="Zamboanga del Sur">Zamboanga del Sur</option>
                  <option value="Zamboanga Sibugay">Zamboanga Sibugay</option>
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

            <div className={styleFocalForm.sectionHeader}>DICT ORGANIZATION INFORMATIONS</div>
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

export default FocalForm;