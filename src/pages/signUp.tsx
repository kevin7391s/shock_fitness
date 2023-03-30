import React from "react";
import Image from "next/image";

function signUp() {
  const handleSignup = () => {};
  return (
    <div
      className="flex flex-col items-center h-screen bg-black "
      style={{ backgroundColor: "#121212" }}
    >
      <div
        className=" flex flex-col items-center relative w-4/5 h-4/5 mx-auto  overflow-hidden bg-gray-200  rounded-lg border-2 border-gray-600 shadow-lg cursor-pointer mt-20"
        style={{ backgroundColor: "#424242" }}
      >
        <Image
          src="/images/shockfitnesstransparent.png"
          alt="Fitness App Logo"
          className=""
          width={600}
          height={100}
        />
        <div className=""></div>
      </div>
    </div>
  );
}

export default signUp;
