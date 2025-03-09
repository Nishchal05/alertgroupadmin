const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DBConnect } = require('@/lib/DB'); // Database connection utility
const Admin = require('@/app/model/admin');

async function POST(req) {
  await DBConnect();

  try {
    // Parse request body
    const { email, password } = await req.json();

    // Find user by email
    const user = await Admin.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid credentials' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token will expire in 1 hour
    );

    // Respond with the token and user data
    return new Response(
      JSON.stringify({ success: true, token, data: user }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Login Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

module.exports = { POST };
