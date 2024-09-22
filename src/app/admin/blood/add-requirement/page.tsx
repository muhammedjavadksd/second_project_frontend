"use client"
import AdminLayout from "@/component/Admin/AdminLayout";
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter";
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment } from "react";


function AddBloodRequirement() {

    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <AdminBreadCrumb title={"Add Blood requirement"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Add blood requirement", href: "/blood/blood-reuirement" }]} />

                    <Formik

                        initialValues={{}}
                        onSubmit={() => { }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="grid mt-5 gap-5 grid-cols-2">


                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email_id">Email</label>
                                        <Field
                                            type="email"
                                            name="email_id"
                                            placeholder="Enter Email"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage name="email_id" component="div" />
                                    </div>

                                    {/* Patient Name */}
                                    <div>
                                        <label htmlFor="patientName">Patient Name</label>
                                        <Field
                                            type="text"
                                            name="patientName"
                                            placeholder="Enter Patient Name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage name="patientName" component="div" />
                                    </div>

                                    {/* Unit */}
                                    <div>
                                        <label htmlFor="unit">Unit</label>
                                        <Field
                                            type="number"
                                            name="unit"
                                            placeholder="Enter Blood Unit"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage name="unit" component="div" />
                                    </div>

                                    {/* Needed At */}
                                    <div>
                                        <label htmlFor="neededAt">Needed At</label>
                                        <Field
                                            type="date"
                                            name="neededAt"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage name="neededAt" component="div" />
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label htmlFor="status">Status</label>
                                        <Field
                                            type="text"
                                            name="status"
                                            placeholder="Enter Status"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage name="status" component="div" />
                                    </div>



                                    {/* Blood Group */}
                                    <div>
                                        <label htmlFor="blood_group">Blood Group</label>
                                        <Field
                                            type="text"
                                            name="blood_group"
                                            placeholder="Enter Blood Group"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage name="blood_group" component="div" />
                                    </div>

                                    {/* Relationship */}
                                    <div>
                                        <label htmlFor="relationship">Relationship</label>
                                        <Field
                                            type="text"
                                            name="relationship"
                                            placeholder="Enter Relationship"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage name="relationship" component="div" />
                                    </div>

                                    {/* Hospital Name */}
                                    <div>
                                        <label htmlFor="hospital_name">Hospital Name</label>
                                        <Field
                                            type="text"
                                            name="hospital_name"
                                            placeholder="Enter Hospital Name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage name="hospital_name" component="div" />
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <Field
                                            type="text"
                                            name="address"
                                            placeholder="Enter Address"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage name="address" component="div" />
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <Field
                                            type="number"
                                            name="phoneNumber"
                                            placeholder="Enter Phone Number"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage name="phoneNumber" component="div" />
                                    </div>

                                </div>
                                <div className='w-100 mt-3 w-full flex justify-end'>
                                    <button type='submit' className='bg-blue-600 text-white py-3 rounded-lg px-8'>Save</button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )
}

export default AddBloodRequirement