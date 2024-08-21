"use client"
import BloodAccountTab from "@/component/Account/AccountTab/BloodAccountTab"
import BloodDonationHistoryProfile from "@/component/BloodAccount/BloodDonationHistory"
import Header from "@/component/Header/Header"
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"

function MyBloodDonationHistory() {


    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <BloodAccountTab />
                <div className="mt-5">
                    <BloodDonationHistoryProfile />
                </div>
            </div>
            <Footer />
        </UserPrivateRouter>
    )
}

export default MyBloodDonationHistory