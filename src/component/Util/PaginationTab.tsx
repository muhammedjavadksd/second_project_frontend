import { IPaginationButton } from '@/util/types/InterFace/PropInterFace'
import React, { useEffect, useState } from 'react'

function PaginationTab({ from, onClick, to, total_pages, total_records }: IPaginationButton) {

  const [fromPage, setFromPage] = useState<number>(from)
  const [toPage, setToPage] = useState<number>(from + 5)
  let paginationButtonLength = 5
  let [currentPage, setCurrentPage] = useState<number>(1);

  function onPrev() {
    setCurrentPage((prev) => prev--)
  }

  function onNext() {
    setCurrentPage((prev) => prev++)
  }





  return (
    <div className='flex flex-col justify-end mt-5'>
      <span className="text-sm text-end font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
      <nav className="flex bg-white p-5 pt-2 pb-2 pt-2 items-center flex-column flex-wrap md:flex-row justify-end pe-0" aria-label="Table navigation">
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li key={0} onClick={() => onClick(0)}>
            <button onClick={onPrev} className={`${(from <= 1 && "pointer-events-all cursor-not-allowed ")}	flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
              Prev
            </button>
          </li>

          {
            Array.from({ length: (total_pages - currentPage) > 5 ? 5 : (total_pages - currentPage) }).map((_, page: number) => {
              let currentButton = currentPage + page;
              return (
                <li key={page} onClick={() => { onClick(currentButton) }}>
                  <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300   hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {currentButton}
                  </button>
                </li>
              );
            })
          }
          <li key={10} onClick={() => onClick(10)}>
            {

            }
            <button onClick={onNext} className={`${((toPage - fromPage) >= from && "pointer-events-all cursor-not-allowed ")} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div >
  )
}

export default PaginationTab