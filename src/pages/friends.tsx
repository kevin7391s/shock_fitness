import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import React from "react";

function friends() {
  return (
    <div>
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-black text-white"
        style={{ backgroundColor: "#121212" }}
      >
        <NavBar />
        <Footer />
      </div>
    </div>
  );
}

export default friends;
