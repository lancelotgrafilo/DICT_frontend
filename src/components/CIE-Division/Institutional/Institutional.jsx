import styleInstitutional from './institutional.module.css';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import { useState } from 'react';
// Import icons from React Icons
import { FaDollarSign, FaFileAlt, FaShoppingCart, FaBuilding } from 'react-icons/fa';

export function Institutional() {

  // Define the details and icons for each item
  const itemDetails = {
    'Budget Execution Documents System (BEDS)': {
      icon: <FaDollarSign />, // Dollar sign icon for BEDS
      description: 'Streamlined financial planning and budget execution system.'
    },
    'Resource Investment Planning (RI Plan)': {
      icon: <FaFileAlt />, // File icon for RI Plan
      description: 'Strategic growth and allocation through resource investment planning.'
    },
    'Procurement': {
      icon: <FaShoppingCart />, // Shopping cart icon for Procurement
      description: 'Ensuring transparent and efficient procurement processes.'
    },
    'Modern Public Access System (MPAX)': {
      icon: <FaBuilding />, // Building icon for MPAX
      description: 'Digital governance initiatives through modern public access systems.'
    }
  };

  // Extract the keys of the itemDetails object
  const itemKeys = Object.keys(itemDetails);

  // Initialize selectedItem with the first key (automatically selects the first menu item)
  const [selectedItem, setSelectedItem] = useState(itemKeys[0]);

  return (
    <>
      <Header />
      <div className={styleInstitutional.mainContent}>
        {/* Left Sidebar (No Background) */}
        <div className={styleInstitutional.sidebar}>
          {/* Title in the Sidebar */}
          <div className={styleInstitutional.sidebarTitle}>Institutional Services
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
          <p className={styleInstitutional.description}>
            Providing transparent and efficient governance solutions
          </p>
          {/* List of Items */}
          <div className={styleInstitutional.itemList}>
            {Object.keys(itemDetails).map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className={selectedItem === item ? styleInstitutional.selected : ''}
              >
                {itemDetails[item].icon} {/* Display the icon */}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right Content Area with Card Background */}
        <div className={styleInstitutional.contentCard}>
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