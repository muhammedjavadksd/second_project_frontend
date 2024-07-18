/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import React from 'react'

function NavbarLinks() {
    return (
        <>
            <Link href="/" class=" text-grey rounded-md px-3 py-2 text-sm font-medium" >Home</Link>
            <a href="#" class=" text-grey rounded-md px-3 py-2 text-sm font-medium">View Blood Bank</a>
            <a href="#" class=" text-grey rounded-md px-3 py-2 text-sm font-medium">View Fund Raiser's</a>
            <a href="#" class=" text-grey rounded-md px-3 py-2 text-sm font-medium">Register Organization</a>
            <a href="#" class=" text-grey rounded-md px-3 py-2 text-sm font-medium">Event's</a>
            <a href="#" class=" text-grey rounded-md px-3 py-2 text-sm font-medium">Nearest Blood Donor's</a>
        </>
    )
}

export default NavbarLinks