import styleDivisions from "./divisions.module.css";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";
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
