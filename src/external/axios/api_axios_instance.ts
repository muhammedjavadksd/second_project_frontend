// const { default: axios } = require("axios");

import axios from "axios"

let API_axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export default API_axiosInstance