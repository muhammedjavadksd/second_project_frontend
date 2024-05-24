import axios from "axios";


let axios_instance =  axios.create({
    baseURL: process.env.FRONTEND-URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios_instance;