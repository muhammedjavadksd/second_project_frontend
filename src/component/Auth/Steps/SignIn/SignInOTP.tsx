import React, { useContext, useState } from 'react'
import { loginStepDown, otpInitialValues, otpValidaor, onLoginOtpSubmit, onResetOtp } from './Logic'
import LoadingComponent from '@/component/Util/LoadingComponent';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import Timer from "@amplication/react-compound-timer";
import { useRouter, useSearchParams } from 'next/navigation'
import { BloodDonorFormContext } from '@/util/context/Context';
import { IBloodDonorForm } from '@/util/types/InterFace/UtilInterface';
import const_data from '@/util/data/const';
// import { useRouter } from 'next/nav';

function SignInOTP({ state }) {

  const [isLoading, setIsLoading] = useState(false);
  const [isTimeEnd, setIsTimeEnd] = useState(false)
  const navigate = useRouter()
  const params = useSearchParams();
  const next = params.get("next")
  const stepIndex = params.get("step_index") ?? 1
  // const bloodDonor = useContext(BloodDonorFormContext);


  function onSuccess() {
    toast.success("OTP has been verified")
    if (next) {
      // alert(next)
      navigate.replace(`/${next}?step_index=${stepIndex}`)
    } else {
      navigate.replace("/")
    }
    setIsLoading(false)
  }

  function onResendSuccess() {
    toast.success("OTP has been sented")
  }

  function onError(msg) {
    toast.error(msg);
    setIsLoading(false)
  }




  return (
    <div>

      <div className="headingSection">
        <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">Submit OTP <span className="text-blue-600 dark:text-blue-500"> Number</span></h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"></p>
      </div>


      <LoadingComponent paddingNeed={true} isLoading={isLoading} closeOnClick={false}>
        <Formik initialValues={otpInitialValues} onSubmit={(val) => {
          setIsLoading(true)
          onLoginOtpSubmit(val, onSuccess, onError)
        }} validationSchema={otpValidaor}>
          <Form>
            <div className="mb-5">
              <div className="flex justify-between">
                <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Number</label>
                <div>
                  <Timer initialTime={60 * 1000}
                    direction="backward"
                    timeToUpdate={60}
                    checkpoints={[
                      {
                        time: 0,
                        callback: () => setIsTimeEnd(true),
                      },
                    ]}>

                    {/* @ts-ignore */}
                    {({ start, resume, pause, stop, reset, timerState }) => (
                      <p> {isTimeEnd ? <button className='mb-2' onClick={() => {
                        setIsTimeEnd(false)
                        onResetOtp(onResendSuccess, onError)
                        reset();
                        start();
                      }
                      }>Resend OTP</button> : <><Timer.Seconds /> Seconds Left</>}</p>
                    )}

                  </Timer>
                </div>
              </div>
              <Field name="otp_number" id="otp_number" type="number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter OTP Number" required />
              <ErrorMessage component={"div"} className='errorMessage' id='otp_number' name='otp_number'></ErrorMessage>
            </div>
            <div className='flex gap-3'>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Submit OTP</button>
              <button type="button" onClick={() => loginStepDown(state)} className="text-black bg-white border-black border hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa-solid fa-left-long"></i> Edit Email Address</button>
            </div>
          </Form>
        </Formik>
      </LoadingComponent>


    </div>
  )
}

export default SignInOTP