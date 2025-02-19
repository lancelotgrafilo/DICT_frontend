import styleInstitutional from './institutional.module.css';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';

export function Institutional() {
  return (
    <>
      <Header />
      <div className={styleInstitutional.mainContent}>
        <div className={styleInstitutional.institutionalHeader}>
          INSTITUTIONAL
        </div>
        <div className={styleInstitutional.institutionalContainer}>
          <div className={styleInstitutional.firstColumnInstitutional}>
            <div className={styleInstitutional.cardContainer}>
              <div className={styleInstitutional.card}>BEDS</div>
              <div className={styleInstitutional.card}>RI Plan</div>
            </div>
          </div>
          <div className={styleInstitutional.secondColumnInstitutional}>
            <div className={styleInstitutional.cardContainer}>
              <div className={styleInstitutional.card}>Procurement</div>
              <div className={styleInstitutional.card}>MPAX</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}