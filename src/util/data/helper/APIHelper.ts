import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { MapApiResponse } from "@/util/types/InterFace/UtilInterface";
import axios from "axios";
import { STATUS_CODES } from "http";


function getLimitedFundRaiserPost(limit, page, successCB, errorCB) {

    API_axiosInstance.get(`/fund_raise/view/${limit}/${page}`).then((data) => {
        const response = data.data;
        if (response.status) {
            const responseData = response.data;
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


export { getLimitedFundRaiserPost, searchHealthCenters }