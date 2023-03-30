// pages/index.tsx

import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Fitness App</title>
      </Head>
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-black"
        style={{ backgroundColor: "#121212" }}
      >
        <div className="ml-9">
          <Image
            src="/images/shockfitnesstransparent.png"
            alt="Fitness App Logo"
            width={600}
            height={100}
          />
        </div>
        <p className="font-primary flex flex-col items-center text-center mb-8 text-white ml-10 mr-10">
          Track your workouts, connect with friends, and achieve your fitness
          goals.
        </p>
        <div className="items-center">
          <div className="text-center mt-8">
            <Link
              href="/register"
              className="bg-white hover:bg-cyan-300 text-black font-bold py-2 px-4 rounded mr-4"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="bg-white hover:bg-cyan-300 text-black font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          </div>
          <Link
            href="/home"
            className="flex flex-col items-center text-white hover:text-cyan-300 text-sm mt-9 "
          >
            continue as guest
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
