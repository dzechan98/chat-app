import SliderImage from "@/components/SliderImage/SliderImage";
import { Title } from "@/components/Title";
import { useDisclosure } from "@/hooks";
import { ListImage } from "@/interfaces";
import React, { useState } from "react";

interface ListImageChatProps {
  listImage: ListImage;
}

const ListImageChat: React.FC<ListImageChatProps> = ({ listImage }) => {
  const sliderImageDisclosure = useDisclosure();
  const [indexSelected, setIndexSelected] = useState(0);

  const handleOpenModal = (i: number) => {
    setIndexSelected(i);
    sliderImageDisclosure.onOpen();
  };

  return (
    <>
      <div className="px-4 py-2 grid grid-cols-3 gap-2">
        {listImage.length > 0 &&
          listImage.map((image, index) => (
            <div
              key={index}
              className="w-full cursor-pointer"
              onClick={() => handleOpenModal(index)}
            >
              <img
                src={image.source}
                alt=""
                className="w-full h-20 object-cover"
              />
            </div>
          ))}
        {listImage.length === 0 && <Title>No files</Title>}
      </div>
      {sliderImageDisclosure.isOpen && (
        <SliderImage
          listImage={listImage}
          onCloseSliderImage={sliderImageDisclosure.onClose}
          index={indexSelected}
        />
      )}
    </>
  );
};

export default ListImageChat;
