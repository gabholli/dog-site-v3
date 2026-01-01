"use client"

import { FaStar } from 'react-icons/fa'

export default function RatingStarCategory() {
    const colors = {
        orange: "#F2C265",
    }

    return (
        <div className='flex'>
            <FaStar
                size={24}
                color={colors.orange}
            />
        </div>
    )

}