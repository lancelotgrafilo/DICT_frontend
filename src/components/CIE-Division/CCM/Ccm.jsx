// Ccm.js
import styleCcm from './ccm.module.css';
import { Header } from "../../Header/Header";
import { Footer } from '../../Footer/Footer';
import { useState } from 'react';
import { 
  FaShieldAlt, 
  FaFileUpload, 
  FaListAlt, 
  FaBuilding,
  FaTint,          // Water
  FaBolt,          // Energy
  FaHeartbeat,     // Healthcare
  FaMoneyBillAlt,  // Finance
  FaTv,            // Media
  FaTruck,         // Transportation
  FaUniversity,    // Banking
  FaHeadset,       // BPO
  FaSatelliteDish, // Telecom
  FaLandmark       // Government
} from 'react-icons/fa';

export function Ccm() {
  const itemDetails = {
    'Critical Information Infrastructure (CII)': {
      icon: <FaShieldAlt />,
      description: 'CII refers to systems and assets that are essential for national security, economic stability, and public safety.',
      sectors: [
        { name: "WATER", icon: <FaTint /> },
        { name: "ENERGY", icon: <FaBolt /> },
        { name: "HEALTHCARE", icon: <FaHeartbeat /> },
        { name: "FINANCE", icon: <FaMoneyBillAlt /> },
        { name: "MEDIA", icon: <FaTv /> },
        { name: "TRANSPORTATION", icon: <FaTruck /> },
        { name: "BANKING", icon: <FaUniversity /> },
        { name: "BPO", icon: <FaHeadset /> },
        { name: "TELECOM", icon: <FaSatelliteDish /> },
        { name: "GOVERNMENT & EMERGENCY", icon: <FaLandmark /> }
      ]
    },
    'Request for CB': {
      icon: <FaBuilding />,
      description: 'Request for Cybersecurity Baseline (CB) involves submitting a formal request for compliance assessment.'
    },
    'Submit CERT': {
      icon: <FaFileUpload />,
      description: 'Submit a CERT form along with the required attachments for review and processing.'
      //  Form Modal and Attach File
    }
  };

  const [selectedItem, setSelectedItem] = useState(Object.keys(itemDetails)[0]);

  return (
    <>
      <Header />
      <div className={styleCcm.mainContent}>
        <div className={styleCcm.sidebar}>
          <div className={styleCcm.sidebarTitle}>Cybersecurity Compliance and Monitoring (CCM)</div>
          <div className={styleCcm.ccmContainer}>
            {Object.keys(itemDetails).map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className={`${styleCcm.menuItem} ${selectedItem === item ? styleCcm.selected : ''}`}
              >
                {itemDetails[item].icon}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styleCcm.contentCard}>
          {selectedItem && (
            <>
              <h2>{selectedItem}</h2>
              <p>{itemDetails[selectedItem].description}</p>
              {selectedItem === 'Critical Information Infrastructure (CII)' && (
                <>
                  <h3>Sectors</h3>
                  <div className={styleCcm.sectorList}>
                    {itemDetails[selectedItem].sectors.map((sector, index) => (
                      <div key={index} className={styleCcm.sectorItem}>
                        {sector.icon}
                        <span>{sector.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}