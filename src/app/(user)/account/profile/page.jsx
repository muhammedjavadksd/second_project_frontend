import AccountTab from '@/_component/Account/AccountTab'
import Header from '@/_component/Header/Header'
import BreadCrumb from '@/_component/Util/BreadCrumb'
import FileSelectBox from '@/_component/Util/FileSelectBox'
import Footer from '@/_component/Util/Footer'
import React from 'react'

function page() {
    return (
        <>
            <Header />
            <div className="container mx-auto mt-5 mb-5">
                <div className="mb-5">
                    {
                        <BreadCrumb path={['Profile', 'View Profile']}></BreadCrumb>
                    }
                </div>
                <div className="flex gap-5">
                    <div className='w-1/4'>
                        <AccountTab />
                    </div>
                    <div className='w-4/5'>
                        <div>
                            <h4 className='font-medium text-3xl mb-2'>Hi, Muhammed Javad</h4>
                            <p>Here is your daily activities, and history</p>
                        </div>
                        <div className="flex gap-10">
                            <div className="w-3/6">
                                <div class="mt-5">

                                    <div class="w-full">
                                        <div class="bg-white shadow-xl rounded-lg py-3">
 
                                            <div class="p-2">
                                                <h3 class="text-center text-xl text-gray-900 font-medium leading-8">Joh Doe</h3>
                                                <div class="text-center text-gray-400 text-xs font-semibold">
                                                    <p>Web Developer</p>
                                                </div>
                                                <table class="text-xs my-3">
                                                    <tbody><tr>
                                                        <td class="px-2 py-2 text-gray-500 font-semibold">Full name</td>
                                                        <td class="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                                    </tr>
                                                        <tr>
                                                            <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                                            <td class="px-2 py-2">+977 9955221114</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                                            <td class="px-2 py-2">john@exmaple.com</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="px-2 py-2 text-gray-500 font-semibold">Blood Group</td>
                                                            <td class="px-2 py-2">john@exmaple.com</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="px-2 py-2 text-gray-500 font-semibold">Date Joined</td>
                                                            <td class="px-2 py-2">john@exmaple.com</td>
                                                        </tr>
                                                    </tbody></table>

                                                <div class="text-center my-3">
                                                    <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="w-3/6">
                              <div className='w-100'>
                              <FileSelectBox>
                                    <input type="file" className='hidden' name="" id="" />
                                </FileSelectBox>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page