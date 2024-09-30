"use client"
import Header from "@/component/Header/Header"
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"
import { Fragment } from "react"

function BiddingRoom() {

    return (
        <Fragment>
            <UserPrivateRouter>
                <Header />
                <div className="container mx-auto mt-5 mb-5">
                    <BreadCrumb path={['Home', 'Bidding', 'Room']} />
                </div>
                <Footer />
            </UserPrivateRouter>
        </Fragment>
    )
}

export default BiddingRoom