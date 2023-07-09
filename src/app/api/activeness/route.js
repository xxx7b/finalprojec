const { NextResponse } = require("next/server");
const db = require("../db/route");

export const POST = async (req) => {
  try {
    const { user,activeness } = await req.json();
    console.log("Name:", user);
    console.log("activeness:", activeness);
    const query = 'UPDATE sl SET active = ? WHERE name = ?';
    const [result] = await db.promise().query(query, [activeness,user]);
    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return new NextResponse("No rows were updated", { status: 404 });
    }

    return new NextResponse("active has been updated", { status: 200 });
  } catch (error) {
    console.error('An error occurred during data update:', error);
    return new NextResponse("Data update failed", { status: 500 });
  }
};
