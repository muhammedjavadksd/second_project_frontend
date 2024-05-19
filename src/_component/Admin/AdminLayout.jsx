"use client"
import React, { useState } from 'react'
import AdminSideBar from './Partials/SideBar'
import AdminNavbar from './Partials/Navbar'

function AdminLayout({ children }) {

    let [navbarToggler, setNavbarToggler] = useState(true)

    return (
        <div className='adminBody'>
            <div className={`flex  w-full  h-screen`}>
                <div className={`${navbarToggler ? 'w-1/5' : 'hidden'} transition-all duration-500 ease-in-out flex-grow row-span-1 h-full`}>
                    <AdminSideBar isShow={navbarToggler} />
                </div>
                <div className={`${navbarToggler ? 'w-5/6' : 'w-full'}`}>
                    <AdminNavbar onMenuClick={setNavbarToggler} />
                    
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