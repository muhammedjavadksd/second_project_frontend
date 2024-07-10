'use client'
import React, { Ref, useRef } from 'react'
import AdminLayout from '@/_component/Admin/AdminLayout'
import AdminPrivateRouter from '@/_component/LoginComponent/AdminPrivateRouter'
import AdminBreadCrumb from '@/_component/Util/AdminBreadCrumb'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { addFundRaiserValidation } from './data'
import FileSelectBox from '@/_component/Util/FileSelectBox'
import ListImageFile from '@/_component/Util/ListImageFile'
import { FUND_RAISE_IMAGE_URL } from '@/app/_util/_const/const'

function AdminFundRaiseAdd(): React.ReactElement {


    function onFileUpload() { }
    let imageRef = useRef();

    return (
        <AdminPrivateRouter>
            <AdminLayout>
                <AdminBreadCrumb title={"Add Fund Raiser"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Fund Raiser's", href: "/fund_raising" }, { title: "Add", href: "/admin/fund_raising/add" }]} />

                <div className='mt-5'>
                    <div className="flex gap-10">
                        <div className="w-4/5">
                            <Formik onSubmit={() => { }} initialValues={{}} >
                                <Form>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm  mb-2 block'>Enter amount</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Category</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Sub category</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Phone number</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Email ID</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Age</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>About</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Benificiary Relation</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Full name</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>City</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>District</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Full address</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>Pin code</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>
                                    </div>
                                    <div className="grid flex gap-10 grid-cols-2 mb-5">
                                        <div>
                                            <label htmlFor="" className='text-sm mb-2 block'>State</label>
                                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                                        </div>

                                    </div>

                                    <div className='w-100 ml-auto'>
                                        <button type='submit' className='bg-blue-600 text-white py-3 rounded-lg px-8'>Save</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        <div className="w-1/5">
                            <div className='mt-7'>
                                <FileSelectBox>
                                    <input multiple ref={imageRef} accept='image/png, image/jpeg, image/jpg' type="file" onChange={(e) => {
                                        // console.log(e.target.files);
                                        // onFileUpload([...e.target.files], onSuccess, onError, ifNotLogged, "Pictures", currentApplication)
                                        // imageRef.current.value = null
                                    }} className='hidden' />
                                </FileSelectBox>
                                {/* <ListImageFile onClose={(image_id) => { { } }} BASE_PATH={FUND_RAISE_IMAGE_URL} onDelete={() => { }} /> */}
                            </div>
                            <div className='mt-7'>
                                <FileSelectBox>
                                    <input multiple ref={imageRef} accept='image/png, image/jpeg, image/jpg' type="file" onChange={(e) => {
                                        // console.log(e.target.files);
                                        // onFileUpload([...e.target.files], onSuccess, onError, ifNotLogged, "Pictures", currentApplication)
                                        // imageRef.current.value = null
                                    }} className='hidden' />
                                </FileSelectBox>
                                {/* <ListImageFile onClose={(image_id) => { { } }} BASE_PATH={FUND_RAISE_IMAGE_URL} onDelete={() => { }} /> */}
                            </div>
                        </div>
                    </div>




                </div>
            </AdminLayout>
        </AdminPrivateRouter>
    )
}

export default AdminFundRaiseAdd
