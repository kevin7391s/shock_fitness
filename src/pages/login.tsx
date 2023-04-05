// Imports
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../lib/firebase.js";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = username === "" || password === "";

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const usernameDoc = await getDoc(doc(firestore, "usernames", username));
      if (usernameDoc.exists()) {
        const userRef = doc(firestore, "users", usernameDoc.data().uid);
        const userSnapshot = await getDoc(userRef);
        const userEmail = userSnapshot.data().email;

        await signInWithEmailAndPassword(auth, userEmail, password);
        router.push("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-black">
      <div className="flex flex-col relative w-4/5 h-4/5 mx-auto overflow-hidden bg-gray-200 rounded-lg border-2 border-gray-600 shadow-lg cursor-pointer mt-20">
        <div className="flex flex-col items-center">
          <Image
            src="/images/shockfitnesstransparent.png"
            alt="Fitness App Logo"
            className="mb-10 mt-10"
            width={400}
            height={80}
            priority={true}
          />
        </div>
        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
        <form onSubmit={handleLogin} method="POST" className="ml-3 mr-3">
          <p className="ml-4 text-sm text-white mb-1">Username</p>
          <input
            aria-label="Enter your Username"
            type="text"
            placeholder="Enter Username"
            className="text-sm text-gray-base w-full py-5 px-1 h-2 border border-gray-primary rounded mb-4"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
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
              className={`bg-cyan-300 hover:bg-cyan-300 text-black font-bold py-2 px-4 rounded mr-4 mt-8 mb-5 ${
                isInvalid && "opacity-50"
              }`}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
