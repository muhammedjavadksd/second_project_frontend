
import React, { useState } from 'react'
// import { loginStepIndexUp } from './Logic'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { loginInitValues, loginValidation } from './Data'
import { onLoginSubmit, loginStepIndexUp, loginStepDown } from './Logic'
import LoadingComponent from '@/component/Util/LoadingComponent';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SignInPhoneNumber({ state }) {

    const [isLoading, setIsLoading] = useState(false);
    const params = useSearchParams();
    const next = params.get("next")
    const step_index = params.get("step_index")

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
                <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">Login into your <span className="text-blue-600 dark:text-blue-500"> Account</span></h1>
                <span className="font-normal text-black">Do not have an account?  <Link href={`/auth/sign_up${next ? `?next=${next}` : ''}${step_index ? `&step_index=${step_index}` : ''}`} className='text-blue-600 hover:underline'>Create now!</Link> </span>

            </div>

            <LoadingComponent paddingNeed={true} closeOnClick={false} isLoading={isLoading}>
                <Formik className="max-w-sm mt-10" initialValues={loginInitValues} onSubmit={(val, { resetForm }) => { setIsLoading(true), onLoginSubmit(val, onComplete, (err) => { onError(err); resetForm() }) }} validationSchema={loginValidation}>

                    <Form>
                        <div className="mb-5">
                            <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email Address</label>
                            <Field type="email" id="email" name="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter email address" />
                            <ErrorMessage name='email' component="div" className='text-red-600 mt-2'></ErrorMessage>
                        </div>

                        <div className='flex gap-5'>
                            <button type="submit" className="mt-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Send OTP</button>
                        </div>
                    </Form>
                </Formik>
            </LoadingComponent>
        </div>
    )
}

export default SignInPhoneNumber