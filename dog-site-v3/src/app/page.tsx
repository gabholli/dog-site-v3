"use client"

// import axios from "axios"
import Link from "next/link"
import React from "react"

export default function Home() {

  // const [backgroundImage, setBackgroundImage] = useState(null)

  // useEffect(() => {

  //   // Fetch from local API route (not external API)
  //   axios
  //     .get("/api/homeRandomImages")
  //     .then((response) => {
  //       if (response.data && response.data.length > 0) {
  //         setBackgroundImage(response.data[0].url); // Set the image URL
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }, [])

  return (
    <div className="bg-dogBackground bg-cover bg-center h-full w-full
      flex justify-center">
      <div className="flex flex-col justify-center items-center gap-y-12 px-4
            bg-cover bg-center"
      // style={{
      //   backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      //   minHeight: "100%", width: "100%", backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover", backgroundPosition: "center", objectFit: "contain"
      // }}
      >
        <div className="bg-neutral-100 px-4 py-2 flex flex-col gap-y-4 rounded-xl">
          <h1 className="text-center text-4xl">Dog Information Site</h1>
          <p className="text-center text-2xl">Find information about your favorite breed</p>
          <p className="text-center text-2xl">Sign in to save breed ratings</p>
        </div>
        <Link
          className="bg-neutral-100 px-4 py-2 rounded-xl text-xl hover:underline"
          href="breeds"
        >
          Find dog information
        </Link>
      </div >
    </div >
  )
}