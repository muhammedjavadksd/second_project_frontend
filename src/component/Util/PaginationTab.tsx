import { IPaginationButton } from '@/util/types/InterFace/PropInterFace'
import React from 'react'

function PaginationTab({ from, onClick, to }: IPaginationButton) {


  return (
    <div>
      <nav className="flex bg-white p-5 pb-2 pt-2 items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          {
            Array.from({ length: to - from }).map((each, index) => {
              return (
                <li onClick={() => onClick(index + from)}>
                  <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </div>
  )
}

export default PaginationTab