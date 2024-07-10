import { isOrganizationLogged } from '@/app/_util/helper/authHelper';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function OrganizationPrivateRouter({ children }: { children: React.ReactElement }): React.ReactElement {
    let session: Promise<Session> = getSession();
    let router = useRouter();
    let [isAuth, setAuth] = useState<boolean>(false)

    useEffect(() => {
        console.log(session);
        session.then((data) => {
            console.log(data);
            if (!isOrganizationLogged(data)) {
                router.replace("/organization/auth/sign_in");
            } else {
                setAuth(true)
            }
        }).catch((err) => { })
    }, [session])


    return (

        <div>
            {
                !isAuth ? <h2>Fallback loading</h2> : children
            }
        </div>
    )
}

export default OrganizationPrivateRouter