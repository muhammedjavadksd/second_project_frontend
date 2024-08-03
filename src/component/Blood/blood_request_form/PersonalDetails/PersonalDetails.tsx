import CreateFormBackground from "@/component/FundRaiser/CreateFormBackground";
import LoadingComponent from "@/component/Util/LoadingComponent";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";


function BloodPersonalDetails() {


    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <LoadingComponent closeOnClick={false} isLoading={isLoading} paddingNeed={false} >
                <CreateFormBackground>
                    <Formik>
                        <Form>
                            <div className="mb-5">
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
                        </Form>
                    </Formik>
                </CreateFormBackground>
            </LoadingComponent>
        </>
    )
}