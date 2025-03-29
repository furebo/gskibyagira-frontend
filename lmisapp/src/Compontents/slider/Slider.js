import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSliderData } from "../../slider-data";
import "./Slider.css";

const Slider = () => {
  const sliderData = useSliderData();

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 10000;

  const defaultImage = "https://res.cloudinary.com/dazayujls/image/upload/v1740143396/lmisapp/ndumanyarwanda1.jpg"; 

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      {slideLength > 0 ? (
        sliderData.map((slide, index) => (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img
                  src={slide.image_url || defaultImage}
                  alt="slide"
                  className="image"
                  onError={(e) => (e.target.src = defaultImage)} // Handle broken images
                />
                <div className="content">
                  <h2>{slide.heading || "Default Heading"}</h2>
                  <p>{slide.description || "Default Description"}</p>
                  <hr />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        // Display default slide when no data is available
        <div className="slide current">
          <img src={defaultImage} alt="default-slide" className="image" />
          
        </div>
      )}
    </div>
  );
};

export default Slider;
