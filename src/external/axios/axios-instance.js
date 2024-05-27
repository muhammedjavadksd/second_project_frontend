import axios from "axios";


let axios_instance = axios.create({
    baseURL: process.env.FRONTEND_URL
})

export default axios_instance;