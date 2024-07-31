import { updateBloodGroupInitialValues } from '@/util/external/yup/initialValues'
import { updateBloodGroupValidation } from '@/util/external/yup/yupValidations'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { onBloodDonationSubmit, OnBloodGroupUpdate } from './Logic'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'

function UpdateBloodGroup(): React.ReactElement {


    function successCB() {

    }

    function errorCb(msg: string) {

    }


    return (
        <div className='bg-white  rounded-t p-5 rounded-b min-h-10 min-w-96 '>

            <Formik initialValues={updateBloodGroupInitialValues} validationSchema={updateBloodGroupValidation} onSubmit={(val) => { OnBloodGroupUpdate(val, successCB, errorCb) }}>
                <Form>
                    <div className='mb-5'>
                        <label htmlFor="" className='text-sm'>Select Blood group</label>
                        <Field as="select" name="blood_group" id="blood_group" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                            <option>Select Blood Group</option>
                            {
                                Object.values(BloodGroup).map((each) => {
                                    return (
                                        <option value={each}>{each}</option>
                                    )
                                })
                            }
                        </Field>
                        <ErrorMessage name='blood_group' component={"div"} className='errorMessage'></ErrorMessage>

                    </div>
                    <div className='mb-5'>
                        <label htmlFor="" className='text-sm'>Select Blood Certificate</label>
                        <Field type="file" name="certificate" id="blood_certificate" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                        <ErrorMessage name='certificate' component={"div"} className='errorMessage'></ErrorMessage>
                    </div>


                    <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save & Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default UpdateBloodGroup