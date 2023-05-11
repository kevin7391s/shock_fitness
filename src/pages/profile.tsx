import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import NavBar from "@/components/navbar";

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
        <h1 className="text-6xl mb-10">Profile</h1>
        <div className="rounded-full h-64 w-64 overflow-hidden mb-10">
          <img src="/images/exerciseMan.jpg" alt="Profile picture" />
        </div>
        <h2 className="text-4xl mb-10">{username}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="p-4 bg-gray-800 rounded shadow-lg"
            style={{ backgroundColor: "#424242" }}
          >
            <h2 className="text-xl">Friends</h2>
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
            <h2 className="text-l">Cardio Days</h2>
            <p className="text-sm">0</p>
          </div>
          <div
            className="p-4 bg-gray-800 rounded shadow-lg"
            style={{ backgroundColor: "#424242" }}
          >
            <h2 className="text-l">Weight Training Days</h2>
            <p className="text-sm">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
