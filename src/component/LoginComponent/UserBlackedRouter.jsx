import { isUserLogged } from '@/util/data/helper/authHelper';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SpalshScreen from '../Util/SplashScreen';

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
        return <SpalshScreen />
    }

    return (
        children
    )

}

export default UserBlackedRouter