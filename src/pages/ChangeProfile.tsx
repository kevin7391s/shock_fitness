import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, firestore } from "../lib/firebase";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

function ChangeProfile() {
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUsername(userData.username);
          setWeight(userData.weight);
          setHeight(userData.height);
        }
      }
    });
  }, []);

  const updateProfile = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, { username, weight, height }, { merge: true });
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-black text-white"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow mb-20">
        <h2 className="text-2xl mb-10 mt-5">Edit Profile</h2>
        <div className="mb-4">
          <label className="block text-white mb-2">Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Weight: </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(+e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Height: </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(+e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={updateProfile}
          className="flex flex-col items-center mt-10 bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>
        <Link
          href="/profile"
          className="flex flex-col items-center mt-10 mb-10 bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded"
        >
          Go back to profile
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ChangeProfile;
