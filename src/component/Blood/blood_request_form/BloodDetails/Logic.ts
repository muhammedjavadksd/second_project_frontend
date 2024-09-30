import { userDetailsFromGetSession } from "@/util/data/helper/authHelper";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { AxiosResponse } from "@/util/types/API Response/FundRaiser";
import axios from "axios";
import { getSession } from "next-auth/react";


async function onBloodDetailsSubmit(val, location, successCallback, errorCallback, notLogged) {


    alert(location)
    // alert("Hello world")
    console.log(val);
    const session = await getSession();
    const user = userDetailsFromGetSession(session, "user");

    console.log(user);



    if (!user) {
        notLogged();
        return;
    }

    try {
        const { enquired_with_others } = val;
        if (enquired_with_others == "true") {
            const personDetails = val?.personal_details;
            if (personDetails) {

                const findAddress = await axios.get(`https://nominatim.openstreetmap.org/details.php?place_id=${location}&addressdetails=1&hierarchy=0&group_hierarchy=1&format=json`);
                const responseAddress = findAddress.data;
                const hospital = {
                    hospital_name: responseAddress.localname,
                    hospital_id: location,
                    coordinates: responseAddress?.centroid?.coordinates
                }

                const createBloodRequest: AxiosResponse = await API_axiosInstance.post("blood/blood_request", {
                    patientName: personDetails.patient_name,
                    unit: val.unit,
                    neededAt: val.needed_date,
                    blood_group: val.blood_group,
                    relationship: personDetails.relation,
                    email_address: personDetails.email_address,
                    locatedAt: hospital,
                    address: personDetails.address,
                    phoneNumber: personDetails.phone_number,
                    enquired_with_others: enquired_with_others
                }, {
                    headers: {
                        authorization: `Bearer ${user.token}`
                    }
                })
                const { data: response } = createBloodRequest;
                console.log(response);

                if (response.status) {
                    successCallback("Blood request created success")
                } else {
                    errorCallback(response.msg)
                }
            } else {
                errorCallback("Please fill the form properly")
            }
        } else {
            errorCallback("Please ask your neighbors, friends, and relatives for blood donors first.This can provide a quicker response and helps save blood for others in need")
            return;
        }
    } catch (e) {
        console.log(e);

        let errorMessage: string = e?.response?.data?.msg;
        errorCallback(errorMessage)
    }
}

export { onBloodDetailsSubmit }