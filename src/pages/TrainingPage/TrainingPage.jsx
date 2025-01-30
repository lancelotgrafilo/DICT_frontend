import styleTraining from "./trainingPage.module.css";
// to apply css design in react use this format:
// for className: ex:
// <div className={styleTraining.<style_name>}>
// </div>
// css: .style_name

// for id: ex:
// <div id={styleTraining.style_name}>
// </div>
// css: #style_name

// link: http://localhost:5173/training

export function TrainingPage() {
  return (
    <div className="p-3" style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h4 className="text-center mb-4" style={{ color: "#ffffff", backgroundColor: "#003366", padding: "10px", borderRadius: "5px" }}>
        CYBERSECURITY AWARENESS REQUEST FORM
      </h4>

      {/* Personal Information Section */}
      <div style={{ border: "2px solid #003366" }}>
        <h5 style={{ backgroundColor: "#003366", color: "white", padding: "10px", margin: 0, textAlign: "center" }}>
          PERSONAL INFORMATION
        </h5>
        <div style={{ padding: "10px", backgroundColor: "#f5faff" }}>
          <p><strong>Last Name:</strong> Grafilo</p>
          <p><strong>First Name:</strong> Lancelot</p>
          <p><strong>Middle Name:</strong> Dela Cruz</p>
          <p><strong>Extension Name:</strong> N/A</p>
          <p><strong>Gender:</strong> Male</p>
          <p><strong>Salutation:</strong> Mr</p>
          <p><strong>Contact No:</strong> 09213456788</p>
          <p><strong>Email:</strong> lance@gmail.com</p>
          <p><strong>Address:</strong> Quezon, Uson, Masbate</p>
        </div>
      </div>

      {/* Organization Information Section */}
      <div style={{ border: "2px solid #003366" }}>
        <h5 style={{ backgroundColor: "#003366", color: "white", padding: "10px", margin: 0, textAlign: "center" }}>
          ORGANIZATION INFORMATION
        </h5>
        <div style={{ padding: "10px", backgroundColor: "#f5faff" }}>
          <p><strong>Organization Name:</strong> DEBESMSCAT</p>
          <p><strong>Department:</strong> CAS</p>
          <p><strong>Position:</strong> Student</p>
        </div>
      </div>

      {/* Preferred Dates Section */}
      <div style={{ border: "2px solid #003366" }}>
        <h5 style={{ backgroundColor: "#003366", color: "white", padding: "10px", margin: 0, textAlign: "center" }}>
          PREFERRED DATE AND TIME
        </h5>
        <div style={{ padding: "10px", backgroundColor: "#f5faff" }}>
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
              <tr>
                <td>2025-02-13</td>
                <td>8:00 AM</td>
                <td>5:00 PM</td>
                <td>8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modules Section */}
      <div style={{ border: "2px solid #003366", marginBottom: "20px" }}>
        <h5 style={{ backgroundColor: "#003366", color: "white", padding: "10px", margin: 0, textAlign: "center" }}>
          MODULES
        </h5>
        <div style={{ padding: "10px", backgroundColor: "#f5faff" }}>
          <table className="table table-bordered" style={{ backgroundColor: "white" }}>
            <thead>
              <tr style={{ backgroundColor: "#003366", color: "white" }}>
                <th>Category</th>
                <th>Module</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Beginner</td>
                <td>Introduction to Cybersecurity 101</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aut tenetur.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
