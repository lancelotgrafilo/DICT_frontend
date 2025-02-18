import styleCcm from './ccm.module.css';
import {Header} from "../../Header/Header";
import { Footer } from '../../Footer/Footer';

export function Ccm(){
  return (
    <>
      <Header/>

      <div className={styleCcm.mainContent}>
        <div className={styleCcm.headerContainer}>
          <div>
            CCM
          </div>
        </div>
        <div className={styleCcm.ccmContainer}>
          <div>CII</div>
          <div>Request for CB</div>
          <div>Submit CERT</div>
        </div>
      </div>

      {/* modals for 10 sectors and CPCR Sector */}

      <Footer/>
    </>
  )
}