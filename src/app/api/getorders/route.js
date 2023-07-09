const { NextResponse } = require("next/server");
const db = require("../db/route");

export const POST = async(req)=>{
    try {
        const { user } = await req.json();
        console.log("This is the name:", user);
    
        const query = 'SELECT * FROM serves WHERE name = ?';
        const [rows] = await db.promise().query(query, [user]);
        console.log("These are the rows:", rows);
    
        return new NextResponse(JSON.stringify(rows), { status: 200 });
      } catch (error) {
        console.error('An error occurred during data retrieval:', error);
        return new NextResponse("Data retrieval failed", { status: 500 });
      }
}