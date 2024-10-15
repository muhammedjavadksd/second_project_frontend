import { isUserLogged, userDetailsFromGetSession } from '@/util/data/helper/authHelper';
// import { isUserLogged, userDetailsFromGetSession } from '@/app/_util/helper/authHelper';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SpalshScreen from '../Util/SplashScreen';

function BlackedBloodAccount({ children }) {
    let session = getSession();
    let router = useRouter();
    let [isAuth, setAuth] = useState(false)

    useEffect(() => {
        session.then((data) => {
            const userLogged = userDetailsFromGetSession(data, "user")
            console.log(userLogged)

            if (userLogged) {

                if (userLogged.blood_token) {
                    router.replace("/account/blood-account");
                } else {
                    setAuth(true)
                }
            } else {
                router.replace("/auth/sign_in");
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [session])


    return (

        <div>
            {
                isAuth ? children : <SpalshScreen />
            }
        </div>
    )
}

export default BlackedBloodAccount