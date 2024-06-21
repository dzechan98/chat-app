import banner1 from "@/assets/banner1.png";
import banner2 from "@/assets/banner2.png";
import banner3 from "@/assets/banner3.png";
import banner4 from "@/assets/banner4.png";
import banner5 from "@/assets/banner5.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Title } from "@/components/Title";

const Banner = () => {
  const listBanner = [
    {
      id: 1,
      img: banner1,
      title: "Text more, text less",
      description:
        "Use instant messaging to save frequently used messages and quickly send them in any conversation.",
    },
    {
      id: 2,
      img: banner2,
      title: "Messages delete themselves",
      description:
        "From now on, messages can be automatically deleted after a certain period of time.",
    },
    {
      id: 3,
      img: banner3,
      title: "Work effectively",
      description: "Exchange work anytime, anywhere.",
    },
    {
      id: 4,
      img: banner4,
      title: "Experience throughout",
      description:
        "Connect and get work done on any device with data that is always synchronized.",
    },
    {
      id: 5,
      img: banner5,
      title: "Group chat with colleagues",
      description: "More convenient, thanks to chat support tools on computers",
    },
  ];

  return (
    <div className="w-full h-screen pt-10 px-4 center flex-col text-main-200">
      <h2 className="text-2xl text-center mb-5 text-primary">
        Welcome to <strong>Via chat</strong>
      </h2>
      <p className="text-center text-sm mb-10">
        Discover utilities to help you work and chat with relatives and friends
        optimized for your computer.
      </p>
      <Swiper
        slidesPerView={1}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="w-[300px] md:w-[500px] xl:w-[800px]"
      >
        {listBanner.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="w-full center flex-col mb-20">
              <img
                src={banner.img}
                alt="banner"
                className="w-[300px] lg:w-[380px]mb-10"
              />
              <Title className="text-primary mb-4 text-lg">
                {banner.title}
              </Title>
              <p className="text-sm">{banner.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
