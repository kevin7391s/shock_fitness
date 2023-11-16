// Imports
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase.js";
import Link from "next/link.js";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = email === "" || password === "";

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  return (
    <div className="flex flex-col items-center h-screen bg-black">
      <div

        className="flex flex-col relative w-3/5 h-3/5 mx-auto overflow-hidden bg-gray-200 rounded-lg border-2 border-gray-600 shadow-lg cursor-pointer mt-20"
        style={{ backgroundColor: "#333333" }}

      >
        <div className="flex flex-col items-center">
          <Image
            src="/images/login.png"
            alt="Fitness App Logo"
            className="mb-10 mt-10"
            width={150}
            height={80}
            priority={true}
          />
        </div>

        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
        <form onSubmit={handleLogin} method="POST" className="ml-3 mr-3">
          <p className="ml-4 text-sm text-white mb-1">Email</p>
          <input
            aria-label="Enter your Email"
            type="text"
            placeholder="Enter Email"
            className="text-sm text-gray-base w-full py-5 px-1 h-2 border border-gray-primary rounded mb-4"
            name="username"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
          />
          <p className="ml-4 text-sm text-white mb-1">Password</p>
          <input
            aria-label="Enter your password"
            type="password"
            placeholder="Enter Password"
            className="text-sm text-gray-base w-full py-5 px-1 h-2 border border-gray-primary rounded mb-4"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <div className="flex flex-col items-center">
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-cyan-300 hover:bg-cyan-300 text-black font-bold py-2 px-4 rounded  mt-8 mb-5 ${
                isInvalid && "opacity-50"
              }`}
            >
              Log In
            </button>
          </div>
        </form>
        <Link
          href="/signUp"
          className="flex flex-col items-center text-white hover:text-cyan-300 text-md mt-5 mb-24 "
        >
          Not a member? Sign up here
        </Link>
      </div>
    </div>
  );
}

export default Login;
