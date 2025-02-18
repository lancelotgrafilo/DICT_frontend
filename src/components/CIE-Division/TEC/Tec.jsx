import styleTec from './tec.module.css';
import { Header } from '../../Header/Header';

export function Tec () {
  return(
    <>
      <Header/>

      <div className={styleTec.mainContent}>
        <div className={styleTec.headerContainer}>
          <div>
            TECS
          </div>
        </div>

        <div className={styleTec.tecContainer}>
          <div>Risk Management</div>
          <div>RCAP Submission</div>
          <div>White Paper</div>
          <div>Capacity Building</div>
          <div>Project ...</div>
        </div>
      </div>
    
    </>
  )
}
