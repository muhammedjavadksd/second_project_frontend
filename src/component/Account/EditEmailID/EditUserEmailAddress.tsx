import { ErrorMessage, Field, Form, Formik } from 'formik';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { IUserSessionData } from '@/util/types/InterFace/UtilInterface';
import { userDetailsFromUseSession } from '@/util/data/helper/authHelper';
import { emailAddressEditInitialValues } from '@/util/external/yup/initialValues';
import { onEmailUpdate, onOTPValidate } from '@/util/data/helper/logic';
import { editEmailAddressValidation, editEmailAddressValidationWithOTP } from '@/util/external/yup/yupValidations';

function EditUserEmailAddress(): React.ReactElement {

    const [editEmailAddress, setEmailAddress] = useState<boolean>(false);
    const [emailAddress, setUserEmailAddress] = useState<string>(null);
    const [isOtpSend, setOtpSend] = useState<boolean>(false)
    const session: IUserSessionData | object = useSession()
    const router = useRouter();

    function onEmailUpdateSuccess(): void {
        toast.success("OTP has been sent to new email id")
        setOtpSend(true)
    }

    function onOtpValidateSuccess(): void {
        toast.success("Email address has been upated success");
        setOtpSend(false);
        setEmailAddress(false);
        signOut({ redirect: false }).then(() => {
            router.replace("/auth/sign_in")
        }).catch((err) => {
            console.log("Error");
        })
    }

    function onError(err: string): void {
        toast.error(err)
    }


    useEffect(() => {
        const user = userDetailsFromUseSession(session, "user");
        if (user) {
            setUserEmailAddress(user.email);
        }
    }, [session])


    return (
        <div className='mt-2 h-fit'>
            <div className='flex mb-3'>
                <h2 className='text-1xl'> Email Address</h2>
                {!editEmailAddress && <button onClick={() => setEmailAddress(!editEmailAddress)} type="button" className="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                    <i className="fa-solid fa-pencil"></i>    Edit Details
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
                        <Field type="email" disabled={!editEmailAddress || isOtpSend} name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email address" required />
                        <ErrorMessage name='email' component={"div"} className='errorMessage'></ErrorMessage>
                    </div>
                    {
                        isOtpSend && <div className='mt-5'>
                            <Field name='otp' type="text" id="otp" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter OTP Number" required />
                            <ErrorMessage name='otp' component={"div"} className='errorMessage'></ErrorMessage>
                        </div>
                    }
                    {editEmailAddress && <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update Email Address</button>}
                </Form>
            </Formik>

        </div>
    )
}

export default EditUserEmailAddress