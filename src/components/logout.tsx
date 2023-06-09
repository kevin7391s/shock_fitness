import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";

function logout() {
  const router = useRouter();
  async function handleLogout() {
    try {
      await signOut(auth);
      router.push("/landingPage");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <button className="text-white hover:text-blue-600" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default logout;
