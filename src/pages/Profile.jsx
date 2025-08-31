import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    city: "",
    year: "",
  });

  const { name, email, university, city, year } = formData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData({
            name: docSnap.data().name || auth.currentUser.displayName || "",
            email: docSnap.data().email || auth.currentUser.email || "",
            university: docSnap.data().university || "",
            city: docSnap.data().city || "",
            year: docSnap.data().year || "",
          });
        }
      } catch (error) {
        toast.error("Couldn't fetch profile data.");
      }
    };

    if (auth.currentUser?.uid) {
      fetchData();
    }
  }, [auth.currentUser]);
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const onsubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        name,
        email,
        university,
        city,
        year,
      });

      toast.success("Profile details updated.");
    } catch (error) {
      toast.error("Couldn't upadate profile details.");
    }
  };
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl font-semibold mt-6 text-center">My Profile</h1>
      <div className="w-full md:w-[40%] mt-6 px-3">
        <form>
          <input
            id="name"
            className={`bg-pink-100 w-full rounded-xl py-2 px-4 border border-gray-300 mb-6 ${
              changeDetails && "bg-purple-300"
            }`}
            type="text"
            value={name}
            onChange={onChange}
            disabled={!changeDetails}
          />
          <input
            id="email"
            className={`bg-pink-100 w-full rounded-xl py-2 px-4 border border-gray-300 mb-6`}
            type="email"
            value={email}
            onChange={onChange}
            disabled={!changeDetails}
          />
          <input
            id="university"
            className={`bg-pink-100 w-full rounded-xl py-2 px-4 border border-gray-300 mb-6 ${
              changeDetails && "bg-purple-300"
            }`}
            type="text"
            value={university}
            onChange={onChange}
            disabled={!changeDetails}
          />
          <input
            id="city"
            className={`bg-pink-100 w-full rounded-xl py-2 px-4 border border-gray-300 mb-6 ${
              changeDetails && "bg-purple-300"
            }`}
            type="text"
            value={city}
            onChange={onChange}
            disabled={!changeDetails}
          />
          <input
            id="year"
            className={`bg-pink-100 w-full rounded-xl py-2 px-4 border border-gray-300 mb-6 ${
              changeDetails && "bg-purple-300"
            }`}
            type="text"
            value={year}
            onChange={onChange}
            disabled={!changeDetails}
          />

          <div className="flex justify-between whitespace-nowrap mt-2">
            <p className="flex items-center">
              Do you want to change your details?{" "}
              <span
                onClick={() => {
                  changeDetails && onsubmit();
                  setChangeDetails((prev) => !prev);
                }}
                className="text-amber-600 ml-2 hover:text-amber-900 cursor-pointer font-semibold"
              >
                {changeDetails ? "Change" : "Edit"}
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
  );
};

export default Profile;