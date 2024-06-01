import React, { useState } from 'react'
import { signUpIndexDown, signUpIndexUp } from './Logic'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { signUpOtpInitialValues, signUpOtpHandler, otpValidator, resendOtpHandler } from './Logic'
import LoadingComponent from '@/_component/Util/LoadingComponent'
import { toast } from 'react-toastify'
import Timer from "@amplication/react-compound-timer";
import { OTP_TIME_SECONDS } from '@/app/_util/_const/const'
import { useRouter } from 'next/navigation'


function SignUpOTP({ state }) {

    let [isLoading, setIsLoading] = useState(false);
    let [isTimeEnd, setIsTimeEnd] = useState(false);
    let router = useRouter();
    function otpCompleted() {
        toast.success("OTP has been verified")
        setIsTimeEnd(false)
        setIsLoading(false)
        router.replace("/auth/sign_in")

        // signUpIndexDown(state)
    }

    function onResetOtp() {
        toast.success("OTP has been sented")
        setIsTimeEnd(false)
        setIsLoading(false)
    }




    function onError(msg) {
        toast.error(msg)
        setIsLoading(false)
    }



    return (
        <div>

            <div className="headingSection">
                <h1 class="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">Submit OTP <span class="text-blue-600 dark:text-blue-500"> Number</span></h1>
                <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"></p>
            </div>

            <LoadingComponent isLoading={isLoading} closeOnClick={false}>
                <Formik validationSchema={otpValidator} onSubmit={(val) => {
                    setIsLoading(true)
                    signUpOtpHandler(val, otpCompleted)
                }} initialValues={signUpOtpInitialValues}>
                    <Form>
                        <div class="mb-5">
                            <div className='flex items-center justify-between'>
                                <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Number</label>

                                <div>
                                    <Timer initialTime={OTP_TIME_SECONDS * 1000}
                                        direction="backward"
                                        timeToUpdate={10}
                                        checkpoints={[
                                            {
                                                time: 0,
                                                callback: () => setIsTimeEnd(true),
                                            },
                                        ]}>

                                        {({ start, resume, pause, stop, reset, timerState }) => (
                                            <p> {isTimeEnd ? <button className='mb-2' onClick={() => {
                                                setIsTimeEnd(false)
                                                resendOtpHandler(onResetOtp, onError)
                                                reset();
                                                start();
                                            }
                                            }>Resend OTP</button> : <><Timer.Seconds /> Seconds Left</>}</p>
                                        )}

                                    </Timer>
                                </div>
                            </div>
                            <Field type="number" id="otp_number" name="otp_number" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter OTP number" />
                            <ErrorMessage component={"div"} className='errorMessage' id='otp_number' name='otp_number' />
                        </div>
                        <Field type="hidden" id="email_id" name="email_id" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                        <ErrorMessage component={"div"} className='errorMessage' id='email_id' name='email_id' />

                        <div className='flex gap-3'>
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit OTP</button>
                            <button type="button" class="text-black bg-white border-black border hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => signUpIndexUp(state)}><i class="fa-solid fa-pencil"></i> Edit Phone Number</button>
                        </div>
                    </Form>
                </Formik>
            </LoadingComponent>
        </div>
    )
}

export default SignUpOTP