import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { onEditProfile } from './Logic'
import { editProfileValidation } from './Data'
import { useSession } from 'next-auth/react'
import { getUserDetails } from '@/app/_util/helper/authHelper'
import { toast } from 'react-toastify'

function EditProfileComponent({ editPersonalDetails }) {



    let [initialValues, setInitialValues] = useState({})
    let session = useSession();

    function successCB() {
        console.log("Profile update success");
        toast.success("Profile updated success")
    }

    function errorCB(err) {
        toast.error(err)
    }

    useEffect(() => {
        console.log(session);
        let profile = getUserDetails(session);
        console.log(profile);
        if (profile) {
            // alert("First name is : " + profile.first_name)
            setInitialValues({
                first_name: profile.first_name,
                last_name: profile.last_name
            })
        }
    }, [session])

    return (
        <Formik onSubmit={(val) => onEditProfile(val, successCB, errorCB)} enableReinitialize initialValues={initialValues} validationSchema={editProfileValidation} >
            <Form>
                <div className="grid flex gap-5 grid-cols-2">
                    <div>
                        <Field disabled={!editPersonalDetails} type="text" name="first_name" id="first_name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter first name" required />
                        <ErrorMessage name='first_name' className='errorMessage' component={"div"}></ErrorMessage>
                    </div>
                    <div>
                        <Field type="text" name="last_name" disabled={!editPersonalDetails} id="last_name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter last name" required />
                        <ErrorMessage name='last_name' className='errorMessage' component={"div"}></ErrorMessage>
                    </div>
                </div>
                {
                    editPersonalDetails &&
                    <button type="submit" class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit Personal Details</button>
                }
            </Form>
        </Formik>
    )
}

export default EditProfileComponent