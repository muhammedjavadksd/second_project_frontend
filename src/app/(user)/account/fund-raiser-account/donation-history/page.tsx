"use client"
import FundRaiserAccountTab from "@/component/Account/AccountTab/FundRaiserAccountTab"
import DonationHistroyItem from "@/component/FundRaiser/DonationHistroyItem"
import Header from "@/component/Header/Header"
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"
import PaginationSection from "@/component/Util/PaginationSection"
import { findMyDonationHistroy } from "@/util/data/helper/APIHelper"
import { formatDateToMonthNameAndDate, generateFundRaiserTitle } from "@/util/data/helper/utilHelper"
import { IDonateHistoryTemplate } from "@/util/types/API Response/FundRaiser"


function FundDonationHistory() {


    return (
        <UserPrivateRouter>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Profile', 'View Profile']} />
                </div>
                <FundRaiserAccountTab />
                <div className="flex gap-5">
                    <div className="container mx-auto px-4 py-8">
                        <h2 className="text-2xl font-semibold mb-6">Donation Payment History</h2>
                        <div className="container grid grid-cols-3 gap-5 mx-auto">
                            <PaginationSection
                                api={{
                                    renderType: async (page, limit, ...args) => {
                                        return await findMyDonationHistroy(limit, page)
                                    },
                                }}
                                itemsRender={(item: IDonateHistoryTemplate[]) => {
                                    return item.map((each: IDonateHistoryTemplate, index: number) => {
                                        return (
                                            <DonationHistroyItem key={index} amount={each.amount} certificateUrl={each.receipt} date={formatDateToMonthNameAndDate(each.date)} fundImage={each.fund_profile?.picture[0]} title={generateFundRaiserTitle(each.fund_profile)} fundId={each.fund_id} />
                                        )
                                    })
                                }}
                                paginationProps={{
                                    current_page: 1,
                                    currentLimit: 10
                                }}
                                refresh={null}
                            >

                            </PaginationSection>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <>
            </>
        </UserPrivateRouter>
    )
}

export default FundDonationHistory