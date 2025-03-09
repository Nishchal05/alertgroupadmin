import { NextResponse } from 'next/server';
import Job from '@/app/model/Jobschema';
import { DBConnect } from '@/lib/DB';


export async function POST(req) {
  try {
    // Connect to the database
    await DBConnect();

    // Parse the request body (form data)
    const { jobTitle, description, jobType, responsibilities, requirements, location, salary, experienceLevel, company, deadline } = await req.json();

    // Create a new job entry
    const newJob = new Job({
      jobTitle,
      description,
      jobType,
      responsibilities: responsibilities.split(',').map((item) => item.trim()), // Convert to array
      requirements: requirements.split(',').map((item) => item.trim()), // Convert to array
      location,
      salary,
      experienceLevel,
      company,
      deadline,
    });

    // Save the job to the database
    const savedJob = await newJob.save();

    // Return a successful response
    return NextResponse.json({ message: 'Job posted successfully', job: savedJob }, { status: 201 });

  } catch (error) {
    console.error('Error posting job:', error);
    return NextResponse.json({ message: 'Failed to post job', error }, { status: 500 });
  }
}
export async function GET() {
    try {
      // Connect to the database
      await DBConnect();
  
      // Fetch all jobs from the database
      const jobs = await Job.find();
  
      // Return the jobs in JSON format
      return NextResponse.json({ jobs }, { status: 200 });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return NextResponse.json({ message: 'Error fetching jobs', error }, { status: 500 });
    }
  }
  // DELETE: Delete a job by ID
  export async function DELETE(req) {
    try {
      // Connect to the database
      await DBConnect();
  
      // Extract jobId from the request body
      const { jobId } = await req.json(); // Get jobId from the request body
  
      // Check if jobId is provided
      if (!jobId) {
        return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
      }
  
      // Find and delete the job by ID
      const job = await Job.findByIdAndDelete(jobId);
  
      if (!job) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting job:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }