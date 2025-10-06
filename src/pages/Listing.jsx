import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa6";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { toast } from "react-toastify";
const Listing = () => {
  const [contactLandlord, setContactLandlord] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [shareLinkedCopied, setShareLinkedCopied] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const onEdit = (lisingsId) => {
    navigate(`/edit-listings/${lisingsId}`);
  };
  const onDelete = async (lisingsId) => {
    if (window.confirm("Are you sure do you want to delete this listing?")) {
      await deleteDoc(doc(db, "listings", lisingsId));
      navigate("/profile");
      toast.success("Listing deleted successfully.");
    }
  };
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
        className="fixed top-[13%] right-[3%] text-2xl p-2 rounded-full text-gray-200 bg-gray-600  cursor-pointer flex justify-center items-center z-10"
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
      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto rounded-2xl shadow-md lg:space-x-4 z-10 overflow-x-hidden gap-2">
        <div className="bg-gray-200 w-full rounded p-2">
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
          <ul className="flex justify-start space-x-10 mb-5">
            <li className="flex items-center font-semibold mt-3 whitespace-nowrap">
              <FaBed className="text-lg mr-2" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center font-semibold mt-3 whitespace-nowrap">
              <FaBath className="text-lg mr-2" />
              {+listing.bathrooms > 1 ? `${listing.bedrooms} Baths` : "1 Bath"}
            </li>
          </ul>
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-purple-400 text-gray-200 font-medium rounded-2xl text-sm shadow-md hover:bg-purple-600 cursor-pointer hover:shadow-lg w-full"
              >
                Contact LandLord
              </button>
            </div>
          )}
          {listing.userRef === auth.currentUser?.uid && (
            <div className="flex justify-start space-x-5">
              <button
                onClick={() => onEdit(listingId)}
                className="bg-gray-500 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-700"
              >
                Edit Infomation
              </button>
              <button
                onClick={() => onDelete(listingId)}
                className="bg-orange-800 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-amber-600"
              >
                Delete Listing
              </button>
            </div>
          )}
        </div>
        <div className="bg-blue-300 w-full h-[200px] md:h-[400px] mt-5 lg:mt-0 lg:mb-2">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
};

export default Listing;
