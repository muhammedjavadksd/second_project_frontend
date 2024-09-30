"use client"
import Header from "@/component/Header/Header";
import Footer from "@/component/Util/Footer";
import SpalshScreen from "@/component/Util/SplashScreen";
import VerifyTokenError from "@/component/Util/VerifyTokenError";
import VerifyTokenSuccess from "@/component/Util/VerifyTokenSuccess";
import API_axiosInstance from "@/util/external/axios/api_axios_instance";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

enum VerificationStatus {
    Completed = "completed",
    Error = "error",
    Waiting = "waiting"
}

function CloseFundRaiser() {

    const { token } = useParams();
    const [verifyStatus, setVerifyStatus] = useState<VerificationStatus>(VerificationStatus.Waiting)
    async function verifyRequest() {
        API_axiosInstance.post("/fund_raise/verify-close-token/", {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setVerifyStatus(VerificationStatus.Completed)
        }
        ).catch((err) => {
            setVerifyStatus(VerificationStatus.Error)
        })
    }

    useEffect(() => {
        verifyRequest()
    }, [])

    return (
        <Fragment>
            <Header />
            {
                verifyStatus == VerificationStatus.Waiting ? (
                    <SpalshScreen />
                ) : (verifyStatus == VerificationStatus.Error ? <VerifyTokenError /> : <VerifyTokenSuccess />)
            }
            <Footer />
        </Fragment>
    )
}

export default CloseFundRaiser;