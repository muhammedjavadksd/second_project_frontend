import React, { useState } from 'react'
import { loginStepDown, otpInitialValues, otpValidaor, onLoginOtpSubmit } from './Logic'
import LoadingComponent from '@/_component/Util/LoadingComponent';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';

function SignInOTP({ state }) {

  let [isLoading, setIsLoading] = useState(false);

  function onSuccess() {
    toast.success("OTP has been verified")
    setIsLoading(false)
  }

  function onError(msg) {
    toast.error(msg);
    setIsLoading(false)
  }




  return (
    <div>

      <div className="headingSection">
        <h1 class="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">Submit OTP <span class="text-blue-600 dark:text-blue-500"> Number</span></h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"></p>
      </div>


      <LoadingComponent isLoading={isLoading} closeOnClick={false}>
        <Formik initialValues={otpInitialValues} onSubmit={(val) => {
          setIsLoading(true)
          onLoginOtpSubmit(val, onSuccess, onError)
        }} validationSchema={otpValidaor}>
          <Form>
            <div class="mb-5">
              <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Number</label>
              <Field name="otp_number" id="otp_number" type="number" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter OTP Number" required />
              <ErrorMessage className='errorMessage' id='otp_number' name='otp_number'></ErrorMessage>
            </div>
            <div className='flex gap-3'>
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Submit OTP</button>
              <button type="button" class="text-black bg-white border-black border hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i class="fa-solid fa-left-long"></i> Edit Phone Number</button>
            </div>
          </Form>
        </Formik>
      </LoadingComponent>


    </div>
  )
}

export default SignInOTP