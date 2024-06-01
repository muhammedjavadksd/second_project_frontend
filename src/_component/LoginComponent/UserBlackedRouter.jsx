import { isUserLogged } from '@/app/_util/helper/authHelper';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function UserBlackedRouter({ children, session }) {

    let [isAuth, setAuth] = useState(false)
    let router = useRouter();

    useEffect(() => {
        const isLogged = isUserLogged(session);
        if (isLogged) {
            router.replace("/");
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

export default UserBlackedRouter