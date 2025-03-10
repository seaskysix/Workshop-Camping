"use client";
import { LandmarkCardProps } from "@/utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Autoplay, Pagination } from "swiper/modules";
import OtherInfo from "./OtherInfo";

const Hero = ({ landmarks }: { landmarks: LandmarkCardProps[] }) => {
  return (
    <div>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 2000,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {landmarks.map((landmark) => {
          return (
            <SwiperSlide key={landmark.id} className="group">
              <div className="relative rounded-md overflow-hidden">
                <Image
                  className="w-full h-[600px] object-cover
                  brightness-75 group-hover:brightness-50 
                  transition-all duration-300"
                  src={landmark.image}
                  alt={landmark.name} // ✅ เพิ่ม alt text
                  width={1200} // ✅ กำหนดขนาดภาพเพื่อช่วย optimize
                  height={600}
                  priority // ✅ ช่วยให้โหลดเร็วขึ้น
                  sizes="(max-width: 768px) 100vw, 1200px" // ✅ คำแนะนำเพื่อให้โหลดภาพได้อย่างมีประสิทธิภาพ
                />
                <div className="absolute bottom-0 left-0 z-50">
                  <div
                    className="col-span-4 mb-4 flex h-full flex-1
                  justify-end px-5 md:mb-4 md:justify-end md:px-10"
                  >
                    <OtherInfo landmark={landmark} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default Hero;
