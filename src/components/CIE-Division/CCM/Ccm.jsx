import styleCcm from './ccm.module.css';
import { Header } from "../../Header/Header";
import { Footer } from '../../Footer/Footer';
import { useState } from 'react';
// Import icons from React Icons
import { FaShieldAlt, FaFileUpload, FaListAlt, FaBuilding } from 'react-icons/fa';

export function Ccm() {
  // Define the details and icons for each item
  const itemDetails = {
    'Critical Information Infrastructure (CII)': {
      icon: <FaShieldAlt />, // Shield icon for CII
      description: 'CII refers to systems and assets that are essential for national security, economic stability, and public safety.',
      sectors: [
        "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5",
        "Sector 6", "Sector 7", "Sector 8", "Sector 9", "Sector 10"
      ]
    },
    'Request for CB': {
      icon: <FaBuilding />, // Building icon for CB
      description: 'Request for Cybersecurity Baseline (CB) involves submitting a formal request for compliance assessment.'
    },
    'Submit CERT Form Modal and Attach File': {
      icon: <FaFileUpload />, // Upload icon for file submission
      description: 'Submit a CERT form along with the required attachments for review and processing.'
    }
  };

  // Extract the keys of the itemDetails object
  const itemKeys = Object.keys(itemDetails);

  // Initialize selectedItem with the first key (automatically selects the first menu item)
  const [selectedItem, setSelectedItem] = useState(itemKeys[0]);

  return (
    <>
      <Header />
      <div className={styleCcm.mainContent}>
        {/* Left Sidebar (No Background) */}
        <div className={styleCcm.sidebar}>
          {/* Title in the Sidebar */}
          <div className={styleCcm.sidebarTitle}>Cybersecurity Compliance and Monitoring (CCM)</div>
          {/* List of Items */}
          <div className={styleCcm.ccmContainer}>
            {Object.keys(itemDetails).map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className={selectedItem === item ? styleCcm.selected : ''}
              >
                {itemDetails[item].icon} {/* Display the icon */}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right Content Area with Card Background */}
        <div className={styleCcm.contentCard}>
          {selectedItem ? (
            <>
              <h2>{selectedItem}</h2>
              <p>{itemDetails[selectedItem].description}</p>
              {/* Conditionally display sectors if the selected item is CII */}
              {selectedItem === 'Critical Information Infrastructure (CII)' && (
                <>
                  <h3>Sectors</h3>
                  <div className={styleCcm.sectorList}>
                    {itemDetails[selectedItem].sectors.map((sector, index) => (
                      <div key={index} className={styleCcm.sectorItem}>
                        {sector}
                      </div>
                    ))}
                  </div>
                </>
              )}
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