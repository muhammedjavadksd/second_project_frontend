// src/app/api/hello/route.js

import { COOKIE_DATA_KEY } from "@/app/const/const";
import API_axiosInstance from "@/external/axios/api_axios_instance";
import { cookies } from "next/headers";

export async function POST(request) {


  try {
    let body = await request.json();
    let email = body.email;
    let loginRequest = await API_axiosInstance.post("/auth/sign_in", {
      email
    })
    let response = loginRequest.data;

    console.log("The response is:");
    console.log(response);

    if (response && response?.status) {

      let token = response.token;
      if (token) {
        let getCookies = cookies()
        getCookies.set(COOKIE_DATA_KEY.SIGN_IN_DATA, token)
        return new Response(JSON.stringify({ status: true, msg: response?.msg }))
      } else {
        return new Response(JSON.stringify({ status: false, msg: "Something went wrong" }))
      }
    } else {
      return new Response(JSON.stringify({ status: false, msg: response?.msg }))
    }
  } catch (e) {
    console.log(e);
    let errorMessage = e?.response?.data?.msg ?? "Something went wrong"
    console.log(errorMessage);
    return new Response(JSON.stringify({ status: false, msg: errorMessage }))
  }
}
