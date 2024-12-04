import Link from "next/link"
import React from "react"

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-12 px-4
            bg-cover bg-center">
      <div className="bg-slate-300 px-4 py-2 flex flex-col gap-y-4">
        <h1 className="text-center text-4xl">Dog Information Site</h1>
        <p className="text-center text-2xl">Find information about your favorite breed</p>
      </div>
      <Link
        className="bg-slate-300 px-4 py-2 rounded text-xl hover:underline"
        href="breeds"
      >
        Find dog information
      </Link>
    </div >
  )
}