import stylePprd from './pprd.module.css';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';

export function Pprd() {
  return (
    <>
      <Header />
      <div className={stylePprd.mainContent}>
        <div className={stylePprd.headerContainer}>
          <div>PPRD</div>
        </div>
        <div className={stylePprd.firstRow}>
          <div className={stylePprd.cardContainer}>
            <div className={stylePprd.card}>DC</div>
            <div className={stylePprd.card}>MC</div>
            <div className={stylePprd.card}>LEGISLATION</div>
          </div>
        </div>
        <div className={stylePprd.secondRow}>
          <div className={stylePprd.cardContainer}>
            <div className={stylePprd.card}>Draft Policies</div>
            <div className={stylePprd.card}>Plans & Strategies</div>
            <div className={stylePprd.card}>Others</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}