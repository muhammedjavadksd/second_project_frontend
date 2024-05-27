"use client"
import React, { useEffect, useState } from 'react'
import { loginStepDown } from './SignUpStart'
import { signUpIndexUp, onSignUpHandler, signUpInitialValues, signUpValidator, clickMe } from './Logic'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { blood_groups } from '@/app/const/const'
import LoadingComponent from '@/_component/Util/LoadingComponent'
import { toast } from 'react-toastify'

function SignUpStart({ state }) {

    let [isLoading, setIsLoading] = useState(false);

    function onSignUpFormSubmit() {
        state((prev) => prev + 1)
        setIsLoading(false)
    }

    function onSignUpError(error) {
        console.log("Error is", error);
        setIsLoading(false)
        toast.error(error)
    }





    return (
        <div>

            <div className="headingSection mb-5">
                <h1 class="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">Create your <span class="text-blue-600 dark:text-blue-500"> Account</span></h1>
                <a href="/auth/sign_in" class="font-normal text-blue-600 dark:text-blue-500 hover:underline">Already have an account? Login here!</a>
            </div>


            <LoadingComponent isLoading={isLoading} closeOnClick={false} >
                <Formik onSubmit={(val) => {
                    setIsLoading(true)
                    onSignUpHandler(val, onSignUpFormSubmit, onSignUpError)
                }} initialValues={signUpInitialValues} validationSchema={signUpValidator} class="max-w-sm mt-10" >
                    <Form>
                        <div className="grid gap-5 grid-cols-2">
                            <div class="mb-5">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter first name</label>
                                <Field name="first_name" id="first_name" type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter first name" required />
                                <ErrorMessage className="text-red-700" component="div" name='first_name' id='first_name'></ErrorMessage>
                            </div>
                            <div class="mb-5">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter last name</label>
                                <Field name="last_name" id="last_name" type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter last name" required />
                                <ErrorMessage className="text-red-700" component="div" name='last_name' id='last_name' ></ErrorMessage>
                            </div>
                        </div>
                        <div className="grid gap-5 grid-cols-2">

                            <div class="mb-5">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter email address</label>
                                <Field id="email_address" name="email_address" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter email address" required />
                                <ErrorMessage className="text-red-700" component="div" id='email_address' name='email_address'></ErrorMessage>
                            </div>
                            <div class="mb-5">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Phone Number</label>
                                <Field id="phone_number" name="phone_number" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter phone number" required />
                                <ErrorMessage className="text-red-700" component="div" id='phone_number' name='phone_number'></ErrorMessage>
                            </div>
                        </div>
                        <div class="mb-5">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter blood group</label>
                            <Field as="select" name="bloodGroup" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                <option value="" label="Select blood group" />
                                {
                                    blood_groups.map((bg) => {
                                        return (
                                            <option value={bg} label={bg} />
                                        )
                                    })
                                }
                            </Field>
                            <ErrorMessage className="text-red-700" component="div" name="bloodGroup" style={{ color: 'red' }} />
                        </div>


                        <div className='flex gap-3'>
                            {/* <button type="submit" class="text-black bg-white border-black border hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => loginStepDown(state)}><i class="fa-solid fa-left-long"></i> Edit Phone Number</button> */}
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Send OTP</button>
                        </div>
                    </Form>
                </Formik>
            </LoadingComponent>
        </div>
    )
}

export default SignUpStart