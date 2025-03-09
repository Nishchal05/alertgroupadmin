"use client";
import { PlusCircle, Edit, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const JobSection = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/careers"); 
      const result = await res.json();
      setJobs(result.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const res = await fetch(`/api/careers`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }), // Send jobId as part of JSON object
      });
      
      if (res.ok) {
        alert('Delete Successful');
        setJobs(jobs.filter((job) => job._id !== jobId));
      } else {
        const errorData = await res.json();
        console.error('Error deleting job:', errorData.error);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl text-gray-400 font-bold mb-6 text-center">Job Section</h1>
      <div className="flex flex-wrap gap-6">
        {/* Add New Job Button */}
        <div className="border w-[250px] h-[250px] flex justify-center items-center rounded-lg backdrop-blur-2xl">
          <Link href="/career" className="flex justify-center items-center">
            <PlusCircle className="w-10 h-10 text-blue-600 hover:text-blue-800" />
          </Link>
        </div>

        {/* Job List */}
        {jobs &&
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg shadow-lg w-[300px] h-auto"
            >
              <h2 className="text-xl font-semibold mb-2">{job.jobTitle}</h2>
              <p className="text-sm mb-2 text-gray-600">{job.description}</p>
              <p className="text-sm">
                <strong>Job Type:</strong> {job.jobType}
              </p>
              <p className="text-sm">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-sm">
                <strong>Salary:</strong> ${job.salary}
              </p>
              <p className="text-sm">
                <strong>Experience Level:</strong> {job.experienceLevel}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex justify-between items-center">

                {/* Delete Button */}
                <button
                  onClick={() => deleteJob(job._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 flex items-center gap-1"
                >
                  <Trash className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default JobSection;
