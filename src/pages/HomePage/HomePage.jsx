import styleHomePage from "./homePage.module.css";
import { Header } from "../../components/Header/Header";

export function Homepage () {
  return(
    <div className={styleHomePage.mainContent}>
      <Header/>
    </div>
)}