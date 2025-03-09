import Admin from "@/app/model/admin";
const { DBConnect } = require("@/lib/DB");
const { NextResponse } = require("next/server");
export async function GET(req) {
    await DBConnect();
    try{
        const data=await Admin.find();
        return NextResponse.json(data);
    }catch(error){
        console.log(error)
    }
}
export async function DELETE(req) {
    try {
      // Connect to the database
      await DBConnect();
  
      // Extract jobId from the request body
      const { id } = await req.json(); // Get jobId from the request body
  
      // Check if jobId is provided
      if (!id) {
        return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
      }
  
      // Find and delete the job by ID
      const service = await Admin.findByIdAndDelete(id);
  
      if (!service) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting job:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }