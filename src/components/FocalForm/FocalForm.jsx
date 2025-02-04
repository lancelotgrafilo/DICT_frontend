import React from 'react';
import styleFocalForm from './focalForm.module.css';

export function FocalForm (){
    return (
        <div className={styleFocalForm.container}>
            <div className={styleFocalForm.header}>CYBERSECURITY FOCAL FORM</div>

            <div className={styleFocalForm.sectionHeader}>PERSONAL INFORMATION</div>
            <form>
                <div className={styleFocalForm.formContainer}>
                    <div className={styleFocalForm.formLeft}>
                        <div className={styleFocalForm.formGroup}>
                            <label htmlFor="focal-number">Focal Number:</label>
                            <input type="text" id="focal-number" value="FN-0001-25" readOnly />
                        </div>
                        <div className={styleFocalForm.formGroup}>
                            <label htmlFor="lastname">Lastname:</label>
                            <input type="text" id="lastname" />
                        </div>
                        <div className={styleFocalForm.formGroup}>
                            <label htmlFor="firstname">First Name:</label>
                            <input type="text" id="firstname" />
                        </div>
                        <div className={styleFocalForm.formGroup}>
                            <label htmlFor="middlename">Middlename:</label>
                            <input type="text" id="middlename" />
                        </div>
                        <div className={styleFocalForm.formGroup}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" />
                        </div>
                    </div>
                    <div className={styleFocalForm.formRight}>
                        <div className={styleFocalForm.formGroup}>
                            <label htmlFor="gender">Gender:</label>
                            <select id="gender">
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className={styleFocalForm.formGroup}>
                            <label htmlFor="status">Status:</label>
                            <select id="status">
                                <option value="">Select Status</option>
                                <option>Plantilla</option>
                                <option>Job Order</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className={styleFocalForm.formGroup}>
                            <label htmlFor="salutation">Salutation:</label>
                            <select id="salutation">
                                <option value="">Select Salutation</option>
                                <option>Mr.</option>
                                <option>Ms.</option>
                                <option>Mrs.</option>
                                <option>Dr.</option>
                            </select>
                        </div>
                        <div className={styleFocalForm.formGroupContact}>
                            <label htmlFor="contact-number">Contact Number:</label>
                            <input type="tel" id="contact-number" />
                        </div>
                    </div>
                </div>

                <div className={styleFocalForm.sectionHeader}>DICT ORGANIZATION INFORMATION</div>
                <div className={styleFocalForm.formGroup}>
                    <label htmlFor="region">Region:</label>
                    <input type="text" id="region" />
                </div>
                <div className={styleFocalForm.formGroup}>
                    <label htmlFor="position">Position:</label>
                    <input type="text" id="position" />
                </div>
                <div className={styleFocalForm.formGroupContainer}>
                    <div className={styleFocalForm.formGroup}>
                        <label htmlFor="province">Province:</label>
                        <input type="text" id="province" />
                    </div>
                    <div className={styleFocalForm.formGroup}>
                        <label htmlFor="focal-status">Focal Status:</label>
                        <select id="focal-status">
                            <option value="">Select Focal Status</option>
                            <option>PRIMARY</option>
                            <option>SECONDARY</option>
                            <option>THIRD</option>
                        </select>
                    </div>
                </div>

                <div className={styleFocalForm.buttons}>
                    <button type="button">ADD</button>
                    <button type="button">EDIT</button>
                    <button type="button">DELETE</button>
                    <button type="button">UPDATE</button>
                    <button type="button">NEXT</button>
                    <button type="button">PREV</button>
                </div>

                <div className={styleFocalForm.focalStatus}>
                    <strong>FOCAL STATUS:</strong><br />
                    PRIMARY<br />
                    SECONDARY<br />
                    THIRD
                </div>

                <button type="submit" className={styleFocalForm.submitBtn}>SAVE</button>
            </form>
        </div>
    );
};
