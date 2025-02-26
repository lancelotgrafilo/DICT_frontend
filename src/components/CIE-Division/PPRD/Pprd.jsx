import stylePprd from './pprd.module.css';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import { useState } from 'react';
// Import icons from React Icons
import { FaFileAlt, FaClipboardList, FaGavel, FaDraftingCompass, FaChartLine, FaEllipsisH } from 'react-icons/fa';

export function Pprd() {
  // Define the details and icons for each item
  const itemDetails = {
    'Department Circulars': {
      icon: <FaFileAlt />, // File icon for Department Circulars
      description: 'Department Circulars provide official directives and guidelines issued by the department.',
      link: 'https://dict.gov.ph/department-circulars'
    },
    'Memorandum Circulars': {
      icon: <FaClipboardList />, // Clipboard icon for Memorandum Circulars
      description: 'Memorandum Circulars are official communications disseminating information or instructions.'
    },
    'Legislation': {
      icon: <FaGavel />, // Gavel icon for Legislation
      description: 'Legislation refers to laws and regulations relevant to the department and its operations.'
    },
    'Draft Policies': {
      icon: <FaDraftingCompass />, // Drafting Compass icon for Draft Policies
      description: 'Draft Policies are proposed policies under review and consideration.'
    },
    'Plans & Strategies': {
      icon: <FaChartLine />, // Chart icon for Plans & Strategies
      description: 'Plans & Strategies outline the department’s goals and approaches for achieving them.'
    },
    'Others': {
      icon: <FaEllipsisH />, // Ellipsis icon for Others
      description: 'Other documents and resources that do not fall under specific categories.'
    }
  };

  // Extract the keys of the itemDetails object
  const itemKeys = Object.keys(itemDetails);

  // Initialize selectedItem with the first key (automatically selects the first menu item)
  const [selectedItem, setSelectedItem] = useState(itemKeys[0]);

  return (
    <>
      <Header />
      <div className={stylePprd.mainContent}>
        {/* Left Sidebar (No Background) */}
        <div className={stylePprd.sidebar}>
          {/* Title in the Sidebar */}
          <div className={stylePprd.sidebarTitle}>Public Policy and Regulatory Documents (PPRD)<div className="divider">
        <div className="blue-section"></div>
        <div className="red-section"></div>
      </div>
      <div className="stars">
        <span>⭐</span>
        <span>⭐</span>
        <span>⭐</span>
      </div></div>
          {/* List of Items */}
          <div className={stylePprd.pprdContainer}>
            {Object.keys(itemDetails).map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className={selectedItem === item ? stylePprd.selected : ''}
              >
                {itemDetails[item].icon} {/* Display the icon */}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right Content Area with Card Background */}
        <div className={stylePprd.contentCard}>
          {selectedItem ? (
            <>
              <h2>{selectedItem}</h2>
              <p>{itemDetails[selectedItem].description}</p>
              {itemDetails[selectedItem].link && (
                <a href={itemDetails[selectedItem].link} target="_blank" rel="noopener noreferrer">
                  View Details
                </a>
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