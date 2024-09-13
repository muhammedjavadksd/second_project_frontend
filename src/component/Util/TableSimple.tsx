import React, { useState } from 'react'
// import TableDropDown from './subComponent/TableDropDown';
import { ITableProps } from '@/util/types/InterFace/PropInterFace';
import TableRowCount from './TableRowCount';
import TableSearch from './TableSearch';

function TableSimple({ headers, data, keyIndex, searchKeys }: ITableProps) {

    const [tempData, setTempData] = useState(data)
    const [displayData, setDisplayData] = useState(data)

    function onSearch(search: string) {
        const filter = tempData.filter((each: object[]) => {
            const map = searchKeys.map((sKey: string) => {
                return each[sKey].startsWith(search)
            })
            return map
        })
        setDisplayData(filter)
    }


    return (

        <>
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input onChange={(e) => onSearch(e.target.value)} type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                    <tr>

                        {headers.map((each) => {
                            return (
                                <th scope="col" className="text-center px-6 py-3">
                                    {each}
                                </th>
                            );
                        })}

                    </tr>
                </thead>
                <tbody>
                    {displayData.map((prod, index) => {
                        return (

                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {
                                    keyIndex.map(item => {
                                        return <th scope="row" className="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {
                                                typeof item.key == "string" ? (
                                                    item.as(prod[item.key]) //  prod[item.key].item.as(data[index][item.key])
                                                ) : (
                                                    item.as(...item.key.map((itemKey) => prod[itemKey])) //data[index][item.key].item.as(...data[index][item.key])
                                                )
                                            }
                                        </th>;
                                    }
                                    )
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>

    )
}

export default TableSimple