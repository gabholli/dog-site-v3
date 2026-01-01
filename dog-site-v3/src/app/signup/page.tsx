"use client"

import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { signUpNewUser } = UserAuth()
    const router = useRouter()

    async function handleSignIn(e: { preventDefault: () => void }) {
        e.preventDefault()
        setLoading(true)

        try {
            const result = await signUpNewUser(email, password)

            if (result.success) {
                toast("User account created. You are logged in!")
                router.push("/")
            } else {
                setError(result.error.message)
            }
        } catch {
            setError("An unexpected error occurred.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSignIn} className="max-w-md m-auto p-4 md:p-20">
                <h2 className="font-bold pb-2">Sign up today!</h2>
                <p>
                    Already have an account? <Link className="text-blue-500" href="/login">Sign in</Link>
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
                <button type="submit" disabled={loading} className="w-full mt-4">
                    Sign Up
                </button>
                {error && <p className="text-red-600 text-center pt-4">{error}</p>}
            </form>
        </div>
    );
};