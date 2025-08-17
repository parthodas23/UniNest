import React from "react";
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  return (
    <button className="flex items-center justify-center w-full bg-gray-300 hover:bg-gray-400 active:bg-gray-500 cursor-pointer rounded-2xl py-3">
      <FcGoogle className="mr-2 text-2xl" /> Continue with Google
    </button>
  );
};

export default OAuth;
