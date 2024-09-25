"use client"
import React, { useState } from 'react'
import AdminSideBar from './Partials/SideBar'
import AdminNavbar from './Partials/Navbar'
import { SessionProvider, getSession, useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'

function AdminLayout({ children, onSearch, isSearch, placeHolder }: { children: React.ReactNode, onSearch?: Function, isSearch?: boolean, placeHolder?: string }) {



    const [navbarToggler, setNavbarToggler] = useState(true)

    return (
        <div className='adminBody'>
            <div className={`flex  w-full  min-h-screen`}>
                <div className={`${navbarToggler ? 'w-1/5' : 'hidden'} fixed transition-all duration-500 ease-in-out flex-grow row-span-1 h-full`}>
                    <AdminSideBar isShow={navbarToggler} />
                </div>
                <div className={`${navbarToggler ? 'w-4/5 ml-auto' : 'w-full'}`}>
                    <AdminNavbar onSearch={onSearch} onMenuClick={setNavbarToggler} />

                    <div className='p-5'>
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout