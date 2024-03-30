import React from "react";
import { Avatar } from "@/components/Avatar";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

const ListUsers = () => {
  const listUser = [
    {
      id: 1,
      name: "Melloney",
      active: true,
      url: "http://dummyimage.com/182x100.png/ff4444/ffffff",
    },
    {
      id: 2,
      name: "Claire",
      active: false,
      url: "http://dummyimage.com/217x100.png/ff4444/ffffff",
    },
    {
      id: 3,
      name: "Etienne",
      active: false,
      url: "http://dummyimage.com/113x100.png/ff4444/ffffff",
    },
    {
      id: 4,
      name: "Erie",
      active: true,
      url: "http://dummyimage.com/101x100.png/5fa2dd/ffffff",
    },
    {
      id: 5,
      name: "Norean",
      active: true,
      url: "http://dummyimage.com/170x100.png/5fa2dd/ffffff",
    },
    {
      id: 6,
      name: "Conrado",
      active: true,
      url: "http://dummyimage.com/190x100.png/cc0000/ffffff",
    },
    {
      id: 7,
      name: "Deane",
      active: true,
      url: "http://dummyimage.com/147x100.png/ff4444/ffffff",
    },
    {
      id: 8,
      name: "Nefen",
      active: false,
      url: "http://dummyimage.com/226x100.png/dddddd/000000",
    },
    {
      id: 9,
      name: "Nell",
      active: true,
      url: "http://dummyimage.com/144x100.png/5fa2dd/ffffff",
    },
    {
      id: 10,
      name: "Hilary",
      active: true,
      url: "http://dummyimage.com/183x100.png/ff4444/ffffff",
    },
  ];

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={6}
      navigation={true}
      modules={[Navigation]}
      className="w-full"
    >
      {listUser.map((user) => (
        <SwiperSlide key={user.id}>
          <div className="w-full h-[120px] flex items-center">
            <div className="w-full relative h-14 bg-light-400 rounded-md flex-shrink-0">
              <h2 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-main-100 font-medium">
                {user.name.split(" ")[0]}
              </h2>
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Avatar url={user.url} iconActive active />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ListUsers;
