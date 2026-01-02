import toast from "react-hot-toast"
import { supabase } from "../database/supabaseClient"
import { UserAuth } from "../context/AuthContext"
import { Rating } from "../types/types"

export default function DeleteModal(
    {
        isVisible,
        onClose,
        item,
        onDelete

    }:
        {
            isVisible: boolean,
            onClose: () => void,
            item: Rating,
            onDelete: () => void
        }) {
    if (!isVisible) return null

    const { session } = UserAuth()

    function handleClose(e: React.MouseEvent<HTMLDivElement>) {
        if (e.currentTarget.id === "wrapper") onClose()
    }

    async function deleteBreed() {
        const { error } = await supabase
            .from('ratings')
            .delete()
            .eq("user_id", session.user.id)
            .eq('breed_id', item.breed_id)

        if (error) {
            console.error("Error: ", error)
            return
        }
        toast("Breed removed from ratings!")
        onDelete()
        onClose()
    }

    return (
        <div
            className="fixed inset-0 flex
                justify-center items-center m-4"
            onClick={(e) => handleClose(e)}
            id="wrapper"
        >
            <div className="flex flex-col">
                <button
                    onClick={() => onClose()}
                    className="place-self-end"
                >
                    X
                </button>
                <div className="bg-neutral-200 p-4 md:text-2xl">
                    <h1>Are you sure you want to delete this breed?</h1>
                    <div className="flex justify-center items-center gap-x-4">
                        <button onClick={deleteBreed}>Yes</button>
                        <button onClick={() => onClose()}>No</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
