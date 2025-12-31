"use client"

import { SetStateAction, useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import { UserAuth } from '../context/AuthContext'
import { Dog } from "../types/types"
import { supabase } from "../database/supabaseClient"

export default function RatingsStar({ dog }: { dog: Dog }) {
    const { session } = UserAuth()
    const [isUpdating, setIsUpdating] = useState(false)
    const [rating, setRating] = useState<number>(0)
    const [hoverValue, setHoverValue] = useState<number | undefined>(undefined)

    const colors = {
        orange: "#F2C265",
        grey: "a9a9a9"
    }

    const stars = Array(5).fill(0)

    useEffect(() => {
        async function detectRatings() {
            if (!session || !dog) {
                setRating(0)
                return
            }
            const { data, error } = await supabase
                .from('ratings')
                .select()
                .eq("user_id", session.user.id)
                .eq("breed_id", dog.id)
                .order("created_at", { ascending: false })
                .limit(1)
                .maybeSingle()

            if (data) {
                setRating(data.rating)
            }
            if (error) {
                console.error("Error: ", error)
                return
            }

        }

        detectRatings()
    }, [session, dog])

    function handleMouseOverStar(value: number) {
        if (session) {
            setHoverValue(value)
        }
    }

    function handleMouseLeaveStar() {
        if (session) {
            setHoverValue(undefined)
        }
    }


    // function handleClickStar(value: number) {
    //     if (session) {
    //         setRating((value))
    //     }
    // }

    async function handleClickStar(value: number) {
        if (!session || !dog || isUpdating) {
            return
        } else if (session) {
            setIsUpdating(true)

            const { error } = await supabase
                .from('ratings')
                .upsert({
                    breed: dog.name,
                    user_id: session.user.id,
                    breed_id: dog.id,
                    image: dog.image.url,
                    rating: value
                }, {
                    onConflict: 'user_id,breed_id'
                })
                .select()

            setRating(value)

            if (error) {
                console.error("Error: ", error)
                setIsUpdating(false)
                return
            }

        }
        setIsUpdating(false)
    }

    return (
        <div>
            {stars.map((_, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => handleClickStar(index + 1)}
                        onMouseOver={() => handleMouseOverStar(index + 1)}
                        onMouseLeave={() => handleMouseLeaveStar()}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                        <FaStar
                            size={24}
                            color={(hoverValue || rating) > index ? colors.orange : colors.grey}
                        />
                    </button>
                )
            })}
        </div>
    )

}
