import Link from 'next/link'
import React from 'react'

function DropDownLinkItem({ title, href }) {
    return (
        <li>
            <Link href={href} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{title}</Link>
        </li>
    )
}

export default DropDownLinkItem