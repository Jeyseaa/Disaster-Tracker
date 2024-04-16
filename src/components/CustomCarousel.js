import React, { useState } from "react";
import '../styles/custom.slider.css'; 

function CustomCarousel({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = React.Children.count(children);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="container__slider">
      <button className="slider__btn-prev" onClick={goToPrevSlide}>
        Prev
      </button>
      <button className="slider__btn-next" onClick={goToNextSlide}>
        Next
      </button>
      <div className="slider__items">
        {React.Children.map(children, (child, index) => (
          <div className={index === currentIndex ? "slider__item slider__item-active" : "slider__item"}>
            {child}
          </div>
        ))}
      </div>
      <div className="container__slider__links">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={index === currentIndex ? "container__slider__links-small container__slider__links-small-active" : "container__slider__links-small"}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default CustomCarousel;
