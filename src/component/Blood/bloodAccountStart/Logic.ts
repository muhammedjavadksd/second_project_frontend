import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";



async function OnDonorPersonDataEditSubmit(val, successCB, errorCB) {


    try {
        const {
            full_name,
            phone_number,
            email_address,
            location
        } = val;
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")
        const { blood_token } = user;

        const editDonor = await API_axiosInstance.patch("/blood/update_donor", {
            email_address: email_address,
            full_name,
            locatedAt: location,
            phoneNumber: phone_number
        }, {
            headers: {
                bloodAuthorization: `Bearer ${blood_token}`
            }
        })
        const response = editDonor.data;
        if (response.status) {
            successCB('Blood donor updation success')
        } else {
            errorCB(response.msg)
        }
    } catch (e) {
        const errorMsg = e?.response?.body?.msg ?? "Something went wrong";
        errorCB(errorMsg)
    }
}

async function onBloodDonationSubmit(val, location, successCB, errorCb) {


    try {
        const {
            full_name,
            phone_number,
            email_address,
            blood_group
        } = val;

        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")
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
            const { token: blood_token } = response.data;
            // console.log(user);

            // alert(token)
            await API_axiosInstance.patch("/auth/update_auth", { blood_token: blood_token }, { headers: { authorization: `Bearer ${token}` } })
            await signIn("credentials", { redirect: false, auth_type: "user_login_with_token", token })
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

    try {
        console.log(val);


        const certificate: File = val.certificate
        const blood_group: File = val.blood_group
        if (!certificate) {
            alert("Please upload valid file");
            return;
        }

        console.log(val);

        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user")

        const createdPresignedUrl = await API_axiosInstance.post("/blood/presigned_url_blood_group_change", {}, {
            headers: {
                authorization: `Bearer ${user.token}`,
                bloodauthorization: `Bearer ${user.blood_token}`
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
                        bloodAuthorization: `Bearer ${user.blood_token}`
                    }
                })
                const data = updateBloodGroup.data;
                if (data.status) {
                    successCB("Blood change request has been changed")
                } else {
                    errorCB(data?.msg ?? "Something went wrong")
                }
            }
        } else {
            errorCB("Something went wrong")
        }
    } catch (e) {
        const err = e?.response?.data?.msg ?? "Something went wrong"
        errorCB(err)
    }
}

export { onBloodDonationSubmit, OnBloodGroupUpdate, OnDonorPersonDataEditSubmit }