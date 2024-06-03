import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { phoneAndOTPSchema, phoneNumberSchema } from './Data';
import { onOTPValidate, onPhoneNumberUpdate, phoneNumberInitialValues, phoneNumberWithOTPInitialValues } from './Logic';
import { getUserDetails } from '@/app/_util/helper/authHelper';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function EditUserPhoneNumber() {

    let [editPhoneNumber, setEditPhoneNumber] = useState(false);
    let [isOtpSend, setOtpSend] = useState(false)
    let session = useSession();
    let [user, setUser] = useState({});
    let [phoneNumber, setPhoneNumber] = useState(null);
    let router = useRouter();

    useEffect(() => {
        let user = getUserDetails(session);
        setUser(user)
        console.log(user);
        setPhoneNumber(user.phone)
    }, [session])
    // let thisUser = getUserDetails(useSession())

    function onPhoneNumberSuccess() {
        toast.success("OTP has been sent to mail")
        setOtpSend(true)
    }

    function onOTPSucess() {
        toast.success("Phone number has been updated");
        setEditPhoneNumber(false);
        setOtpSend(false)
        signOut({ redirect: false }).then(() => {
            router.replace("/auth/sign_in")
        }).catch((err) => {
            console.log(err);
        })
    }

    function onError(err) {
        toast.error(err)
    }

    return (

        <div className='mt-2'>
            <div className='flex mb-3'>
                <h2 className='text-1xl'>Phone Number</h2>
                {!editPhoneNumber && <button onClick={() => setEditPhoneNumber(!editPhoneNumber)} type="button" class="ml-auto text-black flex gap-2 items-center bg-transparent font-medium rounded-lg text-sm   ">
                    <i class="fa-solid fa-pencil"></i>    Edit Details
                </button>}
            </div>
            <Formik enableReinitialize initialValues={isOtpSend ? phoneNumberWithOTPInitialValues(phoneNumber, null) : phoneNumberInitialValues(user.phone)} onSubmit={(val) => {

                isOtpSend ? onOTPValidate(val, onOTPSucess, onError) : (
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
                        editPhoneNumber && <button type="submit" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Phone Number</button>
                    }
                </Form>
            </Formik>

            {/* <form action="" method="post">
                {editPhoneNumber && <div className='mt-5'>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                    <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter OTP Number" required />
                </div>}
            </form> */}
        </div >

    )
}

export default EditUserPhoneNumber