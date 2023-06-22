import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

function ChangeProfile() {
  const [username, setUsername] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleSaveProfile = async () => {
    // Create a new document in the "profiles" collection with the updated profile data
    try {
      const profileDocRef = doc(collection(firestore, "profiles"));
      await setDoc(profileDocRef, {
        username,
        height,
        weight,
      });

      // Reset the form fields
      setUsername("");
      setHeight("");
      setWeight("");

      console.log("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <NavBar />
      <h2 className="text-2xl mb-8">Change Profile</h2>
      <form className="flex flex-col gap-4">
        <div>
          <label className="text-sm">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">Height:</label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">Weight:</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleSaveProfile}
          className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded"
        >
          Save Profile
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default ChangeProfile;
