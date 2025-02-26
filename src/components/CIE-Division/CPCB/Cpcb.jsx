import styleCpcb from './cpcb.module.css';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// Import icons from React Icons
import { FaGraduationCap, FaFileAlt, FaMicrophone, FaMapMarkedAlt } from 'react-icons/fa';

export function Cpcb() {
  // Define the regions for NCAP
  const regions = [
    "CAR - Cordillera Administrative Region",
    "R1 - Region 1 (Ilocos Region)",
    "R2 - Region 2 (Cagayan Valley)",
    "RBC - Regional Business Center"
  ];

  // Define the details and icons for each item
  const itemDetails = {
    'National Cyber Awareness Program (NCAP)': {
      icon: <FaGraduationCap />, // Graduation cap icon for NCAP
      description: 'The NCAP is designed to spread cybersecurity knowledge, enhance digital safety, and provide regional training initiatives.',
      regions: regions // Include regions as part of the item details
    },
    'Request for Awareness': {
      icon: <FaFileAlt />, // File icon for Request for Awareness
      description: 'Submit a request for cybersecurity awareness programs or materials.',
      link: '/request-form' // Link to the request form
    },
    'Request for Speaker': {
      icon: <FaMicrophone />, // Microphone icon for Request for Speaker
      description: 'Request a speaker for cybersecurity-related events or workshops.'
    }
  };

  // Extract the keys of the itemDetails object
  const itemKeys = Object.keys(itemDetails);

  // Initialize selectedItem with the first key (automatically selects the first menu item)
  const [selectedItem, setSelectedItem] = useState(itemKeys[0]);

  return (
    <>
      <Header />
      <div className={styleCpcb.mainContent}>
        {/* Left Sidebar (No Background) */}
        <div className={styleCpcb.sidebar}>
          {/* Title in the Sidebar */}
          <div className={styleCpcb.sidebarTitle}>Cybersecurity Programs and Capacity Building (CPCB)
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
          <p className={styleCpcb.description}>
            The Cybersecurity Programs and Capacity Building (CPCB) initiative aims to enhance cybersecurity awareness,
            provide technical training, and strengthen cyber resilience across different regions.
          </p>
          {/* List of Items */}
          <div className={styleCpcb.cpcbContainer}>
            {Object.keys(itemDetails).map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className={selectedItem === item ? styleCpcb.selected : ''}
              >
                {itemDetails[item].icon} {/* Display the icon */}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right Content Area with Card Background */}
        <div className={styleCpcb.contentCard}>
          {selectedItem ? (
            <>
              <h2>{selectedItem}</h2>
              <p>{itemDetails[selectedItem].description}</p>
              {/* Conditionally display regions if the selected item is NCAP */}
              {selectedItem === 'National Cyber Awareness Program (NCAP)' && (
                <>
                  <h3>Regions</h3>
                  <div className={styleCpcb.regionList}>
                    {itemDetails[selectedItem].regions.map((region, index) => (
                      <div key={index} className={styleCpcb.regionItem}>
                        {region}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {/* Conditionally display link if the selected item has a link */}
              {itemDetails[selectedItem].link && (
                <Link to={itemDetails[selectedItem].link} className={styleCpcb.link}>
                  Go to Request Form
                </Link>
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