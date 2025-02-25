import styleTec from './tec.module.css';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import { useState } from 'react';
// Import icons from React Icons
import { FaShieldAlt, FaFileUpload, FaFilePdf, FaUsersCog, FaBook } from 'react-icons/fa';

export function Tec() {
  // State to track the selected item and its details
  const [selectedItem, setSelectedItem] = useState(null);

  // Define the details and icons for each item
  const itemDetails = {
    'Risk Management': {
      icon: <FaShieldAlt />, // Shield icon for Risk Management
      description: 'Risk management involves identifying, assessing, and mitigating risks to ensure the safety and security of systems.'
    },
    'RCAP Submission': {
      icon: <FaFileUpload />, // Upload icon for RCAP Submission
      description: 'RCAP Submission refers to the process of submitting reports to regulatory bodies for compliance purposes.'
    },
    'White Paper': {
      icon: <FaFilePdf />, // PDF icon for White Paper
      description: 'A white paper is an authoritative document intended to inform readers about a specific topic or solution.'
    },
    'Capacity Building': {
      icon: <FaUsersCog />, // Users and Cog icon for Capacity Building
      description: 'Capacity building focuses on enhancing skills and resources to improve organizational performance.'
    },
    'Project Research': {
      icon: <FaBook />, // Book icon for Project Research
      description: 'Project research involves conducting studies to gather insights and data for decision-making.'
    }
  };

  return (
    <>
      <Header />
      <div className={styleTec.mainContent}>
        {/* Left Sidebar (No Background) */}
        <div className={styleTec.sidebar}>
          {/* Smaller Title in the Sidebar */}
          <div className={styleTec.sidebarTitle}>
            Technical Evaluation and Cybersecurity (TECS)
            <div className="divider">
        <div className="blue-section"></div>
        <div className="red-section"></div>
      </div>
      <div className="stars">
        <span>⭐</span>
        <span>⭐</span>
        <span>⭐</span>
      </div>
          </div>

          {/* List of Items */}
          <div className={styleTec.tecContainer}>
            {Object.keys(itemDetails).map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className={selectedItem === item ? styleTec.selected : ''}
              >
                {itemDetails[item].icon} {/* Display the icon */}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content Area with Card Background */}
        <div className={styleTec.contentCard}>
          {selectedItem ? (
            <>
              <h2>{selectedItem}</h2>
              <p>{itemDetails[selectedItem].description}</p>
            </>
          ) : (
            <p>Select an item from the left sidebar to view details.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}