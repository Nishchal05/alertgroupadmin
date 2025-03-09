const JobApplication = require("@/app/model/JobApplication");
const { DBConnect } = require("@/lib/DB");
const { NextResponse } = require("next/server");

export async function GET(req) {
    await DBConnect();
    try{
        const applications=await JobApplication.find();
        return NextResponse.json(applications);
    }catch(error){
        console.log(error)
    }
}
