
import React from 'react'
import { loginStepIndexUp } from './Logic'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { loginInitValues, loginValidation, onLoginSubmit } from './Data'

function SignInPhoneNumber({ state }) {



    return (
        <div>


            <div className="headingSection mb-10">
                <h1 class="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">Login into your <span class="text-blue-600 dark:text-blue-500"> Account</span></h1>
                <a href="/auth/sign_up" class="font-normal text-blue-600 dark:text-blue-500 hover:underline">Do not have an account? Create it!</a>
            </div>

            <Formik class="max-w-sm mt-10" initialValues={loginInitValues} onSubmit={onLoginSubmit} validationSchema={loginValidation}>

                <Form>
                    <div class="mb-5">
                        <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Phone Number</label>
                        <Field type="number" id="phone" name="phone" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter phone number"   />
                        <ErrorMessage name='phone'  component="div"  className='text-red-600 mt-2'></ErrorMessage>
                    </div>

                    {/* onClick={() => loginStepIndexUp(state)} */}

                    <button type="submit" class="mt-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Send OTP</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SignInPhoneNumber