"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import HospitalSearch from "@/component/Util/HospitalSearch"
import LoadingDataNotFoundComponent from "@/component/Util/LoadingDataNotFound"
import SpinnerLoader from "@/component/Util/SpinningLoader"
import { addBloodDonorApi } from "@/util/data/helper/APIHelper"
import { addBloodDonorInitialValues } from "@/util/external/yup/initialValues"
import { addBloodDonorValidation } from "@/util/external/yup/yupValidations"
import { BloodDonationStatus, BloodDonorStatus, BloodGroup, BloodStatus } from "@/util/types/Enums/BasicEnums"
import { HospitalResponse } from "@/util/types/InterFace/UtilInterface"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Fragment, useState } from "react"
import { FaSpinner } from "react-icons/fa"
import { toast } from "react-toastify"


function Page() {

    const [selectedLocation, setLocation] = useState<HospitalResponse>(null)
    const [isLoading, setLoading] = useState(false)

    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout onSearch={(val) => { }}>
                    <>
                        <AdminBreadCrumb title={"Add blood donor"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Donor", href: "/admin/blood/add-donor" }, { title: "Add", href: "/admin/blood/add-donor" }]} />
                        <SpinnerLoader isLoading={isLoading} />


                        <div className="mt-3">
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">Notice!</span> When selecting a location, please choose the nearest option to effectively connect with local donors for your other needs.
                            </div>
                            <Formik initialValues={addBloodDonorInitialValues} validationSchema={addBloodDonorValidation} onSubmit={(val, { resetForm }) => {
                                if (!selectedLocation) {
                                    toast.error("Please select valid location")
                                    return;
                                }
                                setLoading(true)
                                addBloodDonorApi(val.full_name, val.blood_group as BloodGroup, selectedLocation, val.phone_number as unknown as number, val.email_address, val.status as BloodDonorStatus).then((data) => {
                                    if (data.status) {
                                        toast.success("Blood donor created success");
                                        resetForm()
                                    } else {
                                        toast.error(data.msg);
                                    }
                                }).catch((err) => {
                                    toast.error("Something went wrong")
                                }).finally(() => {
                                    setLoading(false)
                                })
                            }}>
                                <Form>

                                    <div className="grid  gap-x-10 gap-y-5 grid-cols-2 mb-1">
                                        <div>
                                            <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full name</label>
                                            <Field type="text" id="full_name" name="full_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter donor name" />
                                            <ErrorMessage className='errorMessage' component={"div"} name='full_name'></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                                            <Field type="text" id="phone_number" name="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter phone number" />
                                            <ErrorMessage className='errorMessage' component={"div"} name='phone_number'></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="email_address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                            <Field type="text" id="email_address" name="email_address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Email address" />
                                            <ErrorMessage className='errorMessage' component={"div"} name='email_address'></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="blood_group" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blood Group</label>
                                            <Field as="select" type="text" id="blood_group" name="blood_group" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                                <option value="">Select blood group</option>
                                                {
                                                    Object.values(BloodGroup).map((item) => {
                                                        return (
                                                            <option key={item} value={item}>{item}</option>
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage className='errorMessage' component={"div"} name='blood_group'></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is he/she available to donate now?</label>
                                            <Field as="select" type="text" id="status" name="status" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                                <option value="">Select status</option>
                                                <option value={BloodDonorStatus.Open}>Yes, Avaialble</option>
                                                <option value={BloodDonorStatus.Blocked}>Not now</option>
                                            </Field>
                                            <ErrorMessage className='errorMessage' component={"div"} name='status'></ErrorMessage>
                                        </div>

                                        <div>
                                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select nearest location</label>
                                            <HospitalSearch selectedHospital={(location) => setLocation(location)} />
                                        </div>


                                    </div>

                                    <div className="flex justify-end">
                                        <button className="mt-3 bg-blue-800 px-5 py-2 text-white rounded-md">Save</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )
}

export default Page