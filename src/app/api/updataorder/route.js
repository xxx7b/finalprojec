const { NextResponse } = require("next/server");
const db = require("../db/route");

export const POST = async (req) => {
  try {
    const { name, orderid, phoneNumber, address } = await req.json();
    console.log("Name:", name);
    console.log("Order ID:", orderid);
    console.log("Phone Number:", phoneNumber);
    console.log("Address:", address);

    const query = 'UPDATE serves SET phoneNumber = ?, address = ? WHERE name = ? AND id = ?';
    const [result] = await db.promise().query(query, [phoneNumber, address, name, orderid]);
    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return new NextResponse("No rows were updated", { status: 404 });
    }

    return new NextResponse("Order has been updated", { status: 200 });
  } catch (error) {
    console.error('An error occurred during data update:', error);
    return new NextResponse("Data update failed", { status: 500 });
  }
};
