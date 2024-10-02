"use client"
import AdminLayout from "@/component/Admin/AdminLayout"
import AdminPrivateRouter from "@/component/LoginComponent/AdminPrivateRouter"
import AdminBreadCrumb from "@/component/Util/AdminBreadCrumb"
import { userDetailsFromUseSession } from "@/util/data/helper/authHelper"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { signOut, useSession } from "next-auth/react"
import { Fragment, useEffect, useState } from "react"
import { adminSignInValidation } from "../../auth/sign_in/Data"
import { adminUpdateSettings } from "@/util/data/helper/APIHelper"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { adminSiteSettings } from "@/util/external/yup/yupValidations"


function Page() {

    const session = useSession();
    const [initialValues, setInitialValues] = useState({ password: null, email: null });
    const router = useRouter();

    useEffect(() => {
        const user = userDetailsFromUseSession(session, "admin");
        if (user) {
            setInitialValues({ email: user.email, password: null })
        }
    }, [session])

    return (
        <Fragment>
            <AdminPrivateRouter>
                <AdminLayout>
                    <AdminBreadCrumb title={"site settings"} root={{ title: "Dashboard", href: "/" }} paths={[{ title: "Site settings", href: "/site_settings" }]} />

                    <div className="mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Notice!</span> Keep the password empty if you don't wish to change the password
                    </div>
                    <div className="mt-5">
                        <Formik enableReinitialize initialValues={initialValues} validationSchema={adminSiteSettings} onSubmit={(val) => {
                            const dirty = JSON.stringify(initialValues) == JSON.stringify(val);
                            if (dirty) {
                                toast.error("Email id cannot same as old");
                                return;
                            }
                            adminUpdateSettings(val['email'], val['password']).then((data) => {
                                data.status ? (signOut().then(() => {
                                    router.replace("/admin/auth/sign_in")
                                })) : toast.error(data.msg)
                            });
                        }}>

                            <Form>
                                <div className="grid   gap-10 grid-cols-2 mb-5">
                                    <div>
                                        <label htmlFor="" className='text-sm mb-2 block'>Email address</label>
                                        <Field type="text" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter email address" />
                                        <ErrorMessage className='errorMessage' component={"div"} name='email'></ErrorMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-sm mb-2 block'>Password</label>
                                        <Field type="password" value="" name="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter password" />
                                        <ErrorMessage className='errorMessage' component={"div"} name='password'></ErrorMessage>
                                    </div>
                                </div>
                                <div className='w-100 ml-auto'>
                                    <button type='submit' className={`bg-blue-600 text-white py-3 rounded-lg px-8`}>Save</button>
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