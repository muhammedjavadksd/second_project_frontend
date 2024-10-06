import Link from "next/link"
import PublicImage from "../Util/PublicImage"
import const_data from "@/util/data/const"
import { downloadCertificate } from "@/util/data/helper/utilHelper"
import { useState } from "react"
import { toast } from "react-toastify"
import SpinnerLoader from "../Util/SpinningLoader"


function DonationHistroyItem({ fundId, fundImage, amount, date, title, certificateUrl }) {


    const [isLoading, setLoading] = useState(false);

    return (
        <div className="mb-5 max-w-sm bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <SpinnerLoader isLoading={isLoading} />
            <Link href={`/fund-raising/view/${fundId}`}>
                <PublicImage className="w-full h-48 object-cover" imageurl={fundImage} />
            </Link>
            <div className="p-5">
                <div className="grid grid-cols-3 gap-3 mb-3 text-gray-700 dark:text-gray-300">
                    <div className="text-left">
                        <span className="text-sm text-green-600">Amount</span>
                        <h6 className="text-blue-500">{amount}{const_data.MONEY_ICON}</h6>
                    </div>
                    <div className="text-center">
                        <span className="text-sm">Date</span>
                        <h6 className="text-blue-500">{date}</h6>
                    </div>
                    <div className="text-right">
                        <span className="text-sm">Status</span>
                        <h6 className="text-blue-500">Paid</h6>
                    </div>
                </div>
                <Link href={`/fund-raising/view/${fundId}`}>
                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:underline">
                        You have successfully donated {amount} {const_data.MONEY_ICON} for {title}
                        {/* {generateFundRaiserTitle(profil)} */}
                    </h5>
                </Link>
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => {
                            setLoading(true)
                            downloadCertificate(certificateUrl, "fund_donation.pdf").then((data) => {
                                if (data) {
                                    toast.success("Download success")
                                } else {
                                    toast.error("Download failed")
                                }
                            }).finally(() => setLoading(false))
                        }}
                        type="button"
                        className="text-blue-600 bg-white border border-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5">
                        Download certificate
                    </button>
                </div>
            </div>
        </div >
    )
}

export default DonationHistroyItem