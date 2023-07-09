import db from '../db/route';
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { id, name, state } = await req.json();
    console.log("id:", id);
    console.log("state:", state);
    console.log("name:", name);
    let orderState = null;

    if (state === 0) {
      orderState = "inprogress";
    } else if (state === 1) {
        orderState = "rejected";
      }

    const query = 'UPDATE serves SET state = ?, orderstate = ? WHERE id = ? AND name = ?';
    const queryParams = [state, orderState, id, name];

    const [result] = await db.promise().query(query, queryParams);
    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return new NextResponse("No rows were updated", { status: 404 });
    }

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('An error occurred during userinfo updating:', error);
    return new NextResponse("Data update failed", { status: 500 });
  }
};
