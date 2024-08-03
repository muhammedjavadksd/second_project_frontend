import CreateFormBackground from "@/component/FundRaiser/CreateFormBackground";
import LoadingComponent from "@/component/Util/LoadingComponent";
import { bloodRequestPersonalDetailsInitialValue } from "@/util/external/yup/initialValues";
import { bloodRequestPersonalDetailsValidation } from "@/util/external/yup/yupValidations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { onBloodRequestPersonalDetailSubmit } from "./Logic";
import { toast } from "react-toastify";
import const_data from "@/util/data/const";


function BloodPersonalDetails(): React.ReactElement {


    function successCallback() {

    }

    function errorCallback(err: string) {
        toast.error(err)
    }

    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false} >
                <CreateFormBackground>
                    <Formik onSubmit={(val) => onBloodRequestPersonalDetailSubmit(val, successCallback, errorCallback)} initialValues={bloodRequestPersonalDetailsInitialValue} validationSchema={bloodRequestPersonalDetailsValidation}>
                        <Form>
                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient name</label>
                                <Field type="text" id="patient_name" name="patient_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Patient name" />
                                <ErrorMessage name="patient_name" component="div" className="errorMessage" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Relationship</label>
                                <Field type="text" id="relationship" name="relation" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" as="select">
                                    <option value="">Select the relationship</option>
                                    {
                                        Object.values(const_data.RELATIONSHIP).map((relation) => {
                                            return <option value={relation}>{relation}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage name="relationship" component="div" className="errorMessage" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                <Field type="text" id="phone_number" name="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter phone number" />
                                <ErrorMessage name="phone_number" component="div" className="errorMessage" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <Field type="text" id="address" name="address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter full address" />
                                <ErrorMessage name="address" component="div" className="errorMessage" />
                            </div>
                            <button
                                type="submit"
                                className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Next <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </Form>
                    </Formik>
                </CreateFormBackground>
            </LoadingComponent>
        </>
    )
}

export default BloodPersonalDetails