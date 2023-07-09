
import { NextResponse } from "next/server";
import db from "../db/route";

export const POST = async (req) => {
  try {
    const query = 'SELECT id, name , phoneNumber , address , repairType , payment , state , workername , orderstate FROM serves'; 
    const [rows] = await db.promise().query(query);
    console.log("These are the rows:", rows);

    return new NextResponse(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('An error occurred during data retrieval:', error);
    return new NextResponse("Data retrieval failed", { status: 500 });
  }
};