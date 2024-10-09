import Link from 'next/link'
import React from 'react'

function AdminBreadCrumb({ title, root, paths = [] }) {

    return (
        <>
            <h3 className='text-2xl'>{title}</h3><ul className='flex gap-1 mt-2'>
                <li className='text-blue-600 text-sm'>
                    <Link href={root['href']}>{root.title}</Link>
                </li>
                <li>
                    &#8594;
                </li>
                {
                    paths.map((each, index) => {
                        return (
                            <li key={index} className='text-sm'>
                                <Link href={each.href}>{each.title}</Link>
                                {index != paths.length - 1 && <span>
                                    &#8594;
                                </span>}

                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

export default AdminBreadCrumb