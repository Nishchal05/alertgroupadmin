"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchEmploydata = async () => {
      const res = await fetch("/api/employdata");
      const result = await res.json();
      setApplications(result);
    };
    fetchEmploydata();
  }, []);

  // Function to delete an application
  const deleteApplication = async (id) => {
    try {
      const res = await fetch(`/api/employdata`, {
        method: "DELETE",
        body:JSON.stringify({id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        // If the deletion is successful, update the state to remove the deleted application
        setApplications(applications.filter((application) => application._id !== id));
      } else {
        console.error("Failed to delete application");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-10">Employ Data</h1>
      {applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {applications.filter(val=>val.email!=process.env.NEXT_PUBLIC_Email).map((application) => (
            <div key={application._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {application.name}
              </h2>
              <p className="text-gray-600"><strong>Email:</strong> {application.email}</p>
              <p className="text-gray-600"><strong>Phone:</strong> {application.phoneNo}</p>
              <p className="text-gray-600"><strong>Application ID:</strong> {application._id}</p>
              
              <button
                onClick={() => deleteApplication(application._id)}
                className="mt-4 inline-block bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
