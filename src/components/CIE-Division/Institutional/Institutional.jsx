import styleInstitutional from './institutional.module.css';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import ProcurementImg from "/src/assets/img/Procurement.png";

export function Institutional() {
  return (
    <>
      <Header />
      <div className={styleInstitutional.mainContent}>
        <div className={styleInstitutional.institutionalHeader}>
          Institutional Services
        </div>
        <div className={styleInstitutional.institutionalSubHeader}>
          Providing transparent and efficient governance solutions
        </div>

        <div className={styleInstitutional.institutionalContainer}>
          {/* First Column */}
            <div className={styleInstitutional.cardContainer}>
              <div className={styleInstitutional.card}>
              <i
                  className="bi bi-currency-dollar" 
                  style={{
                    fontSize: '3rem',           // Increase icon size
                    color: '#007bff',           // Set color
                    padding: '10px',            // Add padding around the icon
                    backgroundColor: '#f1f1f1', // Set background color
                    borderRadius: '50%',        // Make icon circular
                    transition: 'all 0.3s ease', // Smooth transition for effects
                  }}
                />

                <h3>BEDS</h3>
                <p>Budget Execution Documents System for streamlined financial planning.</p>
              </div>
              <div className={styleInstitutional.card}>
              <i
                className="bi bi-file-earmark-text" 
                style={{
                  fontSize: '3rem',           // Increase icon size
                  color: '#28a745',           // Set color (green for "document" feel)
                  padding: '12px',            // Add padding around the icon
                  backgroundColor: '#f8f9fa', // Light background for contrast
                  borderRadius: '8px',        // Rounded corners for a soft look
                  transition: 'all 0.3s ease', // Smooth transition for effects
                }}
              />
                <h3>RI Plan</h3>
                <p>Resource Investment Planning for strategic growth and allocation.</p>
              </div>
            </div>

          {/* Second Column */}
            <div className={styleInstitutional.cardContainer}>
              <div className={styleInstitutional.card}>
              <img src={ProcurementImg} alt="Procurement" className={styleInstitutional.cardImage} />
                <h3>Procurement</h3>
                <p>Ensuring transparent and efficient procurement processes.</p>
              </div>
              <div className={styleInstitutional.card}>
              <i
                className="bi bi-building"
                style={{
                  fontSize: '3rem',
                  color: '#6c757d',
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                }}
              />

                <h3>MPAX</h3>
                <p>Modern Public Access System for digital governance initiatives.</p>
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
