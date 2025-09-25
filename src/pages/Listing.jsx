import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [shareLinkedCopied, setShareLinkedCopied] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{ delay: 2500 }}
      >
        {listing.imgUrls &&
          listing.imgUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full overflow-hidden h-[300px]"
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 text-2xl p-2 rounded-full text-gray-200 bg-gray-600  cursor-pointer flex justify-center items-center z-10"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkedCopied(true);
          setTimeout(() => {
            setShareLinkedCopied(false);
          }, 2000);
        }}
      >
        <FaShareFromSquare />
      </div>
      {shareLinkedCopied && (
        <p className="fixed top-[20%] right-[1%] text-gray-200 rounded-xl p-1 bg-gray-500 z-10">
          Link Copied!
        </p>
      )}
      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-2xl shadow-md lg:space-x-4 z-10 overflow-x-hidden">
        <div className="bg-gray-200 w-full h-[200px] lg-[400px] rounded-xl p-2">
          <p className="text-2xl font-bold mb-3 text-gray-600">
            {listing.title} - {listing.rent}(tk)
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            {" "}
            <FaMapMarkerAlt className="text-green-600 mr-1" /> {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="w-full bg-red-700 max-w-[200px] text-purple-200 text-center p-1 rounded-md font-semibold shadow-md">
              {listing.type === "For-Rent" ? "For-Rent" : "Looking-for-Room"}
            </p>
            <p className="w-full max-w-[200px] bg-green-600 text-purple-200 font-semibold text-center p-1 rounded-md shadow-md">
              {"Roomtype: "}
              {listing.roomType === "shared"
                ? "Shared"
                : listing.roomType === "Single"
                ? "Single"
                : "APertment"}
            </p>
          </div>
          <p className="mt-3">
            <span className="font-semibold">Description -</span>{" "}
            {listing.description}
          </p>
          <ul className="flex justify-start space-x-10">
            <li className="flex items-center font-semibold mt-3 whitespace-nowrap">
              <FaBed className="text-lg mr-2" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center font-semibold mt-3 whitespace-nowrap">
              <FaBath className="text-lg mr-2" />
              {+listing.bathrooms > 1 ? `${listing.bedrooms} Baths` : "1 Bath"}
            </li>
          </ul>
        </div>
        <div className="bg-blue-300 w-full h-[200px] lgh-[400px]"></div>
      </div>
    </main>
  );
};

export default Listing;
