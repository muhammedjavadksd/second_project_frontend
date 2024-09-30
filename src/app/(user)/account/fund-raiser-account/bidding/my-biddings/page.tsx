"use client"
import FundRaiserAccountTab from "@/component/Account/AccountTab/FundRaiserAccountTab"
import MyBiddingItem from "@/component/Bidding/MyBiddingItem"
import Header from "@/component/Header/Header"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"
import { Fragment } from "react"
// import Footer from "react-multi-date-picker/plugins/range_picker_footer"


function MyBidding() {

    return (
        <Fragment>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <BreadCrumb path={['Home', 'Fund Raiser Account', 'Bidding', 'My Biddings']} />
                <div className="mt-5">
                    <FundRaiserAccountTab />
                </div>
                <div className="grid grid-cols-2 gap-x-5">
                    <MyBiddingItem />
                    <MyBiddingItem />
                    <MyBiddingItem />
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default MyBidding