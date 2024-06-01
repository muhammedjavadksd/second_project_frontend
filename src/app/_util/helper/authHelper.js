

export function isAdminlogged(session) {
    try {
        let user = session?.data;
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
        if (!role || role != 'admin') {
            console.log("This 4");
            return false
        }

        return true

    } catch (e) {
        alert("Error")
        return false
    }
}



export function isUserLogged(session) {
    try {
        let user = session?.data;
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

    let data = session?.data ?? session.token;
    if (!data) return false
    let token = data?.token ?? data;
    if (!token) return false;
    console.log(token.user);
    return token.user;
}