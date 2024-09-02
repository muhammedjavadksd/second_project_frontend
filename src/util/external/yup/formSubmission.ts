import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import { getSession } from "next-auth/react";
import API_axiosInstance from "../axios/api_axios_instance";
import { AxiosResponse } from "@/util/types/API Response/FundRaiser";
import store from "../redux/store/store";
import { updateFundRaiseData } from "../redux/slicer/fundRaiserForm";


export async function onBankAccountSubmit(values, successCB, errorCB) {

    try {
        const { account_number, ifsc_code, holder_name, account_type, currentApplication } = values;
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")

        if (user) {
            const token = user.token
            if (token) {
                const requestAPI: AxiosResponse = await API_axiosInstance.patch(`/fund_raise/edit/${currentApplication}`, {
                    withdraw_docs: {
                        account_number,
                        ifsc_code,
                        holder_name,
                        account_type
                    }
                }, {
                    headers: {
                        "authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })

                const response = requestAPI.data;
                if (response.status) {
                    successCB()
                    store.dispatch(updateFundRaiseData({
                        data: {
                            account_number,
                            ifsc_code,
                            holder_name,
                            account_type
                        }
                    }))
                } else {
                    errorCB(response.msg)
                }
                return;
            }
        }
        errorCB("Unauthraized access")
    } catch (e) {
        const errorMessage = e?.response?.body?.msg ?? "Something went wrong";
        errorCB(errorMessage)
    }
}