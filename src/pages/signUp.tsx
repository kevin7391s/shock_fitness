import React from "react";
import Image from "next/image";

function signUp() {
  const handleSignup = () => {};
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
            src="/images/shockfitnesstransparent.png"
            alt="Fitness App Logo"
            className=""
            width={600}
            height={100}
          />
        </div>
        <p className="ml-4 text-sm text-white mb-1 ">Username</p>
        <form onSubmit={handleSignup} method="POST" className="ml-3 mr-3">
          <input
            aria-label="Enter your Username"
            type="text"
            placeholder="Enter Username"
            className="text-sm text-gray-base w-full  py-5 px-1 h-2 border border-gray-primary rounded mb-4"
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
            //onChange={({ target }) => setUsername(target.value)}
            //value={username}
          />
        </form>
      </div>
    </div>
  );
}

export default signUp;
