import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios from "axios";
import { getSession } from "next-auth/react";


async function onBloodDonationSubmit(val, successCB, errorCb) {

    try {
        const {
            full_name,
            phone_number,
            email_address,
            location,
            blood_group
        } = val;

        const session = await getSession();
        const user = userDetailsFromGetSession(session)
        const token = user.token;

        const openAccountApi = await API_axiosInstance.post("/blood/create", {
            full_name,
            email_address,
            phone_number,
            bloodGroup: blood_group,
            location
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const response = openAccountApi.data;
        console.log(response);

        if (response.status) {
            const { donor_id } = response.data
            const { token } = user;
            // console.log(user);

            await API_axiosInstance.patch("/auth/update_auth", { blood_token: token }, { headers: { authorization: `Bearer ${token}` } })
            successCB(donor_id)
        } else {
            errorCb(response.msg)
        }
    } catch (e) {
        console.log(e);

        const errorMsg = e?.response?.body?.msg ?? "Something went wrong";
        errorCb(errorMsg)
    }


}

async function OnBloodGroupUpdate(val, successCB, errorCB) {

    console.log(val);


    const certificate: File = val.certificate
    const blood_group: File = val.blood_group
    if (!certificate) {
        alert("Please upload valid file");
        return;
    }

    console.log(val);

    const session = await getSession();
    const user = userDetailsFromGetSession(session)

    const createdPresignedUrl = await API_axiosInstance.post("/blood/presigned_url_blood_group_change", {}, {
        headers: {
            authorization: `Bearer ${user.token}`
        }
    })
    const data = createdPresignedUrl?.data?.data;
    console.log(data);

    if (data && data.certificate_upload_url) {
        const presignedUrl = data?.certificate_upload_url;

        console.log(data);

        if (presignedUrl) {

            // const file = await yupValidLoader(certificate)
            // console.log(file);

            const buffer = await certificate.arrayBuffer()
            console.log(buffer);

            const uploadFile = await axios.put(presignedUrl, buffer, {
                headers: {
                    "Content-Type": certificate.type
                }
            })
            console.log(uploadFile);
            // const imageNameFromPresignedUrl = uti
            console.log(user);

            const updateBloodGroup = await API_axiosInstance.post("/blood/group_change_request", {
                blood_group,
                presigned_url: presignedUrl
            }, {
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            })
            const data = updateBloodGroup.data;
            if (data.status) {
                successCB("Blood change request has been changed")
            } else {
                successCB(data?.msg ?? "Something went wrong")
            }
        }
    } else {
        errorCB("Something went wrong")
    }
}

export { onBloodDonationSubmit, OnBloodGroupUpdate }