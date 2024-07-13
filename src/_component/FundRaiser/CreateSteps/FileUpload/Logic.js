import { userDetailsFromGetSession } from "@/app/_util/helper/authHelper";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import axios_instance from "@/external/axios/axios-instance";
import { insertDocuments, insertPicturs, updateFundRaiseData } from "@/external/redux/slicer/fundRaiserForm";
import store from "@/external/redux/store/store";
import { getSession } from "next-auth/react";


async function onFileDelete(image_id, onSuccess, onError, type, edit_id) {
    let session = await getSession();
    let user = userDetailsFromGetSession(session)




    if (user) {
        const token = user.token;



        // type, edit_id, image_id
        try {

            let API_request = await API_axiosInstance.delete(`/fund_raise/delete_image/${type}/${edit_id}/${image_id}`, {
                headers: {
                    "authorization": `Bearer ${token}`,
                }
            })

            // '/api/user_api/fund_raiser/create'
            // let API_request = await axios_instance.delete(
            //     `/api/user_api/fund_raiser/delete_image`,
            //     {
            //         headers: {
            //             "authorization": `Bearer ${user.token}`,
            //         },
            //         params: {
            //             type: type,
            //             edit_id: edit_id,
            //             image_id: image_id
            //         }
            //     }
            // );


            let response = API_request.data;
            console.log(response);
            if (response.status) {
                // let updateStore = store.getState().fund_raiser;
                // if (updateStore) {
                //     console.log(image_id);
                //     if (type == "Documents") {

                //         const newDocs = updateStore.documents?.filter(function (each) {
                //             if (each == image_id) {
                //                 console.log(each, image_id);
                //                 console.log("Found");
                //             }
                //             return each != image_id
                //         })
                //         console.log("New docs");
                //         console.log(newDocs);
                //         store.dispatch(updateFundRaiseData({ documents: newDocs }))
                //     } else {
                //         const newDocs = updateStore.pictures?.filter((each) => each != image_id)
                //         store.dispatch(updateFundRaiseData({ pictures: newDocs }))
                //     }
                //     console.log(updateStore);
                // } else {
                //     onError("Please try again")
                // }
                onSuccess(image_id, type)
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

async function onFileUpload(my_files, onSuccess, onError, ifNotLogged, type, fundRaiseID) {
    console.log(my_files);
    let session = await getSession();
    let user = userDetailsFromGetSession(session)


    console.log(my_files);


    if (user) {

        const token = user.token;
        console.log("User found");

        console.log(my_files);
        console.log(type);



        let formData = new FormData();

        formData.append("image_type", type);
        // formData.append("images", my_files);
        console.log("The length is : " + my_files.length);
        for (let fileIndex = 0; fileIndex < my_files.length; fileIndex++) {
            formData.append(`images_${fileIndex}`, my_files[fileIndex]);
        }





        // console.log(formData.getAll());

        try {
            let API_request = await API_axiosInstance.patch(`/fund_raise/upload_images/${fundRaiseID}`, formData, {
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
                    // store.dispatch(updateFundRaiseData({
                    //     pictures: pictures,
                    //     documents: documents
                    // }))
                    // console.log(type);
                    if (type == "Document") {
                        store.dispatch(insertDocuments({ documents }))
                    } else {
                        store.dispatch(insertPicturs({ pictures }))
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