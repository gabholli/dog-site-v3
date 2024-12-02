"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BreedDetails() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [dogData, setDogData] = useState([])
    const [imageData, setImageData] = useState([])

    const searchParams = useSearchParams();
    const id = searchParams.get('id')

    useEffect(() => {
        if (!id) return
        setLoading(true)

        const options = {
            method: "GET",
            url: `/api/breeds/${id}`
        }

        axios.request(options)
            .then(response => {
                console.log(response.data)
                setDogData(response.data)
            })
            .catch(error => {
                console.error(error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [id])

    useEffect(() => {
        if (!id) return
        setLoading(true)

        const options = {
            method: "GET",
            url: `/api/images/search?breed_id=${id}`
        }

        axios.request(options)
            .then(response => {
                console.log(response.data)
                setImageData(response.data)
            })
            .catch(error => {
                console.error(error)
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path
                    fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite"
                        type="rotate" values="0 12 12;360 12 12" /></path></svg>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className=" text-3xl mb-8 text-center mt-8">There was an error loading this page...</h1>
                <Link href="/" className="bg-sky-300 px-4 py-2 rounded text-xl hover:underline">
                    Return to home
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-12 p-8 justify-center items-center">
            <Link
                className="hover:underline text-center"
                href="/breeds"
            >
                &larr; <span className="text-3xl font-bold active:font-extrabold">Back to breeds list</span>
            </Link>
            <img className="size-80 lg:size-1/2 object-cover rounded-xl" src={imageData[0]?.url}></img>
            <h1 className="text-4xl underline text-center font-bold">{dogData.name} facts:</h1>
            <div className="md:hidden flex flex-col justify-center items-center text-center px-4 
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
            </div>
            <table className="max-[767px]:hidden table-fixed border-collapse border border-black">
                <tbody>
                    {
                        dogData.bred_for &&
                        <tr>
                            <td className="border border-black px-8 py-4 text-2xl">Reasons for breeding:</td>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.bred_for}</td>
                        </tr>
                    }
                    {
                        dogData.breed_group &&
                        <tr>
                            <td className="border border-black px-8 py-4 text-2xl">Breed group:</td>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.breed_group}</td>
                        </tr>
                    }
                    {
                        dogData.height?.imperial &&
                        <tr>
                            <td className="border border-black px-8 py-4 text-2xl">Height in inches:</td>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.height?.imperial}</td>
                        </tr>
                    }
                    {
                        dogData.life_span &&
                        <tr>
                            <td className="border border-black px-8 py-4 text-2xl">Average life span:</td>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.life_span}</td>
                        </tr>
                    }
                    {
                        dogData.origin &&
                        <tr>
                            <td className="border border-black px-8 py-4 text-2xl">Place(s) of origin:</td>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.origin}</td>
                        </tr>
                    }
                    {
                        dogData.temperament &&
                        <tr>
                            <td className="border border-black px-8 py-4 text-2xl">Temperament:</td>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.temperament}</td>
                        </tr>
                    }
                    {
                        dogData.weight?.imperial &&
                        <tr>
                            <td className="border border-black px-8 py-4 text-2xl">Weight in pounds:</td>
                            <td className="border border-black px-8 py-4 text-2xl">{dogData.weight?.imperial}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
