"use client"
import BloodAccountTab from "@/component/Account/AccountTab/BloodAccountTab"
import OutGoingBloodCard from "@/component/Blood/OutGoingBloodCard"
import OutGoingRequestView from "@/component/BloodAccount/OutGoingRequestView"
import Header from "@/component/Header/Header"
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper"
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper"
import API_axiosInstance from "@/util/external/axios/api_axios_instance"
import IBloodReq from "@/util/types/API Response/Blood"
import { BloodGroup } from "@/util/types/Enums/BasicEnums"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

function MyRequirements() {

    let [allReq, setReq] = useState([]);
    const session = useSession();


    useEffect(() => {
        const user = userDetailsFromUseSession(session, "user");
        if (user) {
            const token = user.token
            API_axiosInstance.get("/blood/blood-requests", { headers: { authorization: `Bearer ${token}` } }).then((data) => {
                let { data: response } = data;
                console.log(response);

                if (response.status) {
                    let profile = response?.data?.profile;
                    profile && setReq(profile)
                    // console.log(profile);

                }
            }).catch((err) => { })
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
                    <div className="grid gap-5 grid-cols-3">
                        {
                            allReq.map((item: IBloodReq) => {
                                return (
                                    <OutGoingBloodCard intrest_submission={item.intrest_submission} onClose={() => { }} deadLine={formatDateToMonthNameAndDate(item.neededAt)} group={item.blood_group} location={item.locatedAt.hospital_name} unit={item.unit} />
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

export default MyRequirements