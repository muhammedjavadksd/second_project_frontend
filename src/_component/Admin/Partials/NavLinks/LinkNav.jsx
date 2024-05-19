import Link from 'next/link'
import React from 'react'

function LinkNav({ title, icon, href, isActive, isSub }) {
    return (
        <li>
            <Link href={href} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                 {icon}
                <span class="ms-3">{title}</span>
            </Link>
        </li>
    )
}

export default LinkNav