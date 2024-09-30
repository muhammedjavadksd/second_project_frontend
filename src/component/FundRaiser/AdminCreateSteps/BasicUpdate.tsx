import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment, useState } from "react";
import FormInputWithBg from "../FormInputWithBg";
import { getMainCategory, getSubCategory } from "@/util/data/helper/utilHelper";
import const_data from "@/util/data/const";


export default function BasicDetails({ state }: { state: Function }): React.ReactNode {

    const [subCategory, setSubCategory] = useState([]);
    const [district, setDistrict] = useState([])



    return (
        <Fragment>
            <Formik
                onSubmit={(val, { resetForm }) => {

                }}
                // validationSchema={addFundRaiserValidation}
                initialValues={{}}
            >
                {({ errors, values, setFieldValue, setFieldTouched, handleSubmit }) => (
                    <Form>
                        <div className="grid  gap-x-10 gap-y-5 grid-cols-2 mb-1">

                            <div>
                                <label htmlFor="raiser_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Raiser Full Name</label>
                                <Field type="text" id="raiser_name" name="raiser_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter raiser full name" />
                                <ErrorMessage className='errorMessage' component={"div"} name='raiser_name'></ErrorMessage>
                            </div>

                            <div>
                                <label htmlFor="raiser_age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Raiser Age</label>
                                <Field type="number" id="raiser_age" name="raiser_age" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter raiser age" />
                                <ErrorMessage className='errorMessage' component={"div"} name='raiser_age'></ErrorMessage>
                            </div>

                            <div>
                                <label htmlFor="raiser_age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline of fund raise</label>
                                <Field type="date" id="deadline" name="deadline" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Select the deadline date" />
                                <ErrorMessage className='errorMessage' component={"div"} name='deadline'></ErrorMessage>
                            </div>

                            <div>
                                <label htmlFor="benificiary_relation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What is your relationship to the beneficiary :</label>
                                <Field as="select" id="benificiary_relation" name='benificiary_relation' className="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected value={""}>Choose a relation</option>
                                    {
                                        const_data.RELATIONSHIP.map((each) => {
                                            return (
                                                <option key={each} value={each}>{each}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage className='errorMessage' component={"div"} name='benificiary_relation'></ErrorMessage>
                            </div>



                            <div>
                                <label htmlFor="" className='text-sm  mb-2 block'>Enter amount</label>
                                <Field type="number" name="amount" id="amount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter amount for the fund raise" />
                                <ErrorMessage className='errorMessage' component={"div"} name='amount'></ErrorMessage>
                            </div>

                            <div>
                                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How much amount do you want to raise?</label>
                                <Field type="number" name="amount" id="amount" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the amount" />
                                <ErrorMessage component={"div"} className='errorMessage' name="amount"></ErrorMessage>
                            </div>

                            <div>
                                <label htmlFor="category" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">I am raising funds for :</label>
                                <Field onChange={(e) => {
                                    setFieldValue('category', e.target.value)
                                    setSubCategory(getSubCategory(e.target.value))
                                }} as="select" id="category" name="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                    <option value="">Select Category</option>
                                    {
                                        getMainCategory().map((item) => {
                                            return (
                                                <option key={item} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </Field>
                                <ErrorMessage component={"div"} className='errorMessage' name="category"></ErrorMessage>
                            </div>

                            <div>
                                <label htmlFor="sub_category" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">The raised fund will help :</label>
                                <Field as="select" id="sub_category" name="sub_category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                    <option value="">Select Sub Category</option>
                                    {
                                        subCategory.map((item) => {
                                            return (
                                                <option key={item} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </Field >
                                <ErrorMessage component={"div"} className='errorMessage' name="sub_category"></ErrorMessage>
                            </div >



                            <div>
                                <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Enter phone number</label >
                                <Field type="number" name="phone_number" id="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required placeholder="Enter phone number" />
                                <ErrorMessage component={"div"} className='errorMessage' name="phone_number"></ErrorMessage>
                            </div >

                            <div>
                                <label htmlFor="email_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" > Enter Email ID</label >
                                <Field type="email_id" name="email_id" id="email_id" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                <ErrorMessage component={"div"} className='errorMessage' name="email_id"></ErrorMessage>
                            </div >

                            <div>
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <Field
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Enter city"
                                />
                                <ErrorMessage name="city" component="div" className="errorMessage" />
                            </div>

                            <div>
                                <label htmlFor="pinCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pin code</label>
                                <Field
                                    type="text"
                                    id="pinCode"
                                    name="pinCode"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="Enter pin code"
                                />
                                <ErrorMessage name="pinCode" component="div" className="errorMessage" />
                            </div>

                            <div>
                                <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select state :</label>
                                <Field
                                    onChange={(e) => {
                                        const newValues = const_data.STATE_WITH_DISTRICT[e.target.value];
                                        setFieldValue("state", e.target.value)
                                        // console.log(newValues);
                                        if (newValues) {
                                            setDistrict(newValues)
                                        }
                                    }}
                                    as="select"
                                    id="state"
                                    name="state"
                                    className="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="" label="Choose a state" />
                                    {
                                        Object.keys(const_data.STATE_WITH_DISTRICT).map((item) => {
                                            return <option key={item} value={item}>{item}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="state" component="div" className="errorMessage" />
                            </div>

                            <div>
                                <label htmlFor="district" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select district :</label>
                                <Field
                                    as="select"
                                    id="district"
                                    name="district"
                                    className="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="" label="Choose a district" />
                                    {
                                        district.map((item) => {
                                            return <option key={item} value={item}>{item}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="district" component="div" className="errorMessage" />
                            </div>

                            <div>
                                <label htmlFor="fullAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter full address</label>
                                <Field
                                    as="textarea"
                                    id="fullAddress"
                                    name="fullAddress"
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your address here..."
                                />
                                <ErrorMessage name="fullAddress" component="div" className="errorMessage" />
                            </div>

                            <div>
                                <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Provide a detailed description of the cause you are fundraising for. </label>
                                <Field rows={4} as="textarea" name="description" id="description" className="mb-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <ErrorMessage className='errorMessage' component={"div"} name='description'></ErrorMessage>
                            </div>

                        </div>
                        <div className='mt-5 ml-auto flex gap-3 justify-end w-full overflow-hidden'>
                            <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next <i className="fa-solid fa-chevron-right"></i></button >
                        </div >
                    </Form>
                )}
            </Formik>
        </Fragment>
    )
}