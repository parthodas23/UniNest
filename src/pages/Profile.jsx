import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import ListingsItem from "../components/ListingsItem";
const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const listingRef = collection(db, "listings");

        const q = query(
          collection(db, "listings"),
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc")
        );

        let querySnap = await getDocs(q);

        // If nothing found, try querying by Firestore reference
        if (querySnap.empty) {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          q = query(
            listingRef,
            where("userRef", "==", auth.currentUser.uid),
            orderBy("timestamp", "desc")
          );
          querySnap = await getDocs(q);
        }

        const listingsArray = querySnap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setListings(listingsArray);
        setLoading(false);

        console.log("Fetched Listings:", listingsArray);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch listings.");
      }
    };

    if (auth.currentUser?.uid) fetchUserListings();
  }, [auth]);

   const onDelete = async (lisingsId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", lisingsId));
      const updateListings = listings.filter(
        (listing) => listing.id !== lisingsId
      );
      setListings(updateListings);
      toast.success("Succesfully deleted the listing.");
    }
  };
  const onEdit = (listingId) => {
    navigate(`/edit-listings/${listingId}`);
  };
  return (
    <>
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
            {/* <input
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
            /> */}

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

          <button
            className="p-2 w-full bg-blue-400 rounded-2xl mt-3 cursor-pointer hover:bg-blue-500"
            type="submit"
          >
            <Link to="/create-list">Find Or Rent Your Home</Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-7 mt-6 mx-auth">
        {!loading ? (
          listings.length > 0 ? (
            <>
              <h2 className="text-2xl text-center font-semibold mb-4">
                My Listings
              </h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((listing) => (
                  <ListingsItem
                    key={listing.id}
                    id={listing.id}
                    listing={listing.data}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => onEdit(listing.id)}
                  />
                ))}
              </ul>
            </>
          ) : (
            <p className="text-center text-gray-500">No listings found</p>
          )
        ) : null}
      </div>
    </>
  );
};

export default Profile;
