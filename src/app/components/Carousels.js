"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Carousels = () => {
  return (
    <div className="h-[40vh] sm:h-[60vh]">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img
            src="/maxresdefault (1).jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/maxresdefault.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/2eadf5469701ace9b93c79c02204f76d.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousels;
