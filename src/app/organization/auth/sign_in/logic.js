import { signIn } from "next-auth/react";


export async function onOrganizationSignIn(values, successCB, errorCB) {

    signIn("credentials", { email_address: values.email_address, password: values.password, auth_type: "organization", redirect: false }).then((data) => {

        if (data.status == 401) {
            errorCB("Invalid email id or password")
        } else if (adminLogin.status == 200) {
            successCB()
        }
    }).catch((err) => {
        let errorMsg = err?.response?.data?.msg ?? "Somethin went wrong";
        console.log(errorMsg);
        errorCB(errorMsg)
    })
}