import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import { getSession } from "next-auth/react";
import API_axiosInstance from "../axios/api_axios_instance";
import { AxiosResponse } from "@/util/types/API Response/FundRaiser";
import store from "../redux/store/store";
import { updateFundRaiseData } from "../redux/slicer/fundRaiserForm";


export async function initialFundPayment(full_name: string, phone_number: number, email_id: string, hide_profile: boolean, amount: number, successCB: Function, errorCB: Function, fund_id: string) {
    try {
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")
        const token = user?.token;

        const { data } = await API_axiosInstance.post(`fund_raise/pay/${fund_id}`, {
            full_name,
            phone_number,
            email_id,
            amount,
            hide_profile
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        if (data.status) {
            const order = data.data.order;
            const session_id = order.payment_session_id;
            successCB(session_id)
        }
        console.log(data);

    } catch (e) {
        console.log(e);

    }

}


export async function onCommentPost(comment, fund_id, notLogged) {
    try {
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")
        const token = user?.token;
        if (token) {
            const addComment = await API_axiosInstance.post(`fund_raise/add_comment/${fund_id}`, {
                comment,
                mention: null,
                replay_id: null
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const response = addComment.data;
            if (response.status) {
                const responseData = response.data
                const { comment_id } = responseData;
                return comment_id
            }
            return false;
        } else {
            notLogged()
            return false
        }
    } catch (e) {
        console.log(e);
        // notLogged()
        return false
    }

}

export async function addReplayComment(comment, fund_id, mention, replay_id, notLogged) {
    try {
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")
        const token = user?.token;
        if (token) {
            const addComment = await API_axiosInstance.post(`fund_raise/add_comment/${fund_id}`, {
                comment,
                mention,
                replay_id
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const response = addComment.data;
            if (response.status) {
                const responseData = response.data
                const { comment_id } = responseData;
                return comment_id
            }
            return false;
        } else {
            notLogged()
            return false
        }
    } catch (e) {
        console.log(e);
        // notLogged()
        return false
    }
}


export async function onBankAccountSubmit(values, successCB, errorCB) {

    try {
        const { account_number, ifsc_code, holder_name, account_type, currentApplication, re_account_number } = values;
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
                            re_account_number,
                            ifsc_code,
                            holder_name,
                            account_type,
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
        console.log(e);

        const errorMessage = e?.response?.data?.msg ?? "Something went wrong";
        errorCB(errorMessage)
    }
}