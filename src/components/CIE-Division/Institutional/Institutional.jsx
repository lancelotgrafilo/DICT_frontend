import styleInstitutional from './institutional.module.css';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';

export function Institutional (){
  return (
    <>
      <Header/>
        <div className={styleInstitutional.mainContent}>
          
        </div>

      <Footer/>
    </>
  )
}