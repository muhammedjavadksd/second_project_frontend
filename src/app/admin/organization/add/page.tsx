"use client"
import AdminLayout from '@/_component/Admin/AdminLayout'
import AdminPrivateRouter from '@/_component/LoginComponent/AdminPrivateRouter'
import AdminBreadCrumb from '@/_component/Util/AdminBreadCrumb'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { initialValues, validationSchema } from './data'
// import const_data from '@/app/_util/_const/const' from '@/app/_util/_const/const'
// const_data
import { addOrganization } from './logic'
import { toast } from 'react-toastify'
import const_data from '@/app/_util/_const/const'

function AdminAddOrganization(): React.ReactElement {
    return (
        <AdminPrivateRouter>
            <AdminLayout>
                <AdminBreadCrumb title={"Add Fund Raiser"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Organization", href: "/" }, { title: "Add", href: "/admin/organization/add" }]} />
                <div className='mt-5'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(val) => { addOrganization(val, () => toast.success("Organization created success"), (err) => toast.error(err)) }}
                    >
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className='text-sm mb-2 block'>Enter Name</label>
                                    <Field type="text" id="name" name="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="name" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label htmlFor="phone_number" className='text-sm mb-2 block'>Enter Phone Number</label>
                                    <Field type="text" id="phone_number" name="phone_number" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="phone_number" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label htmlFor="email_address" className='text-sm mb-2 block'>Enter Email Address</label>
                                    <Field type="email_address" id="email_address" name="email_address" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="email_address" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label htmlFor="password" className='text-sm mb-2 block'>Enter Password</label>
                                    <Field type="password" id="password" name="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="password" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label htmlFor="blood_service" className='text-sm mb-2 block'>Do They Have Blood Services?</label>
                                    <Field as="select" type="text" id="blood_service" name="blood_service" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                        <option value={""}>Select Blood Service</option>
                                        <option value={1}>Yes, They do</option>
                                        <option value={0}>No</option>
                                    </Field>
                                    <ErrorMessage name="blood_service" component="div" className="text-red-600" />

                                </div>
                                <div>
                                    <label htmlFor="fund_service" className='text-sm mb-2 block'>Do They Have Fund Raise Services?</label>
                                    <Field as="select" type="text" id="fund_service" name="fund_service" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                        <option value={""}>Select Fund Raise Service</option>
                                        <option value={1}>Yes, They do</option>
                                        <option value={0}>No</option>
                                    </Field>
                                    <ErrorMessage name="fund_service" component="div" className="text-red-600" />

                                </div>
                                <div>
                                    <label htmlFor="organization_type" className='text-sm mb-2 block'>Organization Type</label>
                                    <Field as="select" type="text" id="organization_type" name="organization_type" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                        <option value="">Select Type</option>
                                        {
                                            const_data.ORGANIZATION_TYPE.map((item) => {
                                                return <option value={item}>{item}</option>
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="organization_type" component="div" className="text-red-600" />

                                </div>
                                <div>
                                    <label htmlFor="logo_photo" className='text-sm mb-2 block'>Select Logo</label>
                                    <Field type="file" id="logo_photo" name="logo_photo" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light py-0" />
                                    <ErrorMessage name="logo_photo" component="div" className="text-red-600" />

                                </div>
                                <div>
                                    <label htmlFor="website_url" className='text-sm mb-2 block'>Website URL</label>
                                    <Field type="url" id="website_url" name="website_url" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                                    <ErrorMessage name="website_url" component="div" className="text-red-600" />

                                </div>
                                <div>
                                    <label htmlFor="office_photo" className='text-sm mb-2 block'>Upload Office Photo</label>
                                    <Field type="file" id="office_photo" name="office_photo" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light py-0" />
                                    <ErrorMessage name="office_photo" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label htmlFor="registration_photo" className='text-sm mb-2 block'>Registration Photo</label>
                                    <Field type="file" id="registration_photo" name="registration_photo" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light py-0" />
                                    <ErrorMessage name="registration_photo" component="div" className="text-red-600" />
                                </div>
                                <div>
                                    <label htmlFor="pan_card" className='text-sm mb-2 block'>Pan Card Photo</label>
                                    <Field type="file" id="pan_card" name="pan_card" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light py-0" />

                                    <ErrorMessage name="pan_card" component="div" className="text-red-600" />
                                </div>
                            </div>

                            <div className='flex justify-end mt-5 '>
                                <button type='submit' className='bg-blue-600 px-6 py-3 text-white rounded-lg'>Save</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </AdminLayout>
        </AdminPrivateRouter>
    )
}

export default AdminAddOrganization