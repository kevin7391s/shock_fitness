import React from "react";
import NavBar from "@/components/navbar";
import Image from "next/image";
import Card from "@/components/card";
import Link from "next/link";

function home() {
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-black"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <Image
        src="/images/shockfitnesstransparent.png"
        alt="Fitness App Logo"
        className="relative top-10 mt-10"
        width={600}
        height={100}
      />
      <div className="mt-5 text-center items-center">
        <Card />
      </div>
      <Link
        href="/login"
        className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded mt-4  "
      >
        Add Cardio
      </Link>
    </div>
  );
}

export default home;
