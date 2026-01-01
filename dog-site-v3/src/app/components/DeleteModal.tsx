export default function DeleteModal({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
    if (!isVisible) return null

    function handleClose(e) {
        if (e.target.id === "wrapper") onClose()
    }

    return (
        <div
            className="fixed inset-0 flex
                justify-center items-center m-4"
            onClick={handleClose}
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
                        <button>Yes</button>
                        <button>No</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
