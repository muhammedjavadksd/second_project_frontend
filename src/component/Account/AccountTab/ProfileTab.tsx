"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaLock } from 'react-icons/fa'

function Profil(): React.ReactElement {

    const router = useRouter()
    const params = useSearchParams();

    const [currentPath, setPath] = useState<string>("")

    useEffect(() => {
        setPath(typeof window !== 'undefined' ? window.location.pathname : '')
    }, [])


    return (
        <div>

            {/* <div className=" w-full bg-white rounded-lg p-2">
                <ul className="space-y-4 text-sm font-medium text-gray-600"> */}
            <div className="text-sm w-full font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li>
                        <Link
                            href="/account/profile"
                            className={`flex p-4 border-b-2 rounded-t-lg ${currentPath === '/account/profile' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                            <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Profile
                        </Link>
                    </li>


                    <li>
                        <Link
                            href="/account/support"
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${currentPath.startsWith("/account/support") ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                            <i className="fa-solid fa-headset mr-3"></i>
                            Support  & Ticket
                        </Link>
                    </li>


                    <li>
                        <a href="#" onClick={() => {
                            signOut({ redirect: false }).then(() => {
                                router.replace("/auth/sign_in")
                            }).catch((err) => { })
                        }}
                            className={`gap-2 items-center flex p-4 border-b-2 rounded-t-lg ${currentPath === '/account/' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}>

                            <FaLock />
                            Logout
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Profil