"use client"

import { SetStateAction, useState } from "react"
import { FaStar } from "react-icons/fa"
import { UserAuth } from '../context/AuthContext'
import { Dog } from "../types/types"

export default function RatingsStar({ dog }: { dog: Dog }) {
    const { session } = UserAuth()
    const [rating, setRating] = useState<number>(0)
    const [hoverValue, setHoverValue] = useState<number | undefined>(undefined)

    const colors = {
        orange: "#F2C265",
        grey: "a9a9a9"
    }

    const stars = Array(5).fill(0)

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


    function handleClickStar(value: number) {
        if (session) {
            setRating(value)
        }
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
