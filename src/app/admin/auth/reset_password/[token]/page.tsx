"use client"
import AdminAuthBg from '@/component/Auth/Common/AdminAuthBg'
import AdminAuthCard from '@/component/Auth/Common/AdminAuthCard'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import LoadingComponent from '@/component/Util/LoadingComponent'
import BlackedRouter from '@/component/LoginComponent/BlackedRouter'
import { useRouter } from 'next/navigation'
import { getSession } from 'next-auth/react'
import { AdminResetPassword } from '@/util/types/InterFace/FormInitialValues'
import { adminResetPasswordInitialValues } from '@/util/external/yup/initialValues'
import { resetPasswordValidation } from '@/util/external/yup/yupValidations'
import { onAdminResetPassword } from '@/util/data/helper/logic'

function ResetPassword(): React.ReactElement {

    let [isLoading, setIsLoading] = useState<boolean>(false)
    let router = useRouter();
    let session = getSession()

    function successCB(): void {
        toast.success("Password has been updated")
        router.replace("/admin/auth/sign_in")
    }

    function errorCB(err: string): void {
        toast.error(err)
        setIsLoading(false)
    }


    let params = useParams();
    let token: string = Array.isArray(params.token) ? params.token[0] : params.token;

    return (
        <BlackedRouter session={session}>
            <div>
                <div>
                    <div className='h-screen'>
                        <AdminAuthBg />


                        <AdminAuthCard>
                            <LoadingComponent paddingNeed={false} isLoading={isLoading} closeOnClick={false}>

                                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            New password
                                        </h1>
                                        <Formik initialValues={adminResetPasswordInitialValues} onSubmit={(val: AdminResetPassword) => {
                                            val.token = token;
                                            setIsLoading(true)
                                            onAdminResetPassword(val, successCB, errorCB)
                                        }} validationSchema={resetPasswordValidation} className="space-y-4 md:space-y-6" action="#">
                                            <Form>
                                                <div>
                                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter new password</label>
                                                    <Field type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a password" required="" />
                                                    <ErrorMessage className='errorMessage' component={"div"} id='password' name='password'></ErrorMessage>
                                                </div>

                                                <div className='mb-5 mt-5'>
                                                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter confirm password</label>
                                                    <Field type="password" name="confirm_password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm password" required="" />
                                                    <ErrorMessage className='errorMessage' component={"div"} id='confirm_password' name='confirm_password'></ErrorMessage>
                                                </div>

                                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

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