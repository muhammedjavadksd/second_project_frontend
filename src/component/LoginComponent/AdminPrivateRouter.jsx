"use client"
import { isAdminlogged } from '@/util/data/helper/authHelper';
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function AdminPrivateRouter({ children }) {
    let session = getSession();
    let router = useRouter();
    let [isAuth, setAuth] = useState(false)

    useEffect(() => {
        console.log(session);
        if (session instanceof Promise) {
            session?.then((data) => {
                console.log(data);
                if (!isAdminlogged(data)) {
                    router.replace("/admin/auth/sign_in");
                } else {
                    setAuth(true)
                }
            }).catch((err) => { })
        } else {
            router.replace("/admin/auth/sign_in");
        }
    }, [session])


    return (

        <div>
            {
                !isAuth ? <h2>Fallback loading</h2> : children
            }
        </div>
    )
}

export default AdminPrivateRouter