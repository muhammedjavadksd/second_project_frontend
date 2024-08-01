// import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import axios_instance from "@/util/external/axios/axios-instance";
import { resetDocuments, resetPictures, updateFundRaiseData } from "@/util/external/redux/slicer/fundRaiserForm";
import store from "@/util/external/redux/store/store";
import { FundRaiserFormInitialValues } from "@/util/types/InterFace/FormInitialValues";
import axios from "axios";
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
        onError("Something went wrong")
    }
}

async function onFileUpload(my_files, onSuccess, onError, ifNotLogged, type, fundRaiseID) {
    const session = await getSession();
    const user = userDetailsFromGetSession(session)
    const storeData = store.getState().fund_raiser as FundRaiserFormInitialValues;


    if (user) {

        const token = user.token;
        let uploadImagePromises: Promise<any>[] = []
        const presignedUrl = type == "Pictures" ? storeData.pictures_presigned_url : storeData.documents_presigned_url
        console.log(presignedUrl);


        for (let fileIndex = 0; fileIndex < my_files.length; fileIndex++) {
            console.log('Uploading file:', my_files[fileIndex]);
            console.log('Using presigned URL:', presignedUrl[fileIndex]);

            uploadImagePromises.push(
                axios.put(presignedUrl[fileIndex], my_files[fileIndex], {
                    headers: {
                        "Content-Type": my_files[fileIndex].type || "application/octet-stream"
                    }
                }).catch(error => {
                    console.error(`Error uploading file ${fileIndex}:`, error.response ? error.response.data : error.message);
                })
            );
        }


        console.log(uploadImagePromises);


        Promise.all(uploadImagePromises).then(async () => {
            try {



                const API_request = await API_axiosInstance.patch(`/fund_raise/upload_images/${fundRaiseID}`, {
                    image_type: type,
                    presigned_url: presignedUrl.slice(0, my_files.length)
                }, {
                    headers: {
                        "authorization": `Bearer ${token}`,
                        "fund_id": fundRaiseID,
                        // 'Content-Type': 'multipart/form-data'
                    }
                })

                console.log(API_request);


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
        }).catch((err) => {
            console.log(err);
        })
    } else {
        ifNotLogged()
    }
}

export { onFileUpload, onFileDelete }