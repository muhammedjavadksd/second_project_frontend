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

            </div >

        </>
    )
}

export default StartBidding