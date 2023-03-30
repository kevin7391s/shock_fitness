import React from "react";
import NavBar from "@/components/navbar";
import Image from "next/image";
import Card from "@/components/card";
import Link from "next/link";

function home() {
  const cardData1 = [
    {
      image: "/images/heartlogo.png",
      text: "",
      type: "Cardio",
    },
    {
      image: "/images/boxingman.jpg",
      text: "This is some overlay text.",
    },
  ];
  const cardData2 = [
    {
      image: "/images/heartlogo.png",
      text: "",
      type: "Weight training",
    },
    {
      image: "/images/boxingman.jpg",
      text: "This is some overlay text.",
    },
  ];
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-black"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <Image
        src="/images/shockfitnesstransparent.png"
        alt="Fitness App Logo"
        className="relative top-10 mt-10 ml-5"
        width={800}
        height={100}
      />
      <div className="static mt-5 text-center items-center">
        <Card cardData={cardData1} />
      </div>
      <Link
        href="/login"
        className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded mt-7  "
      >
        Add Cardio
      </Link>
      <div className="static mt-7 text-center items-center">
        <Card cardData={cardData2} />
      </div>
    </div>
  );
}

export default home;
