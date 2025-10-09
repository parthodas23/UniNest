import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingsItem from "../components/ListingsItem";
import { useParams } from "react-router";
const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const { categoryName } = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", categoryName),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        let lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        let listing = [];
        querySnap.forEach((doc) => {
          return listing.push({ id: doc.id, data: doc.data() });
        });
        setListings(listing);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

  const onFetchMoreListings = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      let lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      let listing = [];
      querySnap.forEach((doc) => {
        return listing.push({ id: doc.id, data: doc.data() });
      });
      setListings((prev) => [...prev, ...listing]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold">
        {categoryName === "For-Rent"
          ? "Places For Rent"
          : "Looking for Room Listings"}
      </h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          {" "}
          <main>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-4">
              {listings.map((listing) => (
                <ListingsItem listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </main>
          {lastFetchListing && (
            <div className="flex justify-center items-center mt-6 mb-5">
              <button
                onClick={onFetchMoreListings}
                className="bg-gray-600 font-semibold rounded px-3 py-1.5 text-gray-200 cursor-pointer hover:bg-gray-800"
              >
                {categoryName === "For-Rent"
                  ? "More Rent Listings"
                  : "More Looking for Room Listings"}
              </button>
            </div>
          )}
        </>
      ) : (
        <p> There aren't any listings found.</p>
      )}
    </div>
  );
};

export default Category;
