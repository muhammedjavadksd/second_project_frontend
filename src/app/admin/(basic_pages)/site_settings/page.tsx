"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Fragment } from "react"


function Page() {

    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <AdminBreadCrumb title={"site settings"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Site settings", href: "/site_settings" }]} />

                    <div className="mt-5">
                        <Formik initialValues={{}} onSubmit={() => { }}>
                            <Form>
                                <div className="grid   gap-10 grid-cols-2 mb-5">
                                    <div>
                                        <label htmlFor="" className='text-sm mb-2 block'>Email address</label>
                                        <Field type="text" name="state" id="state" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter email address" />
                                        <ErrorMessage className='errorMessage' component={"div"} name='state'></ErrorMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-sm mb-2 block'>Password</label>
                                        <Field type="password" value="jnsdfjnsdf" name="state" id="state" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter email address" />
                                        <ErrorMessage className='errorMessage' component={"div"} name='state'></ErrorMessage>
                                    </div>
                                </div>
                                <div className='w-100 ml-auto'>
                                    <button type='submit' className='bg-blue-600 text-white py-3 rounded-lg px-8'>Save</button>
                                </div>

                            </Form>
                        </Formik>
                    </div>
                </AdminLayout>
            </AdminPrivateRouter>
        </Fragment>
    )
}

export default Page