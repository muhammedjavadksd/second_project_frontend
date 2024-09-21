import LoadingComponent from '@/component/Util/LoadingComponent'
import React, { useState } from 'react'
import { changeEmailIDInitialValues, changeEmailIDHandler, signUpIndexDown, addPhoneNumberValidation, addPhoneNumberInitialValues } from './Logic'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { signIn } from 'next-auth/react';
import { accountComplete } from '@/util/data/helper/APIHelper';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function AddPhoneNumber() {

    const [isLoading, setIsLoading] = useState(false);
    const { token } = useParams();
    const router = useRouter();

    async function onAccountComplete(phoneNumber) {
        setIsLoading(true)
        try {
            const complete = await accountComplete(token.toString(), phoneNumber)
            if (complete) {
                toast.success("Verification success")
                router.replace("/auth/sign_in")
            } else {
                toast.error("Something went wrong")
                router.replace("/auth/sign_in")
            }
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong")
            router.replace("/auth/sign_in")
        }
        setIsLoading(false)
    }


    return (
        <div>

            <div className="headingSection">
                <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">Complete account<span className="text-blue-600 dark:text-blue-500"> setup</span></h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"></p>
            </div>

            <LoadingComponent paddingNeed={true} isLoading={isLoading} closeOnClick={false}>
                <Formik validationSchema={addPhoneNumberValidation} onSubmit={(val) => {
                    onAccountComplete(val.phone_number)
                }} initialValues={addPhoneNumberInitialValues}>
                    <Form>
                        <div className="mb-5">
                            <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter phone number</label>
                            <Field type="number" id="phone_number" name="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter phone number" />
                            <ErrorMessage component={"div"} className='errorMessage' name='phone_number' />
                        </div>

                        <div className='flex gap-3'>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            {/* <button type="button" className="text-black bg-white border-black border hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => signUpIndexDown(state)}> Continue with same number</button> */}
                        </div>
                    </Form>
                </Formik>
            </LoadingComponent>
        </div>
    )
}

export default AddPhoneNumber