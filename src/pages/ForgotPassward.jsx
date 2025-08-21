import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import OAuth from "../components/OAuth";

const ForgotPassward = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            className="w-full rounded-2xl"
            src="https://media.istockphoto.com/id/2150498954/photo/forgetful-woman-checking-her-bag-losing-her-money.webp?a=1&b=1&s=612x612&w=0&k=20&c=mf7wV_gCrj33uxSfhz8Q5dN5m4uk2GkaU6atvbHOWRE="
            alt=""
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              className=" mb-6 w-full bg-purple-100 px-4 py-2 text-xl border border-gray-300 rounded"
              type="email"
              placeholder="Your Email Address"
              id="email"
              value={email}
              onChange={onChange}
            />
            
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Don't have account?{" "}
                <Link
                  className="text-amber-500 hover:text-blue-300"
                  to="/signup"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link to="/Signin" className="text-blue-600">
                  Sign In Insted
                </Link>
              </p>
            </div>
            <button
              className="w-full rounded-2xl py-3 bg-green-400 mt-2 hover:bg-green-500 cursor-pointer active:bg-green-700"
              type="submit"
            >
              Send Reset Code
            </button>
            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">Or</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassward;
