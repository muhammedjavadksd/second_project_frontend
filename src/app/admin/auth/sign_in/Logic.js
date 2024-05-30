import { signIn } from "next-auth/react";


export function onAdminSignInHandler(values, successCB, errorCB) {
    console.log("Invoked");
    console.log(values);
    signIn("credentials", { email_address: values.email, password: values.password, auth_type: "admin", redirect: false },).then((adminLogin) => {
        console.log("The response is");
        console.log(adminLogin);
        if (adminLogin.status == 401) {
            errorCB("Invalid email id or password")
        } else if (adminLogin.status == 200) {
            console.log(adminLogin);
            successCB()
        }
    }).catch((err) => {
        console.log("Error worked");
        let errorMsg = err?.response?.data?.msg ?? "Somethin went wrong";
        console.log("The message is ");
        console.log(errorMsg);
        errorCB(errorMsg)
    })
}