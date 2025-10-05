import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Contact = ({ userRef, listing }) => {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const getLandLord = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        setLandLord(docSnap.data());
      } else {
        toast.error("Couldn't get landlord data.");
      }
    };
    getLandLord();
  }, [userRef]);
  return (
    <>
      {landLord !== null && (
        <div className="flex flex-col w-full">
          <p className="text-md mb-2 font-semibold">
            Contact <span className="font-bold">{landLord.name}</span> for{" "}
            <span className="font-bold">{listing.title.toLowerCase()}</span> :
          </p>
          <textarea
            className="w-full text-xl text-gray-600 border-2 px-4 py-2 border-gray-300 rounded"
            name="message"
            id="message"
            rows="2"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <a
            href={`mailto:${landLord.email}?Subject=${listing.title}&body=${message}`}
          >
            {" "}
            <button className=" mt-3 cursor-pointer px-7 py-2 bg-blue-300 rounded w-full hover:bg-blue-500 shadow-md">
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default Contact;
