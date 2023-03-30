import React from "react";
import NavBar from "@/components/navbar";

function home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
    </div>
  );
}

export default home;
