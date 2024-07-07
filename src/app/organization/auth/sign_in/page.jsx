"use client"
import AdminAuthBg from '@/_component/Auth/Common/AdminAuthBg'
import AdminAuthCard from '@/_component/Auth/Common/AdminAuthCard'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { organizationLoginInitialValues, organizationLoginValidation } from './data'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { onOrganizationSignIn } from './logic'

function AdminSignIN() {

    let router = useRouter();

    let successCB = () => {
        router.replace("/organization")
    }

    let errorCb = (err) => {
        toast.error(err)
    }

    return (
        <div className='h-screen'>
            <AdminAuthBg />


            <AdminAuthCard>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <Formik initialValues={organizationLoginInitialValues} validationSchema={organizationLoginValidation} onSubmit={(val) => { onOrganizationSignIn(val, successCB, errorCb) }}>
                            <Form>
                                <div className='mb-3'>
                                    <label for="email_address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <Field type="email_address" name="email_address" id="email_address" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter email address" required="" />
                                    <ErrorMessage component={"div"} className='text-red-600 text-sm' name='email_address'></ErrorMessage>
                                </div>
                                <div className='mb-3'>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <Field type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password" required="" />
                                    <ErrorMessage component={"div"} className='text-red-600 text-sm' name='password'></ErrorMessage>
                                </div>
                                <div class="flex items-center justify-between mb-5">
                                    <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                            </Form>
                        </Formik>

                    </div>
                </div>
            </AdminAuthCard>
        </div>
    )
}

export default AdminSignIN