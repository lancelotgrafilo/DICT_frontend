import styleSettings from "./settings.module.css";

export function Settings() {
  const regions = [
    "Ilocos Region (Region I)",
    "Cagayan Valley (Region II)",
    "Central Luzon (Region III)",
    "CALABARZON (Region IV-A)",
    "MIMAROPA (Region IV-B)",
    "Bicol Region (Region V)",
    "Western Visayas (Region VI)",
    "Central Visayas (Region VII)",
    "Eastern Visayas (Region VIII)",
    "Zamboanga Peninsula (Region IX)",
    "Northern Mindanao (Region X)",
    "Davao Region (Region XI)",
    "SOCCSKSARGEN (Region XII)",
    "Caraga (Region XIII)",
    "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
    "Cordillera Administrative Region (CAR)",
    "National Capital Region (NCR)"
  ];

  return (
    <div className={styleSettings.mainContainer}>
      <div className={styleSettings.card}>
        <h2>Personal Information</h2>
        <form className={styleSettings.configForm}>
          <div className={styleSettings.row}>
            <div className={styleSettings.inputGroup}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" />
            </div>
            <div className={styleSettings.inputGroup}>
              <label htmlFor="middleName">Middle Name</label>
              <input type="text" id="middleName" name="middleName" placeholder="Enter your middle name" />
            </div>
          </div>

          <div className={styleSettings.row}>
            <div className={styleSettings.inputGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" />
            </div>
            <div className={styleSettings.inputGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" />
            </div>
          </div>

          <div className={styleSettings.inputGroup}>
            <label htmlFor="region">Region</label>
            <select id="region" name="region">
              <option value="" disabled selected>
                Select your region
              </option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className={styleSettings.buttonGroup}>
            <button type="submit" className={styleSettings.btnPrimary}>
              Save Personal Information
            </button>
          </div>
        </form>

        <hr className={styleSettings.verticalLine}></hr>

        <h2>Change Password</h2>
        <form className={styleSettings.passwordForm}>
          <div className={styleSettings.inputGroup}>
            <label htmlFor="oldPassword">Old Password</label>
            <input type="password" id="oldPassword" name="oldPassword" placeholder="Enter your old password" />
          </div>

          <div className={styleSettings.row}>
            <div className={styleSettings.inputGroup}>
              <label htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" name="newPassword" placeholder="Enter your new password" />
            </div>
            <div className={styleSettings.inputGroup}>
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your new password" />
            </div>
          </div>

          <div className={styleSettings.buttonGroup}>
            <button type="submit" className={styleSettings.btnSubmit}>Update</button>
            <button type="button" className={styleSettings.btnCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
