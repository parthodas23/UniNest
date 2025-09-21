import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { MdLocationOn } from "react-icons/md";
const ListingsItem = ({ listing, id }) => {
  return (
    <li className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-200 overflow-hidden">
      <Link to={`category/${listing.type}/${listing.id}`}>
        <div className="relative">
          <img
            className="h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
            src={listing.imgUrls}
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium rounded-lg px-2 py-1 shadow-md ">
            {formatDistanceToNow(listing.timestamp.toDate(), {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-1 text-gray-600 font-semibold text-sm">
            <MdLocationOn className="h-5 w-5 text-green-600 " />
            <p className="truncate">{listing.address}</p>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mt-1">
            {listing.title}
          </h3>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">{listing.type}</p>
            <h2 className="text-blue-600 font-bold text-base">
              {listing.rent} <span className="font-normal">/ month</span>
            </h2>
          </div>
          <div className="flex gap-4 mt-3 text-sm text-gray-600">
            <p>{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}</p>
            <p>
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </p>
            <p>
              {listing.roomType === "Single" || "Shared"
                ? `${listing.roomType} Room`
                : `${listing.roomType}`}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListingsItem;
