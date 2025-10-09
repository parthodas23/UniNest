import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router";
import ListingsItem from "../components/ListingsItem";

const Home = () => {
  const [newListings, setNewListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, orderBy("timestamp", "desc"), limit(4));
        const querySnap = await getDocs(q);
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setNewListings(listing);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);
  // for rent
  const [rentListings, setRentListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", "For-Rent"),
          orderBy("timestamp", "desc"),
          limit(9)
        );
        const querySnap = await getDocs(q);
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(listing);
        const lastFour = listing.slice(-4);
        setRentListings(lastFour);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);
  // console.log(rentListings);
  const [lookingListings, setLookingListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", "Looking-for-Room"),
          orderBy("timestamp", "desc"),
          limit(7)
        );
        const querySnap = await getDocs(q);
        const listing = [];
        querySnap.forEach((doc) => {
          return listing.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(listing);
        const lastFour = listing.slice(-4);
        setLookingListings(lastFour);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);
  console.log(lookingListings);

  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6 ">
        {newListings && (
          <div className="m-2 mb-6">
            <h2 className="font-semibold px-3 text-2xl mt-4">
              Recent Listings
            </h2>

            <Link to="/list-room">
              <p className="px-3 text-sm text-blue-500 font-medium cursor-pointer">
                Show more List-Room
              </p>
            </Link>
            <ul className=" mt-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newListings.map((listing) => (
                <ListingsItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {rentListings && (
          <div className="m-2 mb-6">
            <h2 className="font-semibold px-3 text-2xl mt-4">For Rent</h2>

            <Link to="/category/For-Rent">
              <p className="px-3 text-sm text-blue-500 font-medium cursor-pointer">
                Show more places for rent
              </p>
            </Link>
            <ul className=" mt-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingsItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {lookingListings && (
          <div className="m-2 mb-6">
            <h2 className="font-semibold px-3 text-2xl mt-4">
              Looking for Room
            </h2>

            <Link to="/category/Looking-for-Room">
              <p className="px-3 text-sm text-blue-500 font-medium cursor-pointer">
                Show more looking for room listings
              </p>
            </Link>
            <ul className=" mt-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {lookingListings.map((listing) => (
                <ListingsItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
