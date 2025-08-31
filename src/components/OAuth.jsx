import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check if the user in database or not
      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          university: "",
          year: "",
          city: "",
        });
        // If user profile doesn't exist → setup profile
        navigate("/setup-profile");
        return;
      }

      const data = docSnap.data();

      // ✅ Check for missing fields
      if (!data.university || !data.city || !data.year) {
        navigate("/setup-profile");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error("Could not authorised by Google");
      console.log(err);
    }
  };
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex items-center justify-center w-full bg-gray-300 hover:bg-gray-400 active:bg-gray-500 cursor-pointer rounded-2xl py-3"
    >
      <FcGoogle className="mr-2 text-2xl" /> Continue with Google
    </button>
  );
};

export default OAuth;
