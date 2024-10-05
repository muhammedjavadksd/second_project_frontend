import { FaSpinner } from "react-icons/fa";


function SpinnerLoader({ isLoading }: { isLoading: boolean }) {

    return (
        <div className={`${!isLoading && "hidden"} z-[100] fixed top-0 w-full h-screen flex justify-center items-center right-0 bg-black bg-opacity-30`}>
            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        </div>
    )
}

export default SpinnerLoader