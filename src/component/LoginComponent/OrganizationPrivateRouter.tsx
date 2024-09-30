import { isOrganizationLogged } from '@/app/_util/helper/authHelper';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function OrganizationPrivateRouter({ children }: { children: React.ReactElement }): React.ReactElement {
    let session = useSession();
    let router = useRouter();
    let [isAuth, setAuth] = useState<boolean>(false)

    useEffect(() => {
        let userLogged = isOrganizationLogged(session)
        if (userLogged) {
            setAuth(true)
        } else {
           session.status!="loading" && router.replace("/organization/auth/sign_in");
        }
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