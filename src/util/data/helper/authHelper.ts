import { getSession } from "next-auth/react";


export function isAdminlogged(session) {

    try {
        let token;
        if (session.data) {
            token = session?.data?.token
        } else if (session.token) {
            token = session.token;
        } else {
            return false;
        }

        if (!token) {
            return false
        }

        let superUser = token.user;
        if (!superUser) {
            return false
        }

        let role = superUser.role;
        if (!role || role != 'admin') {
            return false
        }

        return true

    } catch (e) {
        return false
    }
}



export function isUserLogged(session) {
    try {
        let user = session?.data ?? session.token;
        if (!user) {
            return false
        }

        let token = user.token;
        if (!token) {
            return false
        }

        let superUser = token.user;;
        if (!superUser) {
            return false
        }

        let role = superUser.role;
        if (!role || role != 'user') {
            return false
        }

        return true

    } catch (e) {
        return false
    }
}


export function detailsFromGetSession(session) {
    let data = session?.token;
    if (!data) return false

    let user = data?.user;
    if (!user) return false;


    return user;
}
export function userDetailsFromGetSession(session, role) {
    let data = session?.token;
    if (!data) return false

    let user = data?.user;
    if (!user) return false;

    if (user.role != role) {
        return false
    }

    return user;
}

export function userDetailsFromUseSession(session, role) {

    let data = session?.data;
    if (!data) return false

    let token = data?.token;
    if (!token) return false;

    const user = token?.user;
    if (!user) return false

    if (user.role != role) {
        return false
    }
    return user;
}

export function getAdminToken(headers) {
    try {
        let authToken = headers.get('authorization');
        let extractToken = authToken.split(" ");
        if (extractToken[0] == "Bearer") {
            let token = extractToken[1];
            return token
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}


export async function addTokenIntoAxiosInterceptor(config) {
    try {
        let session = await getSession();
        let user = detailsFromGetSession(session)

        let token = user?.token;

        if (token) {
            console.log(token);
            config.headers.authorization = `Bearer ${token}`;
        } else {
            console.log("Token not found");
        }
    } catch (e) {
        console.log(e);

        console.log("Error on addTokenIntoAxiosInterceptor");
    }
    return config
}

export function addTokenIntoAxiosInterceptorError(err) {
    return Promise.reject(err)
}

export function isOrganizationLogged(session) {
    try {
        let token;
        if (session.data) {
            token = session?.data?.token
        } else if (session.token) {
            token = session.token;
        } else {
            return false;
        }


        if (!token) {
            return false
        }

        let superUser = token.user;
        if (!superUser) {
            return false
        }

        let role = superUser.role;
        if (!role || role != 'organization') {
            return false
        }

        return true

    } catch (e) {
        return false
    }
}