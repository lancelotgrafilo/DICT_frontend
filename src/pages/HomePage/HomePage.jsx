import "bootstrap/dist/css/bootstrap.min.css";
import styleHomePage from "./homePage.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";

export function Homepage() {
  
  return (
    <div className={styleHomePage.mainContent}>
      <Header />

      <div>
        <h1>Banner</h1>
      </div>

      <div>
        <h1>Mission, Vision and Etc.</h1>
        <div>
          <h1>Mission</h1>
        </div>
        <div>
          <h1>Vision</h1>
        </div>
        <div>
          <h1>Divisions</h1>
        </div>
      </div>

      <div>
        <h1>Report a scam</h1>
        <img src="" alt="CICC" />
        etc.
      </div>

      <Footer/>

      
    </div>
  );
};
