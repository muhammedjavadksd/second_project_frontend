import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import IBloodReq, { BloodProfile } from "@/util/types/API Response/Blood";
import { MapApiResponse } from "@/util/types/InterFace/UtilInterface";
import axios, { AxiosResponse } from "axios";
import { STATUS_CODES } from "http";
import { getSession, useSession } from "next-auth/react";
import { userDetailsFromGetSession } from "./authHelper";
import { FundRaiserResponse, ICommentsResponse } from "@/util/types/API Response/FundRaiser";


export async function findMyBloodProfile(): Promise<null | BloodProfile> {

    const session = await getSession();
    const data = userDetailsFromGetSession(session, "user");
    const bloodToken = data.blood_token;
    const token = data.token;

    try {
        const profile = await API_axiosInstance.get("/blood/get_profile", {
            headers: {
                authorization: `Bearer ${token}`,
                bloodAuthorization: `Bearer ${bloodToken}`
            }
        })
        const response: BloodProfile = profile.data.data.profile as BloodProfile;
        return response
    } catch (e) {
        console.log(e);
        return null
    }
}

export async function openBloodAccountStatus(status: boolean) {
    const session = await getSession();
    const data = userDetailsFromGetSession(session, "user");
    const bloodToken = data.blood_token;
    const token = data.token;

    try {
        const profile = await API_axiosInstance.patch("/blood/account_status", { status }, {
            headers: {
                authorization: `Bearer ${token}`,
                bloodAuthorization: `Bearer ${bloodToken}`
            }
        })
        const response = profile.data
        if (response.status) {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function fundRaiserPaymentHistory() {

}

export async function findPlaces(query: string) {
    const url = `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${query}&format=jsonv2&limit=10`;
    try {
        const find = await axios.get(url);
        const data = find.data;
        return data;
    } catch (e) {
        console.log(e);
        return null
    }
}


export async function findMyProfile(limit, page) {
    try {
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user");
        const { token } = user
        const myProfile = await API_axiosInstance.get(`fund_raise/view/self/${limit}/${page}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const response = myProfile.data;
        console.log(response);

        if (response.status) {
            const profile = response.data;
            return profile
        }
        return false
    } catch (e) {
        console.log(e);
        return false
    }
}

async function editComment(newComment, edit_id): Promise<boolean> {
    try {
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user");
        const { token } = user

        if (token) {
            const editComment = await API_axiosInstance.patch(`fund_raise/edit_comment/${edit_id}`, { new_comment: newComment }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const response = editComment.data;
            if (response.status) {
                return true
            }
            return false
        }
    } catch (e) {
        return false
    }

}

async function deleteComment(comment_id: string): Promise<boolean> {

    try {
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user");
        const { token } = user

        if (token) {
            const deleteComment: AxiosResponse = await API_axiosInstance.delete(`/fund_raise/delete_comment/${comment_id}`, { headers: { authorization: `Bearer ${token}` } })
            const response = deleteComment.data;
            if (response.status) {
                return true
            }
        }
        return false
    } catch (e) {
        return false
    }
}

async function getPaginatedComments(limit: number, page: number, fund_id: string,): Promise<ICommentsResponse> {
    console.log("Hello");
    try {

        const find: AxiosResponse = await API_axiosInstance.get(`/fund_raise/comment/${fund_id}/${limit}/${page}`)
        const response = find.data;
        if (response.status) {
            const data = response.data;
            console.log(data);

            return {
                paginated: data.paginated,
                total_records: data.total_records
            }
        } else {
            return {
                paginated: [],
                total_records: 0
            }
        }
    } catch (e) {
        console.log(e);

        return {
            paginated: [],
            total_records: 0
        }
    }
}

async function getLimitedFundRaiserPost(page, limit, category, query) {

    try {
        const profile = await API_axiosInstance.get(`/fund_raise/view/${category}/${limit}/${page}?${query}`)
        const response = profile.data;
        console.log(profile);

        if (response.status) {
            const responseData = response.data;
            return responseData.profile
        }
        return false
    } catch (e) {
        console.log(e);
        return false
    }
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
    const user = userDetailsFromGetSession(session, "user");
    const { blood_token } = user

    API_axiosInstance.post(`/blood/intrest/${req_id}`, {}, { headers: { bloodAuthorization: `Bearer ${blood_token}` } }).then((response) => {
        const { data } = response;
        if (data.status) {
            successCB()
        } else {
            errorCB(data.msg, response.status)
        }
    }).catch((err) => {
        const msg = err?.response?.data?.msg ?? "Something went wrong";
        errorCB(msg, err.response.status)
    })
}

async function getSingleActiveFundRaiser(fund_id: string): Promise<FundRaiserResponse | false> {

    try {

        const profile = await API_axiosInstance.get(`fund_raise/view/${fund_id}`);
        const response = profile.data;
        console.log(response);

        if (response.status) {
            const profile = response.data
            return profile
        }
        return false
    } catch (e) {
        console.log(e);
        return false
    }
}

export { getSingleActiveFundRaiser, editComment, deleteComment, getPaginatedComments, getLimitedFundRaiserPost, searchHealthCenters, getPaginatedBloodReq, showIntrestForDonateBlood }