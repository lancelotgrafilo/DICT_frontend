import styleDivisions from "./divisions.module.css";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import dcdImg from "../../assets/img/dcd.png";
import certPHLogo from "../../assets/img/CERT-PH.png";
import PnpkiLogo from "../../assets/img/pnpki.jpg";
import CyberImg from "../../assets/img/Cyber.png";
export function Divisions() {
  return (
    <>
      <Header />
      <div className={styleDivisions.mainContent}>
        <div className={styleDivisions.division}>
          <h1>Cybersecurity Divisions</h1>
        </div>
        <div className={styleDivisions.cardContainer}>
          {/* Card 1 */}
          <Link to="/divisions/cie" className={styleDivisions.cardLink}>
            <div className={styleDivisions.card}>
              <img
                src={CyberImg}
                alt="CIECSD Image"
                className={styleDivisions.image}
              />
              <h2 className={styleDivisions.title}>
                Critical Infostructure Evaluation and Cybersecurity Standards Division
              </h2>
              <p className={styleDivisions.abbreviation}>(CIECSD)</p>
              <p className={styleDivisions.description}>
                Responsible for evaluating critical infrastructure and setting cybersecurity standards.
              </p>
            </div>
          </Link>

          {/* Card 2 */}
          <a href="https://sites.google.com/dict.gov.ph/pnpki/ors" className={styleDivisions.cardLink}>
            <div className={styleDivisions.card}>
              <img
                src={PnpkiLogo}
                alt="DCD Image"
                className={styleDivisions.image}
              />
              <h2 className={styleDivisions.title}>Digital Certificate Division</h2>
              <p className={styleDivisions.abbreviation}>(DCD)</p>
              <p className={styleDivisions.description}>
                Manages digital certificates to ensure secure online transactions.
              </p>
            </div>
          </a>

          {/* Card 3 */}
          <a href="https://www.ncert.gov.ph/" className={styleDivisions.cardLink}>
            <div className={styleDivisions.card}>
              <img
                src={certPHLogo} 
                alt="CERT-PH Logo"
                className={styleDivisions.image}
              />
              <h2 className={styleDivisions.title}>
                National Computer Emergency Response Team Division
              </h2>
              <p className={styleDivisions.abbreviation}>(NCERT)</p>
              <p className={styleDivisions.description}>
                Handles national-level cybersecurity incidents and provides emergency response.
              </p>
            </div>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
