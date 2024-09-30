'use client'
import React, { Fragment, FunctionComponent, useRef, useState } from 'react'
import AdminLayout from '@/component/Admin/AdminLayout'
import AdminPrivateRouter from '@/component/LoginComponent/AdminPrivateRouter'
import AdminBreadCrumb from '@/component/Util/AdminBreadCrumb'
import { ErrorMessage, Field, Form, Formik } from 'formik'

function Page(): React.ReactElement {

    return (
        <AdminPrivateRouter>
            <AdminLayout onSearch={() => { }}>

                <AdminBreadCrumb title={"Edit Bank account"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Fund Raiser's", href: "/fund_raising" }, { title: "Edit", href: "/admin/fund_raising/" }]} />
                <div className='mt-5'>
                    <div className="gap-10">
                        <Formik
                            onSubmit={(val, { resetForm }) => { }}
                            initialValues={{}}
                        >
                            <Form>
                                <div className="grid  gap-x-10 gap-y-4 grid-cols-2 mb-1">

                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account number</label>
                                        <Field type="password" id="account_number" name="account_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter account number" />
                                        <ErrorMessage name="account_number" component="div" className="errorMessage" />
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re Enter Account number</label>
                                        <Field type="text" id="re_account_number" name="re_account_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Re enter account number" />
                                        <ErrorMessage name="re_account_number" component="div" className="errorMessage" />
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IFSC Code</label>
                                        <Field type="text" id="ifsc_code" name="ifsc_code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter IFSC code" />
                                        <ErrorMessage name="ifsc_code" component="div" className="errorMessage" />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Holder name</label>
                                        <Field type="text" id="holder_name" name="holder_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter holder name" />
                                        <ErrorMessage name="holder_name" component="div" className="errorMessage" />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Holder name</label>
                                        <Field as="select" type="text" id="̉account_type" name="account_type" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Select account type">
                                            <option value="">Account type</option>
                                            <option value="saving">Saving Account</option>
                                            <option value="current">Current Account</option>
                                        </Field>
                                        <ErrorMessage name="account_type" component="div" className="errorMessage" />
                                    </div>

                                </div>
                                <div className='mt-5 ml-auto flex gap-3 justify-end w-full overflow-hidden'>
                                    <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next <i className="fa-solid fa-chevron-right"></i></button >
                                </div >
                            </Form>
                        </Formik>
                    </div>
                </div>

            </AdminLayout>
        </AdminPrivateRouter >
    )
}

export default Page

