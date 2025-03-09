"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary"; // Ensure the import is correct

const SecurityServiceForm = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    type: "Security Services",
    imgUrl: "",
    subHeading: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/securityservice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Service added successfully!");
        setFormData({
          serviceName: "",
          type: "Security Services",
          imgUrl: "",
          subHeading: "",
          description: "",
        });
      } else {
        alert("Failed to add service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Add Security Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-white">
        {/* Service Name */}
        <div>
          <label htmlFor="serviceName" className="block text-sm font-medium">
            Service Name
          </label>
          <input
            type="text"
            name="serviceName"
            id="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Service Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium">
            Type
          </label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-white"
          >
            <option value="Security Services" className=" text-black">Security Services</option>
            <option value="Event Security Services"  className=" text-black">Event Security Services</option>
            <option value="Elite Security Services"  className=" text-black">Elite Security Services</option>
            <option value="Display"  className=" text-black">Display</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="block text-left font-semibold text-gray-800">
            Upload Image
          </label>
          <CldUploadWidget
            uploadPreset="alertgroup"
            onSuccess={({ event, info }) => {
              if (event === 'success') {
                setFormData((prevData) => ({
                  ...prevData,
                  imgUrl: info?.secure_url // Setting the image URL correctly
                }));
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={open}
                className="py-2 px-4 bg-blue-600 text-white rounded-md w-full hover:bg-blue-700 transition-all duration-200"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>
        </div>

        {/* Subheading */}
        <div>
          <label htmlFor="subHeading" className="block text-sm font-medium">
            Subheading
          </label>
          <input
            type="text"
            name="subHeading"
            id="subHeading"
            value={formData.subHeading}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default SecurityServiceForm;
