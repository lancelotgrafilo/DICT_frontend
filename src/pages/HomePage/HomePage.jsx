
import "bootstrap/dist/css/bootstrap.min.css";
import styleHomePage from "./homePage.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/img/img1.png";
import img2 from "../../assets/img/img2.png";
import img3 from "../../assets/img/img3.png";
import img4 from "../../assets/img/cyberLarge.png";
import missionImage from "../../assets/img/mission.png"; // Add an image for Mission and Vision
import mandateImage from "../../assets/img/mandate.png"; // Add an image for Mandate, Powers, and Functions
import divisionsImage from "../../assets/img/divisions.png"; // Add an image for Divisions
import ciccLogo from "../../assets/logo/cicc.png";
import npcLogo from "../../assets/logo/npc.png";
import ntcLogo from "../../assets/logo/ntc.png";


export function Homepage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleDivisionClick = () => {
    navigate("/divisions"); // Redirect to the divisions page
  };

  return (
    <div className="mainContent">
      {/* Header */}
      <Header />

      {/* Banner Carousel */}
      <Carousel className="banner">
        <Carousel.Item>
          <img src={img1} alt="Banner 1" className="d-block w-100" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img2} alt="Banner 2" className="d-block w-100" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img3} alt="Banner 3" className="d-block w-100" />
        </Carousel.Item>
      </Carousel>

      {/* Mission, Vision, and Divisions Cards */}
      <div className="cardContainer">
      <div className={styleHomePage.banner}>
        <Carousel
          indicators // Enables dot navigation
          controls={false} // Disables arrow navigation
          interval={5000} // Automatically advances every 5 seconds (5000ms)
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img2}
              alt="Second slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img3}
              alt="Third slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img4}
              alt="Fourth slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      
      {/* Mission, Vision, Divisions Cards */}
      <div className={styleHomePage.cardContainer}>
        {/* Mission and Vision Card */}
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <img src={missionImage} alt="Mission" className="cardImage" />
              <h2>Mission and Vision</h2>
              <p>
                DICT aspires for the Philippines to develop and flourish through
                innovation and constant development of ICT in the pursuit of a
                progressive, safe, secured, contented, and happy Filipino nation.
              </p>
            </div>
            <div className="flipCardBack">
              <button onClick={() => alert("View Details")}>View Details</button>
            </div>
          </div>
        </div>

        {/* Mandate, Powers, and Functions Card */}
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <img src={mandateImage} alt="Mandate" className="cardImage" />
              <h2>Mandate, Powers, and Functions</h2>
              <p>
                The Department of Information and Communications Technology (DICT)
                is the primary ICT agency of the Philippine government created
                through Republic Act No. 10844.
              </p>
            </div>
            <div className="flipCardBack">
              <button onClick={() => alert("View Details")}>View Details</button>
            </div>
          </div>
        </div>

        {/* Divisions Card */}
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <img src={divisionsImage} alt="Divisions" className="cardImage" />
              <h2>Divisions</h2>
              <p>
                The DICT is organized into various divisions to effectively carry
                out its mandate.
              </p>
            </div>
            <div className="flipCardBack">
              <button onClick={handleDivisionClick}>View Details</button>
            </div>
          </div>
        </div>
      </div>

      {/* News, Alerts, and Advertisements Section */}
      <div className="newsSection">
        <div className="centeredTitle">News, Alerts, and Advertisements</div>
        <div className="cardViewContainer">
          <div className="singleCard">
            {/* News Section */}
            <div className="topic">
              <div className="topicIcon">
                <i className="bi bi-newspaper"></i>
              </div>
              <div className="topicTitle">News</div>
              <div className="topicParagraph">
                Stay updated with the latest news and announcements from DICT.
              </div>
              <div className="topicFooter">
                <div className="date">Feb 28, 2025</div>
                <button className="circleButton">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* Vertical Line */}
            <div className="verticalLine"></div>

            {/* Alert Section */}
            <div className="topic">
              <div className="topicIcon">
                <i className="bi bi-exclamation-triangle"></i>
              </div>
              <div className="topicTitle">Alert</div>
              <div className="topicParagraph">
                Important alerts and notifications regarding cybersecurity and digital services.
              </div>
              <div className="topicFooter">
                <div className="date">Feb 28, 2025</div>
                <button className="circleButton">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* Vertical Line */}
            <div className="verticalLine"></div>

            {/* Advertisement Section */}
            <div className="topic">
              <div className="topicIcon">
                <i className="bi bi-megaphone"></i>
              </div>
              <div className="topicTitle">Advertisement</div>
              <div className="topicParagraph">
                Discover upcoming events, campaigns, and promotional activities.
              </div>
              <div className="topicFooter">
                <div className="date">Feb 28, 2025</div>
                <button className="circleButton">
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report a Scam Section */}
      <div className="reportSection">
        <h2>Report a Scam</h2>
        <p>
          Report scams to the relevant authorities by contacting the National Privacy
          Commission (NPC), National Telecommunications Commission (NTC), or Cybercrime
          Investigation Coordinating Center (CICC).
        </p>
        <div className="logosContainer">
          <img src={npcLogo} alt="NPC Logo" className="logoImage npcLogo" />
          <img src={ntcLogo} alt="NTC Logo" className="logoImage" />
          <img src={ciccLogo} alt="CICC Logo" className="logoImage" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}