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
      documents: [
        { id: 1, title: 'DICT DC 003 S.2020', link: '/src/assets/pdfs/DepartmentCircular/Dept_Circular_No_003_3062020.pdf' },
        { id: 2, title: 'DICT DC 003 S.2024', link: '/src/assets/pdfs/DepartmentCircular/Department-Circular-No.-003-s.-2024.pdf' },
        { id: 3, title: 'DICT DC 004 S.2024', link: '/src/assets/pdfs/DepartmentCircular/Department-Circular-No.-004-s.-2024.pdf' },
        { id: 4, title: 'DICT DC 005 S.2024', link: '/src/assets/pdfs/DepartmentCircular/Department-Circular-No.-005-s.-2024.pdf' },
        { id: 5, title: 'DICT DC 006 S.2024', link: '/src/assets/pdfs/DepartmentCircular/Department-Circular-No.-006-s.-2024.pdf' }
      ]
    },
    'Memorandum Circulars': {
      icon: <FaClipboardList />, // Clipboard icon for Memorandum Circulars
      description: 'Memorandum Circulars are official communications disseminating information or instructions.',
      documents: [
        { id: 1, title: 'DICT MC 005 S.2017', link: '/src/assets/pdfs/MemorandumCircular/Memorandum-Circular-005.pdf' },
        { id: 2, title: 'DICT MC 006 S.2017', link: '/src/assets/pdfs/MemorandumCircular/Memorandum-Circular-006.pdf' },
        { id: 3, title: 'DICT MS 007 S.2017', link: '/src/assets/pdfs/MemorandumCircular/Memorandum-Circular-007.pdf' }
      ]
    },
    'Legislation': {
      icon: <FaGavel />, // Gavel icon for Legislation
      description: 'Legislation refers to laws and regulations relevant to the department and its operations.',
      documents: [
        { id: 1, title: 'EO 58', link: '#' },
        { id: 2, title: 'RA 10175', link: '#' },
        { id: 3, title: 'RA 10173', link: '#' },
        { id: 4, title: 'RA 10844', link: '#' },
        { id: 5, title: 'NCSP 2028', link: '/src/assets/pdfs/NCSP_2028/NCSP_2028_v3.pdf' }
      ]
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
              {itemDetails[selectedItem].documents && (
                <div className={stylePprd.cardContainer}>
                  {itemDetails[selectedItem].documents.map((doc) => (
                    <div key={doc.id} className={stylePprd.card}>
                      <h3>{doc.title}</h3>
                      <a href={doc.link} target="_blank" rel="noopener noreferrer">
                        View Document
                      </a>
                    </div>
                  ))}
                </div>
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