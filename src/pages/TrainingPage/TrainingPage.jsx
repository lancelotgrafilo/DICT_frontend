import styleTraining from "./trainingPage.module.css";

export function TrainingPage (){
  return (
    <>
      <div className={styleTraining.pageContainer}>
        <div className={styleTraining.testDiv}>
          <h1 className={styleTraining.header1}>Hello world</h1>
        </div>

        <div className={styleTraining.beginnerContainer}>Beginner</div>
        <div className={styleTraining.intermediateContainer}>Intermediate</div>
        <div className={styleTraining.technicalContainer}>Technical</div>

        <div className={styleTraining.reqSpeaker}>Request Speaker</div>
      </div>
      


    </>
  )
  
}