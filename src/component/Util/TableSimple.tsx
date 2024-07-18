import React, { useState } from 'react'
// import TableDropDown from './subComponent/TableDropDown';
import { ITableProps } from '@/util/types/InterFace/PropInterFace';
import TableRowCount from './TableRowCount';
import TableSearch from './TableSearch';

function TableSimple({ headers, data }: ITableProps) {

    function onSearch() {

    }

    function onRowChanges() {

    }

    function onPagination(number) {

    }


    return (

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr>
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                    </th>
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
                {data.map((item) => {
                    return (

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            {Object.keys(item).map((each) => {
                                return <th scope="row" className="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item[each]}
                                </th>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>

    )
}

export default TableSimple