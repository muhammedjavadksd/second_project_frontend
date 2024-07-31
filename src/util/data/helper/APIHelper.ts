import API_axiosInstance from "@/util/external/axios/api_axios_instance";


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

export { getLimitedFundRaiserPost }