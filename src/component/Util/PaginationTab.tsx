import { IPaginationButton } from '@/util/types/InterFace/PropInterFace'
import React, { useEffect, useState } from 'react'

function PaginationTab({ from, onClick, to }: IPaginationButton) {

  const [fromPage, setFromPage] = useState<number>(from)
  const [toPage, setToPage] = useState<number>(from + 5)

  function onPrev() {
    if (from > 1) {
      setFromPage((prev) => prev - 1)
    }
  }

  function onNext() {
    if (from > (toPage - fromPage)) {
      setFromPage((prev) => prev - 1)
    }
  }

  function onPageSelect(page: number) {
    setFromPage(page)
  }

  useEffect(() => {
    setToPage(fromPage + 5)
  }, [fromPage])

  return (
    <div>
      <nav className="flex bg-white p-5 pb-2 pt-2 items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li key={0} onClick={() => onClick(0)}>
            <a href="#" onClick={onPrev} className={`${(from <= 1 && "pointer-events-all cursor-not-allowed ")}	flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
              Prev
            </a>
          </li>
          {
            Array.from({ length: toPage - fromPage }).map((_, index) => {
              const pageNumber = index + fromPage;
              return (
                <li key={pageNumber} onClick={() => {
                  onClick(pageNumber);
                  onPageSelect(pageNumber)
                }}>
                  <a href="#" className="	 flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300   hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {pageNumber}
                  </a>
                </li>
              );
            })
          }
          <li key={10} onClick={() => onClick(10)}>
            {

            }
            <a href="#" onClick={onNext} className={`${((toPage - fromPage) >= from && "pointer-events-all cursor-not-allowed ")} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div >
  )
}

export default PaginationTab