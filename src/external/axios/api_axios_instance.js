const { default: axios } = require("axios");

let axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
})

export default axiosInstance