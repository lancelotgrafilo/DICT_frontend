import styleRegionUserPage from "./regionUserPage.module.css";
import dict_logo from "../../assets/logo/dict-logo.png";
import { Link } from 'react-router-dom';
import { ActiveButtonContext } from '../../utils/context/ActiveButtonContext';

import { usePath } from '../../utils/context/PathContext';
import { useContext, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';


export function RegionUserPage(){

  const { updatePath } = usePath();

  const sidebarMenuRefs = useRef([]);
  
  const { activeButton, updateActiveButton } = useContext(ActiveButtonContext);

  const handleHover = (isHovered) => {
    const sidebar = document.querySelector(`.${styleRegionUserPage.sidebar}`);
    if (sidebar) {
      sidebar.style.zIndex = isHovered ? '9999' : 'initial';
    }
  };
  const handleMenuItemClick = (btnId) => {
    updateActiveButton(btnId);
    updatePath(null, null); // Set both paths to null
  };

  return(
    <div className={styleRegionUserPage.dashboardContainer}>
      <div className={styleRegionUserPage.sidebar}>
        <div className={styleRegionUserPage.logoContainer}>
          <div className={styleRegionUserPage.logo}>
            <img src={dict_logo} alt="" />
          </div>
          <div className={styleRegionUserPage.usernameContainer}>
            <h2>Freddie Alicante</h2>
            <p>saiba@gmail.com</p>
          </div>
        </div>

        <div>
          MANAGE
        </div>

        <ul className={styleRegionUserPage.sidebarMenu}>
          {[
            { to: "dashboard", label: "Dashboard", icon: "ri-pie-chart-2-fill", btnId: "dashboard" },
            { to: "request", label: "Request", icon: "ri-edit-box-fill", btnId: "request" },
            { to: "activities", label: "Activities", icon: "ri-calendar-fill", btnId: "activities" },
            { to: "modules", label: "Modules", icon: "ri-book-fill", btnId: "modules" },
            { to: "recent_transaction", label: "Recent Transaction", icon: "ri-arrow-up-down-line", btnId: "recent_transaction" },
            { to: "statistics", label: "Statistics", icon: "ri-bar-chart-box-fill", btnId: "statistics" },
            { to: "settings", label: "Settings", icon: "ri-settings-3-fill", btnId: "settings" },
            { to: "notification", label: "Notification", icon: "ri-notification-2-fill", btnId: "notification" },
            { to: "logout", label: "Logout", icon: "ri-logout-box-r-fill", btnId: "logout" },
          ].map(({to, label, icon, btnId, disabled}, index) => (
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
        </ul>

        



      </div>
    </div>
  )
}