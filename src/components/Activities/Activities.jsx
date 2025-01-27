import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styleActivities from './activities.module.css';

export function Activities () {
  const years = [2025, 2026, 2027, 2028, 2029];

  const [formData, setFormData] = useState({
    year: '',
    month: '',
    date: '',
    activity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Activity Saved: \nYear: ${formData.year}\nMonth: ${formData.month}\nDate: ${formData.date}\nActivity: ${formData.activity}`);
    setFormData({ year: '', month: '', date: '', activity: '' });
  };

  return (
    <div className={styleActivities.mainContent}>
      <div className="container mt-5">
        <h1 className="text-center mb-4" style={{ color: '#00796b' }}>Activity Planner</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="year" className="form-label">Select Year</label>
            <select
              id="year"
              name="year"
              className="form-select"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">Choose Year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">Select Date</label>
            <div className="input-group">
              <input
                type="text"
                id="date"
                name="date"
                className="form-control"
                placeholder="Select a date"
                value={formData.date}
                onChange={handleChange}
                readOnly
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  const dateInput = document.createElement('input');
                  dateInput.type = 'date';
                  dateInput.onchange = (e) => {
                    setFormData({ ...formData, date: e.target.value });
                    document.body.removeChild(dateInput);
                  };
                  dateInput.style.position = 'absolute';
                  dateInput.style.opacity = 0;
                  document.body.appendChild(dateInput);
                  dateInput.click();
                }}
              >
                Open Calendar
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="activity" className="form-label">Activity</label>
            <textarea
              id="activity"
              name="activity"
              className="form-control"
              placeholder="Describe your activity"
              value={formData.activity}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button type="submit" className="btn" style={{ backgroundColor: '#00796b', color: 'white' }}>Save Activity</button>
        </form>
      </div>
    </div>
    
  );
};

