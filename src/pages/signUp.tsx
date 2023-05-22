//imports
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../lib/firebase.js";
import Link from "next/link.js";

function signUp() {
  //state values
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password == "" || email == "";

  // function to check and send data to firestore
  const handleSignup = async (event: React.FormEvent) => {
    //set error to blank
    event.preventDefault();
    setError("");
    // if username does not exist and has complete form, add user to firestore
    try {
      const usernameDoc = await getDoc(doc(firestore, "usernames", username));
      if (usernameDoc.exists()) {
        setError("Username is already taken");
      } else {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Save the user's additional information (username and fullname) to Firestore
        const usersRef = collection(firestore, "users");
        const userDoc = doc(usersRef, user.uid);
        await setDoc(userDoc, {
          username,
          fullname,
          email,
        });

        await updateProfile(user, {
          displayName: username,
        });
        // if all is correct, push user to login page to login to home page
        router.push("/login");
      }
    } catch (error) {
      // if error occurs, set everything back to empty strings
      setUsername("");
      setFullname("");
      setEmail("");
      setPassword("");
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred");
      }
    }
  };

  // return the form and input fields
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
        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
        <div className="relative"></div>

        <p className="ml-4 text-sm text-white mb-1 ">Username</p>
        <form onSubmit={handleSignup} method="POST" className="ml-3 mr-3">
          <input
            aria-label="Enter your Username"
            type="text"
            placeholder="Enter Username"
            className="text-sm text-gray-base w-full  py-5 px-1 h-2 border border-gray-primary rounded mb-4"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
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
            onChange={({ target }) => setFullname(target.value)}
            value={fullname}
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
            onChange={({ target }) => setEmail(target.value)}
            value={email}
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
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <div className="flex flex-col items-center ">
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-cyan-300 hover:bg-cyan-300 text-black font-bold py-2 px-4 rounded mt-20 mb-5"
              ${isInvalid && " opacity-50"}`}
            >
              Submit
            </button>
          </div>
        </form>
        <Link
          href="/landingPage"
          className="flex flex-col items-center text-white hover:text-cyan-300 text-md mt-5 "
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default signUp;
