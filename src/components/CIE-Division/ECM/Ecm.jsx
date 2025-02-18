import styleEcm from './ecm.module.css';
import {Header} from "../../Header/Header";

export function Ecm(){
  return (
    <>
      <Header/>

      <div className={styleEcm.mainContent}>

        <div className={styleEcm.headerContainer}>
          <div>
            ECM
          </div>
        </div>

        <div className={styleEcm.firstRow}>
          <div className={styleEcm.cardContainer}>
            <div className={styleEcm.card}>DC</div>
            <div className={styleEcm.card}>MC</div>
            <div className={styleEcm.card}>LEGISLATION</div>
          </div>
        </div>

        <div className={styleEcm.secondRow}>
          <div className={styleEcm.cardContainer}>
            <div className={styleEcm.card}>Draft Policies</div>
            <div className={styleEcm.card}>Plans & Strategies</div>
            <div className={styleEcm.card}>Others</div>
          </div>
        </div>

      </div>

    </>
  )
}