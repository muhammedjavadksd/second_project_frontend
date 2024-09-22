"use client"
import react from "react";
import Script from "next/script";
import './global.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/util/external/redux/store/store";
import axios_instance from "@/util/external/axios/axios-instance";
// import { addTokenIntoAxiosInterceptor, addTokenIntoAxiosInterceptorError } from "./_util/helper/authHelper";
// import { } from '../util/data/'
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import BloodDonorForm from "@/util/context/BloodDonorForm";
import Head from "next/head";
import { addTokenIntoAxiosInterceptor, addTokenIntoAxiosInterceptorError } from "@/util/data/helper/authHelper";
// import { Head } from "next/document";

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {


  // axios_instance.interceptors.request.use(addTokenIntoAxiosInterceptor, addTokenIntoAxiosInterceptorError);
  // API_axiosInstance.interceptors.request.use(addTokenIntoAxiosInterceptor, addTokenIntoAxiosInterceptorError);

  return (
    <html lang="en">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_CSS_PATH}/style.css`}></link>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Raleway:ital,wght@0,100..900;1,100..900&family=Sedan+SC&display=swap" rel="stylesheet" />


      <body>
        <Provider store={store}>
          <BloodDonorForm>
            <SessionProvider>
              <ToastContainer />
              {children}
            </SessionProvider>
          </BloodDonorForm>
        </Provider>
      </body>


      <script src="https://cdn.tailwindcss.com" async></script>

      <Script async src="https://kit.fontawesome.com/046dc73391.js" crossOrigin="anonymous"></Script>
      <Script async src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></Script>
      <Script src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"></Script>

    </html>
  );
}
