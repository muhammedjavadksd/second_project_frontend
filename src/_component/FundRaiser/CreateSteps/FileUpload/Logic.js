import { getUserDetails } from "@/app/_util/helper/authHelper";
import axios_instance from "@/external/axios/axios-instance";
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

async function onFileUpload(file, onSuccess, onError, ifNotLogged, type, fundRaiseID) {
    let session = await getSession();
    let user = getUserDetails(session)



    if (user) {

        console.log("User found");

        console.log(file);
        console.log(type);



        let formData = new FormData();
        formData.append("images[type]", type);
        formData.append("images[data]", file);

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