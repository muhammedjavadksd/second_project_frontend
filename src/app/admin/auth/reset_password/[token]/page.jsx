"use client"
import AdminAuthBg from '@/_component/Auth/Common/AdminAuthBg'
import AdminAuthCard from '@/_component/Auth/Common/AdminAuthCard'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { resetPasswordInitialValues, resetPasswordValidation } from './Data'
import { onResetPassword } from './Logic'
import { toast } from 'react-toastify'
import LoadingComponent from '@/_component/Util/LoadingComponent'
import BlackedRouter from '@/_component/LoginComponent/BlackedRouter'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'

function ResetPassword() {

    let [isLoading, setIsLoading] = useState(false)
    let router = useRouter();
    let session = getSession()

    function successCB() {
        toast.success("Password has been updated")
        // setIsLoading(false)
        router.replace("/admin/auth/sign_in")
    }

    function errorCB(err) {
        toast.error(err)
        setIsLoading(false)
    }


    let { token } = useParams();
    console.log(token);

    return (
        <BlackedRouter session={session}>
            <div>
                <div>
                    <div className='h-screen'>
                        <AdminAuthBg />


                        <AdminAuthCard>
                            <LoadingComponent isLoading={isLoading} closeOnClick={false}>

                                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            New password
                                        </h1>
                                        <Formik initialValues={resetPasswordInitialValues} onSubmit={(val) => {
                                            val.token = token;
                                            setIsLoading(true)
                                            onResetPassword(val, successCB, errorCB)
                                        }} validationSchema={resetPasswordValidation} class="space-y-4 md:space-y-6" action="#">
                                            <Form>
                                                <div>
                                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter new password</label>
                                                    <Field type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a password" required="" />
                                                    <ErrorMessage className='errorMessage' component={"div"} id='password' name='password'></ErrorMessage>
                                                </div>

                                                <div className='mb-5 mt-5'>
                                                    <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter confirm password</label>
                                                    <Field type="password" name="confirm_password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm password" required="" />
                                                    <ErrorMessage className='errorMessage' component={"div"} id='confirm_password' name='confirm_password'></ErrorMessage>
                                                </div>

                                                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                            </LoadingComponent>
                        </AdminAuthCard>
                    </div>
                </div>
            </div>
        </BlackedRouter>
    )
}

export default ResetPassword