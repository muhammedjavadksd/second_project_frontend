"use client"
import AdminAuthBg from '@/_component/Auth/Common/AdminAuthBg'
import AdminAuthCard from '@/_component/Auth/Common/AdminAuthCard'
import OrganizationBlackRouter from '@/_component/LoginComponent/OrganizationBlackRouter'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { organizationForgetPasswordInitialValues, organizationForgetPasswordValidation } from './Data'
import onOrganizationForgetPassword from './logic'
import { toast } from 'react-toastify'

function OrganizationForgetPassword(): React.ReactElement {

    function successCB(): void {
        toast.success("Password reset email has been sent")
    }
    function errorCB(err: string): void {
        toast.error(err)
    }

    return (
        <OrganizationBlackRouter>
            <div className='h-screen'>
                <AdminAuthBg />


                <AdminAuthCard>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset password
                            </h1>
                            <Formik validationSchema={organizationForgetPasswordValidation} initialValues={organizationForgetPasswordInitialValues} onSubmit={(values, { resetForm }) => onOrganizationForgetPassword(values, () => { successCB(), resetForm() }, (msg: string): void => { errorCB(msg), resetForm() })}>
                                <Form>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter email address</label>
                                        <Field type="email" name="email_address" id="email_address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="organization@gmail.com" ></Field>
                                        <ErrorMessage component={"div"} className='text-red-600' name='email_address'></ErrorMessage>
                                    </div>


                                    <button type="submit" className="w-full mt-5 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                                </Form>
                            </Formik>
                        </div>
                    </div>
                </AdminAuthCard>
            </div>
        </OrganizationBlackRouter>
    )
}

export default OrganizationForgetPassword