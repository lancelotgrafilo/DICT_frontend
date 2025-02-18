import styleCie from "./cie.module.css";
import { Header } from "../Header/Header";
import {Link} from 'react-router-dom';
import { Footer } from "../Footer/Footer";

export function Cie() {
  return (
    <>
      <Header/>
      <div className={styleCie.mainContent}>
        <div>
          Critical Infostructure Evaluation and Cybersecurity Standards Division CIECSD
        </div>
        <div>
          <h2>
            SECTIONS
          </h2>
        </div>

        <div className={styleCie.cardContainer}>
          <div className={styleCie.card}>
            <Link to='/divisions/cie/pprd'>PPRD</Link>
          </div>
          <div className={styleCie.card}>
            <Link to='/divisions/cie/tec'>TEC</Link>
          </div>
          <div className={styleCie.card}>
            <Link to='/divisions/cie/ecm'>CCM</Link>
          </div>
          <div className={styleCie.card}>
            <Link to='/divisions/cie/cpcb'>CPCB</Link>
          </div>
        </div>
        <div className={styleCie.institutionalContainer}>
          <div className={styleCie.card}>INSTITUTIONAL</div>
        </div>
      </div>
      <Footer/>
    </>
  );
}