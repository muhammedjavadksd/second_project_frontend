"use client"
import AdminAuthBg from '@/_component/Auth/Common/AdminAuthBg'
import AdminAuthCard from '@/_component/Auth/Common/AdminAuthCard'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { onResetPassword } from './Logic'
import { resetPasswordInitialValues, resetPasswordValidation } from './Data'
import { toast } from 'react-toastify'

function AdminForgetPassword() {


    function successCB() {
        toast.success("Please check your email id, for create new password")
    }

    function errorCB(err) {
        toast.error(err)
    }

    return (
        <div>
            <div className='h-screen'>
                <AdminAuthBg />


                <AdminAuthCard>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset password
                            </h1>
                            <Formik onSubmit={(values) => {
                                onResetPassword(values, successCB, errorCB)
                            }} initialValues={resetPasswordInitialValues} validationSchema={resetPasswordValidation}>
                                <Form class="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter email address</label>
                                        <Field type="email" name="email_address" id="email_address" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                        <ErrorMessage id='email_address' className='errorMessage' component={"div"} name='email_address' />
                                    </div>


                                    <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                                </Form>
                            </Formik>
                        </div>
                    </div>
                </AdminAuthCard>
            </div>
        </div>
    )
}

export default AdminForgetPassword