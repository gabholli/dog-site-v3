"use client"

import Link from "next/link"
import React from "react"
import { UserAuth } from "../context/AuthContext"

export default function Header() {
    const { session, signOut } = UserAuth()

    return (
        <header className="bg-neutral-100 h-20 flex justify-center items-center
            md:text-xl">
            <div className="flex gap-4 md:gap-10">
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
                {!session && (<Link
                    href="/signup"
                    className="hover:underline"
                >
                    Sign Up/Log In
                </Link>
                )
                }
                {session && (<button
                    className="hover:underline"
                    onClick={signOut}
                >
                    Sign Out
                </button>
                )
                }
            </div>
        </header>
    )
}