import styleCcm from './ccm.module.css';
import { Header } from "../../Header/Header";
import { Footer } from '../../Footer/Footer';
import { useState } from 'react';

export function Ccm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectors = [
    "Sector 1",
    "Sector 2",
    "Sector 3",
    "Sector 4",
    "Sector 5",
    "Sector 6",
    "Sector 7",
    "Sector 8",
    "Sector 9",
    "Sector 10"
  ];

  const handleCiiClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className={styleCcm.mainContent}>
        <div className={styleCcm.headerContainer}>
          <div>Cybersecurity Compliance and Monitoring</div>
        </div>
        <div className={styleCcm.ccmContainer}>
          <div onClick={handleCiiClick}>CII</div>
          <div>Request for CB</div>
          <div>Submit CERT Form Modal and Attach File</div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styleCcm.modal}>
          <div className={styleCcm.modalContent}>
            <h3>Sectors</h3>
            <div className={styleCcm.sectorList}>
              {sectors.map((sector, index) => (
                <div key={index} className={styleCcm.sectorItem}>
                  {sector}
                </div>
              ))}
            </div>
            <button onClick={closeModal} style={{ marginTop: '20px' }}>
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}