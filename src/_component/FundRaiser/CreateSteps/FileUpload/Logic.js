import { getUserDetails } from "@/app/_util/helper/authHelper";
import axios_instance from "@/external/axios/axios-instance";
import { getSession } from "next-auth/react";


async function onFileUpload(file, onSuccess, onError, ifNotLogged, type, fundRaiseID) {
    let session = await getSession();
    let user = getUserDetails(session)

    alert("Working")


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
                onSuccess()
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

export { onFileUpload }