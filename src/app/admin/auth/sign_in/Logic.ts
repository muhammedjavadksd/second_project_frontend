import { AdminSignIn } from "@/types/InterFace/FormInitialValues";
import { signIn } from "next-auth/react";


export function onAdminSignInHandler(values: AdminSignIn, successCB: Function, errorCB: Function): void {

    signIn("credentials", { email_address: values.email, password: values.password, auth_type: "admin", redirect: false },).then((adminLogin) => {
        if (adminLogin.status == 401) {
            errorCB("Invalid email id or password")
        } else if (adminLogin.status == 200) {
            console.log(adminLogin);
            successCB()
        }
    }).catch((err) => {
        let errorMsg = err?.response?.data?.msg ?? "Something went wrong";
        errorCB(errorMsg)
    })
}