import { useState } from "react";
import Image from "next/image";

let defaultImage = "/images/exerciseMan.jpg";
let name = "Guest";
export default function NavBar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-full bg-gray-500 " style={{ backgroundColor: "#424242" }}>
      <div className="justify-between px-4 mx-auto lg:max-w-7xl 3xl:items-center 3xl:flex 3xl:px-8">
        <div>
          <div className="flex items-center justify-between py-3 3xl:py-5 3xl:block">
            <a href="javascript:void(0)" className="flex ">
              <Image
                className="rounded-full border border-black border-1 mr-3"
                src={defaultImage}
                alt="Fitness App Logo"
                width={50}
                height={50}
              />

              <h2 className="flex text-xl items-center mt-2 ">
                Hello,{" "}
                <p className="font-primary font-bold ml-1 text-white">{name}</p>
              </h2>
            </a>
            <div className="3xl:hidden">
              <button
                className="p-2 text-gray-700 rounded-3xl outline-none focus:border-gray-800 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns=""
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
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
                <a href="javascript:void(0)">Home</a>
              </li>
              <li className="text-white hover:text-blue-600">
                <a href="javascript:void(0)">Blog</a>
              </li>
              <li className="text-white hover:text-blue-600">
                <a href="javascript:void(0)">About US</a>
              </li>
              <li className="text-white hover:text-blue-600">
                <a href="javascript:void(0)">Contact US</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
