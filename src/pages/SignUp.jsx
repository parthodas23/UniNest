import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
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
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            className="w-full rounded-2xl"
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              className=" mb-6 w-full bg-purple-100 px-4 py-2 text-xl border border-gray-300 rounded"
              type="text"
              placeholder="Full Name"
              id="text"
              value={name}
              onChange={onChange}
            />
            <input
              className=" mb-6 w-full bg-purple-100 px-4 py-2 text-xl border border-gray-300 rounded"
              type="email"
              placeholder="Email Address"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="relative mb-6">
              <input
                className="w-full bg-purple-100 px-4 py-2 text-xl border border-gray-300 rounded"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={onChange}
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute cursor-pointer right-3 top-3 text-xl"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute cursor-pointer right-3 top-3 text-xl"
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Have an account?{" "}
                <Link
                  className="text-amber-500 hover:text-blue-300"
                  to="/signin"
                >
                  Sign In
                </Link>
              </p>
              <p>
                <Link className="text-red-600" to="/forgot-password">
                  Forgot Password
                </Link>
              </p>
            </div>
            <button
              className="w-full rounded-2xl py-3 bg-green-400 mt-2 hover:bg-green-500 cursor-pointer active:bg-green-700"
              type="submit"
            >
              Sign In
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

export default SignUp;
