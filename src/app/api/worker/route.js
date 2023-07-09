import { NextResponse } from "next/server";
import db from '../db/route';

export const Userreg = async (formData) => { 
  const { name, phoneNumber, address, repairType, payment, additionalInfo ,selectedWorkerName} = formData;
  console.log("Info coming from req:", name, phoneNumber, address, repairType, payment, additionalInfo,selectedWorkerName);

  try {
    const result = await db.promise().query('INSERT INTO serves (name, phoneNumber, address, repairType, payment, additionalInfo,workername) VALUES (?, ?, ?, ?, ?, ?,?)', [name, phoneNumber, address, repairType, payment, additionalInfo,selectedWorkerName]);
    return result;
  } catch (error) {
    console.error('An error occurred during insertion:', error);
    throw new Error('insertion failed');
  }
};

export const POST = async (req, res) => {
  try {
    const formData = await req.json();
    const { name, phoneNumber, address, repairType, payment, additionalInfo } = formData;
    console.log("Info to API:", name, phoneNumber, address, repairType, payment, additionalInfo);

    const result = await Userreg(formData);
    return new NextResponse(  "successfully"  ,{ status: 200 }, JSON.stringify(result) );
  } catch (error) {
    console.error('An error occurred during registration:', error);
    return new NextResponse( "unsuccessfully" , { status: 500 });
  }
};
