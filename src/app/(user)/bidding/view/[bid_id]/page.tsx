"use client"
import BidProposalSingleItem from '@/component/Bidding/BidProposelSingleItem';
import Header from '@/component/Header/Header';
import BreadCrumb from '@/component/Util/BreadCrumb';
import EditInput from '@/component/Util/EditInput';
import Footer from '@/component/Util/Footer';
import SectionTitle from '@/component/Util/SectionTitle';
import TabItem from '@/component/Util/TabItem';
import const_data from '@/util/data/const';
import { ProductTabItems } from '@/util/types/Enums/BasicEnums';
import React, { Fragment, useState } from 'react';

const ProductDetail = () => {


    const [tabItem, setTabItems] = useState<ProductTabItems>(ProductTabItems.ProductDetails)

    return (
        <Fragment>
            <Header />
            <div className="cardInfo text-center bg-green-400 text-white py-3">
                This is your product. You can customize it here to suit your preferences.
            </div>
            <section className="py-5 lg:py-24 relative">
                <div className="mx-auto max-w-7xl px-4 ">
                    <BreadCrumb path={['Home', 'Bidding', 'View', 'Product name']} />
                    <div className="grid mt-5 grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                        <div className="w-full h-full flex justify-center items-center">

                            <img
                                src="https://via.placeholder.com/500"
                                alt="Yellow Summer Travel Bag"
                                className="w-full h-full object-cover"
                            />


                        </div>
                        <div className="pro-detail w-full flex flex-col justify-center order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto">
                            <p className="font-medium text-lg text-indigo-600 mb-4">
                                Gadjet &nbsp; / &nbsp; Smart Phone
                            </p>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm font-medium text-gray-600">Muhammed Javad selling</span>
                            </div>
                            <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">
                                <EditInput isEditAllowed={() => true} text='Yellow Summer Travel Bag' data={{ key: "name", value: "Yellow Summer Travel Bag" }} />
                            </h2>
                            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                    {const_data.MONEY_ICON}52,000-/
                                </h6>

                            </div>
                            <p className="font-manrope text-base leading-6 text-gray-600 mb-6">
                                Get ready for your next adventure with our yellow summer travel
                                bag, designed for both functionality and style. Perfect for
                                travelers and explorers.
                            </p>
                            <div className="flex items-center justify-start gap-4 mb-8">
                                <button className="inline-block bg-indigo-600 text-white font-semibold text-sm leading-5 px-6 py-3 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
                                    Start Bidding
                                </button>
                                <button className="inline-block border border-gray-300 text-gray-700 font-semibold text-sm leading-5 px-6 py-3 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
                                    View the fund raiser
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <tbody>
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="py-3 px-4 border-b font-semibold text-gray-700">Auction Id</td>
                                                <td className="py-3 px-4 border-b text-gray-600">BDUTWY</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="py-3 px-4 border-b font-semibold text-gray-700">Started Price</td>
                                                <td className="py-3 px-4 border-b text-gray-600">{const_data.MONEY_ICON}22,000</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="py-3 px-4 border-b font-semibold text-gray-700">Current Price</td>
                                                <td className="py-3 px-4 border-b text-gray-600">{const_data.MONEY_ICON}32,000</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="py-3 px-4 border-b font-semibold text-gray-700">Fund Raiser Helping Amount</td>
                                                <td className="py-3 px-4 border-b text-gray-600">2,000</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 text-center">
                                                <td className="py-3 px-4 border-b font-semibold text-gray-700">Bidd Ending Date</td>
                                                <td className="py-3 px-4 border-b text-gray-600">2,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        </div>


                    </div>

                    <section className='mt-5'>
                        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                            <li className="me-2">
                                <button onClick={() => setTabItems(ProductTabItems.ProductDetails)} className={`inline-block p-4 ${tabItem == ProductTabItems.ProductDetails && "text-blue-600 bg-gray-100"} rounded-t-lg active `}>Product Details</button>
                            </li>
                            <li className="me-2">
                                <button onClick={() => setTabItems(ProductTabItems.WarrantyDetails)} className={`inline-block p-4 ${tabItem == ProductTabItems.WarrantyDetails && "text-blue-600 bg-gray-100"} rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}>Warranty Details</button>
                            </li>

                            <li className="me-2">
                                <button onClick={() => setTabItems(ProductTabItems.OtherDetails)} className={`inline-block p-4 ${tabItem == ProductTabItems.OtherDetails && "text-blue-600 bg-gray-100"} rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}>Other details</button>
                            </li>
                        </ul>

                        <TabItem keyid={1} isShow={tabItem == ProductTabItems.ProductDetails}>
                            <div className='overflow-auto'>
                                <div>
                                    <h4 className='text-2xl font-medium mb-3'>About the product</h4>
                                    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia</p>
                                </div>
                                <div className='mt-5'>
                                    <h4 className='text-2xl font-medium mb-3'>Additional notes</h4>
                                    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia</p>
                                </div>
                            </div>
                        </TabItem>

                        <TabItem keyid={1} isShow={tabItem == ProductTabItems.WarrantyDetails}>
                            <div className='overflow-auto'>
                                <div>
                                    <h4 className='text-2xl font-medium mb-3'>Product Warranty/Invoice</h4>
                                    <img src="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg" alt="" />
                                </div>

                            </div>
                        </TabItem>

                        <TabItem keyid={1} isShow={tabItem == ProductTabItems.OtherDetails}>
                            <div className='overflow-auto'>

                                <div className="w-full flex gap-10">
                                    <div className="w-3/6">
                                        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                            <tbody>
                                                <tr className="hover:bg-gray-100 text-center">
                                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Product unit</td>
                                                    <td className="py-3 px-4 border-b text-gray-600">Kg</td>
                                                </tr>
                                                <tr className="hover:bg-gray-100 text-center">
                                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Product Quantity</td>
                                                    <td className="py-3 px-4 border-b text-gray-600">12</td>
                                                </tr>

                                                <tr className="hover:bg-gray-100 text-center">
                                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Brand</td>
                                                    <td className="py-3 px-4 border-b text-gray-600">Samsung</td>
                                                </tr>
                                                <tr className="hover:bg-gray-100 text-center">
                                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Delivery timeframe</td>
                                                    <td className="py-3 px-4 border-b text-gray-600">2,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="w-3/6">
                                        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                                            <tbody>
                                                <tr className="hover:bg-gray-100 text-center">
                                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Account number</td>
                                                    <td className="py-3 px-4 border-b text-gray-600">18910100014554</td>
                                                </tr>
                                                <tr className="hover:bg-gray-100 text-center">
                                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">IFSC Code</td>
                                                    <td className="py-3 px-4 border-b text-gray-600">FDRL0001891</td>
                                                </tr>
                                                <tr className="hover:bg-gray-100 text-center">
                                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Holder name</td>
                                                    <td className="py-3 px-4 border-b text-gray-600">Muhammed Javad</td>
                                                </tr>
                                                <tr className="hover:bg-gray-100 text-center">
                                                    <td className="py-3 px-4 border-b font-semibold text-gray-700">Account Type</td>
                                                    <td className="py-3 px-4 border-b text-gray-600">Saving Account</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </TabItem>
                    </section>

                    <div className='mt-5'>
                        <SectionTitle focus_text='Bid' sub_title='All the bid for this item' title='Bid on this item' />
                        <div className="w-full flex gap-5">
                            <div className="w-4/6">
                                <div className="grid gap-x-5 grid-cols-2">
                                    <BidProposalSingleItem />
                                    <BidProposalSingleItem />
                                    <BidProposalSingleItem />
                                    <BidProposalSingleItem />
                                    <BidProposalSingleItem />
                                    <BidProposalSingleItem />
                                </div>
                            </div>
                            <div className="w-2/6">
                                <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
                                    <h2 className="text-xl font-bold mb-4 text-gray-800">Place Your Bid</h2>
                                    <form className="space-y-4">
                                        {/* Bid Amount Field */}
                                        <div>
                                            <label
                                                htmlFor="bidAmount"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Bid Amount (INR)
                                            </label>
                                            <input
                                                type="number"
                                                id="bidAmount"
                                                name="bidAmount"


                                                required
                                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>



                                        {/* Additional Comments Field */}
                                        <div>
                                            <label
                                                htmlFor="comments"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Additional Comments
                                            </label>
                                            <textarea
                                                id="comments"
                                                name="comments"


                                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Any special notes or requirements..."
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Submit Bid
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="max-w-lg mt-6 mx-auto p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">

                                    <div className="flex items-center mb-4">
                                        <svg
                                            className="w-6 h-6 mr-2 text-yellow-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-9 4h2v2H9v-2zm0-8h2v6H9V6z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <h3 className="font-bold text-lg">Important Notice</h3>
                                    </div>

                                    {/* Warning Message */}
                                    <p className="text-sm">
                                        Before placing a bid, please ensure that you:
                                    </p>
                                    <ul className="list-disc list-inside pl-2 text-sm mt-2">
                                        <li>Understand the project requirements thoroughly.</li>
                                        <li>Have the necessary skills and experience.</li>
                                        <li>Can meet the deadlines set by the project.</li>
                                        <li>Are comfortable with the budget and payment terms.</li>
                                        <li>Have read the project terms and conditions.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </section>





            <Footer />
        </Fragment>
    );
};

export default ProductDetail;
