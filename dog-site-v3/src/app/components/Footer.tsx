import React from "react"
import RatingsStar from "./ratingsStar"

export default function Footer() {
    return (
        <footer className="bg-neutral-100 h-20 flex justify-center items-center
            gap-x-4 text-xl">
            <h1>&#169;2024 Dog Info Site</h1>
            <RatingsStar />
        </footer>
    )
}