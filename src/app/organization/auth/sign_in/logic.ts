import { IOrganizationSignIn } from "@/util/types/InterFace/FormInitialValues";
import { signIn } from "next-auth/react";


export async function onOrganizationSignIn(values: IOrganizationSignIn, successCB: Function, errorCB: Function) {

    signIn("credentials", { email_address: values.email_address, password: values.password, auth_type: "organization", redirect: false }).then((data) => {
        if (data.status == 401) {
            errorCB("Invalid email id or password")
        } else if (data.status == 200) {
            successCB()
        }
    }).catch((err) => {
        let errorMsg = err?.response?.data?.msg ?? "Something went wrong";
        console.log(errorMsg);
        errorCB(errorMsg)
    })
}