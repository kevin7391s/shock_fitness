import React from "react";
import NavBar from "@/components/navbar";
import Image from "next/image";
import Card from "@/components/card";

function home() {
  return (
    <div
      className="flex flex-col min-h-screen bg-black"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <Image
        src="/images/shockfitnesstransparent.png"
        alt="Fitness App Logo"
        className="relative top-10 mt-6"
        width={600}
        height={100}
      />
      <div className="mt-5 text-center items-center">
        <Card />
        <div />
      </div>
    </div>
  );
}

export default home;
