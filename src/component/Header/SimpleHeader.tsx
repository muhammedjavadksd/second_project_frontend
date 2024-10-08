/* eslint-disable react/no-unescaped-entities */
"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import NavbarLinks from './NavbarLinks';
import Image from 'next/image';

function SimpleHeader() {

    let [showToggle, setShowToggle] = useState(false);



    return (
        <nav className="bg-light-800 fixed top-0 right-0 left-0">
            <div className="container mx-auto">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center   sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center mr-5">
                            <Image width={32} height={32} className="h-8 w-auto" src={`${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/company/logo.png`} alt="Your Company" />
                        </div>

                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Donate to us</button>


                        <div className="relative ml-3">
                            <div>
                                <button onClick={() => {
                                    setShowToggle(prev => !prev)
                                }} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                </button>
                            </div>


                            <div className={"absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" + (showToggle ? " block " : " hidden")} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {/* <Link href="/" className=" text-grey rounded-md px-3 py-2 text-sm font-medium" >Home</Link>
                    <a href="#" className=" text-grey rounded-md px-3 py-2 text-sm font-medium">View Blood Bank</a>
                    <a href="#" className=" text-grey rounded-md px-3 py-2 text-sm font-medium">View Fund Raiser's</a>
                    <a href="#" className=" text-grey rounded-md px-3 py-2 text-sm font-medium">Register Organization</a>
                    <a href="#" className=" text-grey rounded-md px-3 py-2 text-sm font-medium">Event's</a>
                    <a href="#" className=" text-grey rounded-md px-3 py-2 text-sm font-medium">Nearest Blood Donor's</a> */}
                    <NavbarLinks></NavbarLinks>
                </div>
            </div>
        </nav>
    )
}

export default SimpleHeader