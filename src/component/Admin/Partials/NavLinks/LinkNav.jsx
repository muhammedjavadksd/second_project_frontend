import Link from 'next/link'
import React from 'react'

function LinkNav({ title, icon, href, isActive, isSub }) {
    return (
        <Link href={href} class="flex text-sm items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
            {icon}
            <span class="ms-3">{title}</span>
        </Link>
    )
}

export default LinkNav