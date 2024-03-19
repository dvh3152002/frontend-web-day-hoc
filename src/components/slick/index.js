import React from "react";
import Slider from "react-slick";
import Course from "../course";
import { useMediaQuery } from "react-responsive";

function SlickComponent(props) {
  const { courses, isDesktopOrLaptop, isTablet } = props;
  var settings = {
    className: "center",
    dots: false,
    infinite: false,
    speed: 500,
    breakpoint: isDesktopOrLaptop ? 4 : isTablet ? 3 : 1,
    slidesToShow: isDesktopOrLaptop ? 4 : isTablet ? 3 : 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {courses?.map((item) => {
          return (
            <Course
              isDesktopOrLaptop={isDesktopOrLaptop}
              isTablet={isTablet}
              key={item.id}
              data={item}
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default SlickComponent;
