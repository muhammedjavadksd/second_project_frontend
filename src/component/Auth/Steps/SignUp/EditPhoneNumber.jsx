import LoadingComponent from '@/_component/Util/LoadingComponent'
import React, { useState } from 'react'
import { schangemailIDValidation, changeEmailIDInitialValues, changeEmailIDHandler, signUpIndexDown } from './Logic'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';

function EditPhoneNumber({ state }) {

    const [isLoading, setIsLoading] = useState(false);


    function onError(err) {
        toast.error(err)
        setIsLoading(false)
    }


    function onChangedNumber() {
        state((prev) => prev - 1)
        toast.success("Email id has been updated")
    }

    return (
        <div>

            <div className="headingSection">
                <h1 class="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900   dark:text-white">Edit new Email <span class="text-blue-600 dark:text-blue-500"> ID</span></h1>
                <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"></p>
            </div>

            <LoadingComponent paddingNeed={true} isLoading={isLoading} closeOnClick={false}>
                <Formik validationSchema={schangemailIDValidation} onSubmit={(val) => {
                    setIsLoading(true)
                    changeEmailIDHandler(val, onChangedNumber, onError)
                }} initialValues={changeEmailIDInitialValues}>
                    <Form>
                        <div class="mb-5">
                            <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter New Email ID</label>
                            <Field type="email" id="email_id" name="email_id" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter new email ID" />
                            <ErrorMessage component={"div"} className='errorMessage' id='email_id' name='email_id' />
                        </div>

                        <div className='flex gap-3'>
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit OTP</button>
                            <button type="button" class="text-black bg-white border-black border hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => signUpIndexDown(state)}> Continue with same number</button>
                        </div>
                    </Form>
                </Formik>
            </LoadingComponent>
        </div>
    )
}

export default EditPhoneNumber