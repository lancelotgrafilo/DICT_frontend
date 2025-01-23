import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styleModule from "./modules.module.css"; // Import CSS module
import pic from '../../assets/img/pic.jpg';
const modules = {
  beginners: [
    { title: "Module 1", pdf: "/pdfs/beginners-module1.pdf" },
    { title: "Module 2", pdf: "/pdfs/beginners-module2.pdf" },
    { title: "Module 3", pdf: "/pdfs/beginners-module3.pdf" },
    { title: "Module 4", pdf: "/pdfs/beginners-module4.pdf" },
  ],
  intermediate: [
    { title: "Module 1", pdf: "/pdfs/intermediate-module1.pdf" },
    { title: "Module 2", pdf: "/pdfs/intermediate-module2.pdf" },
    { title: "Module 3", pdf: "/pdfs/intermediate-module3.pdf" },
  ],
  technical: [
    { title: "Module 1", pdf: "/pdfs/technical-module1.pdf" },
    { title: "Module 2", pdf: "/pdfs/technical-module2.pdf" },
    { title: "Module 3", pdf: "/pdfs/technical-module3.pdf" },
  ],
};

export function Modules() {
  const handleModuleClick = (pdf) => {
    window.open(pdf, "_blank");
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3, // Show 3 cards for large screens
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2, // Show 2 cards for medium screens
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1, // Show 1 card for smaller screens
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // Show 1 card for mobile
    },
  };

  const renderCarousel = (category) => (
    <Carousel responsive={responsive} infinite autoPlay>
      {modules[category].map((module, index) => (
        <div
          key={index}
          className={styleModule.moduleItem}
          onClick={() => handleModuleClick(module.pdf)}
        >
          <img src={pic} alt="Module Img" />
          <h3>{module.title}</h3>
          <p>Lorem ipsum dolor sit amet cons expedita nesciunt, dolorum nostrum natus, eos porro nisi!</p>
          <button>View Details</button>
        </div>
      ))}
    </Carousel>
  );

  return (
    <div className={styleModule.modulePage}>
      <div className={styleModule.category}>
        <h2 className={styleModule.categoryTitle}>Beginners</h2>
        {renderCarousel("beginners")}
      </div>
      <div className={styleModule.category}>
        <h2 className={styleModule.categoryTitle}>Intermediate</h2>
        {renderCarousel("intermediate")}
      </div>
      <div className={styleModule.category}>
        <h2 className={styleModule.categoryTitle}>Technical</h2>
        {renderCarousel("technical")}
      </div>
    </div>
  );
}

export default Modules;
