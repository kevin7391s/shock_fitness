import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import { auth, firestore } from "../lib/firebase.js";

function signUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    router.push("/login");
  };
  return (
    <div
      className="flex flex-col items-center h-screen bg-black "
      style={{ backgroundColor: "#121212" }}
    >
      <div
        className=" flex flex-col   relative w-4/5 h-4/5 mx-auto  overflow-hidden bg-gray-200  rounded-lg border-2 border-gray-600 shadow-lg cursor-pointer mt-20"
        style={{ backgroundColor: "#424242" }}
      >
        <div className="flex flex-col items-center">
          <Image
            src="/images/register.png"
            alt="Fitness App Logo"
            className="mb-10 mt-10"
            width={200}
            height={40}
            priority={true}
          />
        </div>
        <div className="relative">
          <div className="bg-cyan-300 h-1 w-full mr-1  shadow-md mb-8 opacity"></div>
        </div>

        <p className="ml-4 text-sm text-white mb-1 ">Username</p>
        <form onSubmit={handleSignup} method="POST" className="ml-3 mr-3">
          <input
            aria-label="Enter your Username"
            type="text"
            placeholder="Enter Username"
            className="text-sm text-gray-base w-full  py-5 px-1 h-2 border border-gray-primary rounded mb-4"
            name="username"
            //onChange={({ target }) => setUsername(target.value)}
            //value={username}
          />
        </form>
        <p className="ml-4 text-sm text-white mb-1 ">Full name</p>
        <form onSubmit={handleSignup} method="POST" className="ml-3 mr-3">
          <input
            aria-label="Enter your name"
            type="text"
            placeholder="Enter name"
            className="text-sm text-gray-base w-full  py-5 px-1 h-2 border border-gray-primary rounded mb-4"
            name="fullname"
            //onChange={({ target }) => setUsername(target.value)}
            //value={username}
          />
        </form>
        <p className="ml-4 text-sm text-white mb-1 ">Email</p>
        <form onSubmit={handleSignup} method="POST" className="ml-3 mr-3">
          <input
            aria-label="Enter your Email"
            type="email"
            placeholder="Enter Email"
            className="text-sm text-gray-base w-full  py-5 px-1 h-2 border border-gray-primary rounded mb-4"
            name="email"
            //onChange={({ target }) => setUsername(target.value)}
            //value={username}
          />
        </form>
        <p className="ml-4 text-sm text-white mb-1 ">Password</p>
        <form onSubmit={handleSignup} method="POST" className="ml-3 mr-3">
          <input
            aria-label="Enter your password"
            type="password"
            placeholder="Enter Password"
            className="text-sm text-gray-base w-full  py-5 px-1 h-2 border border-gray-primary rounded mb-4"
            name="password"
            //onChange={({ target }) => setUsername(target.value)}
            //value={username}
          />
          <div className="flex flex-col items-center ">
            <button
              type="submit"
              className="bg-white hover:bg-cyan-300 text-black font-bold py-2 px-4 rounded mr-4 mt-8 mb-5"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="bg-cyan-300 h-1 w-full mr-1  shadow-md mt-8"></div>
      </div>
    </div>
  );
}

export default signUp;
