import styleHeader from './header.module.css';
import dict from '../../assets/logo/DICT_pic.png';

import { useContext } from 'react';
import { ActiveButtonContext } from '../../utils/context/ActiveButtonContext';

export function Header(){

  const { activeButton } = useContext(ActiveButtonContext);

  const renderHeading = () => {
    switch (activeButton) {
      case 'dashboard':
        return 'Dashboard';
      case 'request':
        return 'Request';
      case 'activities':
        return 'Activities';
      case 'modules':
        return "Modules";
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };



  return (
    <div className={styleHeader.mainContent}>
      <div className={styleHeader.horizontalMenu}>
        <div className={styleHeader.dashboardEntrance}>
          <h1>{renderHeading()}</h1>
        </div>
        <div className={styleHeader.imageContainer}>
          <img src={dict} alt="DICT" className={styleHeader.dict}/>
        </div>
      </div>

    </div>
  )
}