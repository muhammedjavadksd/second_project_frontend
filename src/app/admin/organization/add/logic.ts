import { AxiosResponse as CustomeAxiosResponse } from "@/types/API Response/FundRaiser";
import { OrganizationInitialValues } from "@/types/InterFace/FormInitialValues";
import { AxiosResponse } from "axios";
// import { AxiosResponse } f;


const { default: API_axiosInstance } = require("@/external/axios/api_axios_instance");



export async function addOrganization(values: OrganizationInitialValues, successCB: Function, errorCB: Function): Promise<void> {

    try {

        const form: FormData = new FormData();

        for (const [key, value] of Object.entries(values)) {
            form.append(key, value);
        }

        let addOrganization: AxiosResponse = await API_axiosInstance.post("/auth/organization/sign_up", form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        let response: CustomeAxiosResponse = addOrganization.data;
        console.log(response);
        if (response.status) {
            successCB()
        } else {
            errorCB(response.msg ?? "Something went wrong")
        }
    } catch (e) {
        console.log(e);
        errorCB("Something went wrong")
    }
}