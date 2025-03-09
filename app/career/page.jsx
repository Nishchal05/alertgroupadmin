"use client";
import React, { useState } from "react";

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    jobType: "Full-time",
    responsibilities: "",
    requirements: "",
    location: "",
    salary: "",
    experienceLevel: "Entry-level",
    company: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Job posted successfully!");
      } else {
        alert("Failed to post job");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error posting job");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Post a Job</h2>

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">
            Responsibilities (Comma-separated)
          </label>
          <input
            id="responsibilities"
            name="responsibilities"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData.responsibilities}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements (Comma-separated)
          </label>
          <input
            id="requirements"
            name="requirements"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData.requirements}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            id="salary"
            name="salary"
            type="number"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
            Experience Level
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData.experienceLevel}
            onChange={handleChange}
          >
            <option value="Entry-level">Entry-level</option>
            <option value="Mid-level">Mid-level</option>
            <option value="Senior-level">Senior-level</option>
          </select>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Application Deadline
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
