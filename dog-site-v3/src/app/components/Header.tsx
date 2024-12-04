import Link from "next/link"
import React from "react"

export default function Header() {
    return (
        <header className="bg-slate-300 h-20 flex justify-center items-center
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