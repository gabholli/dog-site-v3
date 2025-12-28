"use client"

import { SetStateAction, useState } from "react"
import { FaStar } from "react-icons/fa"

export default function RatingsStar() {
    const [rating, setRating] = useState<number>(0)
    const [hoverValue, setHoverValue] = useState<number | undefined>(undefined)

    const colors = {
        orange: "#F2C265",
        grey: "a9a9a9"
    }

    const stars = Array(5).fill(0)

    function handleMouseOverStar(value: number) {
        setHoverValue(value)
    }

    function handleMouseLeaveStar() {
        setHoverValue(undefined)
    }


    function handleClickStar(value: number) {
        setRating(value)
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
