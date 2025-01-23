import styleHeader from './header.module.css';

export function Header(){
  return (
    <div className={styleHeader.headerContainer}>
      <span className={styleHeader.headerText}>Modules</span>
      
    </div>
  )
}