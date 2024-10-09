/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import React from 'react'

function NavbarLinks() {
    return (
        <>
            <Link href="/" className="text-grey rounded-md px-3 py-2 text-sm font-medium" >Home</Link>
            <Link href="/blood/blood-requirements" className="text-grey rounded-md px-3 py-2 text-sm font-medium">View Blood Requirment's</Link>
            <Link href="/fund-raising/view/browse" className="text-grey rounded-md px-3 py-2 text-sm font-medium">View Fund Raiser's</Link>
            <Link href="/fund-raising/create" className="text-grey rounded-md px-3 py-2 text-sm font-medium">Ask for fund</Link>
            <Link href="/blood/find-nearest-donors" className="text-grey rounded-md px-3 py-2 text-sm font-medium">Nearest Blood Donor's</Link>
        </>
    )
}

export default NavbarLinks