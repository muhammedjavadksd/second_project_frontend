import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { phoneAndOTPSchema, phoneNumberSchema } from './Data';
import { onOTPValidate, onPhoneNumberUpdate, phoneNumberInitialValues, phoneNumberWithOTPInitialValues } from './Logic';
import { userDetailsFromUseSession } from '@/app/_util/helper/authHelper';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function EditUserPhoneNumber(): React.ReactElement {

    const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
    const [isOtpSend, setOtpSend] = useState<boolean>(false)
    const session = useSession();
    const [phoneNumber, setPhoneNumber] = useState<number>(null);
    const router = useRouter();

    useEffect(() => {
        const user = userDetailsFromUseSession(session);
        setPhoneNumber(user.phone)
    }, [session])

    function onPhoneNumberSuccess(): void {
        toast.success("OTP has been sent to mail")
        setOtpSend(true)
    }

    function onOTPSucess(): void {
        toast.success("Phone number has been updated");
        setEditPhoneNumber(false);
        setOtpSend(false)
        signOut({ redirect: false }).then(() => {
            router.replace("/auth/sign_in")
        }).catch((err) => {
            console.log(err);
        })
    }

    function onError(err: string) {
        toast.error(err)
    }

    return (

        <div className='mt-2'>
            <div className='flex mb-3'>
                <h2 className='text-1xl'>Phone Number</h2>
                {!editPhoneNumber && <button onClick={() => setEditPhoneNumber(!editPhoneNumber)} type="button" className="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                    <i className="fa-solid fa-pencil"></i>    Edit Details
                </button>}
            </div>
            <Formik enableReinitialize initialValues={(isOtpSend ? phoneNumberWithOTPInitialValues(phoneNumber, null) : phoneNumberInitialValues(phoneNumber))} onSubmit={(val) => {

                isOtpSend ? onOTPValidate(val.otp, onOTPSucess, onError) : (
                    setPhoneNumber(val.phone_number),
                    onPhoneNumberUpdate(val, onPhoneNumberSuccess, onError)
                )

            }
            } validationSchema={isOtpSend ? phoneAndOTPSchema : phoneNumberSchema}>
                <Form>
                    <div>
                        <Field disabled={!editPhoneNumber || isOtpSend} type="number" id="phone_number" name="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" ></Field>
                        <ErrorMessage name='phone_number' className='errorMessage' component={"div"} ></ErrorMessage>
                    </div>
                    {isOtpSend && <div className='mt-5'>
                        <Field type="number" id="otp" placeHolder="Enter OTP Number" name="otp" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" ></Field>
                        <ErrorMessage name='otp' className='errorMessage' component={"div"} ></ErrorMessage>
                    </div>}
                    {
                        editPhoneNumber && <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Phone Number</button>
                    }
                </Form>
            </Formik>

        </div >

    )
}

export default EditUserPhoneNumber