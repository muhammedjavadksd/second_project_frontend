

import React, { Fragment } from 'react'
import TableHead from './Table/TableHead'
import SpinnerLoader from './SpinningLoader'
import { FaSpinner } from 'react-icons/fa'


function TableWrapper({ head, children, isLoading }: { head: string[], children: React.ReactChild, isLoading: boolean }) {

    if (isLoading) {
        return (
            <div className='flex justify-center items-center'>
                <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
            </div>
        )
    }

    return (
        <Fragment>
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <TableHead head={head} />
                    {

                        children
                    }
                </table>
            </div>
        </Fragment >
    )
}

export default TableWrapper