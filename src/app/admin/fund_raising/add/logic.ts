import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";


async function onFundRaiserSubmit(val, successCallback, errorCallback, pictures: Blob[], documents: Blob[]) {

    console.log(val);
    const session = await getSession();
    const adminSession = userDetailsFromGetSession(session, "admin");
    const token = adminSession.token;
    try {

        const addFundRaiser = await API_axiosInstance.post("/fund_raise/admin/create",
            {
                amount: val.amount,
                category: val.category,
                sub_category: val.sub_category,
                phone_number: val.phone_number,
                email_id: val.email,
                age: val.age,
                about: val.about,
                benificiary_relation: "Admin created",
                full_name: val.full_name,
                city: val.city,
                district: val.district,
                full_address: val.full_address,
                pincode: val.pincode,
                state: val.state,
                documents: documents.length,
                pictures: pictures.length,
                status: val.status,
            },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        )


        const response = addFundRaiser.data;
        const uploadImageApi = [];
        console.log(response);

        if (response.status) {
            let { upload_images } = response.data;
            let { pictures: picturesUrl, documents: documentsUrl } = upload_images;
            console.log(picturesUrl, documentsUrl);

            for (let index = 0; index < pictures.length; index++) {
                let fileType = pictures[index].type;
                console.log(pictures[index]);
                let file = new File([pictures[index]], `file_${index}.${fileType}`, { type: fileType });
                uploadImageApi.push(axios.put(picturesUrl[index], file, {
                    headers: {
                        'Content-Type': file.type,
                    },
                }))
            }



            for (let index = 0; index < documents.length; index++) {
                let fileType = documents[index].type;

                let file = new File([documents[index]], `file_${index}.${fileType}`, { type: fileType });
                uploadImageApi.push(axios.put(documentsUrl[index], file, {
                    headers: {
                        'Content-Type': file.type,
                    },
                }))
            }
        } else {
            errorCallback(response.msg);
            return;
        }

        Promise.all(uploadImageApi).then((data) => {
            successCallback()
        }).catch((err) => {
            errorCallback("Something went wrong")
        })
    } catch (e) {
        console.log(e);
        errorCallback("Something went wrong");
    }
}

export { onFundRaiserSubmit }