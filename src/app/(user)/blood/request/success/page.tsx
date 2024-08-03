"use client"
import Header from '@/component/Header/Header'
import Footer from '@/component/Util/Footer'
import React, { FunctionComponent, useState } from 'react'
import BannerForCreating from '@/component/FundRaiser/BannerForCreating'
import Link from 'next/link'


function CreateFundRaisingPost(): React.ReactElement {

    return (
        <div>
            <Header />
            <div className='container mx-auto'>
                <div className='mt-5'>
                    <div className="container mx-auto p-6 ">
                        <h1 className="text-3xl font-semibold text-green-600 mb-4">Blood Request Submitted Successfully</h1>
                        <p className="text-lg mb-6">
                            Your blood request has been successfully submitted. Below is a detailed breakdown of what you should expect and how to proceed:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-left max-w-3xl">
                            <li>Your request has been received and is now being processed by our system.</li>
                            <li>We will notify all registered blood donors who match the criteria specified in your request.</li>
                            <li>Donors will be alerted based on the blood type, location, and urgency provided.</li>
                            <li>Donors who are available will contact you directly to offer their assistance.</li>
                            <li>It is important to keep your contact information accurate and up-to-date.</li>
                            <li>Be responsive to messages and calls from donors to facilitate quick coordination.</li>
                            <li>If you secure blood from another source, please update your request immediately.</li>
                            <li>Updating your request helps us manage resources and avoid unnecessary alerts to donors.</li>
                            <li>Login to your account for closing blood request</li>
                            <li>If you have questions or need assistance, contact us through the <a href="contact.html" className="text-blue-500 font-semibold">contact page</a>.</li>
                            <li>We are dedicated to providing the best support to ensure your needs are met.</li>
                            <li>We are working to connect you with a suitable donor as quickly as possible.</li>
                            <li>If you face any issues, please reach out to our support team for help.</li>
                        </ul>
                        <Link href={'/'} type="button" className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Back to home</Link>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CreateFundRaisingPost