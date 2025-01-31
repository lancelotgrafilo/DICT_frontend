import styleSettings from './settings.module.css';

export function Settings() {
  return (
    <div className={styleSettings.mainContent}>
      <h2>Personal Information</h2>
      <form className={styleSettings.configForm}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" />
        </div>
        <div>
          <label htmlFor="middleName">Middle Name</label>
          <input type="text" id="middleName" name="middleName" placeholder="Enter your middle name" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" />
        </div>
        <div>
          <label htmlFor="region">Region</label>
          <input type="text" id="region" name="region" placeholder="Enter your region" />
        </div>
        <div>
          <button type="submit">Save Personal Information</button>
        </div>
      </form>

      <h2>Change Password</h2>
      <form className={styleSettings.passwordForm}>
        <div>
          <label htmlFor="oldPassword">Old Password</label>
          <input type="password" id="oldPassword" name="oldPassword" placeholder="Enter your old password" />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input type="password" id="newPassword" name="newPassword" placeholder="Enter your new password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your new password" />
        </div>
        <div>
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
}
