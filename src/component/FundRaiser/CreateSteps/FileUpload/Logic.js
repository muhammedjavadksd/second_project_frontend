// import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios_instance from "@/util/external/axios/axios-instance";
import { resetDocuments, resetPictures, updateFundRaiseData } from "@/util/external/redux/slicer/fundRaiserForm";
import store from "@/util/external/redux/store/store";
import { getSession } from "next-auth/react";


async function onFileDelete(image_id, onSuccess, onError, type, edit_id) {
    const session = await getSession();
    const user = userDetailsFromGetSession(session)




    if (user) {
        const token = user.token;



        // type, edit_id, image_id
        try {

            const API_request = await API_axiosInstance.delete(`/fund_raise/delete_image/${type}/${edit_id}/${image_id}`, {
                headers: {
                    "authorization": `Bearer ${token}`,
                }
            })

            const response = API_request.data;
            console.log(response);
            if (response.status) {
                onSuccess(image_id, type)
            } else {
                onError(response.msg)
            }

        } catch (e) {
            const errorMessage = e?.response?.body?.msg;
            console.log(e);
            console.log(errorMessage);
            onError(errorMessage)
        }
    } else {
        ifNotLogged()
    }
}

async function onFileUpload(my_files, onSuccess, onError, ifNotLogged, type, fundRaiseID) {
    console.log(my_files);
    const session = await getSession();
    const user = userDetailsFromGetSession(session)


    console.log(my_files);


    if (user) {

        const token = user.token;
        console.log("User found");

        console.log(my_files);
        console.log(type);



        const formData = new FormData();

        formData.append("image_type", type);
        // formData.append("images", my_files);
        console.log("The length is : " + my_files.length);
        for (let fileIndex = 0; fileIndex < my_files.length; fileIndex++) {
            formData.append(`images_${fileIndex}`, my_files[fileIndex]);
        }





        // console.log(formData.getAll());

        try {
            const API_request = await API_axiosInstance.patch(`/fund_raise/upload_images/${fundRaiseID}`, formData, {
                headers: {
                    "authorization": `Bearer ${token}`,
                    "fund_id": fundRaiseID,
                    'Content-Type': 'multipart/form-data'
                }
            })

            let response = API_request.data;
            console.log(response);
            if (response.status) {
                const newDocs = response.data;
                const documents = newDocs?.documents ?? [];
                const pictures = newDocs?.picture ?? [];

                console.log(newDocs);

                console.log(documents);
                console.log(pictures);

                if (newDocs) {
                    if (type == "Document") {
                        store.dispatch(resetDocuments({ documents }))
                    } else {
                        store.dispatch(resetPictures({ pictures }))
                    }
                }
                onSuccess({
                    documents: documents,
                    pictures: pictures
                })
            } else {
                onError(response.msg)
            }

        } catch (e) {
            let errorMessage = e?.response?.body?.msg;
            console.log(e);
            console.log(errorMessage);
            onError(errorMessage)
        }
    } else {
        ifNotLogged()
    }
}

export { onFileUpload, onFileDelete }