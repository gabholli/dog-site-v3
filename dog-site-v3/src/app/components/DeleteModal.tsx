export default function DeleteModal() {
    return (
        <div
            className="fixed inset-0 flex
                justify-center items-center"
        >
            <div className="flex flex-col">
                <button className="place-self-end">X</button>
                <div className="bg-neutral-200 p-4 ">
                    Modal
                    <button>Yes</button>
                    <button>No</button>
                </div>

            </div>
        </div>
    )
}
