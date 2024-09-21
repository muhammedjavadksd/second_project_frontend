import { useEffect, useState } from "react";


function TablePagination({ total_records, item_per_page, onClick }) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginatedButton, setPaginatedButtons] = useState([])
    const MAX_TAB_ITEM = 5

    function onPrev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function onNext() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const totalPages = Math.ceil(total_records / item_per_page)

    useEffect(() => {
        onClick(currentPage)

        let from = 0;

        if ((currentPage - MAX_TAB_ITEM) >= 0) {
            from = (currentPage - MAX_TAB_ITEM) + 1;
        }

        let toButton = (from + MAX_TAB_ITEM) - 1;



        if (currentPage <= totalPages || totalPages == 1) {
            toButton++;
            from++;
        }

        if (totalPages < toButton) {
            toButton = totalPages;
        }



        const buttons = [];

        if (totalPages != 0) {
            for (let index = from; index <= toButton; index++) {
                buttons.push(
                    <li key={index} onClick={() => {
                        onClick(index)
                        setCurrentPage(index)
                    }}>
                        <button className={`${currentPage == index ? "bg-blue-500 text-white" : "bg-white "} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500  border border-gray-300   hover:bg-blue-500 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            {index}
                        </button>
                    </li>
                )
            }
        }


        setPaginatedButtons(buttons)
    }, [currentPage, total_records])



    if (totalPages == 0) {
        return <span>No records found</span>
    }



    return (
        <div className='flex flex-col justify-end mt-5'>
            <span className="text-sm text-end font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing
                <span className="font-semibold text-gray-900 dark:text-white"> {currentPage}-{totalPages}</span> of
                <span className="font-semibold text-gray-900 dark:text-white"> {total_records}</span></span>
            <nav className="flex bg-white p-5 pt-2 pb-2 pt-2 items-center flex-column flex-wrap md:flex-row justify-end pe-0" aria-label="Table navigation">

                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <button onClick={() => {
                        currentPage > 1 && setCurrentPage(1)
                    }} className={`${currentPage == 1 && "cursor-not-allowed"} bg-white flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500  border border-gray-300  rounded-s-lg  hover:bg-blue-500 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        First
                    </button>

                    <li >
                        <button onClick={onPrev} className={`${(currentPage <= 1 && "pointer-events-all cursor-not-allowed ")}	flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            Prev
                        </button>
                    </li>
                    {paginatedButton}


                    <li>
                        <button onClick={onNext} className={`${currentPage >= totalPages && "pointer-events-all cursor-not-allowed "} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            Next
                        </button>
                    </li>
                    <li>
                        <button onClick={() => {
                            currentPage < totalPages && setCurrentPage(totalPages)
                        }} className={`${currentPage == totalPages && "cursor-not-allowed"} bg-white flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500  border border-gray-300   hover:bg-blue-500 rounded-e-lg hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            Last
                        </button>
                    </li>
                </ul>
            </nav>
        </div >
    )
}

export default TablePagination