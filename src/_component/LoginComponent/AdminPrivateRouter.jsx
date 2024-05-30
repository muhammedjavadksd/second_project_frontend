"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function AdminPrivateRouter({ children }) {
    let session = useSession();
    let router = useRouter();
    let [isAuth, setAuth] = useState(false)

    useEffect(() => {
        try {
            let user = session?.data;
            if (!user) {
                router.replace("/admin/auth/sign_in")
                return;
            }

            let token = user.token;
            if (!token) {
                router.replace("/admin/auth/sign_in")
                return;
            }

            let superUser = token.user;;
            if (!superUser) {
                router.replace("/admin/auth/sign_in")
                return;
            }

            let role = superUser.role;
            if (!role || role != 'admin') {
                router.replace("/admin/auth/sign_in")
                return;
            }

            setAuth(true)

        } catch (e) {
            router.replace("/admin/auth/sign_in")
        }

    }, [])


    return (

        <div>
            {
                !isAuth ? <h2>Fallback loading</h2> : children
            }
        </div>
    )
}

export default AdminPrivateRouter