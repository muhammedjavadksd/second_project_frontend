

interface FormActionResponse {
    status: boolean,
    msg: string,
    data?: any
}


interface IUser {
    id: string;
    token: string;
    email: string;
    role: string;
}

interface IAdminSessionData extends IUser {
    name: string
}

interface IOrganizationSessionData extends IUser {
    name: string
}

interface IUserSessionData extends IUser {
    first_name?: string,
    last_name?: string,
    phone: number,
}

// interface ITokenInterface {
//     token: {
//         user: {
//             role: string,
//         }
//     }
// }

// interface ISession {
//     data?: ITokenInterface
//     token?: ITokenInterface
// }


export type { FormActionResponse, IUserSessionData, IAdminSessionData, IOrganizationSessionData }