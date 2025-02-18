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