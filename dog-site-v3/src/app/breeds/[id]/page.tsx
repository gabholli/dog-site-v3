"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ImageData, DogData } from "@/app/types/types"

export default function BreedDetails() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [dogData, setDogData] = useState<DogData | null>(null)
    const [imageData, setImageData] = useState<ImageData[]>([])

    useEffect(() => {
        if (!id) return

        let cancelled = false
        setLoading(true)

        // Prepare both API requests
        const dogRequest = axios.get(`/api/breeds/${id}`)
        const imageRequest = axios.get(`/api/images/?breed_id=${id}`)

        // Execute both requests in parallel
        Promise.all([dogRequest, imageRequest])
            .then(([dogResponse, imageResponse]) => {
                if (!cancelled) {
                    setDogData(dogResponse.data)
                    setImageData(imageResponse.data)
                }

            })
            .catch(error => {
                if (!cancelled) {
                    console.error(error)
                    setError(new Error('Failed to load data'))
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
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-dvh">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 24 24"><path
                    fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite"
                        type="rotate" values="0 12 12;360 12 12" /></path></svg>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-dvh">
                <h1 className="text-3xl mb-8 text-center mt-8">There was an error loading this page...</h1>
                <Link href="/breeds" className="bg-neutral-100 px-4 py-2 rounded-xl text-xl cursor-pointer hover:underline">
                    Back to breeds list
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-12 p-8 justify-center items-center">
            <Link
                className="hover:underline text-center border-black border-2 py-2 px-4 rounded-full"
                href="/breeds"
            >
                &larr; <span className="text-3xl font-bold active:font-extrabold">Back to breeds list</span>
            </Link>
            {dogData && imageData[0]?.url && (
                <img className="h-80 w-80 lg:w-1/2 lg:h-auto object-cover rounded-xl shadow-2xl"
                    alt={`${dogData.name} dog breed`}
                    src={imageData[0]?.url} />
            )}

            {dogData && <h1 className="text-4xl underline text-center font-bold">{dogData.name} facts:</h1>}
            {dogData && <div className="md:hidden flex flex-col justify-center items-center text-center px-4 
                        py-8 gap-y-10">
                {dogData.bred_for && <h2 className="text-3xl underline font-semibold">Reasons for breeding:</h2>}
                {dogData.bred_for && <p className="text-2xl">{dogData.bred_for}</p>}
                {dogData.breed_group && <h2 className="text-3xl underline font-semibold">Breed group:</h2>}
                {dogData.breed_group && <p className="text-2xl">{dogData.breed_group}</p>}
                {dogData.height?.imperial && <h2 className="text-3xl underline font-semibold">Height in inches:</h2>}
                {dogData.height?.imperial && <p className="text-2xl">{dogData.height?.imperial}</p>}
                {dogData.life_span && <h2 className="text-3xl underline font-semibold">Average life span:</h2>}
                {dogData.life_span && <p className="text-2xl">{dogData.life_span}</p>}
                {dogData.origin && <h2 className="text-3xl underline font-semibold">Place(s) of origin:</h2>}
                {dogData.origin && <p className="text-2xl">{dogData.origin}</p>}
                {dogData.temperament && <h2 className="text-3xl underline font-semibold">Temperament:</h2>}
                {dogData.temperament && <p className="text-2xl">{dogData.temperament}</p>}
                {dogData.weight?.imperial && <h2 className="text-3xl underline font-semibold">Weight in pounds:</h2>}
                {dogData.weight?.imperial && <p className="text-2xl">{dogData.weight?.imperial}</p>}
            </div>}
            {dogData && <table className="max-[767px]:hidden table-fixed border-collapse border border-black">
                <caption className="sr-only">{dogData.name} breed information</caption>
                <tbody>
                    {
                        dogData.bred_for &&
                        <tr>
                            <th scope="row" className="border border-black px-8 py-4 text-2xl text-left font-normal">Reasons for breeding:</th>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.bred_for}</td>
                        </tr>
                    }
                    {
                        dogData.breed_group &&
                        <tr>
                            <th scope="row" className="border border-black px-8 py-4 text-2xl text-left font-normal">Breed group:</th>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.breed_group}</td>
                        </tr>
                    }
                    {
                        dogData.height?.imperial &&
                        <tr>
                            <th scope="row" className="border border-black px-8 py-4 text-2xl text-left font-normal">Height in inches:</th>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.height?.imperial}</td>
                        </tr>
                    }
                    {
                        dogData.life_span &&
                        <tr>
                            <th scope="row" className="border border-black px-8 py-4 text-2xl text-left font-normal">Average life span:</th>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.life_span}</td>
                        </tr>
                    }
                    {
                        dogData.origin &&
                        <tr>
                            <th scope="row" className="border border-black px-8 py-4 text-2xl text-left font-normal">Place(s) of origin:</th>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.origin}</td>
                        </tr>
                    }
                    {
                        dogData.temperament &&
                        <tr>
                            <th scope="row" className="border border-black px-8 py-4 text-2xl text-left font-normal">Temperament:</th>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.temperament}</td>
                        </tr>
                    }
                    {
                        dogData.weight?.imperial &&
                        <tr>
                            <th scope="row" className="border border-black px-8 py-4 text-2xl text-left font-normal">Weight in pounds:</th>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.weight?.imperial}</td>
                        </tr>
                    }
                </tbody>
            </table>}

        </div >
    )
}
