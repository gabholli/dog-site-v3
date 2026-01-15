"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Dog } from "../types/types"
import { UserAuth } from "../context/AuthContext"
import RatingsStar from "../components/RatingsStar"

export default function BreedList() {
    const { page, setPage } = UserAuth()

    const [activePage, setActivePage] = useState<number>(page || 1)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)
    const [dogData, setDogData] = useState<Dog[]>([])

    const [currentPage, setCurrentPage] = useState<number>(page || 1)
    const [itemsPerPage] = useState<number>(12)

    useEffect(() => {
        let cancelled = false
        setLoading(true)

        // Fetch from local API route (not external API)
        axios
            .get("/api/breeds")
            .then((response) => {
                if (!cancelled) {
                    setDogData(response.data)
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    setError(error)
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [])

    const dogBreedList = dogData.map(dog => {
        return (
            <div className="text-center flex flex-col gap-y-2" key={dog.id}>
                <Link href={`/breeds/${dog.id}`} passHref>
                    <div className="hover:underline active:font-semibold text-2xl">
                        <img
                            className="h-80 w-80 object-cover mb-7 rounded-xl shadow-2xl"
                            src={dog.image?.url}
                            alt={dog.name}
                        />
                        {dog.name}
                    </div>
                </Link>
                <RatingsStar dog={dog} />
            </div>
        )
    })

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = dogBreedList.slice(indexOfFirstItem, indexOfLastItem)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(dogData.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    function handlePageClick(number: number) {
        setCurrentPage(number)
        setPage(number)
        setActivePage(number)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const pagination = pageNumbers.map(number => {
        const activePageButton = activePage === number ? "bg-neutral-300" : "bg-neutral-100"
        return (
            <li
                key={number}
                className={`hover:underline active:font-semibold size-8 flex justify-center items-center rounded-lg
                    ${activePageButton}`}
            >
                <button
                    onClick={() => handlePageClick(number)}
                    aria-label={`Go to page ${number}`}
                    aria-current={currentPage === number ? "page" : undefined}
                >
                    {number}
                </button>
            </li>
        )
    })


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-dvh">
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
            <div className="flex flex-col justify-center items-center min-h-dvh">
                <h1 className="text-3xl mb-8 text-center mt-8">There was an error loading this page...</h1>
                <Link href="/" passHref>
                    <div className="bg-neutral-100 px-4 py-2 rounded-xl text-xl hover:underline">Return to home</div>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center p-8 gap-y-8 bg-cover bg-center">
            <h1 className="font-bold text-2xl">Select a breed:</h1>
            <nav className="flex flex-col gap-y-6">
                {dogData.length > 0 && <h2 className="font-bold text-xl text-center">Pages:</h2>}
                <ul className="list-none flex flex-wrap justify-center gap-x-8 md:gap-x-6 gap-y-4 cursor-pointer">
                    {pagination}
                </ul>
            </nav>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {currentItems}
            </div>
            <div>
                <nav className="flex flex-col gap-y-6">
                    {dogData.length > 0 && <h2 className="font-bold text-xl text-center">Pages:</h2>}
                    <ul className="list-none flex flex-wrap justify-center gap-x-8 md:gap-x-6 gap-y-4 cursor-pointer">
                        {pagination}
                    </ul>
                </nav>
            </div>
        </div>
    )
}
