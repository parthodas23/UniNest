import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import OAuth from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const copyFormData = { ...formData };
      delete copyFormData.password;
      copyFormData.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), copyFormData);
      toast.success("Sign Up was successfull");
      navigate("/");
    } catch (err) {
      toast.error("Something Went Wrong in registration");
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <img
            className="w-full rounded-2xl"
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=780&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex-1 lg:ml-10 w-full">
          <form onSubmit={onSubmit}>
            <input
              className=" mb-6 w-full bg-purple-100 px-4 py-2 text-xl border border-gray-300 rounded"
              type="text"
              placeholder="Full Name"
              id="name"
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
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className="w-full rounded-2xl py-3 bg-green-400 mt-2 hover:bg-green-500 cursor-pointer active:bg-green-700"
              type="submit"
            >
              Sign Up
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
