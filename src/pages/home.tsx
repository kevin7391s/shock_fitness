import React from "react";
import NavBar from "@/components/navbar";
import Image from "next/image";
import Card from "@/components/card";
import Link from "next/link";
import Footer from "@/components/footer";

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
      type: "Cardio",
    },
  ];
  const cardData2 = [
    {
      image: "/images/weightTraining.png",
      text: "",
      type: "Weight training",
    },
    {
      image: "/images/weightlifting.jpg",
      text: "This is some overlay text.",
      type: "Weight training",
    },
  ];
  const cardData3 = [
    {
      image: "/images/ExerciseMan.jpg",
      text: "",
      type: "Profile",
    },
    {
      image: "/images/ExerciseMan.jpg",
      text: "This is some overlay text.",
      type: "Profile",
    },
  ];
  return (
    <div
      className="flex flex-col items-start min-h-screen bg-black"
      style={{ backgroundColor: "#121212" }}
    >
      <div className="flex flex-col items-center flex-grow w-full">
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
          href="/addWorkout"
          className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded mt-7 mb-8  "
        >
          Add Cardio
        </Link>
        <div className="static mt-7 text-center items-center">
          <Card cardData={cardData2} />
        </div>
        <Link
          href="/addWorkout"
          className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded mt-7 mb-8 "
        >
          Add weight training
        </Link>
        <div className="static mt-7 text-center items-center">
          <Card cardData={cardData3} />
        </div>
        <Link
          href="/profile"
          className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded mt-7 mb-36 "
        >
          Go to profile
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default home;
