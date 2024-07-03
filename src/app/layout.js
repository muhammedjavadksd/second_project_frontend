"use client"
import Script from "next/script";
import './global.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/external/redux/store/store";
import axios_instance from "@/external/axios/axios-instance";
import { addTokenIntoAxiosInterceptor, addTokenIntoAxiosInterceptorError } from "./_util/helper/authHelper";
// import { combineReducers } from "@reduxjs/toolkit";
// import store from "@/external/redux/store/store";


export default function RootLayout({ children }) {


  let session = getServerSession();

  axios_instance.interceptors.request.use(addTokenIntoAxiosInterceptor, addTokenIntoAxiosInterceptorError);

  return (
    <html lang="en">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_CSS_PATH}/style.css`}></link>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&family=Sedan+SC&display=swap" rel="stylesheet" />

      <body>
        <Provider store={store}>

          <SessionProvider session={session}>
            <ToastContainer>  </ToastContainer>
            {children}
          </SessionProvider>
        </Provider>
      </body>


      <script src="https://cdn.tailwindcss.com"></script>

      <Script src="https://kit.fontawesome.com/046dc73391.js" crossOrigin="anonymous"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></Script>

    </html>
  );
}
