// pages/index.tsx

import React from "react";
import Link from "next/link";
import Head from "next/head";

const LandingPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Fitness App</title>
      </Head>
      <div className="container mx-auto">
        {/* Add your landing page content and styling */}
        <h1 className="text-4xl font-bold text-center">
          Welcome to Fitness App
        </h1>
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
    </>
  );
};

export default LandingPage;
