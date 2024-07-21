import { isUserLogged } from '@/util/data/helper/authHelper';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function UserBlackedRouter({ children }) {

    const [isAuth, setAuth] = useState(false)
    const router = useRouter();
    const session = getSession()

    useEffect(() => {
        session.then((data) => {
            const isLogged = isUserLogged(data);
            if (isLogged) {
                router.replace("/");
            } else {
                setAuth(true);
            }
        }).catch((err) => { })
    }, [session])


    if (!isAuth) {
        return <h2>Loading</h2>
    }

    return (
        children
    )

}

export default UserBlackedRouter