import { getUserDetails } from "@/app/_util/helper/authHelper";
import axios_instance from "@/external/axios/axios-instance";
import { insertDocuments, insertPicturs, updateFundRaiseData } from "@/external/redux/slicer/fundRaiserForm";
import store from "@/external/redux/store/store";
import { getSession } from "next-auth/react";


async function onFileDelete(image_id, onSuccess, onError, type, edit_id) {
    let session = await getSession();
    let user = getUserDetails(session)




    if (user) {



        // type, edit_id, image_id
        try {
            // '/api/user_api/fund_raiser/create'
            let API_request = await axios_instance.delete(
                `/api/user_api/fund_raiser/delete_image`,
                {
                    headers: {
                        "authorization": `Bearer ${user.token}`,
                    },
                    params: {
                        type: type,
                        edit_id: edit_id,
                        image_id: image_id
                    }
                }
            );


            let response = API_request.data;
            console.log(response);
            if (response.status) {

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
    let user = getUserDetails(session)


    console.log(my_files);


    if (user) {

        console.log("User found");

        console.log(my_files);
        console.log(type);



        let formData = new FormData();
        formData.append("image_type", type);
        console.log("The length is : " + my_files.length);
        for (let fileIndex = 0; fileIndex < my_files.length; fileIndex++) {
            formData.append(`images_${fileIndex}`, my_files[fileIndex]);
        }


        // console.log(formData.getAll());

        try {
            let API_request = await axios_instance.patch("/api/user_api/fund_raiser/update", formData, {
                headers: {
                    "authorization": `Bearer ${user.token}`,
                    "fund_id": fundRaiseID,
                    'Content-Type': 'multipart/form-data'
                }
            })

            let response = API_request.data;
            console.log(response);
            if (response.status) {

                if (type == "Documents") {
                    store.dispatch(insertDocuments({ documents: [...response.documents.slice(0, my_files.length)] }))
                } else {
                    store.dispatch(insertPicturs({ pictures: [...response.pictures.slice(0, my_files.length)] }))
                }


                onSuccess({
                    documents: response.documents,
                    pictures: response.pictures
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