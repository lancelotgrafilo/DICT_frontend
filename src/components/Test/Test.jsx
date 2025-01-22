import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle submenu for Settings
  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
      {/* HEADER */}
      <header className="header" id="header">
        <div className="header__container">
          <a href="#" className="header__logo">
            <img src="assets/img/logo.png" alt="Logo" className="header__logo-img" />
            <span>DICT</span>
          </a>
          <button className="header__toggle" id="header-toggle" onClick={toggleSidebar}>
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </header>

      {/* SIDEBAR */}
      <nav className="sidebar" id="sidebar">
        <div className="sidebar__container">
          {/* Sidebar User Section */}
          <div className="sidebar__user">
            <div className="sidebar__img">
              <img src="assets/img/perfil.png" alt="User" />
            </div>
            <div className="sidebar__info">
              <h3>Freddie Alicante</h3>
              <span>freddiealicante1a@email.com</span>
            </div>
          </div>

          {/* Sidebar Links */}
          <div className="sidebar__content">
            <h3 className="sidebar__title">MANAGE</h3>
            <div className="sidebar__list">
              <a href="#" className="sidebar__link active-link">
                <i className="ri-pie-chart-2-fill"></i>
                <span>Dashboard</span>
              </a>
              <a href="requestpage.html" className="sidebar__link">
                <i className="ri-edit-box-fill"></i>
                <span>Request</span>
              </a>
              <a href="#" className="sidebar__link">
                <i className="ri-calendar-fill"></i>
                <span>Activities</span>
              </a>
              <a href="#" className="sidebar__link">
                <i className="ri-book-fill"></i>
                <span>Modules</span>
              </a>
              <a href="#" className="sidebar__link">
                <i className="ri-arrow-up-down-line"></i>
                <span>Recent Transactions</span>
              </a>
              <a href="#" className="sidebar__link">
                <i className="ri-bar-chart-box-fill"></i>
                <span>Statistics</span>
              </a>
              <a href="#" className="sidebar__link" onClick={toggleSubmenu}>
                <i className="ri-settings-3-fill"></i>
                <span>Settings</span>
              </a>
              {isSubmenuOpen && (
                <div className="sidebar__submenu">
                  <a href="#" className="sidebar__link">
                    <i className="ri-moon-clear-fill"></i>
                    <span>Theme</span>
                  </a>
                  <a href="#" className="sidebar__link">
                    <i className="ri-logout-box-r-fill"></i>
                    <span>Log Out</span>
                  </a>
                </div>
              )}
              <a href="#" className="sidebar__link">
                <i className="ri-notification-2-fill"></i>
                <span>Notifications</span>
              </a>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="sidebar__actions">
            <button>
              <i className="ri-moon-clear-fill sidebar__link sidebar__theme" id="theme-button">
                <span>Theme</span>
              </i>
            </button>
            <button className="sidebar__link">
              <i className="ri-logout-box-r-fill"></i>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="main container" id="main">
        <h1>Sidebar Menu</h1>
      </main>
    </div>
  );
};

export default Sidebar;
