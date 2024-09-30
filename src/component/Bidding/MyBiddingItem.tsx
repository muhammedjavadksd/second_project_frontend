import { Fragment, useState } from "react"
import ModelItem from "../Util/ModelItem";
import ModelHeader from "../Util/Model/ModelHeader";
import SecuredPayementModel from "./SecurePayementNotice";
import Link from "next/link";
import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper";
import const_data from "@/util/data/const";

function MyBiddingItem() {
    const [isSecuredPaymentOpned, setPaymentOpen] = useState(false)

    return (


        <div className="flex mt-5  max-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <ModelItem ZIndex={99} closeOnOutSideClock={true} isOpen={isSecuredPaymentOpned} onClose={() => setPaymentOpen(false)} >
                <Fragment>
                    <ModelHeader title={"How to make secure payment"} />
                    <SecuredPayementModel />
                    <div onClick={() => setPaymentOpen(false)} className="flex justify-end bg-white items-center p-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ok</button>
                    </div>
                </Fragment>
            </ModelItem>

            <Link href={`/auction/view/1`}>
                <img
                    className="w-full h-72 object-cover "
                    src={`https://img.freepik.com/premium-photo/ultra-realistic-orange-background-4k-hd-photo-product_1193781-21514.jpg`}
                    alt="Auction Item Image"
                />
            </Link>
            <div className="w-2/3 p-5">
                <div className="grid grid-cols-2 gap-3 mb-3 text-gray-700 dark:text-gray-300">
                    <div className="text-left">
                        <span className="text-sm text-red-600">Price </span>
                        <h6 className="text-blue-500">$2000</h6>
                    </div>
                    <div className="text-right">
                        <span className="text-sm">Date</span>
                        <h6 className="text-blue-500">{formatDateToMonthNameAndDate(new Date())}</h6>
                    </div>
                </div>
                <Link href={`/auction/view/2`}>
                    <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:underline">
                        I Phone 13 Pro
                    </h5>
                </Link>
                <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                    <h4>Item bought  name : Muhammed Javad</h4>
                    <h4>Item bought  price : 10,000</h4>
                    <h4>People queue : 6</h4>
                    <h4>Payment deadline : {formatDateToMonthNameAndDate(new Date())}</h4>
                </p>

                <div className="mt-1 block mb-3">
                    <span className={`text-sm rounded-lg font-medium focus:outline-none text-red-600 w-full`}>Pay the amount before {formatDateToMonthNameAndDate(new Date())}</span>
                    <div className='text-xs'>Worried about what if paid and item not deliverd? <Link className='text-blue-700 underline' href={"#"} onClick={() => setPaymentOpen(true)}>Read from here</Link></div>
                </div>
                <p className="text-sm"><span className="text-green-600">Greate</span> Your gonna help 5000{const_data.MONEY_ICON} to Hashir Education</p>

            </div>
        </div>
    );
}

export default MyBiddingItem