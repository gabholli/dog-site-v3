"use client"

import { UserAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { supabase } from "../database/supabaseClient"
import Link from "next/link"
import { Rating, RatingOption } from '../types/types'
import DeleteModal from '../components/DeleteModal'
import Select from 'react-select'

export default function RatedDogsList() {
    const { session } = UserAuth()
    const [selectedItem, setSelectedItem] = useState<Rating | null>(null)
    const [ratingsList, setRatingsList] = useState<Rating[]>([])
    const [filterValue, setFilterValue] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const options = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" }
    ]

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

    const selectedRatings = ratingsList.filter(item => {
        if (filterValue === null) return true
        return item.rating === filterValue
    })

    const ratingsMap = [...selectedRatings].sort((a, b) => a.rating - b.rating)?.map(item => {
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
                <button
                    onClick={() => setSelectedItem(item)}
                >Remove</button>
            </div>
        )
    })

    function handleDelete(breedId: number) {
        const filteredRatings = ratingsList.filter(item => item.breed_id !== breedId)
        setRatingsList(filteredRatings)
    }

    function handleChange(selectedOption: RatingOption | null) {
        if (selectedOption) {
            setFilterValue(selectedOption.value)
        } else {
            setFilterValue(null)
        }
    }

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

    const shouldCenter = !session || ratingsList.length === 0

    return (
        <main className={`flex flex-col ${shouldCenter ? "justify-center" : "justify-start"}
             items-center p-8 gap-y-8 min-h-[calc(100dvh-10rem)]`}>
            {session && ratingsList.length > 0 && (
                <>
                    <Select options={options} onChange={handleChange} placeholder="Filter by rating" isClearable />
                    {selectedRatings.length > 0 && <h1 className='text-3xl text-center'>Ratings Summary</h1>}
                    {selectedRatings.length === 0 && (
                        <div className='flex-1 flex justify-center items-center'>
                            <h1 className='text-3xl text-center'>No ratings for this filter.</h1>
                        </div>
                    )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {ratingsMap}
                    </div>
                </>
            )}
            {session && ratingsList.length === 0 && (
                <div className='flex justify-center items-center text-3xl text-center'>
                    <p>Add from within website to store your ratings!</p>
                </div>
            )}

            {!session && (
                <div className='flex justify-center items-center text-3xl text-center'>
                    <p>Log in to store your ratings!</p>
                </div>
            )}
            {selectedItem && (
                <DeleteModal
                    isVisible={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    item={selectedItem}
                    onDelete={() => handleDelete(selectedItem.breed_id)}
                />
            )}

        </main>
    )
}