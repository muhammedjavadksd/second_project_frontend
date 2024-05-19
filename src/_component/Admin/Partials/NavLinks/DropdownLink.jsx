"use client"
import Link from 'next/link'
import React, { useState } from 'react'

function DropdownLink({ title, icon, isActive, children }) {

    let [isOpen, setIsOpen] = useState(isActive);

    return (
        <li>
            <button onClick={()=> setIsOpen(!isOpen)} type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                {icon}
                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{title}</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            {isOpen && <ul id="dropdown-example" class=" py-2 space-y-2">
                {children}
            </ul>
            }
        </li>
    )
}

export default DropdownLink