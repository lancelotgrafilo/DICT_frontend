import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { FaChartLine, FaLightbulb, FaShieldAlt } from "react-icons/fa";
import "./Outcome.css";

export function Outcomes() {
  const navigate = useNavigate();

  const outcomesData = [
    {
      title: "Outcome 1: Market Expansion Achieved.",
      phrase: "Transform production sectors to generate more quality jobs and competitive products.",
      description: [
        "Ensure the safety and security in the cyber and physical spaces strategy discusses the necessity of cybersecurity and outlines the passing of the Cybersecurity and the Critical Information Infrastructure Protection Law/s as essential components of a strengthened legal framework for cybersecurity.",
        "Accelerate e-commerce adoption by micro, small, and medium enterprises strategy mentions the promotion of a cybersecurity culture in both global and local context as essential to achieving the strategy.",
        "Spearhead active promotions of tourism, culture, creative industries, and information technology and business process management strategy identifies cybersecurity as a high-yield and high-value industry that needs to be developed.",
      ],
      icon: <FaChartLine />,
    },
    {
      title: "Outcome 2: Creativity and innovation in services value proposition strengthened.",
      phrase: "Promote competition and improve regulatory efficiency.",
      description: [
        "Ensure the sustainable supply of a competitive, creative, and skilled workforce strategy mentions the need to strengthen collaboration between private and public sector in mentoring programs and in initiatives that aim to develop cybersecurity literacy, among others.",
        "Promote competition and improve regulatory efficiency in and through the internet and digital technologies.",
        "Expand access to broadband internet and digital technologies to enhance consumer choice and facilitate digitalization and innovation among micro, small, and medium enterprises strategy mentions the importance of cybersecurity in developing the national broadband plan.",
      ],
      icon: <FaLightbulb />,
    },
    {
      title: "Outcome 3: Protection and safety from natural hazards and other security threats.",
      phrase: "Ensure peace and security and enhance the administration of justice.",
      description: [
        "Protect critical infrastructure, strategic assets and natural resources strategy defines critical infrastructure to include information infrastructure.",
        "Strengthen security and resilience of the Philippines cyberspace strategy broadly defines key objectives, all of which are in the NCSP 2023-2028.",
      ],
      icon: <FaShieldAlt />,
    },
  ];

  const [selectedOutcome, setSelectedOutcome] = useState(outcomesData[0]);

  return (
    <div className="outcomes-container">
      <Header />
      <Container fluid className="outcomes-layout">
        <Row>
          {/* Sidebar Navigation */}
          <Col md={3} className="sidebar">
          <div className="header-container">
      <h3 className="header-title">NCSP 2023-2028: Outcomes and Context...</h3>
      <div className="divider">
        <div className="blue-section"></div>
        <div className="red-section"></div>
      </div>
      <div className="stars">
        <span>⭐</span>
        <span>⭐</span>
        <span>⭐</span>
      </div>
      <p>Click on each outcome to explore its key components and strategies.</p>
    </div>
            <Container className="sidebar-container">
              {outcomesData.map((outcome, index) => (
                <Container
                  key={index}
                  className={`sidebar-item-container ${
                    selectedOutcome.title === outcome.title ? "active" : ""
                  }`}
                  onClick={() => setSelectedOutcome(outcome)}
                  aria-selected={selectedOutcome.title === outcome.title}
                >
                  <li className="sidebar-item">
                    {outcome.icon} {outcome.title}
                  </li>
                </Container>
              ))}
            </Container>
          </Col>

          {/* Main Content */}
          <Col md={9} className="outcome-content">
            {/* Introduction Section */}
            {/* Selected Outcome Details */}
            <Card className="outcome-card">
              {selectedOutcome.image && (
                <Card.Img
                  variant="top"
                  src={`/images/${selectedOutcome.image}`}
                  alt={selectedOutcome.title}
                />
              )}
              <Card.Body>
                <Card.Title className="outcome-card-title">
                  {selectedOutcome.phrase}
                </Card.Title>
                <ul className="outcome-list">
                  {selectedOutcome.description.map((point, idx) => (
                    <li key={idx} className="outcome-item">
                      {point}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="secondary"
                  as="a"
                  href="/pdfs/NCSP_2028_v3.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more-button"
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>

            <Button
              variant="primary"
              className="back-button"
              onClick={() => navigate("/")}
            >
              Back to Homepage
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
  