"use client"
import BloodRequirementSingleItem from '@/component/Blood/BloodRequirementSingleItem'
import Header from '@/component/Header/Header'
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import React from 'react'


function FindNearestBloodDonors(): React.ReactElement {




    return (
        <div>
            <Header />
            <div className='container mx-auto'>
                <div className="mt-3 mb-3">
                    <BreadCrumb path={['Blood', 'Find Nearest Donors', 'View']} ></BreadCrumb>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">


                    <div className="mt-5">

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default FindNearestBloodDonors