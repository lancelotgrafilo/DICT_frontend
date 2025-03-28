import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styleHomePage from "./homePage.module.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/img/cyberLarge.png";
import img2 from "../../assets/img/img2.png";
import img3 from "../../assets/img/img3.png";
import missionImage from "../../assets/img/mission.png"; // Add an image for Mission and Vision
import mandateImage from "../../assets/img/mandate.png"; // Add an image for Mandate, Powers, and Functions
import facebookIcon from "../../assets/img/facebook.png";
import instagramIcon from "../../assets/img/instagram.png";
import twitterIcon from "../../assets/img/twitter.png";
import youtubeIcon from "../../assets/img/youtube.png";
import divisionsImage from "../../assets/img/divisions.png"; // Add an image for Divisions
import ciccLogo from "../../assets/logo/cicc.png";
import npcLogo from "../../assets/logo/npc.png";
import ntcLogo from "../../assets/logo/ntc.png";


export function Homepage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleDivisionClick = () => {
    navigate("/divisions"); // Redirect to the division page
  };
  const handleOutcomeClick = () => {
    const outcomes = ["Enhanced Cybersecurity", "Increased Awareness", "Better Data Protection"];
    navigate("/outcomes", { state: { outcomes } });
  };


  return (
    <div className={styleHomePage.mainContent}>
      <Header />
      {/* Banner Carousel */}
      <div className={styleHomePage.banner}>
        <Carousel
          indicators // Enables dot navigation
          controls={false} // Disables arrow navigation
          interval={3000} // Automatically advances every 3 seconds (3000ms)
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
              style={{ height: "480px", objectFit: "cover" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img2}
              alt="Second slide"
              style={{ height: "480px", objectFit: "cover" }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item onClick={handleOutcomeClick} style={{ cursor: "pointer" }}>
            <img
              className="d-block w-100"
              src={img3}
              alt="Third slide"
              style={{ height: "480px", objectFit: "cover" }}
            />
          </Carousel.Item>
        </Carousel>
      </div>
      {/* Mission, Vision, Divisions Cards */}
      <h1>Who We Are</h1>
      <div className={styleHomePage.divider}>
        <div className={styleHomePage.blue_section}></div>
        <div className={styleHomePage.red_section}></div>
      </div>
      <p>The DICT Cybersecurity Bureau is tasked to implement the National CyberSecurity Plan</p>
      <div className={styleHomePage.cardContainer}>
        {/* Mission and Vision Card */}
        <div className={styleHomePage.flipCard}>
          <div className={styleHomePage.flipCardInner}>
            <div className={styleHomePage.flipCardFront}>
              <img
                src={missionImage}
                alt="Mission and Vision"
                className={styleHomePage.cardImage}
              />
              <h2>Mission and Vision</h2>
              <p>
                DICT aspires for the Philippines to develop and flourish through
                innovation and constant development of ICT in the pursuit of a
                progressive, safe, secured, contented, and happy Filipino nation.
              </p>
            </div>
            <div className={styleHomePage.flipCardBack}>
              <h2>View Details</h2>
            </div>
          </div>
        </div>
        {/* Mandate, Powers, and Functions Card */}
        <div className={styleHomePage.flipCard}>
          <div className={styleHomePage.flipCardInner}>
            <div className={styleHomePage.flipCardFront}>
              <img
                src={mandateImage}
                alt="Mandate, Powers, and Functions"
                className={styleHomePage.cardImage}
              />
              <h2>Mandate, Powers, and Functions</h2>
              <p>
                The Department of Information and Communications Technology
                (DICT) is the primary ICT agency of the Philippine government
                created through Republic Act No. 10844.
              </p>
            </div>
            <div className={styleHomePage.flipCardBack}>
              <h2>View Details</h2>
            </div>
          </div>
        </div>
        {/* Divisions Card */}
        <div className={styleHomePage.flipCard} onClick={handleDivisionClick}>
          <div className={styleHomePage.flipCardInner}>
            <div className={styleHomePage.flipCardFront}>
              <img
                src={divisionsImage}
                alt="Divisions"
                className={styleHomePage.cardImage}
              />
              <h2>Divisions</h2>
              <p>
                The DICT is organized into various divisions to effectively carry
                out its mandate.
              </p>
            </div>
            <div className={styleHomePage.flipCardBack}>
              <h2
                style={{
                  color: "white",
                  transition: "color 0.3s ease-in-out, textShadow 0.3s ease-in-out",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#ffcc00"; // DICT Yellow Accent
                  e.target.style.textShadow = "2px 2px 10px rgba(255, 204, 0, 0.8)"; // Glow Effect
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white"; // Back to original color
                  e.target.style.textShadow = "none";
                }}
              >
                View Details
              </h2>
            </div>

          </div>
        </div>
      </div>

      {/* News, Tips, and Advisories Section */}
      <div className={styleHomePage.newsSection}>
        <h1 className={styleHomePage.centeredTitle}>News, Tips, and Advisories</h1>
        <div className={styleHomePage.socialMediaSection}>
          <div className={styleHomePage.socialMediaContainer}>
            <span className={styleHomePage.socialText}>Get Our</span>
            <strong className={styleHomePage.socialHighlight}>Latest Updates</strong>
          </div>
          <div className={styleHomePage.socialIcons}>
            <a href="https://x.com/CYBERSECgovph/status/1447752966451040258" className={styleHomePage.socialIcon}>
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="https://www.facebook.com/CYBERSECgovph" className={styleHomePage.socialIcon}>
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="https://www.youtube.com/DICTCybersecurity" className={styleHomePage.socialIcon}>
              <img src={youtubeIcon} alt="YouTube" />
            </a>
            <a href="https://www.instagram.com/dictcsb/" className={styleHomePage.socialIcon}>
              <img src={instagramIcon} alt="Instagram" />
            </a>
          </div>
        </div>
        <div className={styleHomePage.cardViewContainer}>
          {/* Single Card View with Vertical Lines */}
          <div className={styleHomePage.singleCard}>
            {/* News Section */}
            <div className={styleHomePage.topic}>
              <div className={styleHomePage.topicIcon}>
                <i className="bi bi-newspaper"></i> {/* Bootstrap Icon for News */}
              </div>
              <h3 className={styleHomePage.topicTitle}>News</h3>
              <p className={styleHomePage.topicParagraph}>
                Stay updated with the latest news and announcements from DICT.
              </p>
            </div>
            {/* Vertical Line */}
            <div className={styleHomePage.verticalLine}></div>
            {/* Tips Section */}
            <div className={styleHomePage.topic}>
              <div className={styleHomePage.topicIcon}>
                <i className="bi bi-lightbulb"></i> {/* Bootstrap Icon for Tips */}
              </div>
              <h3 className={styleHomePage.topicTitle}>Tips</h3>
              <p className={styleHomePage.topicParagraph}>
                Learn useful tips to enhance your digital safety and productivity.
              </p>
            </div>
            {/* Vertical Line */}
            <div className={styleHomePage.verticalLine}></div>
            {/* Advisories Section */}
            <div className={styleHomePage.topic}>
              <div className={styleHomePage.topicIcon}>
                <i className="bi bi-exclamation-triangle"></i> {/* Bootstrap Icon for Advisories */}
              </div>
              <h3 className={styleHomePage.topicTitle}>Advisories</h3>
              <p className={styleHomePage.topicParagraph}>
                Get important advisories on cybersecurity and digital services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report a Scam Section */}
      <div className={styleHomePage.reportSection}>
        <h1>Report a Scam</h1>
        <div className={styleHomePage.logosContainer}>
          <a
            href="https://privacy.gov.ph/"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={npcLogo}
              alt="National Privacy Commission (NPC)"
              className={`${styleHomePage.logoImage} ${styleHomePage.npcLogo}`}
            />
          </a>
          <a
            href="https://ntc.gov.ph/?appgw_azwaf_jsc=cEJ4I0O-yNfIGERGaduRfptdlfZhAHcG_F1Rx8ywEKA"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={ntcLogo}
              alt="National Telecommunications Commission (NTC)"
              className={styleHomePage.logoImage}
            />
          </a>
          <a
            href="https://cicc.gov.ph/mandate-powers-and-functions/"
            rel="noopener noreferrer">
            <img
              src={ciccLogo}
              alt="Cyber Incident Coordination Center (CICC)"
              className={styleHomePage.logoImage}
            />
          </a>
        </div>
        <p>
          Report scams to the relevant authorities by contacting the National Privacy
          Commission (NPC), National Telecommunications Commission (NTC), or Cybercrime
          Invistigation Coordinating Center (CICC).
        </p>
      </div>
      <Footer />
    </div>
  );
}