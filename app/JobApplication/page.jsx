"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [applications, setApplications] = useState([]);
  const router =useRouter
  useEffect(() => {
    const fetchApplications = async () => {
      const res = await fetch("/api/application");
      const result = await res.json();
      setApplications(result);
    };
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-10">Candidate Applications</h1>
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
              <p className="text-gray-600"><strong>Position:</strong> {application.position}</p>
              <p className="text-gray-600"><strong>Message:</strong> {application.message}</p>
              <p className="text-gray-600"><strong>Submitted on:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
              <a
                href={application.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Resume
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
