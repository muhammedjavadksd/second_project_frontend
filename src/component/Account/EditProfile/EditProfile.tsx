import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { userDetailsFromUseSession } from '@/util/data/helper/authHelper'
import { editProfileValidation } from '@/util/external/yup/yupValidations'
import { onEditProfile } from '@/util/data/helper/logic'

function EditProfileComponent({ editPersonalDetails }): React.ReactElement {

    const [initialValues, setInitialValues] = useState({})
    const loadSession = useSession();

    async function successCB(): Promise<void> {
        console.log("Profile update success");
        toast.success("Profile updated successfully");
        const profile = userDetailsFromUseSession(loadSession, "user");
        await signIn("credentials", { redirect: false, auth_type: "user_login_with_token", token: profile.token })
    }

    function errorCB(err: string): void {
        toast.error(err)
    }

    useEffect(() => {
        console.log(loadSession);

        const profile = userDetailsFromUseSession(loadSession, "user");
        console.log(loadSession);

        // const firstName = new Cookies
        console.log(profile);

        if (profile) {
            setInitialValues({
                first_name: profile.first_name,
                last_name: profile.last_name
            })
        }
    }, [loadSession])

    return (
        <Formik onSubmit={(val) => onEditProfile(val, successCB, errorCB)} enableReinitialize initialValues={initialValues} validationSchema={editProfileValidation} >
            <Form>
                <div className="grid flex gap-5 grid-cols-2">
                    <div>
                        <Field disabled={!editPersonalDetails} type="text" name="first_name" id="first_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter first name" required />
                        <ErrorMessage name='first_name' className='errorMessage' component={"div"}></ErrorMessage>
                    </div>
                    <div>
                        <Field type="text" name="last_name" disabled={!editPersonalDetails} id="last_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter last name" required />
                        <ErrorMessage name='last_name' className='errorMessage' component={"div"}></ErrorMessage>
                    </div>
                </div>
                {
                    editPersonalDetails &&
                    <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Personal Details</button>
                }
            </Form>
        </Formik>
    )
}

export default EditProfileComponent