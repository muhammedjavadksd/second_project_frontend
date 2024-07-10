import API_axiosInstance from "@/external/axios/api_axios_instance";
import { AxiosResponse as CustomeAxiosResponse } from "@/types/API Response/FundRaiser";
import { IOrganizationResetPassword } from "@/types/InterFace/FormInitialValues";
import { AxiosResponse } from "axios";


async function onOrganizationResetPassword(values: IOrganizationResetPassword, successCB: Function, errorCB: Function): Promise<void> {

    try {

        const { password, token } = values;
        if (token) {
            API_axiosInstance.post(`/auth/organization/reset_password/${token}`, { password }).then((data: AxiosResponse) => {
                const response: CustomeAxiosResponse = data.data;
                if (response.status) {
                    successCB()
                } else {
                    errorCB(response.msg)
                }
            }).catch((err) => {
                console.log(err)
                let error = err?.response?.data?.msg ?? "Something went wrong"
                errorCB(error)
            })
        } else {
            errorCB("Please try again")
        }
    } catch (e) {
        let error = e?.response?.data?.msg ?? "Something went wrong"
        errorCB(error)
    }
}

export { onOrganizationResetPassword }