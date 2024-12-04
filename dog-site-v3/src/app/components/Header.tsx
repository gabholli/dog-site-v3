import Link from "next/link"
import React from "react"

export default function Header() {
    return (
<<<<<<< HEAD
        <header className="bg-slate-300 h-20 flex justify-center items-center
=======
        <header className="bg-neutral-100 h-20 flex justify-center items-center
>>>>>>> parent of 3061960 (Changed background color and changed border radius)
            text-xl">
            <div className="flex gap-10">
                <Link
                    className="hover:underline"
                    href="/">
                    Home
                </Link>
            </div>
        </header>
    )
}