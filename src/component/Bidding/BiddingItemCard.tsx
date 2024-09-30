import { formatDateToMonthNameAndDate } from "@/util/data/helper/utilHelper";
import Link from "next/link"
import SliderComponent from "../Util/SliderComponent";


function BiddingItemCard() {

    let hasStarted = false;
    return (
        <div>
            <div className="mb-5 max-w-sm bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <Link href={`/bidding/view/1`}>
                    <img
                        className="w-full h-48 object-cover"
                        src={`https://img.freepik.com/premium-photo/ultra-realistic-orange-background-4k-hd-photo-product_1193781-21514.jpg`}
                        alt="Auction Item Image"
                    />
                </Link>
                <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 mb-3 text-gray-700 dark:text-gray-300">
                        <div className="text-left">
                            <span className="text-sm text-red-600">Starting Bid</span>
                            <h6 className="text-blue-500">$2000</h6>
                        </div>
                        <div className="text-right">
                            <span className="text-sm">Highest Bid</span>
                            <h6 className="text-blue-500">$2500</h6>
                        </div>
                    </div>
                    <Link href={`/auction/view/2`}>
                        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:underline">
                            I Phone 13 Pro
                        </h5>
                    </Link>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                    </p>



                    {/* <div className="mt-1 text-center mb-3">

                        {
                            Math.random() < 0.5 ? (
                                <span
                                    className={`w-full text-green-600 text-sm  rounded-lg font-medium focus:outline-none`}
                                >Bid is Live</span>

                            ) : <span

                                className={`text-sm rounded-lg font-medium focus:outline-none  text-red-600 w-full`}
                            >Bid Start at {formatDateToMonthNameAndDate(new Date())}</span>
                        }
                    </div> */}
                    <div className="flex items-center justify-between">
                        {/* <Link
                            href={"/bidding/view/1"}
                            type="button"
                            className={`w-full bg-blue-600 text-white text-sm px-5 py-2.5 rounded-lg font-medium focus:outline-none`}
                        >View Item</Link> */}
                        <button
                            type="button"
                            className="text-blue-600 bg-white border border-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5">
                            Start a bid
                        </button>

                    </div>
                </div>
            </div>
        </div >

    )
}

export default BiddingItemCard