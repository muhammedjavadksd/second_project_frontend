import { isUserLogged, userDetailsFromGetSession } from '@/util/data/helper/authHelper';
// import { isUserLogged, userDetailsFromGetSession } from '@/app/_util/helper/authHelper';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SpalshScreen from '../Util/SplashScreen';

function UserPrivateRouter({ children }) {
    let session = getSession();
    let router = useRouter();
    let [isAuth, setAuth] = useState(false)

    useEffect(() => {
        session.then((data) => {
            let userLogged = userDetailsFromGetSession(data, "user")
            if (userLogged) {
                setAuth(true)
            } else {
                router.replace("/auth/sign_in");
            }
        }).catch((err) => { })
    }, [session])


    return (

        <div>
            {
                isAuth ? children : <SpalshScreen />
            }
        </div>
    )
}

export default UserPrivateRouter