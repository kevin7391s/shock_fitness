import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import NavBar from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";

function Profile() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "User");
      } else {
        setUsername("Guest");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      className="bg-black min-h-screen text-white"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          src="/images/profile.png"
          alt="Fitness App Logo"
          className=" mb-20"
          width={300}
          height={100}
        />

        <div className="rounded-full h-70 w-64 overflow-hidden mb-10">
          <img src="/images/exerciseMan.jpg" alt="Profile picture" />
        </div>
        <h2 className="text-4xl mb-10 mt-5">{username}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="p-4 bg-gray-800 rounded shadow-lg"
            style={{ backgroundColor: "#424242" }}
          >
            <h2 className="text-l">Friends</h2>
            <p className="text-sm">0</p>
          </div>
          <div
            className="p-4 bg-gray-800 rounded shadow-lg "
            style={{ backgroundColor: "#424242" }}
          >
            <h2 className="text-l">Total Workouts</h2>
            <p className="text-sm">0</p>
          </div>
          <div
            className="p-4 bg-gray-800 rounded shadow-lg"
            style={{ backgroundColor: "#424242" }}
          >
            <h2 className="text-l">Cardio </h2>
            <p className="text-sm">0</p>
          </div>
          <div
            className="p-4 bg-gray-800 rounded shadow-lg"
            style={{ backgroundColor: "#424242" }}
          >
            <h2 className="text-l">Weight Training</h2>
            <p className="text-sm">0</p>
          </div>
        </div>
        <Link
          href="/addWorkout"
          className="flex flex-col items-center mt-10 bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded"
        >
          Add workout
        </Link>
        <Link
          href="/viewWorkouts"
          className="flex flex-col items-center mt-10 bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded"
        >
          View past workouts
        </Link>
      </div>
    </div>
  );
}

export default Profile;
