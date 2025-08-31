import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const SetupProfile = () => {
  const [university, setUniversity] = useState("");
  const [city, setCity] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
      {
        university: university,
        city: city,
        year: year,
      },
      {
        merge: true, // keep existing as same
      }
    );
    navigate("/");
  };
  return (
    <section className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow ">
      <h1 className="text-2xl font-bold text-center mb-6">
        Complete Your Profile
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          className="w-full bg-gray-100 border border-gray-300 rounded-2xl p-2"
          type="text"
          id="university"
          placeholder="University Name"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        />
        <input
          className="w-full bg-gray-100 border border-gray-300 rounded-2xl p-2"
          type="text"
          id="city"
          placeholder="Where do you want to stay?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="w-full bg-gray-100 border border-gray-300 rounded-2xl p-2"
          type="text"
          id="year"
          placeholder="Year (e.g. 2nd Year)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button className="py-2 bg-green-400 text-white  rounded-2xl hover:bg-green-500 cursor-pointer">
          Save And Submit
        </button>
      </form>
    </section>
  );
};

export default SetupProfile;
