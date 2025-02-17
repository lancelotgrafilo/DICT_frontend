import styleCie from "./cie.module.css";
import { Header } from "../Header/Header";

export function Cie() {
  return (
    <>
      <Header/>
      <div className={styleCie.mainContent}>
        <div>
          Critical Infostructure Evaluation and Cybersecurity Standards Division CIECSD
        </div>

        <div className={styleCie.cardContainer}>
          <div className={styleCie.card}>PRRD</div>
          <div className={styleCie.card}>TEC</div>
          <div className={styleCie.card}>CCM</div>
          <div className={styleCie.card}>CPCB</div>
        </div>
      </div>
    </>
  );
}