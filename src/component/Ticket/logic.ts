import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios from "axios";
import { log } from "console";
// import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";


export async function onTicketSubmit(val, successCb, errorCb) {

    try {
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user");
        const token = user.token;
        console.log(token);

        const attachment = val.attachment;
        let presignedUrl = ""
        console.log(attachment);

        if (attachment) {
            const imageName = attachment?.name
            const generatePresignedUrl = await API_axiosInstance.get(`/profile/presigned_url?file=${imageName}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const response = generatePresignedUrl.data;
            if (response.status) {
                const { url } = response.data
                console.log("Presigned url got it");

                const saveFile = await axios.put(url, attachment, {
                    headers: {
                        "Content-Type": attachment.type
                    }
                })
                presignedUrl = url;
            }
        }

        const raiseTicket = await API_axiosInstance.post("/profile/raise_ticket", {
            title: val.title,
            priority: val.priority,
            category: val.category,
            text: val.description,
            attachment: presignedUrl
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const response = raiseTicket.data;
        if (response.status) {
            successCb()
        } else {
            errorCb(response.msg)
        }
    } catch (e) {
        console.log(e);
        const err = e.response?.data?.msg ?? "Something went wrong"
        errorCb(err)
    }
}