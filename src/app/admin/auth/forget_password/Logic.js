import axios_instance from "@/external/axios/axios-instance";


export async function onResetPassword(values, successCB, errorCB) {

    let { email_address } = values;


    try {

        let resetRequest = await axios_instance.post("/api/admin_api/auth/forget_password", {
            email_address
        });
        let response = resetRequest.data;
        if (response.status) {
            successCB()
        } else {
            let errorMessage = response.msg ?? "Something went wrong"
            errorCB(errorMessage)
        }
    } catch (e) {
        console.log(e);
        errorCB("Somethign went wrong")
    }
    console.log(values);
}