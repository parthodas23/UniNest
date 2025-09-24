import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { FaShareFromSquare } from "react-icons/fa6";

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
                className="w-fill overflow-hidden h-[300px]"
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
      {shareLinkedCopied && <p className="fixed top-[20%] right-[1%] text-gray-200 rounded-xl p-1 bg-gray-500 z-10">Link Copied!</p>}
    </main>
  );
};

export default Listing;
