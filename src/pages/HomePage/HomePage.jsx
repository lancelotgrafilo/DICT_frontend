import "bootstrap/dist/css/bootstrap.min.css";
import styleHomePage from "./homePage.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";



import { Modules } from "../../components/Modules/Modules";

export function Homepage() {
  
  return (
    <div className={styleHomePage.mainContent}>
      <Header />
      <Modules />

      <div className={styleHomePage.requestContainer}>  
        <h3>Request Speaker</h3>
        <button aria-placeholder="Request Speaker">
          <Link to="/request-form">
            Request Speaker
          </Link>
        </button>
      </div>

      
    </div>
  );
};
