import db from "../db/route";
import bcrypt from 'bcrypt';
const { NextResponse } = require("next/server");

export const POST = async (req) => {
  try {
    const {username,useremail, email, pass, exp } = await req.json();
    console.log("usrname:", username);
    console.log("useremail:", useremail);
    console.log("pass", pass);
    console.log("eamil:", email);
    console.log("exp:", exp);


    const hashedPassword = await bcrypt.hash(pass, 10); // Hash the password
let query = 'UPDATE sl SET email = ?, password = ? WHERE name = ? AND email = ?';
let queryParams = [ email, hashedPassword, username,useremail];

if (exp) {
  query = 'UPDATE sl SET  email = ?, password = ?, exp = ? WHERE name = ? AND email = ?';
  queryParams = [email, hashedPassword, exp, username,useremail];
}

    const [result] = await db.promise().query(query, queryParams);
    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return new NextResponse("No rows were updated", { status: 404 });
    }

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('An error occurred during userinfo updateing:', error);
    return new NextResponse("Data update failed", { status: 500 });
  }
};
