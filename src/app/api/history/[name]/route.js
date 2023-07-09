import db from "../../db/route";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  if (req.method !== "GET") {
    return new NextResponse({ message: "Method Not Allowed" }, { status: 405 });
  }

  const { name } = params;

  console.log("coming from the api", name);

  try {
    const query = "SELECT * FROM serves WHERE name = ?";
    const [result] = await db.promise().query(query, [name]);

    if (result.length === 0) {
      // If the first query doesn't return any results, execute the second query
      const secondQuery = "SELECT * FROM serves WHERE workername = ?";
      const [secondResult] = await db.promise().query(secondQuery, [name]);

      if (secondResult.length === 0) {
        return new NextResponse(
          JSON.stringify({ message: "History not found" }),
          { status: 404 }
        );
      }

      return new NextResponse(JSON.stringify(secondResult), { status: 200 });
    }

    console.log(result);
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("An error occurred while retrieving the history:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to get history" }),
      { status: 500 }
    );
  }
};
