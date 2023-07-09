import { NextResponse } from "next/server";
import db from "../db/route";

export const POST = async (req) => {
  try {
    const query = 'SELECT id, name, email, userype, phone, address, exp , active FROM sl';
    const [rows] = await db.promise().query(query);
    console.log("These are the rows:", rows);

    return new NextResponse(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('An error occurred during data retrieval:', error);
    return new NextResponse("Data retrieval failed", { status: 500 });
  }
};
