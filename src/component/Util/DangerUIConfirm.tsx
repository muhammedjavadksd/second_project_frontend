function DangerUIConfirm({ onClose, onConfirm, title, }) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                <img
                    src="/images/icons/warning.png"
                    alt="Confirmation"
                    className="w-16 h-16 mx-auto mb-4"
                />
                <p className="text-lg mb-4 text-gray-800">{title}</p>
                <div className="gap-4 block">
                    <button onClick={onConfirm} className="bg-green-400 w-full mb-2 text-white px-6 py-2 rounded-lg shadow-md hover:bg-black transition duration-200">
                        Confirm
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white w-full  px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DangerUIConfirm