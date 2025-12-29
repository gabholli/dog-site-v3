"use client"

import React, { useState } from "react"
import { UserAuth } from "../context/AuthContext"
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    // const [loading, setLoading] = useState(false)

    const router = useRouter()

    const { signInUser } = UserAuth()

    const handleSignIn = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const { session, error } = await signInUser(email, password) // Use your signIn function

        if (error) {
            setError(error) // Set the error message if sign-in fails

            // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
            setTimeout(() => {
                setError("")
            }, 3000) // 3000 milliseconds = 3 seconds
        } else {
            // Redirect or perform any necessary actions after successful sign-in
            toast("You are logged in!")
            router.push("/")
        }

        if (session) {
            setError("") // Reset the error when there's a session
        }
    }

    return (
        <div>
            <form onSubmit={handleSignIn} className="max-w-md m-auto p-4 md:p-20">
                <h2 className="font-bold pb-2">Sign in</h2>
                <p>
                    Don't have an account yet? <Link className="text-blue-500" href="/signup">Sign up</Link>
                </p>
                <div className="flex flex-col py-4">
                    {/* <label htmlFor="Email">Email</label> */}
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 mt-2 text-black bg-neutral-100 border-black
                            border-2 rounded-xl"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
                </div>
                <div className="flex flex-col py-4">
                    {/* <label htmlFor="Password">Password</label> */}
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 mt-2 text-black bg-neutral-100 border-black
                            border-2 rounded-xl"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                </div>
                <button className="w-full mt-4">Sign In</button>
                {error && <p className="text-red-600 text-center pt-4">{error}</p>}
            </form>
        </div>
    )
}
