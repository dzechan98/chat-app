import { ListImage } from "@/interfaces";
import React from "react";
import { IoIosClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface SliderImageProps {
  listImage: ListImage;
  index: number;
  onCloseSliderImage: () => void;
}

const SliderImage: React.FC<SliderImageProps> = ({
  listImage,
  index,
  onCloseSliderImage,
}) => {
  return (
    <div className="overlay fixed w-screen h-screen top-0 left-0 z-[100] bg-overlay">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="max-w-[1240px] h-full"
        initialSlide={index}
      >
        {listImage.length > 0 &&
          listImage.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full center h-full">
                <img
                  src={image.source}
                  alt=""
                  className="max-h-[70vh] object-cover max-w-[80%] lg:max-w-[60%]"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div
        className="absolute right-8 top-8 text-4xl cursor-pointer text-light z-[100]"
        onClick={onCloseSliderImage}
      >
        <IoIosClose />
      </div>
    </div>
  );
};

export default SliderImage;
