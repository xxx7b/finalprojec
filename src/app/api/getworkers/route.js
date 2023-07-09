import db from "../db/route";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { pname } = await req.json();
    console.log("This is the pname:", pname);

    const query = 'SELECT * FROM sl WHERE exp = ? AND active = "active"';
    const [rows] = await db.promise().query(query, [pname]);
    console.log("These are the rows:", rows);

    return new NextResponse(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('An error occurred during data retrieval:', error);
    return new NextResponse("Data retrieval failed", { status: 500 });
  }
};
