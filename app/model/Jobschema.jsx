const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Contract", "Internship"], // You can add more types if needed
  },
  responsibilities: {
    type: [String], // List of responsibilities
    required: true,
  },
  requirements: {
    type: [String], // List of requirements or qualifications
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["Entry-level", "Mid-level", "Senior-level"],
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now, // Automatically sets the date the job is posted
  },
  deadline: {
    type: Date, // Optional field for when the job application closes
  },
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job;
