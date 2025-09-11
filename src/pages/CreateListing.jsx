import React, { useState } from "react";
import Spinner from "../components/Spinner";

const CreateListing = () => {
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "Looking for Room",
    roomType: "Single",
    rent: "",
    bedrooms: "1",
    bathrooms: "1",
    location: "",
    image: null,
    description: "",
    latitude: 0,
    longitude: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-300 rounded-xl shadow-md mt-2">
      <h2 className="text-2xl font-bold mb-4">Create Listing</h2>
      <form className="space-y-4">
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
            <option value="find">Looking for Room</option>
            <option value="rent">For Rent</option>
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
          <p className="font-semibold mb-2">Location(e.g, Near Campus) </p>
          <input
            type="text"
            name="location"
            placeholder="e.g.,near campus"
            value={formData.location}
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
            className="cursor-pointer bg-gray-400 rounded-lg p-1"
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.files[0] });
            }}
          />
        </div>
        <div>
          <p className="font-semibold mb-2">Description</p>
          <textarea
            name="description"
            className="w-full p-2 border rounded-lg "
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            rows="4"
          />
        </div>
        <button
          className="w-full bg-green-500 border border-gray-300 p-2 cursor-pointer rounded-lg hover:bg-green-600 text-white"
          type="submit"
          onSubmit={handleSubmit}
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
