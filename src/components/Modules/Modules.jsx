import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styleModule from "./modules.module.css";
import pic from "../../assets/img/pic.jpg";
import useGetModules from "../../utils/Hooks/ModulesHooks/useGetModules";

export function Modules() {
  const { modules, loading, error } = useGetModules(); 
  const [categorizedModules, setCategorizedModules] = useState({});

  useEffect(() => {
    if (modules) {
      const categorized = { beginners: [], intermediate: [], technical: [] };

      modules.forEach((module) => {
        if (module.difficulty === "Beginner") {
          categorized.beginners.push(module);
        } else if (module.difficulty === "Intermediate") {
          categorized.intermediate.push(module);
        } else if (module.difficulty === "Technical") {
          categorized.technical.push(module);
        }
      });
      

      setCategorizedModules(categorized);
    }
  }, [modules]);
  

  const handleModuleClick = (moduleId) => {
    console.log(`Module clicked: ${moduleId}`);
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const renderCarousel = (category) => {
    const categoryModules = categorizedModules[category];
    if (categoryModules && categoryModules.length > 0) {
      return (
        <Carousel responsive={responsive} infinite autoPlay>
          {categoryModules.map((module) => (
            <div
              key={module._id}
              className={styleModule.moduleItem}
              onClick={() => handleModuleClick(module._id)}
            >
              <img src={pic} alt="Module Img" />
              <h3>{module.module_name}</h3>
              <p>{module.module_description || "Lorem ipsum dolor sit amet..."}</p>
              <button>View Details</button>
            </div>
          ))}
        </Carousel>
      );
    } else {
      return <p>No modules found in this category.</p>;
    }
  };
  

  if (loading) {
    return <p>Loading modules...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styleModule.modulePage}>
      <div>
        <h1>Modules</h1>
      </div>
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
