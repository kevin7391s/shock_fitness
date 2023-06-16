import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Image from "next/image";
import Notifications from "./notifications";
import Logout from "./logout";

let defaultImage = "/images/exerciseMan.jpg";
let name = "Guest";
export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "User");
        setIsLoggedIn(true);
      } else {
        setUsername("Guest");
        setIsLoggedIn(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <nav
      className="w-full bg-gray-500 fixed top-0 z-50"
      style={{ backgroundColor: "#424242" }}
    >
      <div className="justify-between px-4 mx-auto lg:max-w-7xl 3xl:items-center 3xl:flex 3xl:px-8 ">
        <div>
          <div className="flex items-center justify-between py-3 3xl:py-5 3xl:block">
            <a href="/home" className="flex ml-1 ">
              <Image
                className="rounded-full  mr-3"
                src={defaultImage}
                alt="Fitness App Logo"
                width={50}
                height={50}
              />

              <h2 className=" text-xs items-center mt-2 text-white ">
                Hello,{" "}
                <p className="text-sm font-primary font-bold text-white">
                  {username}
                </p>
              </h2>
            </a>
            <div className="flex items-center mr-4">
              <div className="">
                <Notifications />
              </div>
              <button
                className=" p-2 text-white rounded-3xl outline-none focus:border-white focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 3xl:block 3xl:pb-0 3xl:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 3xl:flex 3xl:space-x-6 3xl:space-y-0">
              <li className="text-white hover:text-blue-600">
                <a href="/home">Home</a>
              </li>

              {isLoggedIn ? (
                //user is logged in
                <>
                  <li className="text-white hover:text-blue-600">
                    <a href="/profile">Profile</a>
                  </li>

                  <li className="text-white hover:text-blue-600">
                    <Logout />
                  </li>
                </>
              ) : (
                //user is not logged in
                <>
                  <li className="text-white hover:text-blue-600">
                    <a href="/signUp">Sign Up</a>
                  </li>
                  <li className="text-white hover:text-blue-600">
                    <a href="/login">Login</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
