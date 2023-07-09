import db from "../../db/route";
import { NextResponse } from "next/server";

export const DELETE = async (req,{ params }) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { id } = params;

  console.log("coming from the api", id);

  try {
    const query = "DELETE FROM serves WHERE id = ?";
    const [result] = await db.promise().query(query, [id]);

    if (result.affectedRows === 0) {
      return new NextResponse( "Order not found", { status: 500 });
      return;
    }
      return new NextResponse( "Order deleted successfully", { status: 200 });

  } catch (error) {
    console.error("An error occurred during order deletion:", error);
    return new NextResponse( "Failed to delete order", { status: 500 });
    
  }
};
