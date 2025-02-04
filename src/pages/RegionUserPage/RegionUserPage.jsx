import styleRegionUserPage from "./regionUserPage.module.css";
import dict_logo from "../../assets/logo/dict-logo.png";
import { Outlet, Link } from 'react-router-dom';
import { ActiveButtonContext } from '../../utils/context/ActiveButtonContext';
import { usePath } from '../../utils/context/PathContext';
import { useState, useContext, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import { Header } from '../../components/Header/Header';

export function RegionUserPage() {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const { updatePath } = usePath();

  const sidebarMenuRefs = useRef([]);

  const { activeButton, updateActiveButton } = useContext(ActiveButtonContext);

  const handleHover = (isHovered) => {
    const sidebar = document.querySelector(`.${styleRegionUserPage.sidebar}`);
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
    <div className={styleRegionUserPage.dashboardContainer}>
      <div className={styleRegionUserPage.sidebar}>
        <div className={styleRegionUserPage.logoContainer}>
          <div className={styleRegionUserPage.logo}>
            <img src={dict_logo} alt="" />
          </div>
          <div className={styleRegionUserPage.usernameContainer}>
            <h2>Freddie Alicante</h2>
            <p style={{ fontSize: "12px"}}>
              Region IV-A: Calabarzon
            </p>
            <p style={{ fontSize: "14px" }}>Admin</p>
          </div>
        </div>

        <div className={styleRegionUserPage.manageTxt}>
          <p>MANAGE</p>
        </div>

        <ul className={styleRegionUserPage.sidebarMenu}>
          {[
            { to: "dashboard", label: "Analytics", icon: "ri-pie-chart-2-fill", btnId: "dashboard" },
            { to: "request", label: "Requests", icon: "ri-edit-box-fill", btnId: "request" },
            { to: "activities", label: "Activities", icon: "ri-calendar-fill", btnId: "activities" },
            { to: "modules-lists", label: "Modules", icon: "ri-book-fill", btnId: "modules" },
            { to: "history", label: "History", icon: "ri-time-fill", btnId: "history" },
            { to: "settings", label: "Settings", icon: "ri-settings-3-fill", btnId: "settings" },
          ].map(({ to, label, icon, btnId, disabled }, index) => (
            <li
              key={btnId}
              className={`${styleRegionUserPage.sidebarMenuItem} ${disabled ? styleRegionUserPage.disabled : ''}`}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              ref={(el) => (sidebarMenuRefs.current[index] = el)}
              onClick={() => !disabled && handleMenuItemClick(btnId)}
            >
              <Link
                to={disabled ? '#' : to}
                className={`${styleRegionUserPage.sidebarMenuLink} ${activeButton === btnId ? styleRegionUserPage.active : ''} ${disabled ? styleRegionUserPage.disabledLink : ''}`}
                onClick={() => !disabled && updateActiveButton(btnId)}
              >
                <i className={`ri ${icon} ${styleRegionUserPage.sidebarIcons}`} alt={`${label} Icon`} />
                <span className={styleRegionUserPage.navItem}>{label}</span>
              </Link>
            </li>
          ))}

          {/* Theme Link */}
          <li
            className={styleRegionUserPage.sidebarMenuItem}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            ref={(el) => (sidebarMenuRefs.current[sidebarMenuRefs.current.length] = el)}
          >
            <a
              href="#"
              className={`${styleRegionUserPage.sidebarMenuLink} ${styleRegionUserPage.sidebarMenuLink}`}
              id="theme-button"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <i className="ri-moon-clear-fill" style={{ marginRight: '10px' }} />
              <span className={styleRegionUserPage.navItem}>Theme</span>
            </a>
          </li>

          {/* Logout Link */}
          <li
            className={styleRegionUserPage.sidebarMenuItem}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            ref={(el) => (sidebarMenuRefs.current[sidebarMenuRefs.current.length] = el)}
          >
            <a
              href="#"
              onClick={handleLogoutClick}
              className={`${styleRegionUserPage.sidebarMenuLink} ${styleRegionUserPage.sidebarMenuLink}`}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <i className="ri-logout-box-r-fill" style={{ marginRight: '10px' }}></i>
              <span className={styleRegionUserPage.navItem}>Logout</span>
            </a>
          </li>

        </ul>
      </div>

      <div className={styleRegionUserPage.mainContent}>
        <Header />
        <Outlet />
      </div>


      {isLogoutModalOpen && (
        <div className={styleRegionUserPage.modalOverlay}>
          <div className={styleRegionUserPage.modal}>
            <h2 style={{textAlign: "center"}}>Confirm Logout</h2>
            <h6 style={{fontSize: "14px", textAlign: "center", marginBottom: "20px"}}>Are you sure you want to logout?</h6>
            <div className={styleRegionUserPage.buttonRow}>
              <button
                // onClick={handleConfirmLogout} 
                className={styleRegionUserPage.confirmLogoutBtn}
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setLogoutModalOpen(false)}
                className={styleRegionUserPage.cancelBtn}
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
