

const ModelHeader = ({ title }) => {
    return (
        <div className="flex  bg-gray-800 items-center px-5 py-3 justify-between border-b rounded-t border-gray-600">
            <h3 className="text-xl font-semibold text-white dark:text-white">
                {title}
            </h3>
        </div>
    )
}

export default ModelHeader