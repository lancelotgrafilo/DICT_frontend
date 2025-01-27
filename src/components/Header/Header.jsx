import styleHeader from './header.module.css';
import dict from '../../assets/logo/DICT_pic.png';
export function Header(){

  return (
    <div className={styleHeader.mainContent}>
      <div className={styleHeader.horizontalMenu}>
        <div className={styleHeader.imageContainer}>
          <img src={dict} alt="DICT" className={styleHeader.dict}/>
        </div>
      </div>

    </div>
  )
}