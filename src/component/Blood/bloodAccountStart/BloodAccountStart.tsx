import { bloodDonatationFormValues } from '@/util/external/yup/initialValues'
import { bloodDonatationFormValidation } from '@/util/external/yup/yupValidations'
import { BloodGroup } from '@/util/types/Enums/BasicEnums'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useContext, useEffect } from 'react'
import { onBloodDonationSubmit } from './Logic'
import { toast } from 'react-toastify'
import ModelHeader from '@/component/Util/Model/ModelHeader'
import { signIn, useSession } from 'next-auth/react'
import { userDetailsFromUseSession } from '@/util/data/helper/authHelper'
import { getServerSession } from 'next-auth'
import API_axiosInstance from '@/util/external/axios/api_axios_instance'
import BloodDonorForm from '@/util/context/BloodDonorForm'
import { BloodDonorFormContext } from '@/util/context/Context'



function BloodAccountStart(): React.ReactElement {

    // const { update } = useSession()
    const session = useSession()
    const { donor_id } = useContext(BloodDonorFormContext)



    async function successCB(donor_id: string) {
        const user = userDetailsFromUseSession(session)
        await API_axiosInstance.patch("/profile/update_profile", { user_profile: { blood_donor_id: donor_id } }, { headers: { authorization: `Bearer ${user.token}` } })
        // signIn("credentials", { redirect: false })
        toast.success("Blood donation profile is opened")
        console.log(session);
    }

    useEffect(() => {
        console.log("Session updated:", session);
        console.log("User details from session:", userDetailsFromUseSession(session));
    }, [session]);

    function errorCB(err) {
        toast.error(err)
    }

    function onLocationSelect() {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            const { latitude, longitude } = coords
            console.log(coords);

            const res = await fetch(`https://openmensa.org/api/v2/canteens?near[lat]=${latitude}&near[lng]=${longitude}&near[dist]=10000`);
            const data = await res.json();
            console.log(data);

        })
    }

    return (
        <div className='bg-white  rounded-t  rounded-b min-h-10 min-w-96 '>
            <ModelHeader />
            {
                donor_id && "Already created donor profile"
            }
            <div className='p-5'>
                <Formik initialValues={bloodDonatationFormValues} validationSchema={bloodDonatationFormValidation} onSubmit={(val) => { onBloodDonationSubmit(val, successCB, errorCB) }}>
                    <Form>
                        <div className='mb-5'>
                            <label htmlFor="" className='text-sm'>Enter full name</label>
                            <Field placeholder="Enter full name" name="full_name" id="full_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                            <ErrorMessage name='full_name' component={"div"} className='errorMessage'></ErrorMessage>
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="" className='text-sm'>Enter phone number</label>
                            <Field placeholder="Enter phone number" name="phone_number" id="phone_number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                            <ErrorMessage name='phone_number' component={"div"} className='errorMessage'></ErrorMessage>
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="" className='text-sm'>Enter email address</label>
                            <Field placeholder="Enter email address" name="email_address" id="email_address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                            <ErrorMessage name='email_address' component={"div"} className='errorMessage'></ErrorMessage>
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="" className='text-sm'>Select location</label>
                            <div onClick={onLocationSelect} className='min-h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'><span>Select the location</span></div>
                            {/* <Field placeholder="Select the location" name="location" id="location" className="" />
                            <ErrorMessage name='location' component={"div"} className='errorMessage'></ErrorMessage> */}
                        </div>
                        <div>
                            <label htmlFor="" className='text-sm'>Select your blood group</label>
                            <Field as="select" name="blood_group" id="blood_group" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                                <option>Select Blood Group</option>
                                {
                                    Object.values(BloodGroup).map((each) => {
                                        return (
                                            <option value={each}>{each}</option>
                                        )
                                    })
                                }
                            </Field>
                            <ErrorMessage name='blood_group' component={"div"} className='errorMessage'></ErrorMessage>
                        </div>
                        <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Save & Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default BloodAccountStart