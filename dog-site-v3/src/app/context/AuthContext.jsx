"use client"

import { createContext, useEffect, useState, useContext } from "react"
import { supabase } from "../database/supabaseClient"
import toast from 'react-hot-toast'

const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [session, setSession] = useState(undefined)
    const [page, setPage] = useState()

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

    }, [])

    async function signUpNewUser(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            console.error("Error signing up: ", error)
            return { success: false, error }
        }

        return { success: true, data }
    }

    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password: password,
            })

            // Handle Supabase error explicitly
            if (error) {
                console.error("Sign-in error:", error.message) // Log the error for debugging
                return { success: false, error: error.message } // Return the error
            }

            // If no error, return success
            console.log("Sign-in success:", data)
            return { success: true, data } // Return the user data
        } catch (error) {
            // Handle unexpected issues
            console.error("Unexpected error during sign-in:", error.message)
            return {
                success: false,
                error: "An unexpected error occurred. Please try again.",
            }
        }
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("Error signing out:", error)
        } else {
            toast("Signed out!")
        }
    }

    return (
        <AuthContext.Provider value={{ session, page, setPage, signUpNewUser, signInUser, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}