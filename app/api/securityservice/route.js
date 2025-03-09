import { NextResponse } from 'next/server';
import SecurityService from '@/app/model/SecurityServices' // Adjust the path as needed
import { DBConnect } from '@/lib/DB';

export async function POST(req) {
  try {
    await DBConnect();

    const { serviceName, type, display, imgUrl, subHeading, description } = await req.json();

    const newService = new SecurityService({
      serviceName,
      type,
      display,
      imgUrl,
      subHeading,
      description,
    });

    const savedService = await newService.save();

    return NextResponse.json({ message: 'Service added successfully', service: savedService }, { status: 201 });
  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json({ message: 'Failed to add service', error }, { status: 500 });
  }
}
export async function GET(req,res) {
    try {
        const services = await SecurityService.find();
        return NextResponse.json({ services }, { status: 200 });
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch security services", error });
      }
    
}
  export async function DELETE(req) {
    try {
      // Connect to the database
      await DBConnect();
  
      // Extract jobId from the request body
      const { serviceId } = await req.json(); // Get jobId from the request body
  
      // Check if jobId is provided
      if (!serviceId) {
        return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
      }
  
      // Find and delete the job by ID
      const service = await SecurityService.findByIdAndDelete(serviceId);
  
      if (!service) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting job:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }