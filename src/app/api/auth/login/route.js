import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import db from "../../db/route";

export const POST = async (req) => {
  const { email, password } = await req.json();
  console.log("This is the body coming from login", { email, password });
  try {
    const sql = "SELECT * FROM sl WHERE email = ?";
    const values = [email];

    // Execute the SQL query and retrieve the user data
    const [rows] = await db.promise().query(sql, values);
    console.log("Test: ", rows.length)
    if (rows.length === 0) {
      // User with the provided email does not exist
      return new NextResponse("User not found", { status: 404 });
    }

    const userData = rows[0];
    const hashedPassword = userData.password;

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      // Password does not match
      return new NextResponse("Invalid password", { status: 401 });
    }

    // Password matches, you can perform further actions with the user data
    return new NextResponse(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    // Return an error response
    return new NextResponse(error.message, { status: 500 });
  }
};
