import { useState } from "react";
import Image from "next/image";

export default function Card() {
  const [cardState, setCardState] = useState(0);

  const cardData = [
    {
      image: "/images/image1.jpg",
      text: "",
    },
    {
      image: "/images/image2.jpg",
      text: "This is some overlay text.",
    },
  ];

  const handleClick = () => {
    setCardState((cardState + 1) % cardData.length);
  };

  return (
    <div
      className="relative w-64 h-64 mx-auto mt-6 overflow-hidden bg-white rounded-lg shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={cardData[cardState].image}
        alt="Card Image"
        layout="fill"
        objectFit="cover"
      />
      {cardData[cardState].text && (
        <div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 text-white">
          {cardData[cardState].text}
        </div>
      )}
    </div>
  );
}
