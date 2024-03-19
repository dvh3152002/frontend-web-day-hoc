import React from "react";
import { Carousel } from "antd";

function CarouselSlider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:min-h-[600px] w-full">
      <Carousel autoplay style={{ height: "100%" }}>
        <img
          src="https://glints.com/vn/blog/wp-content/uploads/2022/11/full-stack-la%CC%80-gi%CC%80.jpg"
          className="h-56 sm:h-64 xl:h-80 2xl:h-[600px] w-full"
          alt="..."
        />
        <img
          src="https://glints.com/vn/blog/wp-content/uploads/2022/11/full-stack-developer-1536x869.jpg"
          className="h-56 sm:h-64 xl:h-80 2xl:h-[600px] w-full"
          alt="..."
        />
        <img
          src="https://asia-1.console.stringee.com/upload/IMG_PM9XE6EXBMPG7870.jpg"
          className="h-56 sm:h-64 xl:h-80 2xl:h-[600px] w-full"
          alt="..."
        />
      </Carousel>
    </div>
  );
}

export default CarouselSlider;
