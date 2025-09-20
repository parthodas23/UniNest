import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "Looking-for-Room",
    roomType: "Single",
    rent: "",
    bedrooms: "1",
    bathrooms: "1",
    location: "",
    images: null,
    description: "",
    latitude: 0,
    longitude: 0,
  });
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apikey = import.meta.env.VITE_GEOCODE_API;
    let geolocation = {};
    const { location } = formData;
    let address;

    try {
      if (geoLocationEnabled) {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            location
          )}&key=${apikey}`
        );

        const data = await res.json();
        console.log(data);

        if (data.results.length === 0) {
          setLoading(false);
          toast.error("Please Enter a valid address");
          return;
        }

        geolocation.lat = data.results[0].geometry.lat;
        geolocation.lng = data.results[0].geometry.lng;
        address = data.results[0].formatted;

        console.log(geolocation);
        console.log(address);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    const uploadToCloudinary = async (image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "UniNest"); // e.g. "ml_default"
      data.append("cloud_name", "dmiscbtu0");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dmiscbtu0/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const result = await res.json();
        return result.secure_url; // image URL
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
      }
    };

    let { images, ...rest } = formData;

    const imgUrls = await Promise.all(
      [...images].map((image) => uploadToCloudinary(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Image upload failed");
      return;
    });

    console.log(imgUrls);

    const formDataCopy = {
      ...rest,
      imgUrls,
      geolocation,
      address,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    delete formDataCopy.images;
    setLoading(false);
    toast.success("Listing Created.");
    navigate(`/catagory/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-300 rounded-xl shadow-md mt-2">
      <h2 className="text-2xl font-bold mb-4">Create Listing</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <p className="font-semibold mb-2">Listing Title</p>
          <input
            type="text"
            name="title"
            placeholder="e.g., Cozy Single Room"
            value={formData.title}
            className="w-full border rounded-lg p-2"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            required
          />
        </div>

        <div>
          <p className="font-semibold mb-2">Listing Type</p>
          <select
            name="type"
            value={formData.type}
            className="w-full p-2 border rounded-lg"
            onChange={(e) => {
              setFormData({ ...formData, type: e.target.value });
            }}
          >
            <option value="Looking-for-Room">Looking-for-Room</option>
            <option value="For-Rent">For-Rent</option>
          </select>
        </div>
        <div>
          <p className="font-semibold mb-2">Room Type</p>
          <select
            name="roomType"
            value={formData.roomType}
            className="w-full border rounded-lg p-2"
            onChange={(e) => {
              setFormData({ ...formData, roomType: e.target.value });
            }}
          >
            <option value="single">Single</option>
            <option value="shared">Shared</option>
            <option value="apertment">Apertment</option>
          </select>
        </div>
        <div>
          <p className="font-semibold mb-2">Rent</p>
          <input
            type="text"
            placeholder="e.g.,5000tk"
            value={formData.rent}
            className="w-full p-2 border rounded-lg"
            onChange={(e) => {
              setFormData({ ...formData, rent: e.target.value });
            }}
            required
          />
        </div>
        <div className="flex space-x-10">
          {" "}
          <div>
            <p className="font-semibold mb-2">Bedrooms</p>
            <input
              type="number"
              value={formData.bedrooms}
              className="w-full p-2 border rounded-lg"
              onChange={(e) => {
                setFormData({ ...formData, bedrooms: e.target.value });
              }}
              min="1"
            />
          </div>
          <div>
            <p className="font-semibold mb-2">Bathrooms</p>
            <input
              type="number"
              value={formData.bathrooms}
              className="w-full p-2 border rounded-lg"
              onChange={(e) => {
                setFormData({ ...formData, bathrooms: e.target.value });
              }}
              min="1"
            />
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Location</p>
          <input
            type="text"
            name="location"
            placeholder="e.g., near campus,Barishal Univesity"
            value={formData.location}
            required
            className="w-full p-2 border rounded-lg"
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value });
            }}
          />
        </div>
        <div>
          <p className="font-semibold mb-2">Upload Image</p>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple
            required
            className="cursor-pointer bg-gray-400 rounded-lg p-1"
            onChange={(e) => {
              setFormData({ ...formData, images: e.target.files });
            }}
          />
        </div>
        <div>
          <p className="font-semibold mb-2">Description</p>
          <textarea
            name="description"
            className="w-full p-2 border rounded-lg "
            value={formData.description}
            required
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            rows="4"
          />
        </div>
        <button
          className="w-full bg-green-500 border border-gray-300 p-2 cursor-pointer rounded-lg hover:bg-green-600 text-white"
          type="submit"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
