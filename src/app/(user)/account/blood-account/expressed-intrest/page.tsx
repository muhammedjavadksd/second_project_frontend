"use client"
import BloodAccountTab from "@/component/Account/AccountTab/BloodAccountTab"
import ExpressIntrestItem from "@/component/Blood/BloodAccountTabItems/ExpressedIntrest"
import Header from "@/component/Header/Header"
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter"
import BreadCrumb from "@/component/Util/BreadCrumb"
import EmptyScreen from "@/component/Util/EmptyScreen"
import Footer from "@/component/Util/Footer"
import PaginationSection from "@/component/Util/PaginationSection"
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper"
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper"
import API_axiosInstance from "@/util/external/axios/api_axios_instance"
import IBloodReq from "@/util/types/API Response/Blood"
import { BloodGroup } from "@/util/types/Enums/BasicEnums"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"




function ExpressedIntrest() {

    const [showenIntrest, setShowenIntrest] = useState([])
    const session = useSession();


    function getExpressedIntrest(limit, page) {
        const user = userDetailsFromUseSession(session, "user")
        const bloodToken = user.blood_token;
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
        }
    }

    useEffect(() => {
        getExpressedIntrest(6, 1)
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
                    {/* <PaginationSection total_pages={100} total_records={100} onPaginated={getExpressedIntrest}>
                        <div className="grid grid-cols-3 gap-10">
                            <ExpressIntrestItem blood_group={BloodGroup.AB_NEGATIVE} deadLine={formatDateToMonthNameAndDate("12/02/2024")} full_name={"Javad"} location={"Amrutha"} unit={2} ></ExpressIntrestItem>
                            <ExpressIntrestItem blood_group={BloodGroup.AB_NEGATIVE} deadLine={formatDateToMonthNameAndDate("12/02/2024")} full_name={"Javad"} location={"Amrutha"} unit={2} ></ExpressIntrestItem>
                            <ExpressIntrestItem blood_group={BloodGroup.AB_NEGATIVE} deadLine={formatDateToMonthNameAndDate("12/02/2024")} full_name={"Javad"} location={"Amrutha"} unit={2} ></ExpressIntrestItem>
                            <ExpressIntrestItem blood_group={BloodGroup.AB_NEGATIVE} deadLine={formatDateToMonthNameAndDate("12/02/2024")} full_name={"Javad"} location={"Amrutha"} unit={2} ></ExpressIntrestItem>
                            <ExpressIntrestItem blood_group={BloodGroup.AB_NEGATIVE} deadLine={formatDateToMonthNameAndDate("12/02/2024")} full_name={"Javad"} location={"Amrutha"} unit={2} ></ExpressIntrestItem>
                            <ExpressIntrestItem blood_group={BloodGroup.AB_NEGATIVE} deadLine={formatDateToMonthNameAndDate("12/02/2024")} full_name={"Javad"} location={"Amrutha"} unit={2} ></ExpressIntrestItem>
                        </div>
                    </PaginationSection> */}
                    <EmptyScreen />


                </div>
            </div>
            <Footer />
        </UserPrivateRouter >
    )
}

{
    // showenIntrest.map((item: IBloodReq) => {
    //     return (
    //         <ExpressIntrestItem blood_group={item.blood_group} deadLine={formatDateToMonthNameAndDate(item.neededAt)} full_name={item.patientName} location={item.locatedAt.hospital_name} unit={item.unit} ></ExpressIntrestItem>
    //     )
    // })
}
export default ExpressedIntrest