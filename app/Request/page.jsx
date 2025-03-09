"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await fetch("/api/request");
      const result = await res.json();
      setApplications(result);
    };
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-10">Counselling Requests</h1>
      {applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((application) => (
            <div key={application._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {application.firstName} {application.lastName}
              </h2>
              <p className="text-gray-600"><strong>Email:</strong> {application.email}</p>
              <p className="text-gray-600"><strong>Phone:</strong> {application.phone}</p>
              <p className="text-gray-600"><strong>Company:</strong> {application.company}</p>
              <p className="text-gray-600"><strong>State:</strong> {application.state}</p>
              <p className="text-gray-600"><strong>City:</strong> {application.city}</p>
              <p className="text-gray-600"><strong>Assistance:</strong> {application.assistance}</p>
              <p className="text-gray-600"><strong>Duration (months):</strong> {application.duration}</p>
              <p className="text-gray-600"><strong>Additional Info:</strong> {application.additionalInfo}</p>
              <p className="text-gray-600"><strong>Submitted on:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
