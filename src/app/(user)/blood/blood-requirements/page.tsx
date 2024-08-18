"use client"
import BloodRequirementSingleItem from '@/component/Blood/BloodRequirementSingleItem'
import Header from '@/component/Header/Header'
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import React, { FunctionComponent, useState } from 'react'


function BloodRequirementsView(): React.ReactElement {




    return (
        <div>
            <Header />
            <div className='container mx-auto'>
                <div className="mt-3 mb-3">
                    <BreadCrumb path={['Blood', 'Blood Requirements', 'View']} ></BreadCrumb>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-white bg-red-600 p-3 rounded-t-lg">Search Blood Stock</h2>
                    <form className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                            <div>
                                <label htmlFor="stateCode" className="block text-sm font-medium text-gray-700">State</label>
                                <select name="stateCode" id="stateCode" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" onChange={() => { }}>
                                    <option value="-1">Select State</option>
                                    <option value="-2">All</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="distList" className="block text-sm font-medium text-gray-700">District</label>
                                <select id="distList" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" onChange={() => { }}>
                                    <option value="-1">Select District</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="bgType" className="block text-sm font-medium text-gray-700">Blood Group</label>
                                <select name="bloodGroupType" id="bgType" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" onChange={() => { }}>
                                    <option value="-1">Select Blood Group</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="bcType" className="block text-sm font-medium text-gray-700">Blood Component</label>
                                <select name="bloodComponentType" id="bcType" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" onChange={() => { }}>
                                    <option value="-1">Select Blood Component</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="mt-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16">
                        <BloodRequirementSingleItem req_id={123} deadLine={"12"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} unit={2} username={"Muhammed Javad"}></BloodRequirementSingleItem>
                        <BloodRequirementSingleItem req_id={123} deadLine={"12"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} unit={2} username={"Muhammed Javad"}></BloodRequirementSingleItem>
                        <BloodRequirementSingleItem req_id={123} deadLine={"12"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} unit={2} username={"Muhammed Javad"}></BloodRequirementSingleItem>
                        <BloodRequirementSingleItem req_id={123} deadLine={"12"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} unit={2} username={"Muhammed Javad"}></BloodRequirementSingleItem>
                        <BloodRequirementSingleItem req_id={123} deadLine={"12"} group={BloodGroup.AB_NEGATIVE} location={"Kasaragod"} unit={2} username={"Muhammed Javad"}></BloodRequirementSingleItem>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BloodRequirementsView