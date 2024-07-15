/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useEffect, useState } from 'react'
import NavbarLinks from './NavbarLinks';
import Image from 'next/image';
import { getSession, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { isUserLogged, userDetailsFromGetSession } from '@/app/_util/helper/authHelper';
import { useRouter } from 'next/navigation';

function Header() {

    const [user, setUser] = useState(false);
  let session = getSession();
  const router = useRouter()
    useEffect(() => {
        session.then((data) => {
            const isLogged = userDetailsFromGetSession(data);
            if (isLogged && isLogged?.role == "user") {
                setUser(isLogged)
            }
        }).catch(()=>{})
    },[])


    console.log(session);

    let [showToggle, setShowToggle] = useState(false);

    return (
        <nav className="bg-white pt-3 pb-3">
        <div className="container mx-auto">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
      
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
      
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center mr-5">
                <img
                  className="h-8 w-auto"
                  src="images/company/logo.png"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block ml-5">
                <div className="flex space-x-4">
                  <NavbarLinks />
                </div>
              </div>
            </div>
      
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Donate to us
              </button>
      
              <div className="relative ml-3">
                <div>
                  <span className="sr-only">Open user menu</span>
                  {!user ? (
                    <Link
                      href="/auth/sign_in"
                      type="button"
                      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Sign In
                    </Link>
                  ) : (
                    <img
                      onClick={() => {
                        setShowToggle((prev) => !prev);
                      }}
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  )}
                </div>
      
                <div
                  className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    showToggle ? "block" : "hidden"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <Link
                    href="/account/profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    {user?.first_name + "'s Profile" ?? "Profile"}
                  </Link>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    onClick={() => {
                      signOut({ redirect: false }).then((data) => {
                          router.replace("auth/sign_in")
                      }).catch((Err)=>{})
                    }}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavbarLinks />
          </div>
        </div>
      </nav>
      

    )
}

export default Header