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
        </div>
        <div className={styleCpcb.cpcbContainer}>
          <div className={styleCpcb.firstColumnCpcb}>
            <div className={styleCpcb.cardContainer}>
              <div className={styleCpcb.card} onClick={openModal}>
                NCAP
              </div>
              <div className={styleCpcb.card}>Request for Awareness</div>
              <div className={styleCpcb.card}>
                <Link to="/request-form">Request for Speaker</Link>
              </div>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className={styleCpcb.modal}>
              <div className={styleCpcb.modalContent}>
                <h3>NCAP Details</h3>
                <div className={styleCpcb.modalCardContainer}>
                  <div className={styleCpcb.modalCard}>CAR</div>
                  <div className={styleCpcb.modalCard}>R1</div>
                  <div className={styleCpcb.modalCard}>R2</div>
                  <div className={styleCpcb.modalCard}>RBC</div>
                </div>
                <button onClick={closeModal} style={{ marginTop: '20px' }}>
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