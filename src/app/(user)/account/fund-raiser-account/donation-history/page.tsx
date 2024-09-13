"use client"
import FundRaiserAccountTab from "@/component/Account/AccountTab/FundRaiserAccountTab"
import Header from "@/component/Header/Header"
import UserPrivateRouter from "@/component/LoginComponent/UserPrivateRouter"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"
import PaginationSection from "@/component/Util/PaginationSection"
import const_data from "@/util/data/const"
import { findMyDonationHistroy } from "@/util/data/helper/APIHelper"
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper"
import { IDonateHistoryTemplate } from "@/util/types/API Response/FundRaiser"
import { useEffect, useState } from "react"


function FundDonationHistory() {

    const [history, setHistory] = useState<IDonateHistoryTemplate[]>([])
    const [totalRecors, setRecords] = useState<number>(0)

    async function findHistory(page, limit) {
        try {
            const data = await findMyDonationHistroy(limit, page)
            setRecords(data.total_records)
            return data.paginated
            // .then((data) => {
            //     setHistory(data.paginated)
            // }).catch((err) => {
            //     setRecords(0)
            //     setHistory([])
            // })

        } catch (e) {
            return []
        }
    }

    useEffect(() => {
        // findHistory()
    }, [])



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
                            {/* Donation Record 1 */}
                            <PaginationSection
                                api={{
                                    renderType: async (page, limit, ...args) => {
                                        return await findHistory(page, limit)
                                    },
                                }}
                                itemsRender={(item: IDonateHistoryTemplate[]) => {
                                    // alert(item.length)
                                    return item.map((each: IDonateHistoryTemplate) => {
                                        return <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 shadow-lg rounded-lg p-6">
                                            <div className="flex justify-between mb-4">
                                                <span className="font-semibold text-gray-700">Date:</span>
                                                <span className="text-gray-900">{formatDateToMonthNameAndDate(each.date)}</span>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <span className="font-semibold text-gray-700">Donor Name:</span>
                                                <span className="text-gray-900">{each.name}</span>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <span className="font-semibold text-gray-700">Amount:</span>
                                                <span className="text-gray-900">{const_data.MONEY_ICON}{each.amount}</span>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <span className="font-semibold text-gray-700">For :</span>
                                                <span className="text-gray-900">Fund raise Id {each.fund_id}</span>
                                            </div>
                                            <div className="flex justify-between mb-4">
                                                <span className="font-semibold text-gray-700">Payment Status:</span>
                                                <span className="font-bold text-green-600">Completed</span>
                                            </div>
                                            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">Download Receipt</button>
                                        </div>
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