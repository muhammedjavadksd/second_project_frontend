"use client"
import BankDetailsAds from "@/component/Bidding/CreateSteps/ads/BankDetailsAds"
import BasicDetailsAds from "@/component/Bidding/CreateSteps/ads/BasicDetailsAds"
import PaymentDetailsAds from "@/component/Bidding/CreateSteps/ads/PaymentDetailsAds"
import ProductDetailsAds from "@/component/Bidding/CreateSteps/ads/ProductDetailsAds"
import ProductDetailsAdsThree from "@/component/Bidding/CreateSteps/ads/ProductDetailsAdsThree"
import ProductDetailsAdsTwo from "@/component/Bidding/CreateSteps/ads/ProductDetailsAdsTwo"
import ProductImageAds from "@/component/Bidding/CreateSteps/ads/ProductImagesAds"
import UserDetailsAds from "@/component/Bidding/CreateSteps/ads/UserDetailsAds"
import WarrantyDetailsAds from "@/component/Bidding/CreateSteps/ads/WarrantyDetailsAds"
import BankDetails from "@/component/Bidding/CreateSteps/form/BankDetails"
import BasicDetails from "@/component/Bidding/CreateSteps/form/BasicDetails"
import PaymentDetails from "@/component/Bidding/CreateSteps/form/PaymentDetails"
import ProductDetails from "@/component/Bidding/CreateSteps/form/ProductDetails"
import ProductDetailsStepThree from "@/component/Bidding/CreateSteps/form/ProductDetailsStepThree"
import ProductDetailsStepTwo from "@/component/Bidding/CreateSteps/form/ProductDetailsStepTwo"
import ProductImages from "@/component/Bidding/CreateSteps/form/ProductImages"
import UserDetails from "@/component/Bidding/CreateSteps/form/UserDetails"
import WarrantyDetails from "@/component/Bidding/CreateSteps/form/WarrantyDetails"
import CreateFormBackground from "@/component/FundRaiser/CreateFormBackground"
import Header from "@/component/Header/Header"
import BreadCrumb from "@/component/Util/BreadCrumb"
import Footer from "@/component/Util/Footer"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { steps } from "framer-motion"
import { useState } from "react"
import * as Yup from 'yup'


function StartBidding() {

    let [currentSteps, setSteps] = useState(0)

    let biddingAds = [
        <BasicDetailsAds />,
        <ProductDetailsAds />,
        <ProductDetailsAdsTwo />,
        <ProductDetailsAdsThree />,
        <ProductImageAds />,
        <BankDetailsAds />
    ]

    let biddingCreateSteps = [
        <BasicDetails />,
        <ProductDetails />,
        <ProductDetailsStepTwo />,
        <ProductDetailsStepThree />,
        <ProductImages />,
        <BankDetails />
    ]

    let biddingStepHeading = [
        'Basic details',
        'Product details',
        'Product details two',
        'Product details three',
        'Bank details',
    ]

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full name is required'),
        itemDescription: Yup.string().required('Description of the item is required'),
        biddingStartDate: Yup.date().required('Bidding start date is required').nullable(),
        biddingEndDate: Yup.date().required('Bidding end date is required').nullable().min(Yup.ref('biddingStartDate'), 'End date must be after start date'),
        category: Yup.string().required('Category is required'),
        subCategory: Yup.string().required('Sub Category is required'),
        marketWorth: Yup.number().required('Item market worth is required').min(0, 'Market worth must be a positive number'),
        warranty: Yup.boolean().required('Warranty/registration/licence information is required'),
        minimumPrice: Yup.number().required('Minimum price is required').min(0, 'Minimum price must be a positive number'),
        donateFullAmount: Yup.boolean().required('Please specify if you want to donate full amount or profitable amount'),
    });

    return (
        <>
            <Header />
            <div className='container mx-auto'>

                <div className="mt-5">
                    <BreadCrumb path={['Home', 'Bidding', 'Create']} />
                </div>

                <div className="grid -mt-36 justify-center  items-center min-h-screen grid-cols-2  ">
                    <div>
                        <div>
                            <div className="pe-10">
                                <span>{currentSteps + 1} / {biddingCreateSteps.length} </span>
                                {biddingAds[currentSteps]}
                            </div>
                        </div>
                    </div>
                    <div className="w-full">

                        <Formik initialValues={{}} onSubmit={() => { }}>
                            <Form>
                                {biddingCreateSteps[currentSteps]}

                            </Form>
                        </Formik>


                    </div>
                </div>
                <div className="buttonNavigation shadow-2xl bg-gray-100 fixed bottom-0  left-0 right-0 min-h-20">
                    <div className={`rangeBorder h-1 bg-black w-${currentSteps + 1}/${biddingCreateSteps.length}`}></div>
                    <div className="flex p-4 pb-0 h-full  items-center justify-between">
                        <button className={`text-green-500 rounded-lg hover:bg-gray-200 border px-7 py-2 ${currentSteps <= 0 && "cursor-not-allowed disabled"}`} onClick={() => currentSteps > 0 && setSteps((prev) => prev - 1)}>Back</button>
                        <button className={`bg-green-600 rounded-lg px-7 py-2 text-white hover:bg-green-800 ${(currentSteps > biddingCreateSteps.length - 1) && "cursor-not-allowed disabled"}`} onClick={() => currentSteps < biddingCreateSteps.length - 1 && setSteps((prev) => (prev + 1))}>{(currentSteps >= biddingCreateSteps.length - 1) ? 'Save & Submit' : `Next : ${biddingStepHeading[currentSteps]}`}</button>
                    </div>
                </div>
                {/* <div className="mb-10 mt-10 bg-white border border-gray-200 rounded-lg shadow-lg p-6 max-w-3xl w-full">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Item Bidding Form</h2>
                     <Formik
                        initialValues={{
                            fullName: '',
                            itemDescription: '',
                            biddingStartDate: '',
                            biddingEndDate: '',
                            category: '',
                            subCategory: '',
                            marketWorth: '',
                            warranty: false,
                            minimumPrice: '',
                            donateFullAmount: false,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            // Handle form submission
                            console.log(values);
                        }}
                    >
                        {({ setFieldValue, values }) => (
                            <Form>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                                        <Field
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter your full name"
                                        />
                                        <ErrorMessage component="div" name="fullName" className="text-red-600 text-sm mt-1" />
                                    </div>



                                    <div>
                                        <label htmlFor="biddingStartDate" className="block mb-2 text-sm font-medium text-gray-900">Bidding Start Date</label>
                                        <Field
                                            type="date"
                                            name="biddingStartDate"
                                            id="biddingStartDate"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                        <ErrorMessage component="div" name="biddingStartDate" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="biddingEndDate" className="block mb-2 text-sm font-medium text-gray-900">Bidding End Date</label>
                                        <Field
                                            type="date"
                                            name="biddingEndDate"
                                            id="biddingEndDate"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                        <ErrorMessage component="div" name="biddingEndDate" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                        <Field
                                            as="select"
                                            name="category"
                                            id="category"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            onChange={e => {
                                                const { value } = e.target;
                                                setFieldValue('category', value);
                                                setFieldValue('subCategory', ''); // Reset subCategory when category changes
                                            }}
                                        >
                                            <option value="">Select a category</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="furniture">Furniture</option>
                                            <option value="clothing">Clothing</option>
 
                                        </Field>
                                        <ErrorMessage component="div" name="category" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="subCategory" className="block mb-2 text-sm font-medium text-gray-900">Sub Category</label>
                                        <Field
                                            as="select"
                                            name="subCategory"
                                            id="subCategory"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            disabled={!values.category}
                                        >
                                            <option value="">Select a subcategory</option>
                                            {values.category === 'electronics' && (
                                                <>
                                                    <option value="phones">Phones</option>
                                                    <option value="laptops">Laptops</option>
                                                </>
                                            )}
                                            {values.category === 'furniture' && (
                                                <>
                                                    <option value="tables">Tables</option>
                                                    <option value="chairs">Chairs</option>
                                                </>
                                            )}
                                            {values.category === 'clothing' && (
                                                <>
                                                    <option value="shirts">Shirts</option>
                                                    <option value="pants">Pants</option>
                                                </>
                                            )}
                                        </Field>
                                        <ErrorMessage component="div" name="subCategory" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="marketWorth" className="block mb-2 text-sm font-medium text-gray-900">Item Market Worth ($)</label>
                                        <Field
                                            type="number"
                                            name="marketWorth"
                                            id="marketWorth"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter the market worth"
                                        />
                                        <ErrorMessage component="div" name="marketWorth" className="text-red-600 text-sm mt-1" />
                                    </div>



                                    <div>
                                        <label htmlFor="minimumPrice" className="block mb-2 text-sm font-medium text-gray-900">Minimum Price ($)</label>
                                        <Field
                                            type="number"
                                            name="minimumPrice"
                                            id="minimumPrice"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter the minimum price"
                                        />
                                        <ErrorMessage component="div" name="minimumPrice" className="text-red-600 text-sm mt-1" />
                                    </div>



                                    <div>
                                        <label htmlFor="minimumPrice" className="block mb-2 text-sm font-medium text-gray-900">Upload the image</label>
                                        <Field
                                            type="number"
                                            name="minimumPrice"
                                            id="minimumPrice"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Enter the minimum price"
                                        />
                                        <ErrorMessage component="div" name="minimumPrice" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="warranty" className="block mb-2 text-sm font-medium text-gray-900">Does the product have warranty/registration/license?</label>
                                        <Field
                                            as="select"
                                            name="warranty"
                                            id="warranty"
                                            className="h-10 w-full border-gray-300 rounded"
                                        >
                                            <option value="">Select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </Field>
                                        <ErrorMessage component="div" name="warranty" className="text-red-600 text-sm mt-1" />
                                    </div>


                                    <div>
                                        <label htmlFor="donateFullAmount" className="block mb-2 text-sm font-medium text-gray-900">Do you want to donate full amount or profitable amount?</label>
                                        <Field
                                            as="select"
                                            name="donateFullAmount"
                                            id="donateFullAmount"
                                            className=" h-10 w-full  border-gray-300 rounded"
                                        >
                                            <option value="full">Full Amount</option>
                                            <option value="profitable">Profitable Amount</option>
                                        </Field>
                                        <ErrorMessage component="div" name="donateFullAmount" className="text-red-600 text-sm mt-1" />
                                    </div>

                                </div>
                                <div className="mb-5 mt-5">
                                    <label htmlFor="itemDescription" className="block mb-2 text-sm font-medium text-gray-900">Description of the Item</label>
                                    <Field
                                        as="textarea"
                                        name="itemDescription"
                                        id="itemDescription"
                                        rows="4"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Describe the item"
                                    />
                                    <ErrorMessage component="div" name="itemDescription" className="text-red-600 text-sm mt-1" />
                                </div>

                                <button
                                    type="submit"
                                    className="col-span-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
                                >
                                    Submit
                                </button>

                            </Form>
                        )}
                    </Formik> 
            </div> */}
            </div >

            {/* <Footer /> */}
        </>
    )
}

export default StartBidding