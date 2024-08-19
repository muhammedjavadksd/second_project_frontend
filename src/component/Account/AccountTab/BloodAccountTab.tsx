import Link from 'next/link'
import React from 'react'

function BloodAccountTab(): React.ReactElement {


    return (
        <div>


            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Profile Overview</a>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Donate Blood</a>
                    </li>
                    <li className="me-2">
                        <Link href="my-requirements" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Blood Requests</Link>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Donation History</a>
                    </li>
                    <li className="me-2">
                        <Link href="blood-account/expressed-intrest" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Expressed Interest</Link>
                    </li>
                    <li className="me-2">
                        <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Patient Chat</a>
                    </li>


                </ul>
            </div>

        </div>
    )
}

export default BloodAccountTab
