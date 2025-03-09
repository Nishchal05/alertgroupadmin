const admin = require("@/app/model/admin");
const { DBConnect } = require("@/lib/DB");
const jwt = require('jsonwebtoken');

async function POST(req) {
  await DBConnect();

  try {
    // Parse request body (req.json() should be awaited)
    const { name, email, password,phoneNo } = await req.json();
    // Create a new admin instance
    const newAdmin = new admin({
      name,
      email,
      password,
      phoneNo,
    });

    // Save the admin data to the database
    const savedData = await newAdmin.save();

    // Generate a JWT token for the new admin
    const token = jwt.sign({ id: savedData._id, email: savedData.email }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token will expire in 1 hour
    });

    // Return success response with the token and saved data
    return new Response(JSON.stringify({ success: true, token, data: savedData }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    // Return error response
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

module.exports = { POST };
