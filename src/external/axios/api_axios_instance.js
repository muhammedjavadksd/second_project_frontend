const { default: axios } = require("axios");

let API_axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
})

export default API_axiosInstance