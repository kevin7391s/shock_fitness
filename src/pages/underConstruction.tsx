import React from "react";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";

function UnderConstruction() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <div className="">
        <Image
          src="/images/worker.png"
          alt="Worker"
          className="relative "
          width={500}
          height={1000}
        />
      </div>
      <div className="text-center">
        <h1 className="text-5xl font-bold mt-10">Under Construction</h1>
        <p className="text-xl mt-5">
          We're working on this page. Please check back soon!
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default UnderConstruction;
