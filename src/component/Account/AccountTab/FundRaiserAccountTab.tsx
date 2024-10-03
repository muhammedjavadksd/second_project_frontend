import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

function FundRaiserAccountTab(): React.ReactElement {
    const router = useRouter();
    const [currentPath, setPath] = useState(null)

    useEffect(() => {
        setPath(typeof window !== 'undefined' ? window.location.pathname : '')
    }, [])

    return (
        <div>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">

                    <li className="me-2">
                        <Link
                            href="/account/fund-raiser-account/my-fundraising"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${currentPath === '/account/fund-raiser-account/my-fundraising' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                            My Fund Raising Post
                        </Link>
                    </li>

                    <li className="me-2">
                        <Link
                            href="/account/fund-raiser-account/donation-history"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${currentPath === '/account/fund-raiser-account/donation-history' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                            Fund Donation History
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default FundRaiserAccountTab
