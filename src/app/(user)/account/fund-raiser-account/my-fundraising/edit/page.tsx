"use client"
import AccountTab from '@/component/Account/AccountTab/ProfileTab'
import Header from '@/component/Header/Header'
import BreadCrumb from '@/component/Util/BreadCrumb'
import Footer from '@/component/Util/Footer'
import { FundRaiserEdit } from '@/util/types/Enums/BasicEnums'
import React, { useEffect, useState } from 'react'
import { findEditSection } from './data'
import BasicDetails from '@/component/Bidding/CreateSteps/form/BasicDetails'
import BasicFundRaiseEdit from '@/component/FundRaiser/EditSteps/BasicDetails'

function EditMyFundRaising(): React.ReactElement {

    const [editSection, setEdit] = useState<FundRaiserEdit>(FundRaiserEdit.Basic)
    const [EditBlock, setEditBlock] = useState<React.ReactNode>(<BasicFundRaiseEdit />)

    useEffect(() => {
        setEditBlock(findEditSection(editSection))
    }, [editSection])


    return (
        <>
            <Header></Header>
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    <BreadCrumb path={['Home', 'Profile', 'My Fund Raising']} />
                </div>
                <div className="flex gap-2">

                    <div className='mb-5  w-3/12'>
                        <div className='block w-full mb-3'>
                            <div onClick={() => setEdit(FundRaiserEdit.Basic)} className='p-3 flex w-full items-center gap-3 bg-gray-100 border shadow-inner cursor-pointer hover:bg-gray-200'>
                                <div className="avatarIcon shadow-inner border bg-white rounded-full p-4 px-5">
                                    <i className="fa-solid fa-user"></i>
                                </div>
                                <div>
                                    <h4 className='font-medium'>Basic Details</h4>
                                    <span className='mt-1 flex text-blue-900 text-sm gap-2'>
                                        <i className="fa-solid text-sm fa-pencil"></i>
                                        <div>
                                            Edit basic details
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='block w-full mb-3'>
                            <div onClick={() => setEdit(FundRaiserEdit.Personal)} className='p-3 flex w-full items-center gap-3 bg-gray-100 border shadow-inner cursor-pointer hover:bg-gray-200'>
                                <div className="avatarIcon shadow-inner border bg-white rounded-full p-4 px-5">
                                    <i className="fa-solid fa-passport"></i>
                                </div>
                                <div>
                                    <h4 className='font-medium'>Personal Details</h4>
                                    <span className='mt-1 flex text-blue-900 text-sm gap-2'>
                                        <i className="fa-solid text-sm fa-pencil"></i>
                                        <div>
                                            Edit personal details
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>



                        <div onClick={() => setEdit(FundRaiserEdit.Address)} className='block w-full mb-3'>
                            <div className='p-3 flex w-full items-center gap-3 bg-gray-100 border shadow-inner cursor-pointer hover:bg-gray-200'>
                                <div className="avatarIcon shadow-inner border bg-white rounded-full p-4 px-5">
                                    <i className="fa-solid fa-address-book"></i>
                                </div>
                                <div>
                                    <h4 className='font-medium'>Address Details Details</h4>
                                    <span className='mt-1 flex text-blue-900 text-sm gap-2'>
                                        <i className="fa-solid text-sm fa-pencil"></i>
                                        <div>
                                            Edit address details
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div onClick={() => setEdit(FundRaiserEdit.File)} className='block w-full mb-3'>
                            <div className='p-3 flex w-full items-center gap-3 bg-gray-100 border shadow-inner cursor-pointer hover:bg-gray-200'>
                                <div className="avatarIcon shadow-inner border bg-white rounded-full p-4 px-5">
                                    <i className="fa-solid fa-image"></i>
                                </div>
                                <div>
                                    <h4 className='font-medium'>File Manage</h4>
                                    <span className='mt-1 flex text-blue-900 text-sm gap-2'>
                                        <i className="fa-solid text-sm fa-pencil"></i>
                                        <div>
                                            Manage files
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div onClick={() => setEdit(FundRaiserEdit.Description)} className='block w-full mb-3'>
                            <div className='p-3 flex w-full items-center gap-3 bg-gray-100 border shadow-inner cursor-pointer hover:bg-gray-200'>
                                <div className="avatarIcon shadow-inner border bg-white rounded-full p-4 px-5">
                                    <i className="fa-solid fa-audio-description"></i>
                                </div>
                                <div>
                                    <h4 className='font-medium'>Description Details</h4>
                                    <span className='mt-1 flex text-blue-900 text-sm gap-2'>
                                        <i className="fa-solid text-sm fa-pencil"></i>
                                        <div>
                                            Re-generate AI Description
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-9/12'>
                        {EditBlock}
                    </div>
                </div >
            </div >
            <Footer></Footer>
        </>
    )
}

export default EditMyFundRaising