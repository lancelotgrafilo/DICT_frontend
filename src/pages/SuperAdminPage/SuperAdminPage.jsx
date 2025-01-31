import styleSuperAdmin from "./superAdmin.module.css";
import dict_logo from "../../assets/logo/dict-logo.png";
import { Outlet, Link } from 'react-router-dom';
import { ActiveButtonContext } from '../../utils/context/ActiveButtonContext';
import { usePath } from '../../utils/context/PathContext';
import { useState, useContext, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import { Header } from '../../components/Header/Header';

export function SuperAdminPage() {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const { updatePath } = usePath();

  const sidebarMenuRefs = useRef([]);
  
  const { activeButton, updateActiveButton } = useContext(ActiveButtonContext);

  const handleHover = (isHovered) => {
    const sidebar = document.querySelector(`.${styleSuperAdmin.sidebar}`);
    if (sidebar) {
      sidebar.style.zIndex = isHovered ? '9999' : 'initial';
    }
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleMenuItemClick = (btnId) => {
    updateActiveButton(btnId);
    updatePath(null, null); // Set both paths to null
  };

  return (
    <div className={styleSuperAdmin.dashboardContainer}>
      <div className={styleSuperAdmin.sidebar}>
        <div className={styleSuperAdmin.logoContainer}>
          <div className={styleSuperAdmin.logo}>
            <img src={dict_logo} alt="" />
          </div>
          <div className={styleSuperAdmin.usernameContainer}>
            <h2>Freddie Alicante</h2>
            <p>Region V: Bicol</p>
            <p>Super Admin</p>
          </div>
        </div>

        <div className={styleSuperAdmin.manageTxt}>
          <p>MANAGE</p>
        </div>

        <ul className={styleSuperAdmin.sidebarMenu}>
          {[ 
            { to: "dashboard", label: "Dashboard", icon: "ri-pie-chart-2-fill", btnId: "dashboard" },
            { to: "request", label: "Requests", icon: "ri-edit-box-fill", btnId: "request" },
            { to: "activities", label: "Activities", icon: "ri-calendar-fill", btnId: "activities" },
            { to: "modules-lists", label: "Modules", icon: "ri-book-fill", btnId: "modules" },
            { to: "history", label: "History", icon: "ri-history-line", btnId: "history" },
            { to: "settings", label: "Settings", icon: "ri-settings-3-fill", btnId: "settings" },
          ].map(({ to, label, icon, btnId, disabled }, index) => (
            <li
              key={btnId}
              className={`${styleSuperAdmin.sidebarMenuItem} ${disabled ? styleSuperAdmin.disabled : ''}`}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              ref={(el) => (sidebarMenuRefs.current[index] = el)}
              onClick={() => !disabled && handleMenuItemClick(btnId)}
            >
              <Link
                to={disabled ? '#' : to}
                className={`${styleSuperAdmin.sidebarMenuLink} ${activeButton === btnId ? styleSuperAdmin.active : ''} ${disabled ? styleSuperAdmin.disabledLink : ''}`}
                onClick={() => !disabled && updateActiveButton(btnId)}
              >
                <i className={`ri ${icon} ${styleSuperAdmin.sidebarIcons}`} alt={`${label} Icon`} />
                <span className={styleSuperAdmin.navItem}>{label}</span>
              </Link>
            </li>
          ))}

          {/* Theme Link */}
          <li
            className={styleSuperAdmin.sidebarMenuItem}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            ref={(el) => (sidebarMenuRefs.current[sidebarMenuRefs.current.length] = el)}
          >
            <a 
              href="#"
              className={`${styleSuperAdmin.sidebarMenuLink} ${styleSuperAdmin.sidebarMenuLink}`}
              id="theme-button"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <i className="ri-moon-clear-fill" style={{ marginRight: '10px' }} />
              <span className={styleSuperAdmin.navItem}>Theme</span>
            </a>
          </li>

          {/* Logout Link */}
          <li
            className={styleSuperAdmin.sidebarMenuItem}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            ref={(el) => (sidebarMenuRefs.current[sidebarMenuRefs.current.length] = el)}
          >
            <a
              href="#"
              onClick={handleLogoutClick}
              className={`${styleSuperAdmin.sidebarMenuLink} ${styleSuperAdmin.sidebarMenuLink}`}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <i className="ri-logout-box-r-fill" style={{ marginRight: '10px' }}></i>
              <span className={styleSuperAdmin.navItem}>Logout</span>
            </a>
          </li>

        </ul>
      </div>
          
      <div className={styleSuperAdmin.mainContent}>
        <Header/>
        <Outlet/>
      </div>
      

      {isLogoutModalOpen && (
        <div className={styleSuperAdmin.modalOverlay}>
          <div className={styleSuperAdmin.modal}>
            <h2>Confirm Logout</h2>
            <h4>Are you sure you want to logout?</h4>
            <div className={styleSuperAdmin.buttonRow}>
              <button 
                // onClick={handleConfirmLogout} 
                className={styleSuperAdmin.confirmLogoutBtn}
              >
                Yes, Logout
              </button>
              <button 
                onClick={() => setLogoutModalOpen(false)} 
                className={styleSuperAdmin.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
