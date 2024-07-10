import axios_instance from "@/external/axios/axios-instance";
import { AdminResetPassword } from "@/types/InterFace/FormInitialValues";


export async function onResetPassword(values: AdminResetPassword, successCB: Function, errorCB: Function): Promise<void> {
    let { password, token } = values;

    try {

        const passwordReset = await axios_instance.post(`/api/admin_api/auth/reset_password`, { password }, {
            headers: {
                "token": token
            }
        });

        const response = passwordReset.data;
        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg ?? "Something went wrong")
        }
    } catch (e) {
        console.log(e);
        const errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(errorMessage)
    }
}       