import db from "../../db/route";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export const Userreg = async (userData) => {
  const { name, email, password, usertype, phone, address, exp } = userData;
  console.log("Info coming from req:", name, email, password, usertype, phone, address, exp);

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (usertype === 'user') {
      const result = await db.promise().query('INSERT INTO sl (name, email, password, userype ,phone,address,exp) VALUES (?, ?, ?, ?, ?, ?,?)', [name, email, hashedPassword, usertype, phone, address,"empty"]);
      return result;
    } else {
      const result = await db.promise().query('INSERT INTO sl (name, email, password, userype ,phone,address,exp) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, email, hashedPassword, usertype, phone, address, exp]);
      return result;
    }
  } catch (error) {
    console.error('An error occurred during registration:', error);
    throw new Error('Registration failed');
  }
};

export const POST = async (req, res) => {
  try {
    const { userData } = await req.json();
    console.log("Info to API:", userData);

    const result = await Userreg(userData);
    return new NextResponse("Data inserted successfully", { status: 200 }, result);
  } catch (error) {
    console.error('An error occurred during registration:', error);
    return new NextResponse("Data insertion failed", { status: 500 });
  }
};
