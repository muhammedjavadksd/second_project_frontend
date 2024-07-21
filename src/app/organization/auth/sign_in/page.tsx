"use client"
import AdminAuthBg from '@/component/Auth/Common/AdminAuthBg'
import AdminAuthCard from '@/component/Auth/Common/AdminAuthCard'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { organizationLoginInitialValues, organizationLoginValidation } from './data'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { onOrganizationSignIn } from './logic'
import OrganizationBlackRouter from '@/component/LoginComponent/OrganizationBlackRouter'
import Link from 'next/link'

function AdminSignIN(): React.ReactElement {

    let router = useRouter();

    let successCB = (): void => {
        router.replace("/organization")
    }

    let errorCb = (err: string) => {
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
                                Sign in to your account
                            </h1>
                            <Formik initialValues={organizationLoginInitialValues} validationSchema={organizationLoginValidation} onSubmit={(val, { resetForm }) => { onOrganizationSignIn(val, successCB, (err) => { errorCb(err); resetForm() }) }}>
                                <Form>
                                    <div className='mb-3'>
                                        <label htmlFor="email_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <Field type="email_address" name="email_address" id="email_address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email address" required="" />
                                        <ErrorMessage component={"div"} className='text-red-600 text-sm' name='email_address'></ErrorMessage>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <Field type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password" required="" />
                                        <ErrorMessage component={"div"} className='text-red-600 text-sm' name='password'></ErrorMessage>
                                    </div>
                                    <div className="flex items-center justify-between mb-5">
                                        <Link href={"/organization/auth/forget_password"} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                                </Form>
                            </Formik>

                        </div>
                    </div>
                </AdminAuthCard>
            </div>
        </OrganizationBlackRouter>
    )
}

export default AdminSignIN