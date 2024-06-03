import { getUserDetails } from '@/app/_util/helper/authHelper';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { editEmailAddressInitialValues, editEmailAddressValidation, editEmailAddressValidationWithOTP } from './Data';
import { emailAddressEditInitialValues, onEmailUpdate, onOTPValidate } from './Logic';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function EditUserEmailAddress() {

    let [editEmailAddress, setEmailAddress] = useState(false);
    let [emailAddress, setUserEmailAddress] = useState(null);
    let [user, setUser] = useState({});
    let [isOtpSend, setOtpSend] = useState(false)
    let session = useSession()
    let router = useRouter();

    function onEmailUpdateSuccess() {
        toast.success("OTP has been sent to new email id")
        setOtpSend(true)

    }

    function onOtpValidateSuccess() {
        toast.success("Email address has been upated success");
        setOtpSend(false);
        editEmailAddress(false);
        signOut({ redirect: false }).then(() => {
            router.replace("/auth/sign_in")
        }).catch((err) => {
            console.log("Error");
        })
    }

    function onError(err) {
        toast.error(err)
    }


    useEffect(() => {
        let user = getUserDetails(session);
        if (user) {
            setUserEmailAddress(user.email);
            setUser(user)
        }
    }, [session])


    return (
        <div className='mt-2 h-fit'>
            <div className='flex mb-3'>
                <h2 className='text-1xl'> Email Address</h2>
                {!editEmailAddress && <button onClick={() => setEmailAddress(!editEmailAddress)} type="button" class="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                    <i class="fa-solid fa-pencil"></i>    Edit Details
                </button>}
            </div>


            <Formik enableReinitialize initialValues={emailAddressEditInitialValues(emailAddress, null)} onSubmit={(val) => {
                !isOtpSend ? (
                    setEmailAddress(val.email),
                    onEmailUpdate(val, onEmailUpdateSuccess, onError)
                ) : onOTPValidate(val, onOtpValidateSuccess, onError)
            }}
                validationSchema={!isOtpSend ? editEmailAddressValidation : editEmailAddressValidationWithOTP}
            >
                <Form>
                    <div>
                        <Field type="email" disabled={!editEmailAddress || isOtpSend} name="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                        <ErrorMessage name='email' component={"div"} className='errorMessage'></ErrorMessage>
                    </div>
                    {
                        isOtpSend && <div className='mt-5'>
                            <Field name='otp' type="text" id="otp" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter OTP Number" required />
                            <ErrorMessage name='otp' component={"div"} className='errorMessage'></ErrorMessage>
                        </div>
                    }
                    {editEmailAddress && <button type="submit" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update Email Address</button>}
                </Form>
            </Formik>

        </div>
    )
}

export default EditUserEmailAddress