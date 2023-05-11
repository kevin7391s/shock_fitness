import React from "react";
import NavBar from "@/components/navbar";

function Profile() {
  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl mb-10">Profile</h1>
        <div className="rounded-full h-64 w-64 overflow-hidden mb-10">
          <img src="/images/exerciseMan.jpg" alt="Profile picture" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded shadow-lg">
            <h2 className="text-2xl">Friends</h2>
            <p>Placeholder for friends data</p>
          </div>
          <div className="p-4 bg-gray-800 rounded shadow-lg">
            <h2 className="text-2xl">Total Workouts</h2>
            <p>Placeholder for total workouts data</p>
          </div>
          <div className="p-4 bg-gray-800 rounded shadow-lg">
            <h2 className="text-2xl">Cardio Days</h2>
            <p>Placeholder for cardio days data</p>
          </div>
          <div className="p-4 bg-gray-800 rounded shadow-lg">
            <h2 className="text-2xl">Weight Training Days</h2>
            <p>Placeholder for weight training days data</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
