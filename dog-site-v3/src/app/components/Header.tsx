import Link from "next/link"
import React from "react"

export default function Header() {
    return (
        <header className="bg-neutral-100 h-20 flex justify-center items-center
            text-xl">
            <div className="flex gap-10">
                <Link
                    className="hover:underline"
                    href="/">
                    Home
                </Link>
                <Link
                    className="hover:underline"
                    href="/ratedDogs">
                    Dog Ratings List
                </Link>
                <Link
                    className="hover:underline"
                    href="/">
                    Sign Up/Log In
                </Link>
            </div>
        </header>
    )
}