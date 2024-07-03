import { isAdminlogged } from '@/app/_util/helper/authHelper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function BlackedRouter({ children, session }) {

    let [isAuth, setAuth] = useState(false)
    let router = useRouter();

    useEffect(() => {
        if (session instanceof Promise) {
            session.then((data) => {
                const isLogged = isAdminlogged(data);
                if (isLogged) {
                    router.replace("/admin");
                } else {
                    setAuth(true);
                }
            }).catch((err) => { })
        } else {
            router.replace("/admin");
        }
    }, [session])


    if (!isAuth) {
        return <h2>Loading</h2>
    }

    return (
        children
    )
}

export default BlackedRouter