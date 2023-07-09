"use clinet"
import { useSession } from "next-auth/react";

function Button() {
    const {data:session}=useSession();
    console.log(session)
  return (
    <div>
      hi
    </div>
  )
}

export default Button
