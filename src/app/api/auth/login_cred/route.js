// src/app/api/hello/route.js

import axiosInstance from "@/external/axios/api_axios_instance";

export async function POST(request){

  let body = await request.json(); 
  let phoneNumber = body.phone; 

  try {
    let loginRequest = await axiosInstance.post("/auth/sign_in", {
      phone: phoneNumber
    })
    let response = loginRequest.data.data;

    if (response.status) {
      return new Response({ status: true })
    } else {
      return new Response({ status: false })
    }
  } catch (e) {
    return new Response({ status: false })
  }
}
