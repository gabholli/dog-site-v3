"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Dog } from "../types/types"

export default function BreedList() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [dogData, setDogData] = useState<Dog[]>([]);

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12)

    useEffect(() => {
        setLoading(true);

        // Fetch from local API route (not external API)
        axios
            .get("/api/breeds")
            .then((response) => {
                setDogData(response.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    const dogBreedList = dogData?.map(dog => {
        return (
            <div className="text-center" key={dog.id}>
                <Link href={`/breeds/${dog.id}`} passHref>
                    <div className="hover:underline active:font-semibold text-2xl">
                        <img
                            className="size-80 object-cover mb-7 rounded-xl"
                            src={dog.image.url}
                            alt={dog.name}
                        />
                        {dog.name}
                    </div>
                </Link>
            </div>
        )
    })

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = dogBreedList.slice(indexOfFirstItem, indexOfLastItem)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(dogBreedList.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    function handlePageClick(number: React.SetStateAction<number>) {
        setCurrentPage(number)
    }

    const pagination = pageNumbers.map(number => (
        <li
            key={number}
<<<<<<< HEAD
            className="hover:underline active:font-semibold size-8 bg-neutral-100 flex justify-center items-center rounded"
=======
            className="hover:underline active:font-semibold size-8 bg-neutral-100 flex justify-center items-center rounded-lg"
>>>>>>> parent of 3b173dd (Changed background color to blue in several places)
        >
            <a onClick={() => handlePageClick(number)}>{number}</a>
        </li>
    ))

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

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl mb-8 text-center mt-8">There was an error loading this page...</h1>
                <Link href="/" passHref>
                    <div className="bg-neutral-100 px-4 py-2 rounded text-xl hover:underline">Return to home</div>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center p-8 gap-y-8 bg-cover bg-center">
            <h1 className="font-bold text-2xl">Select a breed:</h1>
            <nav className="flex flex-col gap-y-6">
                {dogData?.length > 0 && <h1 className="font-bold text-xl text-center">Pages:</h1>}
                <ul className="list-none flex flex-wrap justify-center gap-x-8 md:gap-x-6 gap-y-4 cursor-pointer">
                    {pagination}
                </ul>
            </nav>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {currentItems}
            </div>
            <div>
                <nav className="flex flex-col gap-y-6">
                    {dogData?.length > 0 && <h1 className="font-bold text-xl text-center">Pages:</h1>}
                    <ul className="list-none flex flex-wrap justify-center gap-x-8 md:gap-x-6 gap-y-4 cursor-pointer">
                        {pagination}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
