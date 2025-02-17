import styleDivisions from "./divisions.module.css";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";

export function Divisions() {

  return (
    <div className={styleDivisions.mainContent}>
      <Header />
      
      <div className={styleDivisions.cardContainer}>
        <div className={styleDivisions.card}>
          <Link to="/divisions/cie">
            Critical Infostructure Evaluation and Cybersecurity Standards Division CIECSD
          </Link>
        </div>
        <div className={styleDivisions.card}>
          <a href="https://dict.gov.ph/pnpki">Digital Certificate Division DCD</a>
        </div>
        <div className={styleDivisions.card}>
          <a href="https://www.ncert.gov.ph/">National Computer Emergency Response Team Division NCERTD</a>
        </div>
      </div>

    </div>
  );
}