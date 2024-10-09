"use client"
import AdminAuthBg from '@/component/Auth/Common/AdminAuthBg'
import AdminAuthCard from '@/component/Auth/Common/AdminAuthCard'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { ReactElement, useState } from 'react'
import { onAdminSignInHandler } from './Logic'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BlackedRouter from '@/component/LoginComponent/BlackedRouter'
import { getSession, useSession } from 'next-auth/react'
import { Session } from 'inspector'
import LoadingComponent from '@/component/Util/LoadingComponent'
import { adminSignInValidation } from '@/util/external/yup/yupValidations'
import { adminSignInInitialValues } from '@/util/external/yup/initialValues'

function AdminSignIN(): ReactElement {

    let router = useRouter()
    const session = getSession();
    const [isLoading, setLoading] = useState<boolean>(false)

    function successCB(): void {
        setLoading(false)
        toast.success("Loggin success")
        router.replace("/admin")
    }

    function onError(err: string): void {
        setLoading(false)
        toast.error(err)
    }

    return (
        <BlackedRouter session={session}>
            <div className='h-screen'>
                <AdminAuthBg />


                <AdminAuthCard>
                    <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false}>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <Formik validationSchema={adminSignInValidation} initialValues={adminSignInInitialValues} onSubmit={(val) => { setLoading(true), onAdminSignInHandler(val, successCB, onError) }}>
                                    <Form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                            <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a email address" required="" />
                                            <ErrorMessage component={"div"} className='errorMessage' id='email' name='email'></ErrorMessage>
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <Field type="password" name="password" id="password" placeholder="Enter password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                            <ErrorMessage component={"div"} className='errorMessage' id='password' name='password'></ErrorMessage>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Link href="/admin/auth/forget_password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                                        </div>
                                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </LoadingComponent>
                </AdminAuthCard>
            </div>
        </BlackedRouter >
    )
}

export default AdminSignIN