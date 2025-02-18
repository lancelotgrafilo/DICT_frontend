import stylePprd from './pprd.module.css';
import { Header } from '../../Header/Header';

export function Pprd () {
  return (
    <>
      <Header/>
      <div className={stylePprd.mainContent}>
        <div className={stylePprd.headerContainer}>
          <div>
            PPRD
          </div>
        </div>
        <div className={stylePprd.pprdContainer}>
          <div>CII</div>
          <div>Request for CB</div>
          <div>Submit CERT</div>
        </div>
      </div>
      
      {/* modals for 10 sectors and CPCR Sector */}
    </>
  )
}