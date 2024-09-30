"use client"
import FundRaiserAccountTab from "@/component/Account/AccountTab/FundRaiserAccountTab"
import BiddingItemCard from "@/component/Bidding/BiddingItemCard"
import AuctionItemCard from "@/component/Bidding/MyPurchase"
import Header from "@/component/Header/Header"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"
import { Fragment } from "react"


function BiddingHistory() {

    return (
        <Fragment>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <BreadCrumb path={['Account', 'Fund raiser account', 'Bidding', 'Histroy']} />
                <div className="mt-5">
                    <FundRaiserAccountTab />
                    <div className="grid gap-x-10 grid-cols-2">
                        <AuctionItemCard />
                        <AuctionItemCard />
                        <AuctionItemCard />
                    </div>
                </div>
            </div>
            <Footer />

        </Fragment>
    )

}

export default BiddingHistory