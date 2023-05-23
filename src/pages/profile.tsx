import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { query, where, getDocs, collection } from "firebase/firestore";
import { auth, firestore } from "../lib/firebase";
import NavBar from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer";

function Profile() {
  const [username, setUsername] = useState("");
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [cardioWorkouts, setCardioWorkouts] = useState(0);
  const [weightWorkouts, setWeightWorkouts] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsername(user.displayName || "User");

        // query the workouts collection for documents where the user id matches the current user's id
        const q = query(
          collection(firestore, "workouts"),
          where("user", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        let total = 0;
        let cardio = 0;
        let weight = 0;

        querySnapshot.forEach((doc) => {
          total++;
          if (doc.data().workoutType === "cardio") {
            cardio++;
          } else if (doc.data().workoutType === "weightlifting") {
            weight++;
          }
        });

        setTotalWorkouts(total);
        setCardioWorkouts(cardio);
        setWeightWorkouts(weight);
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
      className="flex flex-col min-h-screen bg-black text-white"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow mb-20">
        <Image
          src="/images/profile.png"
          alt="Fitness App Logo"
          className=" mt-24 mb-5"
          width={200}
          height={100}
        />

        <div className="rounded-full h-50 w-44 overflow-hidden ">
          <img src="/images/exerciseMan.jpg" alt="Profile picture" />
        </div>
        <h2 className="text-2xl mb-10 mt-5">{username}</h2>
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
            <p className="text-sm">{totalWorkouts}</p>
          </div>
          <div
            className="p-4 bg-gray-800 rounded shadow-lg"
            style={{ backgroundColor: "#424242" }}
          >
            <h2 className="text-l">Cardio </h2>
            <p className="text-sm">{cardioWorkouts}</p>
          </div>
          <div
            className="p-4 bg-gray-800 rounded shadow-lg"
            style={{ backgroundColor: "#424242" }}
          >
            <h2 className="text-l">Weight Training</h2>
            <p className="text-sm">{weightWorkouts}</p>
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
          className="flex flex-col items-center mt-10 mb-10 bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded"
        >
          View past workouts
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
