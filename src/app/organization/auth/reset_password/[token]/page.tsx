"use client"
import AdminAuthBg from '@/_component/Auth/Common/AdminAuthBg'
import AdminAuthCard from '@/_component/Auth/Common/AdminAuthCard'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { OrganizationResetPasswordInitialValues, OrganizationResetPasswordValidation } from './data'
import { onOrganizationResetPassword } from './logic'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'

function ResetPassword(): React.ReactElement {

    const router = useRouter();
    const { token }: { token: string } = useParams();
    function successCB(): void {
        toast.success("Password has been reset");
        router.replace("/organization/auth/sign_in")
    }

    function errorCB(err: string) {
        toast.error(err)
    }
    return (
        <div>
            <div>
                <div className='h-screen'>
                    <AdminAuthBg />


                    <AdminAuthCard>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    New password
                                </h1>
                                <Formik initialValues={OrganizationResetPasswordInitialValues} onSubmit={(val, { resetForm }) => {
                                    val.token = token
                                    onOrganizationResetPassword(val, successCB, (err) => { errorCB(err), resetForm() })
                                }} validationSchema={OrganizationResetPasswordValidation}>
                                    <Form>
                                        <div className='mb-5'>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter new password</label>
                                            {/* <input type="email" name="email" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required /> */}
                                            <Field type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password"></Field>
                                            <ErrorMessage className='text-red-600' component={"div"} name='password'></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter confirm password</label>
                                            <Field type="password" name="confirm_password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter confirm password"></Field>
                                            <ErrorMessage className='text-red-600' component={"div"} name='confirm_password'></ErrorMessage>
                                        </div>


                                        <button type="submit" className="w-full mt-5 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </AdminAuthCard>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword