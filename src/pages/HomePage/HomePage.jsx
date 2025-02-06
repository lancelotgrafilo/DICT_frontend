import "bootstrap/dist/css/bootstrap.min.css";
import styleHomePage from "./homePage.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";



import { Modules } from "../../components/Modules/Modules";
import { Footer } from "../../components/Footer/Footer";

export function Homepage() {
  
  return (
    <div className={styleHomePage.mainContent}>
      <Header />
      <Modules />

      <div className="d-flex align-items-center justify-content-center min-vh-50 bg-light">
        <div className="w-100 p-5 d-flex flex-column align-items-center bg-white shadow-lg rounded-4">
          <h2 className="mb-4 fw-bold text-primary">Need a Speaker?</h2>
          <Link to="/request-form" className="btn btn-primary btn-lg px-4">
            Request Now
          </Link>
        </div>
      </div>

      <Footer/>

      
    </div>
  );
};
