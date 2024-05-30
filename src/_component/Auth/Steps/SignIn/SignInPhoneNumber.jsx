
import React, { useState } from 'react'
// import { loginStepIndexUp } from './Logic'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { loginInitValues, loginValidation } from './Data'
import { onLoginSubmit, loginStepIndexUp, loginStepDown } from './Logic'
import LoadingComponent from '@/_component/Util/LoadingComponent';
import { toast } from 'react-toastify';
import Link from 'next/link';

function SignInPhoneNumber({ state }) {

    let [isLoading, setIsLoading] = useState(false);

    function onComplete() {
        setIsLoading(false)
        toast.success("OTP has been sented")
        loginStepIndexUp(state)
    }

    function onError(msg) {
        setIsLoading(false);
        toast.error(msg)
    }



    return (
        <div>


            <div className="headingSection mb-10">
                <h1 class="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">Login into your <span class="text-blue-600 dark:text-blue-500"> Account</span></h1>
                <span class="font-normal text-black">Do not have an account?  <Link href="/auth/sign_up" className='text-blue-600 hover:underline'>Create now!</Link> </span>

            </div>

            <LoadingComponent closeOnClick={false} isLoading={isLoading}>
                <Formik class="max-w-sm mt-10" initialValues={loginInitValues} onSubmit={(val) => { setIsLoading(true), onLoginSubmit(val, onComplete, onError) }} validationSchema={loginValidation}>

                    <Form>
                        <div class="mb-5">
                            <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email Address</label>
                            <Field type="email" id="email" name="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter email address" />
                            <ErrorMessage name='email' component="div" className='text-red-600 mt-2'></ErrorMessage>
                        </div>

                        {/* onClick={() => loginStepIndexUp(state)} */}

                        <div className='flex gap-5'>
                            <button type="submit" class="mt-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Send OTP</button>
                        </div>
                    </Form>
                </Formik>
            </LoadingComponent>
        </div>
    )
}

export default SignInPhoneNumber