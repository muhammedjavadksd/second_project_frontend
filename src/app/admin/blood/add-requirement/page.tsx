"use client"
import AdminLayout from "@/component/Admin/AdminLayout";
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter";
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb";
import HospitalSearch from "@/component/Util/HospitalSearch";
import SpinnerLoader from "@/component/Util/SpinningLoader";
import { adminAddBloodReq } from "@/util/data/helper/APIHelper";
import { bloodRequirementAdminInitialValues } from "@/util/external/yup/initialValues";
import { bloodRequirementAdminValidation } from "@/util/external/yup/yupValidations";
import { BloodGroup, BloodStatus } from "@/util/types/Enums/BasicEnums";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment, useRef, useState } from "react";
import ReactGoogleAutocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { toast } from "react-toastify";


function AddBloodRequirement() {

    const [isPageLoading, setPageLoading] = useState(false)
    const searchRef = useRef(null)

    return (
        <Fragment>
            <AdminPrivateRouter>
                <SpinnerLoader isLoading={isPageLoading} />

                <AdminLayout onSearch={() => { }}>
                    <AdminBreadCrumb title={"Add Blood requirement"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Add blood requirement", href: "/blood/blood-reuirement" }]} />

                    <Formik
                        initialValues={bloodRequirementAdminInitialValues}
                        validationSchema={bloodRequirementAdminValidation}
                        onSubmit={(val, { resetForm }) => {
                            setPageLoading(true)
                            adminAddBloodReq(val.patientName, +val.unit, val.neededAt as Date, val.status as BloodStatus, val.blood_group as BloodGroup, val.hospital, val.address, +val.phoneNumber, val.email_id).then((data) => {
                                if (data.status) {
                                    toast.success("Blood requirement created success")
                                    resetForm()
                                    if (searchRef.current) {
                                        searchRef.current.value = "";
                                    }
                                } else {
                                    toast.error(data.msg)
                                }
                            }).catch((err) => {
                                toast.error("Blood requirement creation failed")
                                resetForm()
                            }).finally(() => {
                                setPageLoading(false)
                            })
                        }}
                    >
                        {({ isSubmitting, setFieldValue }) => (
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
                                        <ErrorMessage className='errorMessage' name="email_id" component="div" />
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
                                        <ErrorMessage className='errorMessage' name="patientName" component="div" />
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
                                        <ErrorMessage className='errorMessage' name="unit" component="div" />
                                    </div>

                                    {/* Needed At */}
                                    <div>
                                        <label htmlFor="neededAt">Needed At</label>
                                        <Field
                                            type="date"
                                            name="neededAt"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        />
                                        <ErrorMessage className='errorMessage' name="neededAt" component="div" />
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label htmlFor="status">Status</label>
                                        <Field as="select" type="text" name="status" placeholder="Enter Status" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                            <option>Select status</option>
                                            <option className="capitalize" value={BloodStatus.Approved}>Approved</option>
                                            <option className="capitalize" value={BloodStatus.Pending}>Pending</option>
                                        </Field>
                                        <ErrorMessage className='errorMessage' name="status" component="div" />
                                    </div>



                                    {/* Blood Group */}
                                    <div>
                                        <label htmlFor="blood_group">Blood Group</label>
                                        <Field as="select" type="text" name="blood_group" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                            <option>Select blood group</option>
                                            {
                                                Object.values(BloodGroup).map((bGroup) => {
                                                    return (
                                                        <option key={bGroup} className="capitalize" value={bGroup}>{bGroup}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage className='errorMessage' name="blood_group" component="div" />
                                    </div>

                                    <div>
                                        <label htmlFor="hospital">Hospital Name</label>
                                        <HospitalSearch searchRef={searchRef} selectedHospital={(val) => setFieldValue("hospital", val)} />
                                        <ErrorMessage className='errorMessage' name="hospital" component="div" />
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
                                        <ErrorMessage className='errorMessage' name="address" component="div" />
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
                                        <ErrorMessage className='errorMessage' name="phoneNumber" component="div" />
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
        </Fragment >
    )
}

export default AddBloodRequirement