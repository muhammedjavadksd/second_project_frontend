import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import IBloodReq from "@/util/types/API Response/Blood";
import { MapApiResponse } from "@/util/types/InterFace/UtilInterface";
import axios from "axios";
import { STATUS_CODES } from "http";
import { getSession, useSession } from "next-auth/react";
import { userDetailsFromGetSession } from "./authHelper";


function getLimitedFundRaiserPost(limit, page, successCB, errorCB) {

    API_axiosInstance.get(`/fund_raise/view/${limit}/${page}`).then((data) => {
        const response = data.data;
        if (response.status) {
            const responseData = response.data;
            console.log(responseData);

            successCB(responseData)
        }
    }).catch((err) => {
        console.log(err);
        // alert("Data fetched")
        errorCB()
    })
}


async function searchHealthCenters(query: string): Promise<MapApiResponse[] | null> {
    const url = `${process.env.NEXT_PUBLIC_MAP_API}?q=${query}[hospital]&format=json&polygon=0&addressdetails=1`
    try {
        const fetchHospitalResult = await axios.get(url);
        const data: MapApiResponse[] = fetchHospitalResult.data;
        if (fetchHospitalResult.status == 200) {
            return data;
        } else {
            return null
        }
    } catch (e) {
        return null
    }
}


async function getPaginatedBloodReq(limit: number, page: number): Promise<IBloodReq[]> {

    try {
        const findReq = await API_axiosInstance.get(`blood/get_blood_requirements/${page}/${limit}`);
        const response = findReq.data;
        if (response.status) {
            const { profile } = response.data;
            return profile;
        } else {
            return []
        }
    } catch (e) {
        return []
    }
}


async function showIntrestForDonateBlood(req_id: string, successCB: Function, errorCB: Function) {
    const session = await getSession();
    const user = userDetailsFromGetSession(session);
    const { blood_token } = user

    API_axiosInstance.post(`/blood/intrest/${req_id}`, {}, { headers: { authorization: `Bearer ${blood_token}` } }).then((response) => {
        const { data } = response;
        if (data.status) {
            successCB()
        } else {
            errorCB(data.msg)
        }
    }).catch((err) => {
        const msg = err?.response?.data?.msg ?? "Something went wrong";
        errorCB(msg)
    })
}

export { getLimitedFundRaiserPost, searchHealthCenters, getPaginatedBloodReq, showIntrestForDonateBlood }