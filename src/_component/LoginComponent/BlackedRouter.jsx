import { isAdminlogged } from '@/app/_util/helper/authHelper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function BlackedRouter({ children, session }) {

    let [isAuth, setAuth] = useState(false)
    let router = useRouter();

    useEffect(() => {
        const isLogged = isAdminlogged(session);
        if (isLogged) {
            router.replace("/admin");
        } else {
            setAuth(true);
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