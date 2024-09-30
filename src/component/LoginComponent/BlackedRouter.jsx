import { isAdminlogged } from '@/util/data/helper/authHelper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SpalshScreen from '../Util/SplashScreen';

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
        return <SpalshScreen />
    }

    return (
        children
    )
}

export default BlackedRouter