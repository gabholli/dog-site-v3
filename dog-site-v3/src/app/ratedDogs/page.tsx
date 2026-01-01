"use client"

import { UserAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { supabase } from "../database/supabaseClient"
import Link from "next/link"
import { Rating } from '../types/types'

export default function RatedDogsList() {
    const { session } = UserAuth()
    const [ratingsList, setRatingsList] = useState<Rating[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!session) return
        setLoading(true)
        async function fetchRatingsList() {
            const { data, error } = await supabase
                .from('ratings')
                .select()
                .eq("user_id", session.user.id)

            if (error) {
                console.error("Error: ", error)
                setLoading(false)
                return
            }

            setRatingsList(data || [])
            setLoading(false)

        }

        fetchRatingsList()

    }, [session])

    const ratingsMap = ratingsList.sort((a, b) => a.rating - b.rating)?.map(item => {
        return (
            <div key={item.breed_id} className="text-center flex flex-col gap-y-2">
                <Link
                    className="hover:underline active:font-semibold text-2xl"
                    href={`../breeds/${item.breed_id}`}
                >
                    <img className="size-80 object-cover mb-7 rounded-xl shadow-2xl"
                        src={item.image}
                        alt="Dog item" />
                    <div>
                        <h1>{item.breed}</h1>
                        <p>Rating: {item.rating}</p>
                    </div>
                </Link>
            </div>
        )
    })

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                        <animateTransform
                            attributeName="transform"
                            dur="0.75s"
                            repeatCount="indefinite"
                            type="rotate"
                            values="0 12 12;360 12 12"
                        />
                    </path>
                </svg>
            </div>
        )
    }

    return (
        <main className="flex flex-col justify-center items-center p-8 gap-y-8 bg-cover bg-center">
            {session && ratingsList.length > 0 && (
                <>
                    <h1 className='text-3xl mb-2'>Ratings Summary</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {ratingsMap}
                    </div>
                </>
            )}
            {session && ratingsMap.length === 0 && (
                <div className='flex justify-center items-center text-3xl text-center'>
                    <p>Add from within website to store your ratings!</p>
                </div>
            )}

            {!session && (
                <div className='flex justify-center items-center text-3xl text-center'>
                    <p>Log in to store your ratings!</p>
                </div>
            )}

        </main>
    )
}