import axios_instance from "@/external/axios/axios-instance";


export async function onResetPassword(values, successCB, errorCB) {
    let { password, confirm_password, token } = values;

    console.log(token);

    try {

        let passwordReset = await axios_instance.post(`/api/admin_api/auth/reset_password`, {
            password
        }, {
            headers: {
                "token": token
            }
        });

        let response = passwordReset.data;
        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg ?? "Something went wrong")
        }

    } catch (e) {
        console.log(e);
        let errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(errorMessage)
    }
}       