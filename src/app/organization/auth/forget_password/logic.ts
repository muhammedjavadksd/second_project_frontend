import API_axiosInstance from "@/external/axios/api_axios_instance";
import { AxiosResponse as CustomeAxiosResponse } from "@/types/API Response/FundRaiser";
import { IOrganizationForgetPasswordInitialValues } from "@/types/InterFace/FormInitialValues";
import { AxiosResponse } from "axios";


async function onOrganizationForgetPassword(values: IOrganizationForgetPasswordInitialValues, successCB: Function, errorCB: Function): Promise<void> {

    try {
        const { email_address } = values;
        API_axiosInstance.post("/auth/organization/forget_password", { email_address }).then((data: AxiosResponse) => {
            let response: CustomeAxiosResponse = data.data;
            let msg: string = response.msg;
            if (response.status) {
                successCB();
            } else {
                errorCB(msg)
            }
        }).catch((err) => {
            console.log(err);
            let error = err?.response?.data?.msg ?? "Something went wrong"
            errorCB(error)
        })
    } catch (e) {
        let error = e?.response?.data?.msg ?? "Something went wrong"
        errorCB(error)
    }
}

export default onOrganizationForgetPassword