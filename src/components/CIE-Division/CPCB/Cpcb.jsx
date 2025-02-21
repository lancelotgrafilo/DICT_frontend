import styleCpcb from './cpcb.module.css';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Cpcb() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className={styleCpcb.mainContent}>
        <div className={styleCpcb.headerContainer}>
          <div>Cybersecurity Programs and Capacity Building</div>
          <p className={styleCpcb.description}>
            The Cybersecurity Programs and Capacity Building (CPCB) initiative aims to enhance cybersecurity awareness, 
            provide technical training, and strengthen cyber resilience across different regions.
          </p>
        </div>

        <div className={styleCpcb.cpcbContainer}>
          <div className={styleCpcb.firstColumnCpcb}>
            <div className={styleCpcb.cardContainer}>
              <div className={styleCpcb.card} onClick={openModal}>
                NCAP (National Cyber Awareness Program)
              </div>
              <div className={styleCpcb.card}>
                <Link to="/request-form">Request for Awareness</Link>
              </div>
              <div className={styleCpcb.card}>Request for Speaker</div>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className={styleCpcb.modal}>
              <div className={styleCpcb.modalContent}>
                <h3>National Cyber Awareness Program (NCAP)</h3>
                <p className={styleCpcb.modalDescription}>
                  The NCAP is designed to spread cybersecurity knowledge, enhance digital safety, and provide
                  regional training initiatives. Below are the available regions:
                </p>
                <div className={styleCpcb.modalCardContainer}>
                  <div className={styleCpcb.modalCard}>CAR - Cordillera Administrative Region</div>
                  <div className={styleCpcb.modalCard}>R1 - Region 1 (Ilocos Region)</div>
                  <div className={styleCpcb.modalCard}>R2 - Region 2 (Cagayan Valley)</div>
                  <div className={styleCpcb.modalCard}>RBC - Regional Business Center</div>
                </div>
                <button className={styleCpcb.closeButton} onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
