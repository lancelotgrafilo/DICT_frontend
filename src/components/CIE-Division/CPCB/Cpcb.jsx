import styleCpcb from './cpcb.module.css';
import {Header} from '../../Header/Header';

export function Cpcb () {
  return (
    <>
      <Header/>
      
      <div className={styleCpcb.mainContent}>

        <div className={styleCpcb.headerContainer}>
          <div>
            CPCB
          </div>
        </div>

        <div className={styleCpcb.cpcbContainer}>

          <div className={styleCpcb.firstColumnCpcb}>
            <div className={styleCpcb.cardContainer}>
              <div className={styleCpcb.card}>NCAP</div>
              <div className={styleCpcb.card}>Request for Awareness</div>
              <div className={styleCpcb.card}>Request for Speaker</div>
            </div>
          </div>

          <div className={styleCpcb.secondColumnCpcb}>
            <div className={styleCpcb.cardContainer}>
              <div className={styleCpcb.card}>CAR</div>
              <div className={styleCpcb.card}>R1</div>
              <div className={styleCpcb.card}>R2</div>
              <div className={styleCpcb.card}>RBC</div>
            </div>
          </div>
        </div>

        <div className={styleCpcb.institutionalContainer}>
          <div className={styleCpcb.firstColumnInstitutional}>
            <div className={styleCpcb.cardContainer}>
              <div className={styleCpcb.card}>BEDS</div>
              <div className={styleCpcb.card}>RI Plan</div>
            </div>
          </div>

          <div className={styleCpcb.secondColumnInstitutional}>
            <div className={styleCpcb.cardContainer}>
              <div className={styleCpcb.card}>Procurement</div>
              <div className={styleCpcb.card}>MPAX</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}