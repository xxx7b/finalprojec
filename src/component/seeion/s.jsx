"use client"
import { SessionProvider } from "next-auth/react"
import React from 'react'

function Seeion({children}) {
  return <SessionProvider>
        {children}
      </SessionProvider>
}

export default Seeion;
