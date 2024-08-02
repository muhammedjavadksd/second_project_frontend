import { updateBloodDonorPersonalDetailsValues } from '@/util/external/yup/initialValues'
import { updateDonorPersonDetailsValidation } from '@/util/external/yup/yupValidations'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { OnDonorPersonDataEditSubmit } from './Logic'
import { toast } from 'react-toastify'

function UpdatePersonalDetails({ profile, onComplete }): React.ReactElement {

    function successCB(msg: string) {
        toast.success(msg)
        onComplete()
    }
    function errorCb(err: string) {
        toast.error(err)
        onComplete()
    }

    return (
        <div className='bg-white  rounded-t p-5 rounded-b min-h-10 min-w-96 '>

            <Formik initialValues={updateBloodDonorPersonalDetailsValues(profile)} enableReinitialize validationSchema={updateDonorPersonDetailsValidation} onSubmit={(val) => { OnDonorPersonDataEditSubmit(val, successCB, errorCb) }}>
                <Form>

                    <div className='mb-5'>
                        <label htmlFor="" className='text-sm'>Enter full name</label>
                        <Field placeholder="Enter full name" name="full_name" id="full_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                        <ErrorMessage name='full_name' component={"div"} className='errorMessage'></ErrorMessage>
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="" className='text-sm'>Enter phone number</label>
                        <Field placeholder="Enter phone number" name="phone_number" id="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                        <ErrorMessage name='phone_number' component={"div"} className='errorMessage'></ErrorMessage>
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="" className='text-sm'>Enter email address</label>
                        <Field placeholder="Enter email address" name="email_address" id="email_address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                        <ErrorMessage name='email_address' component={"div"} className='errorMessage'></ErrorMessage>
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="" className='text-sm'>Select location</label>
                        <div onClick={() => { }} className='min-h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'><span>Select the location</span></div>
                        {/* <Field placeholder="Select the location" name="location" id="location" className="" />
                            <ErrorMessage name='location' component={"div"} className='errorMessage'></ErrorMessage> */}
                    </div>
                    <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save & Submit</button>

                </Form>

            </Formik>
        </div >
    )
}

export default UpdatePersonalDetails