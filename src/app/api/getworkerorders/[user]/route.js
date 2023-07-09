import db from "../../db/route";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  if (req.method !== "GET") {
    return new NextResponse({ message: "Method Not Allowed" }, { status: 405 });
  }

  const { user } = params;

  console.log("coming from the api", user);

  try {
    const query = "SELECT * FROM serves WHERE workername = ?";
    const [result] = await db.promise().query(query, [user]);

    if (result.length === 0) {
      return new NextResponse(JSON.stringify({ message: "orders are not found" }), { status: 404 });
    }
    console.log(result)
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("An error occurred during receiving the orders:", error);
    return new NextResponse(JSON.stringify({ message: "Failed to get orders" }), { status: 500 });
  }
};
