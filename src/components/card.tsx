import { useState } from "react";
import Image from "next/image";

interface CardData {
  image: string;
  type: string;
  text: string;
}

interface CardProps {
  cardData: CardData[];
}

export default function Card({ cardData }: CardProps) {
  const [cardState, setCardState] = useState(0);

  const handleClick = () => {
    setCardState((cardState + 1) % cardData.length);
  };

  return (
    <div
      className="flex flex-col items-center relative w-64 h-80 mx-auto  overflow-hidden bg-gray-200 justify-center rounded-lg border-2 border-gray-600 shadow-lg cursor-pointer  "
      style={{ backgroundColor: "#424242" }}
    >
      <p className="text-2xl content-start mb-10 text-white ">
        {cardData[cardState].type}
      </p>
      <Image
        src={cardData[cardState].image}
        alt="Card Image"
        className="mt-5 mb-10 rounded-full"
        width={100}
        height={100}
        onClick={handleClick}
      />
      <p className="mt-5 text-white">Click icon</p>
      {cardData[cardState].text && (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-white bg-black bg-opacity-50  ">
          {cardData[cardState].text}
          <Image
            src={cardData[cardState].image}
            alt="Card Image"
            className="absolute inset-0 object-cover w-full h-full "
            width={100}
            height={100}
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
}
