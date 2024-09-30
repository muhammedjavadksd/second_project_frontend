import SectionTitle from '@/component/Util/SectionTitle'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Fragment } from 'react'
import FormInputWithBg from '../FormInputWithBg'

function BasicFundRaiseEdit(): React.ReactNode {
    return (
        <div>
            <div className="mb-4 bg-white shadow-inner border  p-3 flex justify-between items-center">
                <div>
                    <h4 className="text-2xl font-bold">Edit basic fund raising details</h4>
                    <p>Correct you basic's of profile</p>
                </div>
            </div >
            <div className='bg-gray-100 p-3'>
                <Formik enableReinitialize onSubmit={(val) => { }} initialValues={{}}>
                    <Form>
                        <div className="mb-5">
                            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How much amount do you want to raise?</label>
                            <Field type="number" name="amount" id="amount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the amount" />
                            <ErrorMessage component={"div"} className='errorMessage' name="amount"></ErrorMessage>
                        </div>
                        <div className="grid grid-cols-2 gap-3">

                            <FormInputWithBg>
                                <label htmlFor="category" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">I am raising funds for :</label>
                                <Field as="select" id="category" name="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                    <option value="">Select Category</option>
                                </Field>
                                <ErrorMessage component={"div"} className='errorMessage' name="category"></ErrorMessage>
                            </FormInputWithBg>
                            <FormInputWithBg>
                                <label htmlFor="sub_category" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">The raised fund will help :</label>
                                <Field as="select" id="sub_category" name="sub_category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                    <option value="">Select Sub Category</option>
                                </Field >
                                <ErrorMessage component={"div"} className='errorMessage' name="sub_category"></ErrorMessage>
                            </FormInputWithBg >
                        </div>

                        <div className="mb-5" >
                            <label htmlFor="email_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Enter Email ID</label >
                            <Field type="email_id" name="email_id" id="email_id" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                            <ErrorMessage component={"div"} className='errorMessage' name="email_id"></ErrorMessage>
                        </div >

                        <div className='ml-auto flex gap-3 justify-end w-full overflow-hidden'>
                            <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next <i className="fa-solid fa-chevron-right"></i></button >
                        </div >
                    </Form >
                </Formik >
            </div>
        </div>
    )
}

export default BasicFundRaiseEdit