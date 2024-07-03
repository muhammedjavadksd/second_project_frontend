import exp from "constants";


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
        alert("Error")
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