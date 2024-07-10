import axios_instance from "@/external/axios/axios-instance";
import exp from "constants";
import { getSession } from "next-auth/react";


export function isAdminlogged(session) {

    console.log(session);
    try {
        let token;
        if (session.data) {
            token = session?.data?.token
        } else if (session.token) {
            token = session.token;
        } else {
            console.log("This 1");
            return false;
        }

        // let user = session?.data ?? session.token;
        // console.log(user);
        // if (!user) {
        //     console.log("This 1");
        //     return false
        // }

        // let token = user.token;
        console.log(token);
        if (!token) {
            console.log("This 2");
            return false
        }

        let superUser = token.user;
        console.log(superUser);
        if (!superUser) {
            console.log("This 3");
            return false
        }

        let role = superUser.role;
        if (!role || role != 'admin') {
            console.log("This 4");
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
        console.log(user);
        if (!user) {
            console.log("This 1");
            return false
        }

        let token = user.token;
        console.log(token);
        if (!token) {
            console.log("This 2");
            return false
        }

        let superUser = token.user;;
        if (!superUser) {
            console.log("This 3");
            return false
        }

        let role = superUser.role;
        if (!role || role != 'user') {
            console.log("This 4");
            return false
        }

        return true

    } catch (e) {
        return false
    }
}

export function getUserDetails(session) {
    let data = session?.data ?? session?.token;
    if (!data) return false
    let token = data?.token ?? data;
    if (!token) return false;
    console.log(token.user);
    return token.user;
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


    // alert("Fdsf")

    try {
        let session = await getSession();
        let user = getUserDetails(session)
        let token = user?.token;
        if (token) {
            console.log(token);
            config.headers.authorization = `Bearer ${token}`;
        } else {
            console.log("Token not found");
        }
    } catch (e) {
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