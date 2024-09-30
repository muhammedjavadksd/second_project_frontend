import axios from "axios";

let axios_instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL
})

export default axios_instance;