import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import IBloodReq, { BloodProfile, IBloodDonor, ILocatedAt } from "@/util/types/API Response/Blood";
import { FormActionResponse, IAdminAddFundRaiser, IBloodDonate, IBloodDonorForm, IPaginatedResponse, IShowedIntrest, MapApiResponse, PaginatedApi } from "@/util/types/InterFace/UtilInterface";
import axios, { AxiosResponse } from "axios";
import { STATUS_CODES } from "http";
import { getSession, useSession } from "next-auth/react";
import { userDetailsFromGetSession } from "./authHelper";
import { FundRaiserResponse, IBloodStatitics, ICommentsResponse, IDonateHistoryTemplate, IFundRaiseStatitics } from "@/util/types/API Response/FundRaiser";
import { IChatTemplate, ChatProfile, ProfileTicket, ProfileTicketPopoulated } from "@/util/types/API Response/Profile";
import { BloodCloseCategory, BloodDonationStatus, BloodGroup, BloodStatus, TicketCategory, TicketChatFrom, TicketStatus } from "@/util/types/Enums/BasicEnums";


export async function adminAddFundRaiser(body: IAdminAddFundRaiser): Promise<string | false> {

    try {
        const session = await getSession();
        const data = userDetailsFromGetSession(session, "admin");
        const token = data.token;
        const addFundRaiser = await API_axiosInstance.post("/fund_raise/admin/create", { ...body }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const response = addFundRaiser.data;
        if (response.status) {
            return response.data.fund_id
        }
        return false
    } catch (e) {
        console.log(e);

        return false
    }
}

export async function closeBloodRequestFromAdmin(blood_id: string): Promise<boolean> {

    try {
        const session = await getSession();
        const data = userDetailsFromGetSession(session, "admin");
        const token = data.token;

        const close = await API_axiosInstance.patch(`/blood/admin/close_request/${blood_id}`, {}, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        const response = close.data;
        if (response.status) {
            return true
        }
        return false
    } catch (e) {
        return false
    }
}

export async function findMatchedBlood(bloodGroup: BloodGroup, limit: number, page: number): Promise<IPaginatedResponse<IBloodDonor>> {

    try {

        const session = await getSession();
        const userProfile = userDetailsFromGetSession(session, "admin")
        const token = userProfile.token;

        const find = await API_axiosInstance.get(`blood/admin/find-donors/${limit}/${page}/${bloodGroup}`, { headers: { authorization: `Bearer ${token}` } })
        const response = find.data;
        if (response.status) {
            return response.data
        } else {
            return {
                paginated: [],
                total_records: 0
            }
        }
    } catch (e) {
        return {
            paginated: [],
            total_records: 0
        }
    }
}

export async function findSingleBloodrequirement(bloodId: string) {
    try {
        const session = await getSession();
        const userProfile = userDetailsFromGetSession(session, "admin")
        const token = userProfile.token;

        const find = await API_axiosInstance.get(`/blood/admin/blood-requirements/${bloodId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        const response = find.data;
        if (response.status && response.data.req) {
            return response.data.req
        }
        return null
    } catch (e) {
        console.log(e);
        return null
    }
}

export async function findBloodResponse(bloodId: string, page: number, limit: number): Promise<IPaginatedResponse<IShowedIntrest>> {

    try {
        const session = await getSession();
        const userProfile = userDetailsFromGetSession(session, "admin")
        const token = userProfile.token;

        const find = await API_axiosInstance.get(`/blood/admin/find-intrest/${bloodId}/${limit}/${page}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        const response = find.data;

        console.log(response);

        if (response.status && response.data.intrest) {
            return response.data.intrest
        }
        return {
            paginated: [],
            total_records: 0
        }
    } catch (e) {
        return {
            paginated: [],
            total_records: 0
        }
    }
}

export async function findBloodrequirement(status?: BloodStatus, bloodGroup?: BloodGroup, cors?: [string, string], closedOnly?: boolean) {

}

export async function adminFundRaiserFileUpload(my_files, onSuccess, onError, ifNotLogged, type, fundRaiseID) {

    const session = await getSession();
    const user = userDetailsFromGetSession(session, "admin")
    if (user) {

        const token = user.token;
        let uploadImagePromises: Promise<any>[] = []
        const presignedUrl = []

        for (let fileIndex = 0; fileIndex < my_files.length; fileIndex++) {

            const url = await API_axiosInstance.get(`/fund_raise/admin/presigned-url?type=${type}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const response = url.data;
            if (response && response.status) {
                const url = response.data?.url;
                presignedUrl.push(url)
                const request = axios.put(url, my_files[fileIndex], { headers: { "Content-Type": my_files[fileIndex].type || "application/octet-stream" } })
                uploadImagePromises.push(request)
            }
        }

        Promise.all(uploadImagePromises).then(async () => {
            try {
                const API_request = await API_axiosInstance.patch(`/fund_raise/admin/upload_images/${fundRaiseID}`, {
                    type: type,
                    image: presignedUrl
                }, {
                    headers: {
                        "authorization": `Bearer ${token}`,
                        "fund_id": fundRaiseID,
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
        }).catch((e) => {
            let errorMessage = e?.response?.body?.msg;
            console.log(e);
            console.log(errorMessage);
            onError(errorMessage)
        })
    } else {
        ifNotLogged()
    }
}


export async function getSingleTicket(ticket_id: string): Promise<ProfileTicketPopoulated> {
    try {
        const session = await getSession();
        const userProfile = userDetailsFromGetSession(session, "admin")
        const token = userProfile.token;

        const find = await API_axiosInstance.get(`/profile/admin/get_ticket/${ticket_id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        console.log(find);

        const response = find.data;
        console.log(response);

        if (response.status && response.data.ticket) {
            return response.data.ticket
        }
        return null
    } catch (e) {
        console.log(e);
        return null
    }
}

export async function addReplayToTicket(ticket_id: string, message: string, from: TicketChatFrom, attachment: File): Promise<string | boolean> {
    try {
        const session = await getSession();
        const userProfile = userDetailsFromGetSession(session, "admin")
        const token = userProfile.token;

        let presignedUrl = null

        if (attachment && attachment?.name) {
            const imageName = attachment.name

            const generatePresignedUrl = await API_axiosInstance.get(`/profile/admin/presigned_url?file=${imageName}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const response = generatePresignedUrl.data;
            if (response.status) {
                const { url } = response.data
                console.log("Presigned url got it");

                await axios.put(url, attachment, {
                    headers: {
                        "Content-Type": attachment.type
                    }
                })
                presignedUrl = url;
            }
        }

        const find = await API_axiosInstance.put(`/profile/admin/replay_ticket/${ticket_id}`, {
            msg: message,
            attachment: presignedUrl
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        const response = find.data;
        if (response.status) {
            return response.data.attachment || true
        } else {
            return false
        }
    } catch (e) {
        console.log(e);

        return false
    }
}

export async function getAdminTicket(page: number, limit: number, status?: TicketStatus, category?: TicketCategory, search?: string): Promise<IPaginatedResponse<ProfileTicket>> {
    try {
        const session = await getSession();


        const userProfile = userDetailsFromGetSession(session, "admin")
        const token = userProfile.token;

        const params = status ? `/${limit}/${page}/${status}` : `/${limit}/${page}`
        const query = new URLSearchParams()
        if (category !== null) {
            query.append('category', category);
        }
        if (search !== null) {
            query.append('query', search);
        }


        const find = await API_axiosInstance.get(`profile/admin/get_tickets${params}?${query}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        console.log(find);

        const response = find.data;
        console.log(response);

        if (response.status) {
            return response.data
        }
        return {
            paginated: [],
            total_records: 0
        }
    } catch (e) {
        return {
            paginated: [],
            total_records: 0
        }
    }
}


export async function getBloodByStatics(): Promise<null | Record<BloodGroup, number>> {

    try {
        const find = await API_axiosInstance.get("blood/blood_availability");
        const response = find.data;
        console.log(response);

        if (response.status) {
            return response.data
        }
        return null
    } catch (e) {
        console.log(e);

        return null
    }
}



export async function getBloodStataitic(): Promise<IBloodStatitics | null> {

    try {
        const fundRaise = await API_axiosInstance.get("/blood/admin/statitics");
        const response = fundRaise.data
        console.log(response);

        if (response.status) {
            const statitics = response.data;
            return statitics
        }
        return null
    } catch (e) {
        console.log(e);
        return null
    }
}

export async function getFundRaiserStatitics(): Promise<IFundRaiseStatitics | null> {

    try {

        const fundRaise = await API_axiosInstance.get("/fund_raise/admin/statitics");
        const response = fundRaise.data
        if (response.status) {
            const statitics = response.data;
            return statitics
        }
        return null
    } catch (e) {
        console.log(e);
        return null
    }
}

export async function findNearest(bloodGroup: BloodGroup, location: [number, number], page: number, limit: number): Promise<IPaginatedResponse<IBloodDonor[]>> {

    try {

        const cord = `long=${location[0]}&lati=${location[1]}`
        const findNearest = await API_axiosInstance.get(`/blood/nearest-donors/${limit}/${page}/${bloodGroup}?${cord}`)
        const response = findNearest.data;

        if (response.status) {
            return response.data
        } else {
            return {
                paginated: [],
                total_records: 0
            }
        }
    } catch (e) {
        return {
            paginated: [],
            total_records: 0
        }
    }
}

export async function findOrder(order_id: string) {

    try {

        const session = await getSession();


        const userProfile = userDetailsFromGetSession(session, "user")
        const token = userProfile.token;
        if (token) {
            const findProfile = await API_axiosInstance.get(`fund_raise/find-payment-order/${order_id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(findProfile);

            const response = findProfile.data;
            console.log(response);
            if (response.status) {
                return response.data
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (e) {
        console.log(e);
        return null
    }
}

export async function blockProfile(status: string, room_id: string): Promise<FormActionResponse> {

    try {

        const session = getSession();
        const userProfile = userDetailsFromGetSession(session, "user")
        const token = userProfile.token;
        const blockProfile = await API_axiosInstance.patch(`/profile/block-status/${status}/${room_id}`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const responseData = blockProfile.data;
        return {
            msg: "Profile updated",
            status: true,
        }
    } catch (e) {
        const errorMsg = e.response?.data?.msg ?? "Something went wrong"
        return {
            msg: errorMsg,
            status: false,
        }
    }
}

export async function accountComplete(token: string, phone_number: string) {

    try {
        const complete = await API_axiosInstance.patch("/auth/complete_account", {
            phone_number
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const response = complete.data;
        if (response.status) {
            return true
        }
        return false
    } catch (e) {
        console.log(e);
        return false
    }
}

export async function signInWithGoogle(id_token: string, auth_id: string) {

    try {
        const signUp = await API_axiosInstance.post("/auth/sign_up_provider", {
            auth_id
        }, {
            headers: {
                authorization: `Bearer ${id_token}`
            }
        });
        const response = signUp.data;

        if (response.status) {
            return response.data || true
        }
        return false
    } catch (e) {
        console.log(e);
        return false
    }
}

export async function findMyBloodDonationHistory(page: number, limit: number): Promise<IPaginatedResponse<IBloodDonate>> {
    try {

        const session = await getSession();
        const userData = userDetailsFromGetSession(session, "user");
        const token = userData.token;
        const bloodToken = userData.blood_token;
        const { data } = await API_axiosInstance.get(`blood/donation-history/${page}/${limit}`, {
            headers: {
                authorization: `Bearer ${token}`,
                bloodAuthorization: `Bearer ${bloodToken}`,
            }
        })
        if (data.status) {
            return data.data
        }
        return {
            paginated: [],
            total_records: 0
        }
    } catch (e) {
        return {
            paginated: [],
            total_records: 0
        }
    }
}

export async function updateBloodRequest(status: BloodDonationStatus, donation_id: string, unit?: number): Promise<FormActionResponse> {

    try {
        // 
        const session = await getSession();
        const userData = userDetailsFromGetSession(session, "user");
        const token = userData.token;
        const bloodToken = userData.blood_token;

        const { data } = await API_axiosInstance.patch(`blood/request_update/${donation_id}`, {
            status,
            unit
        }, {
            headers: {
                authorization: `Bearer ${token}`,
                bloodAuthorization: `Bearer ${bloodToken}`,
            }
        })
        if (data.status) {
            return {
                msg: "Request update success",
                status: true
            }
        }
        return {
            msg: data.msg || "Somethign went wrong",
            status: false
        }
    } catch (e) {
        console.log(e);

        const errorMsg = e.response?.data?.msg ?? "Something went wrong"
        console.log(errorMsg);
        return {
            msg: errorMsg,
            status: false
        }
    }
}


export async function closeFundRaise(fund_id: string): Promise<boolean> {
    try {
        const session = await getSession();
        const data = userDetailsFromGetSession(session, "user");
        const token = data.token;

        const closeRequest = await API_axiosInstance.patch(`fund_raise/close/${fund_id}`, {}, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        const response = closeRequest.data;
        if (response.status) {
            return true
        } else {
            return false
        }
    } catch (e) {
        return false
    }
}


export async function findMyBloodIntrest(page: number, limit: number, status: BloodDonationStatus): Promise<IPaginatedResponse<IBloodDonorForm[]>> {

    try {
        const session = await getSession();
        const data = userDetailsFromGetSession(session, "user");
        const token = data.token;
        const bloodToken = data.blood_token;

        const queryParam = status ? `${page}/${limit}/${status}` : `${page}/${limit}`

        const bloodIntrest = await API_axiosInstance.get(`blood/interested_blood_requirements/${queryParam}`, {
            headers: {
                authorization: `Bearer ${token}`,
                bloodAuthorization: `Bearer ${bloodToken}`
            }
        })
        const response = bloodIntrest.data;
        if (response.status && response.data) {
            return response.data
        } else {
            return {
                paginated: [],
                total_records: 0
            }
        }
    } catch (e) {
        return {
            paginated: [],
            total_records: 0
        }
    }

}

export async function closeBloodRequest(blood_id: string, category: BloodCloseCategory, explanation: string): Promise<boolean> {

    try {
        const session = await getSession();
        const data = userDetailsFromGetSession(session, "user");
        const token = data.token;
        const bloodToken = data.blood_token;

        const close = await API_axiosInstance.patch(`/blood/close_request/${blood_id}`, {
            category,
            explanation
        }, {
            headers: {
                authorization: `Bearer ${token}`,
                bloodAuthorization: `Bearer ${bloodToken}`
            }
        })
        const response = close.data;
        console.log(response);

        if (response.status) {
            return true
        }
        return false
    } catch (e) {
        return false
    }
}

export async function findMyBloodrequirement(page: number, limit: number, status?: BloodStatus): Promise<IPaginatedResponse<IBloodReq[]>> {

    try {
        const session = await getSession();
        const data = userDetailsFromGetSession(session, "user");
        const token = data.token;
        const bloodToken = data.blood_token;

        let endPointParams = status ? `${limit}/${page}/${status}` : `${limit}/${page}`;
        const findChat = await API_axiosInstance.get(`/blood/blood-requests/${endPointParams}`, {
            headers: {
                authorization: `Bearer ${token}`,
                bloodAuthorization: `Bearer ${bloodToken}`
            }
        })
        const response = findChat.data;

        if (response.status) {
            return response.data
        }
        return {
            paginated: [],
            total_records: 0
        }
    } catch (e) {
        console.log(e);
        return {
            paginated: [],
            total_records: 0
        }
    }
}

// export async function closeBloodRequest(bloodId: string): Promise<boolean> {

//     try {

//         const session = await getSession();
//         const data = userDetailsFromGetSession(session, "user");
//         const token = data.token;
//         const bloodToken = data.token;
//         const findChat = await API_axiosInstance.patch(`/blood/close_request`, {
//             blood_id: bloodId
//         }, {
//             headers: {
//                 authorization: `Bearer ${token}`,
//                 bloodAuthorization: `Bearer ${bloodToken}`
//             }
//         })

//         const response = findChat.data;

//         if (response.status) {
//             return true
//         }
//         return false
//     } catch (e) {
//         return false
//     }
// }

export async function addMessageToChat(message: string, room_id: string): Promise<boolean> {
    try {


        const session = await getSession();
        const data = userDetailsFromGetSession(session, "user");
        const token = data.token;
        const findChat = await API_axiosInstance.post(`/profile/add_message/${room_id}`, {
            message
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const response = findChat.data;


        if (response.status) {
            return true
        }
        return false
    } catch (e) {
        return false
    }

}

export async function getSingleChat(chat_id: string): Promise<ChatProfile | false> {
    try {

        const session = await getSession();
        const data = userDetailsFromGetSession(session, "user");
        const token = data.token;
        const findChat = await API_axiosInstance.get(`/profile/get_chat/${chat_id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const response = findChat.data;
        console.log(response);

        if (response.status && response.data.chat) {
            return response.data.chat
        }
        return false
    } catch (e) {
        console.log(e);

        return false
    }
}

export async function addChatToTicket(message: string, attachment: File, ticket_id: string): Promise<false | string> {
    try {

        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user");
        const token = user.token;
        let presignedUrl = null

        if (attachment && attachment?.name) {
            const imageName = attachment.name
            const generatePresignedUrl = await API_axiosInstance.get(`/profile/presigned_url?file=${imageName}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            const response = generatePresignedUrl.data;
            if (response.status) {
                const { url } = response.data
                console.log("Presigned url got it");

                const saveFile = await axios.put(url, attachment, {
                    headers: {
                        "Content-Type": attachment.type
                    }
                })
                presignedUrl = url;
            }
        }


        const findTicket = await API_axiosInstance.patch(`/profile/ticket_replay/${ticket_id}`, {
            text: message,
            attachment: presignedUrl
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const response = findTicket.data;
        console.log("response");

        console.log(response);

        if (response.status) {
            return response?.data?.attachment || ""
        }
        return false
    } catch (e) {
        return false
    }
}

export async function findAllMyTicket(page: number, limit: number): Promise<IPaginatedResponse<ProfileTicket[]>> {
    try {

        console.log("Start fetching tickets");

        const session = await getSession();
        const data = userDetailsFromGetSession(session, "user");
        const token = data.token;

        const findTicket = await API_axiosInstance.get(`/profile/get-tickets/${page}/${limit}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });


        const response = findTicket.data;
        console.log(response);

        if (response.status && response.data) {
            return response.data
        }
        return {
            paginated: [],
            total_records: 0
        }
    } catch (e) {
        console.log(e);
        return {
            paginated: [],
            total_records: 0
        }
    }
}


export async function findSingleTicket(ticket_id: string): Promise<ProfileTicket | false> {

    try {

        const session = await getSession();
        const data = userDetailsFromGetSession(session, "user");
        const token = data.token;
        const findTicket = await API_axiosInstance.get(`/profile/get-tickets/${ticket_id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const response = findTicket.data;
        if (response.status && response.data.ticket) {
            return response.data.ticket
        }
        return false
    } catch (e) {
        console.log(e);
        return false
    }
}

export async function findMyDonationHistroy(limit: number, page: number): Promise<IPaginatedResponse<IDonateHistoryTemplate[]>> {

    try {

        const session = await getSession();
        const data = userDetailsFromGetSession(session, "user");
        const token = data.token;

        const find = await API_axiosInstance.get(`/fund_raise/my-donation-history/${limit}/${page}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const response = find.data;
        return response.data as IPaginatedResponse<IDonateHistoryTemplate[]>
    } catch (e) {
        return {
            paginated: [],
            total_records: 0
        } as IPaginatedResponse<IDonateHistoryTemplate[]>
    }
}

export async function findDonationHistroyApi(limit: number, page: number, fund_id: string): Promise<IPaginatedResponse<IDonateHistoryTemplate>> {

    console.log("Donation history");

    try {

        const find = await API_axiosInstance.get(`/fund_raise/donation-history/${fund_id}/${limit}/${page}`);
        const response = find.data;
        console.log(response);

        if (response.status) {
            const data: IPaginatedResponse<IDonateHistoryTemplate> = response.data;
            return data
        }
        return {
            paginated: [],
            total_records: 0
        }
    } catch (e) {
        console.log(e);

        return {
            paginated: [],
            total_records: 0
        }
    }
}

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


export async function findMyProfile(limit, page, status) {
    try {
        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user");
        const { token } = user
        const query = status ? `${limit}/${page}/${status}` : `${limit}/${page}`
        const myProfile = await API_axiosInstance.get(`fund_raise/view/self/${query}`, {
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


async function getBloodIntrest(req_id: string, page: number, limit: number, status?: BloodDonationStatus): Promise<IPaginatedResponse<IBloodDonate>> {
    const session = await getSession();
    const user = userDetailsFromGetSession(session, "user");

    try {
        const { blood_token } = user
        const { token } = user

        const params = status ? `${req_id}/${page}/${limit}/${status}` : `${req_id}/${page}/${limit}`
        const { data } = await API_axiosInstance.get(`/blood/intrest/${params}`,
            {
                headers: {
                    bloodAuthorization: `Bearer ${blood_token}`,
                    authorization: `Bearer ${token}`
                }
            })
        console.log(data);


        if (data.status) {
            const bloodData: IPaginatedResponse<IBloodDonate> = data.data
            return bloodData
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

async function getSingleActiveFundRaiser(fund_id: string, isForce: boolean): Promise<FormActionResponse> {

    try {

        const session = await getSession();
        const user = userDetailsFromGetSession(session, "user");
        const token = user.token;
        const query = isForce ? `${fund_id}?isForce=true` : fund_id
        const profile = await API_axiosInstance.get(`fund_raise/view/${query}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const response = profile.data;
        console.log(response);

        if (response.status) {
            const profile = response.data
            return {
                status: true,
                data: profile,
                msg: "Profile found"
            }
        } else {
            return {
                status: false,
                msg: "Profile not found"
            }
        }
    } catch (e) {
        console.log(e);
        const statusCode = e.response.status;
        if (statusCode == 403) {
            return {
                msg: "CLOSED",
                status: false,
            }
        } else {
            return {
                msg: "Not found",
                status: false,
            }
        }

    }
}

export { getSingleActiveFundRaiser, editComment, deleteComment, getPaginatedComments, getLimitedFundRaiserPost, searchHealthCenters, getPaginatedBloodReq, getBloodIntrest }