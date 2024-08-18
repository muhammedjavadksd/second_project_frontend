"use client"
import BloodAccountTab from "@/component/Account/AccountTab/BloodAccountTab"
import ExpressIntrestItem from "@/component/Blood/BloodAccountTabItems/ExpressedIntrest"
import Header from "@/component/Header/Header"
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper"
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper"
import API_axiosInstance from "@/util/external/axios/api_axios_instance"
import IBloodReq from "@/util/types/API Response/Blood"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"




function ExpressedIntrest() {

    const [showenIntrest, setShowenIntrest] = useState([])
    const session = useSession();

    useEffect(() => {
        const user = userDetailsFromUseSession(session)
        const bloodToken = user.blood_token;
        console.log(bloodToken);
        console.log(user);

        if (bloodToken) {
            API_axiosInstance.get("blood/interested_blood_requirements", { headers: { authorization: `Bearer ${bloodToken}` } }).then((data) => {
                let response = data.data;
                console.log(response);

                if (response.status) {
                    let { profile } = response.data;
                    setShowenIntrest(profile)
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log("Not authraized");

        }
    }, [session])

    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <BloodAccountTab />
                <div className="mt-5">
                    <div className="grid grid-cols-3">
                        {
                            showenIntrest.map((item: IBloodReq) => {
                                return (
                                    <ExpressIntrestItem blood_group={item.blood_group} deadLine={formatDateToMonthNameAndDate(item.neededAt)} full_name={item.patientName} location={item.locatedAt.hospital_name} unit={item.unit} ></ExpressIntrestItem>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
            <Footer />
        </UserPrivateRouter>
    )
}

export default ExpressedIntrest