import React from "react";
import NavBar from "@/components/navbar";
import Image from "next/image";

function home() {
  return (
    <div
      className="flex flex-col min-h-screen bg-black"
      style={{ backgroundColor: "#121212" }}
    >
      <Image
        src="/images/shockfitnesstransparent.png"
        alt="Fitness App Logo"
        className="relative top-20"
        width={600}
        height={100}
      />
      <NavBar />
    </div>
  );
}

export default home;
