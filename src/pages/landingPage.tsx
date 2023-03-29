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
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="ml-8">
          <Image
            src="/images/shockfitnesstransparent.png"
            alt="Fitness App Logo"
            width={600}
            height={100}
          />
        </div>
        <p className="flex flex-col items-center text-center mb-8 text-white ml-10 mr-10">
          Track your workouts, connect with friends, and achieve your fitness
          goals.
        </p>
        <div className="items-center">
          <div className="text-center mt-8">
            <Link
              href="/register"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
