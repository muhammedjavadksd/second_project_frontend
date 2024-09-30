import axios_instance from "@/util/external/axios/axios-instance";
import { AdminForgetPassword } from "@/util/types/InterFace/FormInitialValues";


export async function onResetPassword(values: AdminForgetPassword, successCB: Function, errorCB: Function): Promise<void> {

    const { email_address } = values;
    try {

        const resetRequest = await axios_instance.post("/api/admin_api/auth/forget_password", {
            email_address
        });

        const response = resetRequest.data;
        if (response.status) {
            successCB()
        } else {
            const errorMessage: string = response.msg ?? "Something went wrong"
            errorCB(errorMessage)
        }
    } catch (e) {
        let errorMessage: string = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(errorMessage)
    }
    console.log(values);
}