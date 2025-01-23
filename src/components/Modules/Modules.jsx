import styleModules from './modules.module.css';

export function Modules(){
  return(
    <div className={styleModules.mainContainer}>
      <div className={styleModules.modulesContainer}>
        <h1>Modules</h1>
      </div>
    </div>
  )
}