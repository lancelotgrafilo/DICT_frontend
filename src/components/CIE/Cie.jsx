import styleCie from "./cie.module.css";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";

export function Cie() {
  return (
    <>
      <Header />
      <div className={styleCie.mainContent}>
        <div>
          <h2>SECTIONS</h2>
        </div>
        <div className={styleCie.cardContainer}>
          {/* Plans and Policy Research and Development */}
          <div className={styleCie.card}>
            <Link to="/divisions/cie/pprd">
              <div className={styleCie.cardIcon}>📋</div>
              <div className={styleCie.cardTitle}>PPRD</div>
              <div className={styleCie.cardDescription}>
                Plans and Policy Research and Development
              </div>
            </Link>
          </div>
          {/* Technical Evaluation and Cybersecurity */}
          <div className={styleCie.card}>
            <Link to="/divisions/cie/tec">
              <div className={styleCie.cardIcon}>🛠️</div>
              <div className={styleCie.cardTitle}>TEC</div>
              <div className={styleCie.cardDescription}>
                Technical Evaluation and Cybersecurity
              </div>
            </Link>
          </div>
          {/* Cybersecurity Compliance and Monitoring */}
          <div className={styleCie.card}>
            <Link to="/divisions/cie/ecm">
              <div className={styleCie.cardIcon}>🔒</div>
              <div className={styleCie.cardTitle}>CCM</div>
              <div className={styleCie.cardDescription}>
                Cybersecurity Compliance and Monitoring
              </div>
            </Link>
          </div>
          {/* Cybersecurity Programs and Capacity Building */}
          <div className={styleCie.card}>
            <Link to="/divisions/cie/cpcb">
              <div className={styleCie.cardIcon}>📚</div>
              <div className={styleCie.cardTitle}>CPCB</div>
              <div className={styleCie.cardDescription}>
                Cybersecurity Programs and Capacity Building
              </div>
            </Link>
          </div>
        </div>
        <div className={styleCie.institutionalContainer}>
          <div className={styleCie.card}>
            <Link to="/divisions/cie/institutional">
              <div className={styleCie.cardIcon}>🏛️</div>
              <div className={styleCie.cardTitle}>Institutional</div>
              <div className={styleCie.cardDescription}>
                Institutional Framework and Governance
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}