"use client";
import { PlusCircle, Edit, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SecurityServices = () => {
  const [services, setServices] = useState([]);
  // Fetch security services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/securityservice");
        if (!res.ok) throw new Error("Failed to fetch services");
        const result = await res.json();
        setServices(result.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);
  const handleDelete = async (serviceId) => {
    try {
      const res = await fetch(`/api/securityservice`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceId }), // Send jobId as part of JSON object
      });
      
      if (res.ok) {
        alert('Delete Successful');
        setServices(services.filter((val) => val._id !== serviceId));
      } else {
        const errorData = await res.json();
        console.error('Error deleting job:', errorData.error);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl text-gray-400 font-bold mb-6 text-center">Security Services</h1>
      <div className="flex flex-wrap gap-6">
        {/* Add Service Button */}
        <div className="border w-[250px] h-[250px] flex justify-center items-center rounded-lg backdrop-blur-2xl">
          <Link href="/AddServices" className="flex justify-center items-center">
            <PlusCircle className="w-10 h-10 text-blue-600 hover:text-blue-800" />
          </Link>
        </div>

        {/* Display fetched services */}
        <div className="flex flex-wrap gap-4">
          {services && (
            services.map((service, index) => (
              <div
                key={index}
                className="border w-[340px] h-fit rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white"><span className=" text-white text-xl">Service Name:</span> {service.serviceName}</h2>
                  <p className="text-gray-200"><span className=" text-white text-xl">Heading:</span> {service.subHeading}</p>
                  <p className="text-sm text-gray-200 mt-2"><span className=" text-white text-xl">Discription:</span> {service.description}</p>
                </div>

                {/* Edit/Delete Icons */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(service._id)}
                  >
                    <Trash className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityServices;
