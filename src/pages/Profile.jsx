import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl font-semibold mt-6 text-center">My Profile</h1>
        <div className="w-full md:w-[40%] mt-6 px-3 ">
          <form>
            <input
              id="name"
              className="bg-pink-100 w-full rounded-xl py-2 px-4 border border-gray-300 mb-6"
              type="text"
              value={name}
              disabled
            />
            <input
              className="bg-pink-100 w-full rounded-xl py-2 px-4 border border-gray-300 "
              type="email"
              id="email"
              value={email}
              disabled
            />

            <div className="flex justify-between whitespace-nowrap mt-2">
              <p className="flex items-center">
                Do you want to change yours name?{" "}
                <span className="text-amber-600 ml-2 hover:text-amber-900 cursor-pointer font-semibold">
                  {" "}
                  Edit
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-500 hover:text-blue-700 cursor-pointer font-semibold"
              >
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
