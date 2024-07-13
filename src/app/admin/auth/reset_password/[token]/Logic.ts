import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance";
import { AdminResetPassword } from "@/types/InterFace/FormInitialValues";


export async function onResetPassword(values: AdminResetPassword, successCB: Function, errorCB: Function): Promise<void> {
    let { password, token } = values;

    try {

        let apiRequest = await API_axiosInstance.post(`/auth/admin/reset_password/${token}`, {
            password: password
        })


        const response = apiRequest.data;

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