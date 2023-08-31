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
      type: "Add Workout",
    },
    {
      image: "/images/boxingman.jpg",
      text: "This is some overlay text.",
      type: "Add Workout",
    },
  ];
  const cardData2 = [
    {
      image: "/images/weightTraining.png",
      text: "",
      type: "View Workouts",
    },
    {
      image: "/images/weightlifting.jpg",
      text: "This is some overlay text.",
      type: "View Workouts",
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

        <div className="static mt-5 text-center items-center">
          <Card cardData={cardData1} />
        </div>
        <Link
          href="/addWorkout"
          className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded mt-7 mb-8  "
        >
          Add Workout
        </Link>
        <div className="static mt-7 text-center items-center">
          <Card cardData={cardData2} />
        </div>
        <Link
          href="/viewWorkouts"
          className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded mt-7 mb-8 "
        >
          View Workouts
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
